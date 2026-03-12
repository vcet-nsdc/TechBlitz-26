export const problemStatements = {
  vibecoding: {
    title: "Vibe Coding Challenge",
    statement: "Build a fully functional web application that solves a real-world problem using AI-assisted development tools. Your solution must demonstrate creative use of modern web technologies and be deployable.",
    requirements: [
      "Working demo",
      "Clean codebase", 
      "README with setup instructions"
    ],
    timeLimit: "24 hours"
  },
  agenticai: {
    title: "Agentic AI Challenge", 
    statement: "Design and build an autonomous AI agent that can complete multi-step tasks with minimal human intervention. The agent should demonstrate reasoning, tool use, and adaptive decision-making.",
    requirements: [
      "Agent architecture diagram",
      "Working prototype", 
      "Demo video"
    ],
    timeLimit: "24 hours"
  },
  uiux: {
    title: "UI/UX Design Challenge",
    statement: "Redesign the onboarding experience for a fintech application targeting first-time users in Tier 2 and Tier 3 Indian cities. Focus on accessibility, simplicity, and trust-building.",
    requirements: [
      "User research summary",
      "Wireframes", 
      "High-fidelity Figma prototype"
    ],
    timeLimit: "24 hours"
  }
} as const;

export type Domain = keyof typeof problemStatements;
export type ProblemStatement = typeof problemStatements[Domain];
