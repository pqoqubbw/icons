import { cacheLife, cacheTag } from "next/cache";
import { LINK, SITE } from "@/constants";
import { ICON_LIST } from "@/icons";
import { kebabToPascalCase } from "@/lib/kebab-to-pascal";
import { SERVER_EVENT, trackServer } from "@/lib/server-analytics";

const FEATURED_ICONS = [
  "activity",
  "arrow-right",
  "bell",
  "circle-check",
  "heart",
  "settings",
  "sun",
  "trash",
];

const buildLlmsTxt = async () => {
  "use cache";
  cacheLife("max");
  cacheTag("icons");

  const featured = FEATURED_ICONS.filter((name) =>
    ICON_LIST.some((icon) => icon.name === name)
  )
    .map(
      (name) =>
        `- [${kebabToPascalCase(name)}](${SITE.URL}/icons/${name}.md): Animated ${name.replace(/-/g, " ")} icon`
    )
    .join("\n");

  return `# ${SITE.NAME}

> Open-source collection of ${ICON_LIST.length}+ beautifully crafted animated React icons based on Lucide, powered by Motion. MIT licensed and copy-paste ready.

## Docs

- [Home](${SITE.URL}/index.md): Browse all icons and copy install commands
- [Sponsorship](${SITE.URL}/sponsorship.md): Support the project
- [Contributing Guide](${LINK.GITHUB}/blob/main/CONTRIBUTING.md): How to add or improve icons
- [License (MIT)](${LINK.LICENSE}): License terms
- [GitHub Repository](${LINK.GITHUB}): Source code and issue tracker

## Skills

- [Agent Skill](${SITE.URL}/skill.md): Operating guide for installing and using icons
- [Full Documentation](${SITE.URL}/llms-full.txt): Complete corpus of every icon and usage

## Icons

- [All icons (nested index)](${SITE.URL}/icons/llms.txt): Full list of ${ICON_LIST.length} animated icons with per-icon markdown links

Featured icons:

${featured}

## MCP

A Model Context Protocol endpoint is available at \`/mcp\` (Streamable HTTP) and exposes \`search_icons\`, \`list_icons\`, and \`get_icon\` tools. Configure your MCP-compatible client to connect there directly. See [skill.md](${SITE.URL}/skill.md) for usage notes.

## Installation

Install a single icon via the shadcn CLI. The example below installs \`activity\`; swap it for any icon name in kebab-case (e.g. \`arrow-right\`):

\`\`\`bash
npx shadcn@latest add "${SITE.URL}/r/activity.json"
\`\`\`

## Usage

\`\`\`tsx
import { Activity } from "@/components/icons/activity";

export function Demo() {
  return <Activity className="size-6" />;
}
\`\`\`

Each icon is a React component that animates on hover. All standard SVG props are forwarded.

## Optional

- [Svelte port](https://www.movingicons.dev/): by @jis3r
- [Vue port](https://imfenghuang.github.io/icons/): by @imfenghuang
- [Angular port](https://github.com/ajitzero/animated-icons): by @ajitzero
- [Flutter port](https://pub.dev/packages/flutter_lucide_animated): by @ravikovind
`;
};

export async function GET(req: Request) {
  trackServer(SERVER_EVENT.LLMS_VIEW, {
    page: "llms.txt",
    userAgent: req.headers.get("user-agent") ?? "",
  });

  return new Response(await buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=0, must-revalidate",
    },
  });
}
