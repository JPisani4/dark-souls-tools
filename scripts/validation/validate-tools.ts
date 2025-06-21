#!/usr/bin/env ts-node

import fs from "fs-extra";
import path from "path";
import { parse as parseJS } from "@babel/parser";
import traverse from "@babel/traverse";

// Paths
const toolsDir = path.resolve(process.cwd(), "components/Tools");
const manifestPath = path.resolve(process.cwd(), "tools.ts");

interface ValidationResult {
  toolName: string;
  isValid: boolean;
  errors: string[];
  warnings: string[];
  structure?: string[];
}

// Utility: Get all tool directories
async function getToolDirectories(): Promise<string[]> {
  const entries = await fs.readdir(toolsDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory() && entry.name !== "Common")
    .map((entry) => path.join(toolsDir, entry.name));
}

// Utility: Check if file exists
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Utility: Validate config file
async function validateConfigFile(
  configPath: string
): Promise<{ isValid: boolean; errors: string[]; config?: any }> {
  const errors: string[] = [];
  let isValid = false;
  let config: any = null;

  try {
    const content = await fs.readFile(configPath, "utf-8");

    // Basic validation - check for ToolConfig import and config export
    if (!content.includes("import type { ToolConfig }")) {
      errors.push("Config file missing ToolConfig import");
    }
    if (!content.includes("export const config")) {
      errors.push("Config file missing 'export const config'");
    }

    // Try to parse with Babel for deeper validation
    try {
      const ast = parseJS(content, {
        sourceType: "module",
        plugins: ["typescript"],
      });

      let hasConfigExport = false;
      traverse(ast, {
        ExportNamedDeclaration(path) {
          const decl = path.node.declaration;
          if (
            decl?.type === "VariableDeclaration" &&
            decl.declarations.length &&
            decl.declarations[0].id.type === "Identifier" &&
            decl.declarations[0].id.name === "config"
          ) {
            hasConfigExport = true;

            // Parse config object
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
                    }
                  }
                }
              }
            }
          }
        },
      });

      if (hasConfigExport) {
        // Validate required fields
        if (!config?.title) {
          errors.push("Config missing required 'title' field");
        }
        if (!config?.description) {
          errors.push("Config missing required 'description' field");
        }

        if (config?.title && config?.description) {
          isValid = true;
        }
      } else {
        errors.push("Config file missing valid config export");
      }
    } catch (parseError) {
      errors.push(`Failed to parse config file: ${parseError}`);
    }
  } catch (error) {
    errors.push(`Failed to read config file: ${error}`);
  }

  return { isValid, errors, config };
}

// Utility: Get directory structure
async function getDirectoryStructure(toolDir: string): Promise<string[]> {
  const structure: string[] = [];

  async function scanDir(dir: string, prefix: string = "") {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(toolDir, fullPath);

      if (entry.isDirectory()) {
        structure.push(`${prefix}📁 ${entry.name}/`);
        await scanDir(fullPath, prefix + "  ");
      } else {
        structure.push(`${prefix}📄 ${entry.name}`);
      }
    }
  }

  await scanDir(toolDir);
  return structure;
}

// Utility: Check for at least one GameComponents/[game]/index.vue file
async function hasGameComponentIndex(toolDir: string): Promise<boolean> {
  const gameComponentsDir = path.join(toolDir, "GameComponents");
  if (!(await fileExists(gameComponentsDir))) return false;
  const games = await fs.readdir(gameComponentsDir, { withFileTypes: true });
  for (const entry of games) {
    if (entry.isDirectory()) {
      const indexPath = path.join(gameComponentsDir, entry.name, "index.vue");
      if (await fileExists(indexPath)) return true;
    }
  }
  return false;
}

