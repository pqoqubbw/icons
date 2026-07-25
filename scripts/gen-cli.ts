import { spawnSync } from "node:child_process";

type Step = {
  title: string;
  command: string;
};

const FIX_STEPS: Step[] = [
  {
    title: "Normalizing icon constants",
    command: "tsx scripts/check-icon-style.ts --fix",
  },
  {
    title: "Syncing registry components",
    command: "tsx scripts/sync-registry.ts",
  },
  {
    title: "Syncing icons/index.ts",
    command: "tsx scripts/sync-index.ts",
  },
  {
    title: "Linting and formatting",
    command: "npx ultracite fix",
  },
  {
    title: "Building registry",
    command: "tsx scripts/registry-build.ts",
  },
  {
    title: "Formatting generated registry files",
    command: "npx ultracite fix registry.json public/r",
  },
];

const CHECK_STEPS: Step[] = [
  {
    title: "Verifying icon constants",
    command: "tsx scripts/check-icon-style.ts",
  },
  {
    title: "Verifying imports and ICON_LIST",
    command: "tsx scripts/check-imports.ts",
  },
  {
    title: "Verifying there are no duplicates",
    command: "tsx scripts/check-duplicates.ts",
  },
  {
    title: "Verifying registry integrity",
    command: "tsx scripts/check-registry.ts",
  },
  {
    title: "Verifying types",
    command: "npx tsc --noEmit",
  },
  {
    title: "Verifying lint and formatting",
    command: "npx ultracite check",
  },
];

const runStep = (step: Step, index: number, total: number) => {
  console.log(`\n[${index + 1}/${total}] ${step.title}`);
  console.log("─".repeat(60));

  const result = spawnSync(step.command, {
    shell: true,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    console.error(`\n❌ Failed: ${step.command}\n`);
    process.exit(result.status ?? 1);
  }
};

const run = () => {
  const checkOnly = process.argv.includes("--check");
  const steps = checkOnly ? CHECK_STEPS : [...FIX_STEPS, ...CHECK_STEPS];

  console.log(
    checkOnly
      ? "\n🔍 Verifying icons, index and registry...\n"
      : "\n🚀 Generating icons, index and registry...\n"
  );

  for (const [index, step] of steps.entries()) {
    runStep(step, index, steps.length);
  }

  console.log(
    checkOnly
      ? "\n✅ Everything is in sync.\n"
      : "\n✅ Everything is generated and verified.\n"
  );
};

run();
