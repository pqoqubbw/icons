import { getIcons } from "@/actions/get-icons";
import { LINK, SITE } from "@/constants";
import { ICON_LIST } from "@/icons";
import { SUPPORT_LIST } from "@/lib/data/support-list";
import { kebabToPascalCase } from "@/lib/kebab-to-pascal";
import { SERVER_EVENT, trackServer } from "@/lib/server-analytics";

type Params = { params: Promise<{ path?: string[] }> };

const markdownResponse = (body: string) =>
  new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });

const LLMS_DIRECTIVE = `> For the complete documentation index, see [llms.txt](${SITE.URL}/llms.txt). Per-icon markdown is at \`${SITE.URL}/icons/<name>.md\`. An MCP server is available at \`${SITE.URL}/mcp\`.`;

const renderHome = () => {
  const icons = getIcons();
  return `# ${SITE.NAME}

${LLMS_DIRECTIVE}

> ${SITE.DESCRIPTION.SHORT}

Beautifully crafted animated icons — an open-source ([MIT License](${LINK.LICENSE})) collection of smooth animated icons for your projects. Feel free to use them, share your feedback, and let's make this library awesome together.

Crafted with [Motion](${LINK.MOTION}) & [Lucide](${LINK.LUCIDE}). These icons were a way to practice what the author learned from the [animations.dev](https://animations.dev) course; it really helped to understand how to turn simple transitions into the polished motion you see here.

${SITE.DESCRIPTION.LONG}

## Links

- Website: ${SITE.URL}
- GitHub: ${LINK.GITHUB}
- License: ${LINK.LICENSE}
- Author: ${SITE.AUTHOR.TWITTER} (${LINK.TWITTER})

## Tech Stack

- React components written in TypeScript
- Animations powered by [Motion](${LINK.MOTION})
- Visual design based on [Lucide](${LINK.LUCIDE})

## Installation

Install a single icon via the shadcn CLI. Replace \`<icon-name>\` with the desired icon name in kebab-case:

\`\`\`bash
npx shadcn@latest add "${SITE.URL}/r/<icon-name>.json"
\`\`\`

Supported package managers: npm, pnpm, yarn, bun. The CLI drops a single React component file into \`components/icons/<icon-name>.tsx\` and adds \`motion\` to dependencies if missing.

## Usage

\`\`\`tsx
import { Activity } from "@/components/icons/activity";

export function Demo() {
  return <Activity className="size-6" />;
}
\`\`\`

Each icon is a React component that animates on hover. All standard SVG props are forwarded — pass \`className\`, \`onClick\`, \`aria-label\`, etc. Component names are PascalCase versions of the kebab-case file name (e.g. \`arrow-right\` → \`ArrowRight\`).

## Discover

- Index of every page: ${SITE.URL}/llms.txt
- Full corpus for long-context agents: ${SITE.URL}/llms-full.txt
- Agent skill: ${SITE.URL}/skill.md
- Nested icons index: ${SITE.URL}/icons/llms.txt
- Per-icon markdown: ${SITE.URL}/icons/<name>.md

## MCP

A Model Context Protocol server is available at \`${SITE.URL}/mcp\` (Streamable HTTP). Tools: \`search_icons\`, \`list_icons\`, \`get_icon\`. Connect any MCP-compatible client (Cursor, Claude Desktop, etc.) directly to this URL.

## Ports

- Svelte: https://www.movingicons.dev/ by @jis3r
- Vue: https://imfenghuang.github.io/icons/ by @imfenghuang
- Angular: https://github.com/ajitzero/animated-icons by @ajitzero
- Flutter: https://pub.dev/packages/flutter_lucide_animated by @ravikovind

## Stats

- ${icons.length} animated icons available
- MIT licensed — free for personal and commercial use
`;
};

const renderSponsorship = () => {
  const tiers = SUPPORT_LIST.map(
    (tier) => `- $${tier.price}: ${tier.link}`
  ).join("\n");

  return `# Sponsor ${SITE.NAME}

${LLMS_DIRECTIVE}

> Support the development of ${SITE.NAME} — a free, open-source library of animated React icons.

Sponsorship is entirely optional. The library is MIT licensed and free for personal and commercial use. This page exists for those who asked for a way to give back.

## How to support

Pick any amount and complete checkout via Creem:

${tiers}

## Other ways to help

- Star or share the GitHub repo: ${LINK.GITHUB}
- Contribute new icons or fixes: ${LINK.GITHUB}/blob/main/CONTRIBUTING.md
- Reach out on X: ${SITE.AUTHOR.TWITTER}

Source page: ${SITE.URL}/sponsorship
`;
};

const findSimilarIcons = (icon: { name: string; keywords: string[] }) => {
  const currentKeywords = new Set(icon.keywords);
  return ICON_LIST.filter((i) => i.name !== icon.name)
    .map((i) => ({
      icon: i,
      score: i.keywords.filter((kw) => currentKeywords.has(kw)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((item) => item.icon);
};

const renderIcon = (slug: string) => {
  const icon = ICON_LIST.find((i) => i.name === slug);
  if (!icon) return null;

  const pascal = kebabToPascalCase(icon.name);
  const readable = icon.name.replace(/-/g, " ");
  const similar = findSimilarIcons(icon);

  const similarSection =
    similar.length > 0
      ? `\n## Similar icons\n\n${similar
          .map((i) => {
            const p = kebabToPascalCase(i.name);
            return `- [${p}](${SITE.URL}/icons/${i.name}.md)`;
          })
          .join("\n")}\n`
      : "";

  return `# ${pascal}

${LLMS_DIRECTIVE}

> Animated ${readable} icon for React — part of ${SITE.NAME}.

Source page: ${SITE.URL}/icons/${icon.name}

## Install

\`\`\`bash
npx shadcn@latest add "${SITE.URL}/r/${icon.name}.json"
\`\`\`

## Usage

\`\`\`tsx
import { ${pascal} } from "@/components/icons/${icon.name}";

export function Demo() {
  return <${pascal} className="size-6" />;
}
\`\`\`

The component animates on hover by default. All standard SVG props are forwarded.

## Keywords

${icon.keywords.map((k) => `- ${k}`).join("\n")}
${similarSection}`;
};

export async function GET(req: Request, { params }: Params) {
  const { path = [] } = await params;
  const userAgent = req.headers.get("user-agent") ?? "";

  if (path.length === 0) {
    trackServer(SERVER_EVENT.MARKDOWN_VIEW, { page: "home", userAgent });
    return markdownResponse(renderHome());
  }

  if (path.length === 1 && path[0] === "sponsorship") {
    trackServer(SERVER_EVENT.MARKDOWN_VIEW, {
      page: "sponsorship",
      userAgent,
    });
    return markdownResponse(renderSponsorship());
  }

  if (path.length === 2 && path[0] === "icons") {
    const md = renderIcon(path[1]);
    if (md) {
      trackServer(SERVER_EVENT.MARKDOWN_VIEW, {
        page: "icon",
        slug: path[1],
        userAgent,
      });
      return markdownResponse(md);
    }
  }

  return new Response("Not found", { status: 404 });
}