// Main validation function
async function validateTool(toolDir: string): Promise<ValidationResult> {
  const toolName = path.basename(toolDir);
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for at least one GameComponents/[game]/index.vue
  const hasAtLeastOneGameIndex = await hasGameComponentIndex(toolDir);
  if (!hasAtLeastOneGameIndex) {
    errors.push("Missing GameComponents/[game]/index.vue file");
    return {
      toolName,
      isValid: false,
      errors,
      warnings,
    };
  }

  // Check for game-specific tool.config.ts files
  const gameComponentsDir = path.join(toolDir, "GameComponents");
  if (await fileExists(gameComponentsDir)) {
    const games = await fs.readdir(gameComponentsDir, { withFileTypes: true });
    let hasValidConfig = false;

    for (const entry of games) {
      if (entry.isDirectory()) {
        const configPath = path.join(
          gameComponentsDir,
          entry.name,
          "tool.config.ts"
        );
        if (await fileExists(configPath)) {
          const configValidation = await validateConfigFile(configPath);
          if (configValidation.isValid) {
            hasValidConfig = true;
          } else {
            errors.push(
              `Invalid config for ${entry.name}: ${configValidation.errors.join(", ")}`
            );
          }
        } else {
          errors.push(`Missing tool.config.ts for game: ${entry.name}`);
        }
      }
    }

    if (!hasValidConfig) {
      errors.push("No valid game-specific tool.config.ts files found");
    }
  }

  // Check for supporting components
  const entries = await fs.readdir(toolDir, { withFileTypes: true });
  const supportingComponents = entries.filter(
    (entry) =>
      entry.isFile() &&
      entry.name.endsWith(".vue") &&
      entry.name !== "index.vue"
  );

  if (supportingComponents.length > 0) {
    warnings.push(
      `Has ${supportingComponents.length} supporting component(s): ${supportingComponents.map((c) => c.name).join(", ")}`
    );
  }

  // Get directory structure
  const structure = await getDirectoryStructure(toolDir);

  const isValid = hasAtLeastOneGameIndex && errors.length === 0;

  return {
    toolName,
    isValid,
    errors,
    warnings,
    structure,
  };
}

// Main execution
async function validateAllTools() {
  console.log("🔍 Validating tool modules...\n");

  const toolDirs = await getToolDirectories();

  if (toolDirs.length === 0) {
    console.log("❌ No tool directories found in components/Tools/");
    process.exit(1);
  }

  const results: ValidationResult[] = [];
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const toolDir of toolDirs) {
    const result = await validateTool(toolDir);
    results.push(result);
    totalErrors += result.errors.length;
    totalWarnings += result.warnings.length;
  }

  // Display results
  for (const result of results) {
    const status = result.isValid ? "✅" : "❌";
    console.log(`${status} ${result.toolName}`);

    if (result.errors.length > 0) {
      result.errors.forEach((error) => {
        console.log(`   ❌ ${error}`);
      });
    }

    if (result.warnings.length > 0) {
      result.warnings.forEach((warning) => {
        console.log(`   ⚠️  ${warning}`);
      });
    }

    if (result.structure) {
      console.log("   📁 Structure:");
      result.structure.forEach((item) => {
        console.log(`      ${item}`);
      });
    }

    console.log("");
  }

  // Summary
  console.log("📊 Validation Summary:");
  console.log(`   Tools validated: ${results.length}`);
  console.log(`   Valid tools: ${results.filter((r) => r.isValid).length}`);
  console.log(`   Invalid tools: ${results.filter((r) => !r.isValid).length}`);
  console.log(`   Total errors: ${totalErrors}`);
  console.log(`   Total warnings: ${totalWarnings}`);

  if (totalErrors > 0) {
    console.log("\n❌ Validation failed. Please fix the errors above.");
    console.log(
      "💡 Run 'npm run create:tool -- \"Tool Name\"' to regenerate tools with proper structure."
    );
    process.exit(1);
  } else {
    console.log("\n✅ All tools pass validation!");
  }
}

// Run validation
validateAllTools().catch((error) => {
  console.error("❌ Validation script failed:", error);
  process.exit(1);
});
