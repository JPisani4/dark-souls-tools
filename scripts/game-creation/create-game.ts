#!/usr/bin/env ts-node

import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";

// Get game details from command line arguments
const gameName = process.argv[2];
const gameId = process.argv[3];
const releaseYear = process.argv[4] || new Date().getFullYear().toString();

if (!gameName || !gameId) {
  console.error("❌ Please provide game name and ID:");
  console.error('   npm run create:game -- "Game Name" game-id [release-year]');
  console.error('   npm run create:game -- "Dark Souls 4" ds4 2025');
  process.exit(1);
}

// Validate game ID format
if (!/^[a-z0-9]+$/.test(gameId)) {
  console.error("❌ Game ID must be lowercase letters and numbers only");
  console.error("   Example: ds4, bb2, er2");
  process.exit(1);
}

// Convert game name to short name
function toShortName(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

// Generate color theme based on game name
function generateColorTheme(gameName: string): string {
  const colors = [
    "from-blue-500 to-purple-600",
    "from-green-500 to-teal-600",
    "from-yellow-500 to-orange-600",
    "from-pink-500 to-red-600",
    "from-indigo-500 to-blue-600",
    "from-purple-500 to-pink-600",
    "from-orange-500 to-red-600",
    "from-teal-500 to-green-600",
  ];

  // Use game name to deterministically select a color
  const hash = gameName.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

  return colors[Math.abs(hash) % colors.length];
}

// Update types/game/index.ts to add new GameId
async function updateGameTypes() {
  const typesPath = path.resolve(process.cwd(), "types/game/index.ts");
  const content = await fs.readFile(typesPath, "utf-8");

  // Find the GameId type and add the new game
  const gameIdRegex =
    /export type GameId = "([^"]+)" \| "([^"]+)" \| "([^"]+)" \| "([^"]+)" \| "([^"]+)"/;
  const match = content.match(gameIdRegex);

  if (match) {
    const existingGames = match.slice(1);
    const newGameIdType = `export type GameId = "${existingGames.join('" | "')}" | "${gameId}"`;
    const updatedContent = content.replace(gameIdRegex, newGameIdType);
    await fs.writeFile(typesPath, updatedContent);
    console.log("✅ Updated types/game/index.ts");
  } else {
    console.warn(
      "⚠️  Could not update GameId type automatically. Please add '${gameId}' manually."
    );
  }
}

// Update utils/games/index.ts to add new game metadata
async function updateGamesIndex() {
  const gamesIndexPath = path.resolve(process.cwd(), "utils/games/index.ts");
  const content = await fs.readFile(gamesIndexPath, "utf-8");

  // Find the GAMES constant and add the new game
  const gamesRegex =
    /export const GAMES: Record<GameId, GameMetadata> = \{([^}]+)\};/s;
  const match = content.match(gamesRegex);

  if (match) {
    const gamesContent = match[1];
    const newGameEntry = `
  ${gameId}: {
    id: "${gameId}",
    name: "${gameName}",
    fullName: "${gameName}",
    shortName: "${toShortName(gameName)}",
    releaseYear: ${releaseYear},
    description: "Description for ${gameName}",
    icon: "i-game-icons-sword-wound",
    color: "${generateColorTheme(gameName)}",
    isActive: true,
  },`;

    const updatedGamesContent = gamesContent + newGameEntry;
    const updatedContent = content.replace(
      gamesRegex,
      `export const GAMES: Record<GameId, GameMetadata> = {${updatedGamesContent}};`
    );
    await fs.writeFile(gamesIndexPath, updatedContent);
    console.log("✅ Updated utils/games/index.ts");
  } else {
    console.warn(
      "⚠️  Could not update GAMES constant automatically. Please add the game metadata manually."
    );
  }
}

// Add script to package.json
async function addScriptToPackageJson() {
  const packageJsonPath = path.resolve(process.cwd(), "package.json");
  const packageJson = await fs.readJson(packageJsonPath);

  if (!packageJson.scripts["create:game"]) {
    packageJson.scripts["create:game"] =
      "ts-node --project tsconfig.scripts.json scripts/game-creation/create-game.ts";
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    console.log("✅ Added create:game script to package.json");
  }
}

