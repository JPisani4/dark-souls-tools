import fs from "fs-extra";
import path from "path";
import { parse as parseSFC } from "@vue/compiler-sfc";
import { parse as parseJS } from "@babel/parser";
import traverse from "@babel/traverse";

// Paths
const toolsDir = path.resolve(process.cwd(), "components/Tools");
const manifestPath = path.resolve(process.cwd(), "tools.ts");

// Utility: Recursively collect only Index.vue files from a directory
async function getVueFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const res = path.resolve(dir, entry.name);
      if (entry.isDirectory()) {
        return getVueFiles(res);
      } else if (entry.isFile() && entry.name === "Index.vue") {
        return [res];
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
  const vueFiles = await getVueFiles(toolsDir);

  const toolEntries = [];

  for (const filePath of vueFiles) {
    const relativePath = path.relative(toolsDir, filePath).replace(/\\/g, "/"); // Normalize slashes
    const baseDirName = path.basename(path.dirname(filePath));
    const slug = slugify(baseDirName);
    const importPath = `~/components/Tools/${relativePath}`;

    const meta = (await extractMetaFromVueFile(filePath)) || {
      title: titleFromFilename(baseDirName),
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
}

generateManifest().catch((err) => {
  console.error("❌ Failed to generate tools manifest:", err);
  process.exit(1);
});
