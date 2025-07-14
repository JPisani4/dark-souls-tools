// Achievement Tracker HowToUse steps (static, shared)

// Define Step type locally to avoid import errors
export interface Step {
  type: "step" | "tip";
  title: string;
  description: string;
  icon?: string;
}

const steps: Step[] = [
  {
    type: "step",
    title: "Check off requirements",
    description:
      "Check off achievement requirements as you obtain them in your current playthrough (cycle).",
  },
  {
    type: "step",
    title: "Advance to next cycle",
    description:
      "When you reach a requirement that can only be obtained in a new game cycle (e.g., boss soul weapons), click Next Cycle to move to the next cycle (NG+1, NG+2, etc.).",
  },
  {
    type: "tip",
    title: "Progress tracking",
    description:
      "Each cycle only shows requirements you have not completed in previous cycles, but your progress bar always shows your total progress.",
    icon: "i-heroicons-light-bulb",
  },
  {
    type: "tip",
    title: "Cycle navigation",
    description:
      "You can freely move back and forth between cycles to review or update your progress.",
    icon: "i-heroicons-arrow-path",
  },
  {
    type: "tip",
    title: "Persistence",
    description:
      "Progress is saved automatically and will persist between visits.",
    icon: "i-heroicons-device-phone-mobile",
  },
  {
    type: "tip",
    title: "Resetting",
    description:
      "Use the Reset buttons to clear progress for an individual achievement or all achievements and cycles.",
    icon: "i-heroicons-arrow-path",
  },
];

export default steps;