// Main function to run all async operations
async function main() {
  const shortName = toShortName(gameName);
  const colorTheme = generateColorTheme(gameName);
  const gameDir = path.resolve(process.cwd(), `utils/games/${gameId}`);

  // Check if game already exists
  if (fs.existsSync(gameDir)) {
    console.error(`❌ Game directory already exists: ${gameDir}`);
    process.exit(1);
  }

  // Create game directory
  fs.mkdirSync(gameDir, { recursive: true });

  // Game data template
  const gameDataTemplate = `import type { GameData } from "~/types/game";

const ${gameId}GameData: GameData = {
  metadata: {
    id: "${gameId}",
    name: "${gameName}",
    fullName: "${gameName}",
    shortName: "${shortName}",
    releaseYear: ${releaseYear},
    description: "Description for ${gameName}",
    icon: "i-game-icons-sword-wound",
    color: "${colorTheme}",
    isActive: true,
  },
  config: {
    terminology: {
      souls: "Souls",
      level: "Level", 
      weapon: "Weapon",
      upgrade: "Upgrade",
      material: "Material",
    },
    mechanics: {
      maxLevel: 99,
      levelCap: 99,
      respecAvailable: false,
      infusionSystem: "standard",
    },
    ui: {
      levelRange: { min: 1, max: 99 },
      showRespecOption: false,
      showInfusionPaths: true,
      showRightSidebar: false,
    },
  },
  soulCosts: {
    // Add soul costs for each level
    // Example: 1: 673, 2: 689, etc.
  },
  upgradeCosts: {
    // Add upgrade costs for different paths
    // Example: "standard": { 1: 200, 2: 400, etc. }
  },
  upgradePaths: {
    // Add upgrade paths
    // Example: "standard": { maxLevel: 15, materials: ["Titanite Shard"], costs: [200, 400, ...] }
  },
  merchants: {
    // Add merchant data
    // Example: "blacksmith": { name: "Blacksmith", location: "Firelink Shrine", items: [...] }
  },
};

export default ${gameId}GameData;
`;

  try {
    // Write game data file
    fs.writeFileSync(path.join(gameDir, "index.ts"), gameDataTemplate);
    console.log(`✅ Created utils/games/${gameId}/index.ts`);

    // Update type definitions
    await updateGameTypes();

    // Update games index
    await updateGamesIndex();

    // Add script to package.json if not exists
    await addScriptToPackageJson();

    // Clear games cache to ensure new game is detected
    console.log("🔄 Clearing games cache...");
    const gamesIndexPath = path.resolve(process.cwd(), "utils/games/index.ts");
    const gamesContent = await fs.readFile(gamesIndexPath, "utf-8");
    const updatedContent = gamesContent.replace(
      "// Clear cache on module load to ensure fresh detection",
      "// Clear cache on module load to ensure fresh detection"
    );
    await fs.writeFile(gamesIndexPath, updatedContent);

    console.log("\n🎉 Game created successfully!");
    console.log(`📁 Location: ${gameDir}`);
    console.log(`🆔 Game ID: ${gameId}`);
    console.log(`🎮 Game Name: ${gameName}`);

    console.log("\nNext steps:");
    console.log(`1. Edit utils/games/${gameId}/index.ts with proper game data`);
    console.log(`2. Add soul costs, upgrade costs, and merchant data`);
    console.log(`3. Update game description and metadata`);
    console.log(
      `4. Test the game by creating a tool: npm run create:tool -- "Test Tool" ${gameId}`
    );

    console.log(
      "\n💡 Tip: The game is now available for tool creation and will appear in the games list"
    );
  } catch (error) {
    console.error("❌ Error creating game:", error);
    process.exit(1);
  }
}

// Run the main function
main().catch((error) => {
  console.error("❌ Error creating game:", error);
  process.exit(1);
});
