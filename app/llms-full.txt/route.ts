import { cacheLife, cacheTag } from "next/cache";
import { LINK, SITE } from "@/constants";
import { ICON_LIST } from "@/icons";
import { kebabToPascalCase } from "@/lib/kebab-to-pascal";
import { SERVER_EVENT, trackServer } from "@/lib/server-analytics";

const buildLlmsFullTxt = async () => {
  "use cache";
  cacheLife("max");
  cacheTag("icons");

  const iconLines = ICON_LIST.map((icon) => {
    const pascal = kebabToPascalCase(icon.name);
    return `- \`${icon.name}\` → \`${pascal}\` — ${icon.keywords.slice(0, 5).join(", ")}`;
  }).join("\n");

  return `# ${SITE.NAME} — full documentation

> ${SITE.DESCRIPTION.SHORT}

This file is the complete corpus of every icon in ${SITE.NAME}, suitable for ingestion by long-context agents. Per-icon details (install command, usage snippet, keywords, similar icons) are reachable at \`/icons/<icon-name>.md\` — for example ${SITE.URL}/icons/activity.md

Site: ${SITE.URL}
Repo: ${LINK.GITHUB}
License: MIT (${LINK.LICENSE})
Author: ${SITE.AUTHOR.TWITTER} — ${LINK.TWITTER}

# About

${SITE.DESCRIPTION.LONG}

Built with React, TypeScript, [Motion](${LINK.MOTION}) for animations, and based on [Lucide](${LINK.LUCIDE}) icon designs.

# Installation

Install any single icon via the shadcn CLI. The example below installs \`activity\`; swap it for any kebab-case name from the icons list below:

\`\`\`bash
npx shadcn@latest add "${SITE.URL}/r/activity.json"
\`\`\`

The CLI drops \`components/icons/<icon-name>.tsx\` into the consumer project and adds \`motion\` to dependencies if missing. Supported package managers: npm, pnpm, yarn, bun.

# Usage

Each icon is a React component that animates on hover. All standard SVG props are forwarded — pass \`className\`, \`onClick\`, \`aria-label\`, etc. Component names follow PascalCase from the kebab-case file name (\`arrow-right\` → \`ArrowRight\`).

\`\`\`tsx
import { ArrowRight } from "@/components/icons/arrow-right";

export function Demo() {
  return <ArrowRight className="size-6" />;
}
\`\`\`

# Discovery

- Index: ${SITE.URL}/llms.txt
- Nested icons index: ${SITE.URL}/icons/llms.txt
- Skill: ${SITE.URL}/skill.md
- Per-icon page: \`/icons/<name>\` — for example ${SITE.URL}/icons/activity
- Per-icon markdown: \`/icons/<name>.md\` — for example ${SITE.URL}/icons/activity.md
- MCP server (Streamable HTTP): \`/mcp\` — tools: search_icons, list_icons, get_icon

# Ports

- Svelte: https://www.movingicons.dev/ by @jis3r
- Vue: https://imfenghuang.github.io/icons/ by @imfenghuang
- Angular: https://github.com/ajitzero/animated-icons by @ajitzero
- Flutter: https://pub.dev/packages/flutter_lucide_animated by @ravikovind

# Icons (${ICON_LIST.length} total)

Format below: \`<kebab-name>\` → \`<PascalName>\` — keywords. To install or read full docs for any icon, see Installation above or fetch \`/icons/<kebab-name>.md\`.

${iconLines}
`;
};

export async function GET(req: Request) {
  trackServer(SERVER_EVENT.LLMS_VIEW, {
    page: "llms-full.txt",
    userAgent: req.headers.get("user-agent") ?? "",
  });

  return new Response(await buildLlmsFullTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=0, must-revalidate",
    },
  });
}
