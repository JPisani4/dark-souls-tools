import fs from "fs-extra";
import path from "path";
import { parse as parseSFC } from "@vue/compiler-sfc";
import { parse as parseJS } from "@babel/parser";
import traverse from "@babel/traverse";

// Paths
const toolsDir = path.resolve(process.cwd(), "components/Tools");
const manifestPath = path.resolve(process.cwd(), "tools.ts");

// Utility: slugify component name to kebab-case URL slug
function slugify(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2") // Insert hyphen between camelCase
    .replace(/[\s_]+/g, "-") // Replace spaces/underscores
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "") // Remove invalid chars
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, ""); // Trim hyphens
}

// Utility: fallback title from filename
function titleFromFilename(filename: string): string {
  return filename
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

// Parse exported `meta` object from script content using Babel
function parseMeta(scriptContent: string): Record<string, string> | null {
  try {
    const ast = parseJS(scriptContent, {
      sourceType: "module",
      plugins: ["typescript"],
    });

    let meta: Record<string, string> | null = null;

    traverse(ast, {
      ExportNamedDeclaration(path) {
        const decl = path.node.declaration;
        if (
          decl?.type === "VariableDeclaration" &&
          decl.declarations.length &&
          decl.declarations[0].id.type === "Identifier" &&
          decl.declarations[0].id.name === "meta"
        ) {
          const init = decl.declarations[0].init;
          if (init?.type === "ObjectExpression") {
            meta = {};
            for (const prop of init.properties) {
              if (
                prop.type === "ObjectProperty" &&
                prop.key.type === "Identifier" &&
                prop.value.type === "StringLiteral"
              ) {
                meta[prop.key.name] = prop.value.value;
              }
            }
          }
        }
      },
    });

    return meta;
  } catch (err) {
    console.warn("Failed to parse script content:", err);
    return null;
  }
}

// Extract metadata from a single Vue file
async function extractMetaFromVueFile(
  filePath: string
): Promise<Record<string, string> | null> {
  const content = await fs.readFile(filePath, "utf-8");
  const { descriptor } = parseSFC(content);

  let scriptContent = "";
  if (descriptor.script) {
    scriptContent += descriptor.script.content;
  }
  if (descriptor.scriptSetup) {
    scriptContent += "\n" + descriptor.scriptSetup.content;
  }

  return parseMeta(scriptContent);
}

// Main generation function
async function generateManifest() {
  const files = await fs.readdir(toolsDir);
  const vueFiles = files.filter(
    (f) => f.endsWith(".vue") && f !== "ToolList.vue"
  );

  const toolEntries = [];

  for (const file of vueFiles) {
    const baseName = file.replace(".vue", "");
    const filePath = path.join(toolsDir, file);
    const slug = slugify(baseName);
    const importPath = `~/components/Tools/${file}`;

    const meta = (await extractMetaFromVueFile(filePath)) || {
      title: titleFromFilename(baseName),
      description: "No description provided.",
    };

    toolEntries.push({
      title: meta.title,
      description: meta.description,
      slug,
      importPath,
    });
  }

  // Output TypeScript file
  const output = `/* AUTO-GENERATED FILE — DO NOT EDIT */
import type { Tool } from '~/types/tool'

export const tools: Tool[] = [
${toolEntries
  .map(
    (t) => `  {
    title: ${JSON.stringify(t.title)},
    description: ${JSON.stringify(t.description)},
    slug: ${JSON.stringify(t.slug)},
    loadComponent: () => import('${t.importPath}'),
  }`
  )
  .join(",\n")}
]
`;

  await fs.writeFile(manifestPath, output, "utf-8");
  console.log(`✅ tools.ts generated with ${toolEntries.length} entries.`);
}

generateManifest().catch((err) => {
  console.error("❌ Failed to generate tools manifest:", err);
  process.exit(1);
});
