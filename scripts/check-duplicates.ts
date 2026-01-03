import { ICON_LIST } from "@/icons";

type DuplicateEntry = {
  name: string;
  indexes: number[];
};

type DuplicateReport = {
  duplicateNames: DuplicateEntry[];
  totalDuplicates: number;
};

const checkDuplicates = (): DuplicateReport => {
  const nameIndexes = new Map<string, number[]>();

  for (let i = 0; i < ICON_LIST.length; i++) {
    const item = ICON_LIST[i];

    const indexes = nameIndexes.get(item.name) || [];
    indexes.push(i);
    nameIndexes.set(item.name, indexes);
  }

  const duplicateNames: DuplicateEntry[] = [];
  for (const [name, indexes] of nameIndexes) {
    if (indexes.length > 1) {
      duplicateNames.push({ name, indexes });
    }
  }

  return {
    duplicateNames,
    totalDuplicates: duplicateNames.length,
  };
};

const printReport = () => {
  console.log("🔍 Checking for duplicates in ICON_LIST...");
  console.log(`   Total icons: ${ICON_LIST.length}`);

  const report = checkDuplicates();

  if (report.duplicateNames.length > 0) {
    console.log("❌ DUPLICATE NAMES FOUND:");
    for (const { name, indexes } of report.duplicateNames) {
      console.log(`   name: "${name}" - appears ${indexes.length} times`);
    }
    console.log("");
    process.exit(1);
  } else {
    console.log("✅ No duplicate names found\n");
  }
};

printReport();
