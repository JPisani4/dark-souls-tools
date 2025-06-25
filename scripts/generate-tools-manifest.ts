import fs from "fs-extra";
import path from "path";
import { parse as parseJS } from "@babel/parser";
import traverse from "@babel/traverse";
import type { Tool } from "~/types/tools/tool";

// Paths
const toolsDir = path.resolve(process.cwd(), "components/Tools");
const manifestPath = path.resolve(process.cwd(), "tools.ts");

// Utility: Recursively collect only Index.vue files from GameComponents directories
async function getGameComponentFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const res = path.resolve(dir, entry.name);
      if (entry.isDirectory()) {
        // Look for GameComponents directory
        if (entry.name === "GameComponents") {
          return getVueFilesFromGameComponents(res);
        }
        return getGameComponentFiles(res);
      }
      return [];
    })
  );
  return files.flat();
}

// Utility: Get Index.vue files from GameComponents subdirectories
async function getVueFilesFromGameComponents(
  gameComponentsDir: string
): Promise<string[]> {
  const entries = await fs.readdir(gameComponentsDir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const res = path.resolve(gameComponentsDir, entry.name);
      if (entry.isDirectory()) {
        // Look for index.vue in game-specific directories
        const indexPath = path.join(res, "index.vue");
        if (await fs.pathExists(indexPath)) {
          return [indexPath];
        }
      }
      return [];
    })
  );
  return files.flat();
}

