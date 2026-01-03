"use server";

import { promises as fs } from "node:fs";
import path from "node:path";

const ICONS_DIRECTORY = "icons";

export async function getIconContent(name: string): Promise<string> {
  const iconsDir = path.join(process.cwd(), ICONS_DIRECTORY);
  const content = await fs.readFile(
    path.join(iconsDir, `${name}.tsx`),
    "utf-8"
  );
  return content;
}
