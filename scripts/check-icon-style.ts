import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

interface Issue {
  file: string;
  line: number;
  name: string;
  suggestion: string;
}

const UPPER_CASE_RE = /^[A-Z][A-Z0-9_]*$/;
const ICON_COMPONENT_RE = /Icon$/;
const ICON_HANDLE_RE = /IconHandle$/;
const ICON_PROPS_RE = /IconProps$/;

const toUpperSnakeCase = (name: string): string =>
  name
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .toUpperCase();

const isExempt = (name: string): boolean =>
  ICON_COMPONENT_RE.test(name) ||
  ICON_HANDLE_RE.test(name) ||
  ICON_PROPS_RE.test(name);

const findConstDeclarations = (
  content: string
): Array<{ name: string; line: number }> => {
  const results: Array<{ name: string; line: number }> = [];
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const constMatch = line.match(
      // biome-ignore lint/performance/useTopLevelRegex: ignore
      /^(?:export\s+)?const\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*(?::\s*[^=]+)?\s*=/
    );

    if (constMatch) {
      results.push({ name: constMatch[1], line: i + 1 });
    }
  }

  return results;
};

const checkFile = (filePath: string, fileName: string): Issue[] => {
  const content = readFileSync(filePath, "utf-8");
  const issues: Issue[] = [];

  const declarations = findConstDeclarations(content);

  for (const { name, line } of declarations) {
    if (isExempt(name)) continue;
    if (UPPER_CASE_RE.test(name)) continue;

    issues.push({
      file: fileName,
      line,
      name,
      suggestion: toUpperSnakeCase(name),
    });
  }

  return issues;
};

const fixFile = (filePath: string, issues: Issue[]): boolean => {
  if (issues.length === 0) return false;

  let content = readFileSync(filePath, "utf-8");

  for (const issue of issues) {
    const wordBoundaryRe = new RegExp(`\\b${issue.name}\\b`, "g");
    content = content.replace(wordBoundaryRe, issue.suggestion);
  }

  writeFileSync(filePath, content, "utf-8");
  return true;
};

const run = () => {
  const shouldFix = process.argv.includes("--fix");
  const iconsDir = join(process.cwd(), "icons");
  const files = readdirSync(iconsDir).filter((f) => f.endsWith(".tsx"));

  console.log("🔍 Checking icon style (UPPER_CASE constants)...\n");

  const allIssues: Issue[] = [];

  for (const file of files) {
    const filePath = join(iconsDir, file);
    const issues = checkFile(filePath, file);

    if (issues.length > 0) {
      if (shouldFix) {
        fixFile(filePath, issues);
        console.log(`  ✅ Fixed: icons/${file}`);
        for (const issue of issues) {
          console.log(`     ${issue.name} → ${issue.suggestion}`);
        }
      } else {
        allIssues.push(...issues);
      }
    }
  }

  if (!shouldFix && allIssues.length > 0) {
    console.log("❌ Found non-UPPER_CASE constants:\n");
    for (const issue of allIssues) {
      console.log(
        `  icons/${issue.file}:${issue.line} - "${issue.name}" should be "${issue.suggestion}"`
      );
    }
    console.log("\n💡 Run with --fix to auto-fix these issues.\n");
    process.exit(1);
  }

  if (shouldFix) {
    console.log("\n✅ Fixed all files.");
  } else {
    console.log("✅ All constants are UPPER_CASE.\n");
  }
};

run();