// Utility: slugify component name to kebab-case URL slug
function slugify(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Utility: fallback title from filename
function titleFromFilename(filename: string): string {
  return filename
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

// Parse config from tool.config.ts file
async function parseToolConfig(
  configPath: string
): Promise<Record<string, any> | null> {
  try {
    const content = await fs.readFile(configPath, "utf-8");

    const ast = parseJS(content, {
      sourceType: "module",
      plugins: ["typescript"],
    });

    let config: Record<string, any> | null = null;

    traverse(ast, {
      ExportNamedDeclaration(path) {
        const decl = path.node.declaration;
        if (
          decl?.type === "VariableDeclaration" &&
          decl.declarations.length &&
          decl.declarations[0].id.type === "Identifier" &&
          decl.declarations[0].id.name === "config"
        ) {
          const init = decl.declarations[0].init;
          if (init?.type === "ObjectExpression") {
            config = {};
            for (const prop of init.properties) {
              if (prop.type === "ObjectProperty") {
                const key =
                  prop.key.type === "Identifier"
                    ? prop.key.name
                    : prop.key.type === "StringLiteral"
                      ? prop.key.value
                      : null;

                if (key) {
                  if (prop.value.type === "StringLiteral") {
                    config[key] = prop.value.value;
                  } else if (prop.value.type === "NumericLiteral") {
                    config[key] = prop.value.value;
                  } else if (prop.value.type === "ArrayExpression") {
                    config[key] = prop.value.elements
                      .filter((el) => el?.type === "StringLiteral")
                      .map((el) => (el as any).value);
                  } else if (prop.value.type === "ObjectExpression") {
                    // Handle nested objects
                    config[key] = {};
                    for (const nestedProp of prop.value.properties) {
                      if (nestedProp.type === "ObjectProperty") {
                        const nestedKey =
                          nestedProp.key.type === "Identifier"
                            ? nestedProp.key.name
                            : nestedProp.key.type === "StringLiteral"
                              ? nestedProp.key.value
                              : null;

                        if (nestedKey) {
                          if (nestedProp.value.type === "StringLiteral") {
                            config[key][nestedKey] = nestedProp.value.value;
                          } else if (
                            nestedProp.value.type === "NumericLiteral"
                          ) {
                            config[key][nestedKey] = nestedProp.value.value;
                          } else if (
                            nestedProp.value.type === "ArrayExpression"
                          ) {
                            config[key][nestedKey] = nestedProp.value.elements
                              .filter((el) => el?.type === "StringLiteral")
                              .map((el) => (el as any).value);
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
    });

    return config;
  } catch (err) {
    console.warn(`Failed to parse config file ${configPath}:`, err);
    return null;
  }
}

// Main generation function
async function generateManifest() {
  const vueFiles = await getGameComponentFiles(toolsDir);

  // Group files by tool slug
  const toolGroups = new Map<
    string,
    {
      configs: Record<string, any>;
      games: string[];
      importPaths: Record<string, string>;
    }
  >();

  for (const filePath of vueFiles) {
    // Extract tool name and game from path
    // Path format: components/Tools/ToolName/GameComponents/game/index.vue
    const pathParts = path.relative(toolsDir, filePath).split(path.sep);
    const toolName = pathParts[0];
    const gameId = pathParts[2]; // GameComponents/[game]/index.vue

    const slug = slugify(toolName);
    const importPath = `~/components/Tools/${toolName}/GameComponents/${gameId}/index.vue`;
    const configPath = path.join(
      toolsDir,
      toolName,
      "GameComponents",
      gameId,
      "tool.config.ts"
    );

    // Check if game-specific tool.config.ts exists
    const configExists = await fs.pathExists(configPath);

    if (!configExists) {
      console.error(
        `❌ Missing tool.config.ts for tool: ${toolName}, game: ${gameId}`
      );
      console.error(`   Expected: ${configPath}`);
      console.error(
        `   Please run: npm run create:tool -- "${titleFromFilename(toolName)}" ${gameId} to regenerate`
      );
      process.exit(1);
    }

    // Parse game-specific config file
    const config = await parseToolConfig(configPath);

    if (!config) {
      console.error(
        `❌ Failed to parse tool.config.ts for tool: ${toolName}, game: ${gameId}`
      );
      process.exit(1);
    }

    // Validate required fields
    if (!config.title) {
      console.error(
        `❌ Missing 'title' in tool.config.ts for tool: ${toolName}, game: ${gameId}`
      );
      process.exit(1);
    }

    if (!config.description) {
      console.error(
        `❌ Missing 'description' in tool.config.ts for tool: ${toolName}, game: ${gameId}`
      );
      process.exit(1);
    }

    // Initialize tool group if it doesn't exist
    if (!toolGroups.has(slug)) {
      toolGroups.set(slug, {
        configs: {},
        games: [],
        importPaths: {},
      });
    }

    const toolGroup = toolGroups.get(slug)!;
    toolGroup.games.push(gameId);
    toolGroup.importPaths[gameId] = importPath;
    toolGroup.configs[gameId] = config;
  }

  // Convert grouped data to tool entries
  const toolEntries = Array.from(toolGroups.entries()).map(
    ([slug, toolGroup]) => {
      const { configs, games, importPaths } = toolGroup;

      // Sort games for consistent ordering
      games.sort();

      // Use the first game as the default loadComponent (for backward compatibility)
      const defaultGame = games[0];
      const defaultImportPath = importPaths[defaultGame];
      const defaultConfig = configs[defaultGame];

      return {
        title: defaultConfig.title,
        description: defaultConfig.description,
        slug,
        importPath: defaultImportPath,
        icon: defaultConfig.icon || "i-heroicons-cube",
        category: defaultConfig.category || "general",
        tags: defaultConfig.tags || [],
        order: defaultConfig.order || 999,
        gameCategories: games,
        config: defaultConfig, // Include the full config object with SEO metadata
      };
    }
  );

  // Sort by order
  toolEntries.sort((a, b) => (a.order || 999) - (b.order || 999));

  // Output TypeScript file
  const output = `/* AUTO-GENERATED FILE — DO NOT EDIT */
import type { Tool } from '~/types/tools/tool'

export const tools: Tool[] = [
${toolEntries
  .map(
    (t) => `  {
    title: ${JSON.stringify(t.title)},
    description: ${JSON.stringify(t.description)},
    slug: ${JSON.stringify(t.slug)},
    icon: ${JSON.stringify(t.icon)},
    category: ${JSON.stringify(t.category)},
    tags: ${JSON.stringify(t.tags)},
    order: ${t.order},
    loadComponent: () => import('${t.importPath}'),
    createdAt: new Date('${new Date().toISOString()}'),
    gameCategories: ${JSON.stringify(t.gameCategories)},
    config: ${JSON.stringify(t.config, null, 2).replace(/\n/g, "\n    ")},
  }`
  )
  .join(",\n")}
]

export default tools
`;

  await fs.writeFile(manifestPath, output);
  console.log(`✅ Generated tools manifest with ${toolEntries.length} tools`);
  console.log(`📁 Output: ${manifestPath}`);
}

// Run the generation
generateManifest().catch((err) => {
  console.error("❌ Failed to generate tools manifest:", err);
  process.exit(1);
});
