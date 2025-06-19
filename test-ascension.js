// Simple test to debug ascension chain building
const upgradePathsManifest = [
  {
    id: "regular",
    name: "Regular (+0 to +15)",
    steps: [],
  },
  {
    id: "fire",
    name: "Fire (+0 to +10)",
    ascendSteps: [
      {
        from: 5,
        to: 0,
        souls: 200,
        materials: { green_titanite_shard: 1 },
        basePath: {
          pathId: "regular",
          requiredLevel: 5,
        },
      },
    ],
    steps: [],
  },
  {
    id: "chaos",
    name: "Chaos (+0 to +5)",
    ascendSteps: [
      {
        from: 5,
        to: 0,
        souls: 200,
        materials: { green_titanite_shard: 1 },
        basePath: {
          pathId: "regular",
          requiredLevel: 5,
        },
      },
      {
        from: 5,
        to: 0,
        souls: 200,
        materials: { red_titanite_chunk: 1 },
        basePath: {
          pathId: "fire",
          requiredLevel: 5,
        },
      },
    ],
    steps: [],
  },
];

function buildFullAscensionChain(finalPathId) {
  const chain = [];

  let currentPath = upgradePathsManifest.find((p) => p.id === finalPathId);
  if (!currentPath) return chain;

  chain.push({ path: currentPath });

  while (true) {
    let foundBase = false;

    for (const path of upgradePathsManifest) {
      if (!path.ascendSteps) continue;
      for (const step of path.ascendSteps) {
        if (step.basePath?.pathId === currentPath.id) {
          chain.push({ path, ascendStep: step });
          currentPath = path;
          foundBase = true;
          break;
        }
      }
      if (foundBase) break;
    }

    if (!foundBase) break;
  }

  return chain.reverse();
}

console.log("Testing ascension chain for 'chaos':");
const chain = buildFullAscensionChain("chaos");
console.log("Chain length:", chain.length);
chain.forEach((item, index) => {
  console.log(
    `[${index}] Path: ${item.path.name}, AscendStep:`,
    item.ascendStep
      ? `${item.ascendStep.basePath.pathId} +${item.ascendStep.basePath.requiredLevel} -> ${item.path.name}`
      : "None"
  );
});
