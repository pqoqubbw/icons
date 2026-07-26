import fs from "node:fs";
import path from "node:path";

const ICONS_DIR = path.join(process.cwd(), "icons");
const INDEX_PATH = path.join(ICONS_DIR, "index.ts");

const LIST_START = "const ICON_LIST: IconListItem[] = [";
const LIST_END = "].sort((a, b) => a.name.localeCompare(b.name));";

const TSX_RE = /\.tsx$/;
const ICON_IMPORT_RE =
  /^import\s+\{\s*(\w+)\s*\}\s+from\s+["'](?:@\/icons\/|\.\/)([^"']+)["'];?$/;
const ENTRY_NAME_RE = /name:\s*["']([^"']+)["']/;
const EXPORT_RE = /export\s*\{\s*(\w+Icon)\s*\}/;

type Entry = {
  name: string;
  source: string;
};

type ImportSync = {
  lines: string[];
  added: string[];
  removed: string[];
};

type EntrySync = {
  entries: Entry[];
  added: string[];
  removed: string[];
  duplicates: string[];
};

const getIconNames = (): string[] =>
  fs
    .readdirSync(ICONS_DIR)
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => file.replace(TSX_RE, ""))
    .sort((a, b) => a.localeCompare(b));

const getComponentName = (iconName: string): string => {
  const source = fs.readFileSync(
    path.join(ICONS_DIR, `${iconName}.tsx`),
    "utf8"
  );
  const match = source.match(EXPORT_RE);

  if (!match) {
    throw new Error(
      `icons/${iconName}.tsx has no \`export { XxxIcon }\` — cannot register it.`
    );
  }

  return match[1];
};

const getKeywords = (iconName: string): string[] => {
  const parts = iconName.split("-").filter((part) => part.length > 1);
  return parts.length > 0 ? parts : [iconName];
};

const findImportIndexes = (lines: string[]): number[] =>
  lines
    .map((line, index) => (ICON_IMPORT_RE.test(line) ? index : -1))
    .filter((index) => index !== -1);

/**
 * Splits the ICON_LIST body into its top-level object literals. Entries only
 * ever contain string literals without braces, so brace counting is enough.
 */
const splitEntries = (body: string): string[] => {
  const entries: string[] = [];
  let depth = 0;
  let start = -1;

  for (let i = 0; i < body.length; i++) {
    const char = body[i];

    if (char === "{") {
      if (depth === 0) {
        start = i;
      }
      depth++;
    } else if (char === "}") {
      depth--;
      if (depth === 0 && start !== -1) {
        entries.push(body.slice(start, i + 1));
        start = -1;
      }
    }
  }

  return entries;
};

const renderEntry = (iconName: string, component: string): string => {
  const keywords = getKeywords(iconName)
    .map((keyword) => `"${keyword}"`)
    .join(", ");

  return `{
    name: "${iconName}",
    icon: ${component},
    keywords: [${keywords}],
  }`;
};

const syncImports = (
  lines: string[],
  indexes: number[],
  iconNames: string[]
): ImportSync => {
  const iconNameSet = new Set(iconNames);
  const seen = new Set<string>();
  const kept: string[] = [];
  const removed: string[] = [];
  const added: string[] = [];

  for (const index of indexes) {
    const match = lines[index].match(ICON_IMPORT_RE) as RegExpMatchArray;
    const iconName = match[2];

    if (iconNameSet.has(iconName) && !seen.has(iconName)) {
      seen.add(iconName);
      kept.push(lines[index]);
    } else {
      removed.push(iconName);
    }
  }

  for (const iconName of iconNames) {
    if (seen.has(iconName)) {
      continue;
    }

    kept.push(`import { ${getComponentName(iconName)} } from "./${iconName}";`);
    added.push(iconName);
  }

  return { lines: kept, added, removed };
};

const syncEntries = (body: string, iconNames: string[]): EntrySync => {
  const iconNameSet = new Set(iconNames);
  const seen = new Set<string>();
  const entries: Entry[] = [];
  const removed: string[] = [];
  const duplicates: string[] = [];
  const added: string[] = [];

  for (const source of splitEntries(body)) {
    const match = source.match(ENTRY_NAME_RE);

    if (!match) {
      throw new Error(
        `Found an ICON_LIST entry without a \`name\` field:\n${source}`
      );
    }

    const name = match[1];

    if (!iconNameSet.has(name)) {
      removed.push(name);
    } else if (seen.has(name)) {
      duplicates.push(name);
    } else {
      seen.add(name);
      entries.push({ name, source });
    }
  }

  for (const iconName of iconNames) {
    if (seen.has(iconName)) {
      continue;
    }

    entries.push({
      name: iconName,
      source: renderEntry(iconName, getComponentName(iconName)),
    });
    added.push(iconName);
  }

  return { entries, added, removed, duplicates };
};

const printSummary = (imports: ImportSync, entries: EntrySync) => {
  for (const name of imports.added) {
    console.log(`   + import ${name}`);
  }
  for (const name of imports.removed) {
    console.log(`   - import ${name} (icon file missing or duplicate)`);
  }
  for (const name of entries.added) {
    console.log(`   + ICON_LIST entry ${name} (keywords auto-generated)`);
  }
  for (const name of entries.removed) {
    console.log(`   - ICON_LIST entry ${name} (icon file no longer exists)`);
  }
  for (const name of entries.duplicates) {
    console.log(`   ~ ICON_LIST duplicate ${name} removed`);
  }

  if (entries.added.length > 0) {
    console.log(
      `\n⚠️  Auto-generated keywords for ${entries.added.length} icon(s). Refine them in icons/index.ts for better search results.`
    );
  }
};

const syncIndex = () => {
  console.log("🔄 Syncing icons/index.ts...");

  const iconNames = getIconNames();
  const content = fs.readFileSync(INDEX_PATH, "utf8");

  const listStart = content.indexOf(LIST_START);
  const listEnd = content.indexOf(LIST_END);

  if (listStart === -1 || listEnd === -1) {
    throw new Error(
      "Could not locate the ICON_LIST array in icons/index.ts — the anchors in sync-index.ts are out of date."
    );
  }

  const lines = content.split("\n");
  const importIndexes = findImportIndexes(lines);

  if (importIndexes.length === 0) {
    throw new Error("Could not locate icon imports in icons/index.ts.");
  }

  const imports = syncImports(lines, importIndexes, iconNames);
  const entries = syncEntries(
    content.slice(listStart + LIST_START.length, listEnd),
    iconNames
  );

  const nextBody = `\n${entries.entries
    .map((entry) => `  ${entry.source},`)
    .join("\n")}\n`;

  const withNextList =
    content.slice(0, listStart) +
    LIST_START +
    nextBody +
    content.slice(listEnd);

  const nextLines = withNextList.split("\n");
  const nextIndexes = findImportIndexes(nextLines);

  const nextContent = [
    ...nextLines.slice(0, nextIndexes[0]),
    ...imports.lines,
    ...nextLines.slice((nextIndexes.at(-1) as number) + 1),
  ].join("\n");

  const changed = nextContent !== content;

  if (changed) {
    fs.writeFileSync(INDEX_PATH, nextContent);
  }

  printSummary(imports, entries);

  console.log(
    `${changed ? "✅ icons/index.ts synced" : "✅ icons/index.ts up to date"} (${entries.entries.length} icons)\n`
  );
};

syncIndex();
