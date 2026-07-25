import fs from "node:fs";
import path from "node:path";
import { components } from "./registry-components";

const ICONS_DIR = path.join(process.cwd(), "icons");
const PUBLIC_R_DIR = path.join(process.cwd(), "public", "r");
const ROOT_REGISTRY_PATH = path.join(process.cwd(), "registry.json");

const TSX_RE = /\.tsx$/;
const JSON_RE = /\.json$/;

const getIconNames = (): string[] =>
  fs
    .readdirSync(ICONS_DIR)
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => file.replace(TSX_RE, ""))
    .sort((a, b) => a.localeCompare(b));

const report = (label: string, items: string[]): boolean => {
  if (items.length === 0) {
    return false;
  }

  console.log(`❌ ${label}:`);
  for (const item of items) {
    console.log(`  - ${item}`);
  }
  console.log("");

  return true;
};

const checkRegistry = () => {
  console.log("🔍 Checking registry integrity...");

  const iconNames = getIconNames();
  const iconNameSet = new Set(iconNames);
  const componentNames = components.map((component) => component.name);
  const componentNameSet = new Set(componentNames);

  console.log(`   Total icon files (.tsx): ${iconNames.length}`);
  console.log(`   Total registry components: ${componentNames.length}`);

  const duplicates = [
    ...new Set(
      componentNames.filter(
        (name, index) => componentNames.indexOf(name) !== index
      )
    ),
  ];

  const missingComponents = iconNames.filter(
    (name) => !componentNameSet.has(name)
  );
  const staleComponents = componentNames.filter(
    (name) => !iconNameSet.has(name)
  );

  const jsonFiles = fs.existsSync(PUBLIC_R_DIR)
    ? fs
        .readdirSync(PUBLIC_R_DIR)
        .filter((file) => file.endsWith(".json") && file !== "registry.json")
        .map((file) => file.replace(JSON_RE, ""))
    : [];
  const jsonSet = new Set(jsonFiles);

  const missingJson = componentNames.filter((name) => !jsonSet.has(name));
  const orphanJson = jsonFiles.filter((name) => !componentNameSet.has(name));

  const staleContent: string[] = [];
  for (const name of componentNames) {
    const jsonPath = path.join(PUBLIC_R_DIR, `${name}.json`);
    const iconPath = path.join(ICONS_DIR, `${name}.tsx`);

    if (!(fs.existsSync(jsonPath) && fs.existsSync(iconPath))) {
      continue;
    }

    const item = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    const source = fs.readFileSync(iconPath, "utf8");

    if (item.files?.[0]?.content !== source) {
      staleContent.push(name);
    }
  }

  const rootRegistry = JSON.parse(fs.readFileSync(ROOT_REGISTRY_PATH, "utf8"));
  const rootNames = new Set<string>(
    rootRegistry.items.map((item: { name: string }) => item.name)
  );
  const missingInRoot = componentNames.filter((name) => !rootNames.has(name));
  const staleInRoot = [...rootNames].filter(
    (name) => !componentNameSet.has(name)
  );

  const failures = [
    report("DUPLICATE REGISTRY COMPONENTS", duplicates),
    report("ICONS MISSING FROM REGISTRY", missingComponents),
    report("REGISTRY ENTRIES WITHOUT AN ICON FILE", staleComponents),
    report("MISSING public/r JSON", missingJson),
    report("ORPHANED public/r JSON", orphanJson),
    report("STALE public/r JSON (source changed)", staleContent),
    report("MISSING FROM registry.json", missingInRoot),
    report("STALE ENTRIES IN registry.json", staleInRoot),
  ];

  if (failures.some(Boolean)) {
    console.log("💡 Run `pnpm gen-cli` to fix these.\n");
    process.exit(1);
  }

  console.log("✅ Registry is consistent\n");
};

checkRegistry();
