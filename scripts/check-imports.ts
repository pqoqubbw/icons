import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

interface CheckResult {
  missingImports: string[];
  missingInList: string[];
  totalIconFiles: number;
  totalImports: number;
}

const getAllIconFiles = (): string[] => {
  const iconsDir = join(process.cwd(), "icons");
  const files = readdirSync(iconsDir);

  return files
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => file.replace(".tsx", ""))
    .sort();
};

const getImportsFromIndex = (): Set<string> => {
  const indexPath = join(process.cwd(), "icons", "index.ts");
  const content = readFileSync(indexPath, "utf-8");

  const imports = new Set<string>();

  const importRegex =
    /import\s+{\s*(\w+)\s*}\s+from\s+['"](?:@\/icons\/|\.\/)([^'"]+)['"]/g;

  let match: RegExpExecArray | null = null;
  // biome-ignore lint/suspicious/noAssignInExpressions: ignore
  while ((match = importRegex.exec(content)) !== null) {
    const fileName = match[2];
    imports.add(fileName);
  }

  return imports;
};

const getIconsUsedInList = (): Set<string> => {
  const indexPath = join(process.cwd(), "icons", "index.ts");
  const content = readFileSync(indexPath, "utf-8");

  const iconsInList = new Set<string>();

  const nameRegex = /name:\s*['"]([^'"]+)['"]/g;

  let match: RegExpExecArray | null = null;
  // biome-ignore lint/suspicious/noAssignInExpressions: ignore
  while ((match = nameRegex.exec(content)) !== null) {
    const name = match[1];
    iconsInList.add(name);
  }

  return iconsInList;
};

const checkImports = (): CheckResult => {
  const iconFiles = getAllIconFiles();
  const imports = getImportsFromIndex();
  const iconsInList = getIconsUsedInList();

  const missingImports = iconFiles.filter((file) => !imports.has(file));

  const missingInList: string[] = [];
  for (const importedFile of imports) {
    if (!iconsInList.has(importedFile)) {
      missingInList.push(importedFile);
    }
  }

  return {
    missingImports,
    missingInList,
    totalIconFiles: iconFiles.length,
    totalImports: imports.size,
  };
};

const printReport = () => {
  console.log("🔍 Checking icon imports...");

  const result = checkImports();

  console.log(`   Total icon files (.tsx): ${result.totalIconFiles}`);
  console.log(`   Total imports in index.ts: ${result.totalImports}`);

  if (result.missingImports.length > 0) {
    console.log("❌ MISSING IMPORTS:");
    result.missingImports.forEach((file) => {
      console.log(`  - icons/${file}.tsx`);
    });
    console.log("");
    process.exit(1);
  } else {
    console.log("✅ All icon files are imported");
  }
};

printReport();
