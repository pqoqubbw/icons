import { LINK, SITE } from "@/constants";
import { SERVER_EVENT, trackServer } from "@/lib/server-analytics";

export function GET(req: Request) {
  trackServer(SERVER_EVENT.LLMS_VIEW, {
    page: "skill.md",
    userAgent: req.headers.get("user-agent") ?? "",
  });
  const content = `---
name: ${SITE.NAME}
description: Install and use animated React icons from ${SITE.URL}
---

# ${SITE.NAME} skill

> For the complete documentation index, see [llms.txt](${SITE.URL}/llms.txt). Per-icon markdown is at \`${SITE.URL}/icons/<name>.md\`. An MCP server is available at \`${SITE.URL}/mcp\`.

Use this skill when a user asks to add an animated icon to a React or Next.js project, or when they reference ${SITE.NAME}.

## Discover available icons

- Index of all icons: ${SITE.URL}/llms.txt
- Full corpus (long-context): ${SITE.URL}/llms-full.txt
- Per-icon docs: ${SITE.URL}/icons/<name>.md (replace \`<name>\` with kebab-case icon name)

Icon names follow Lucide's kebab-case convention (\`activity\`, \`arrow-right\`, \`circle-check\`, etc.).

## Install one icon

Use the shadcn CLI:

\`\`\`bash
npx shadcn@latest add "${SITE.URL}/r/<icon-name>.json"
\`\`\`

This drops a single React component file into the user's project under \`components/icons/<icon-name>.tsx\` and adds \`motion\` to dependencies if missing.

## Use the component

\`\`\`tsx
import { Activity } from "@/components/icons/activity";

export function Demo() {
  return <Activity className="size-6" />;
}
\`\`\`

The component name is the PascalCase form of the icon's kebab-case name. Components animate on hover by default. All props from \`SVGProps<SVGSVGElement>\` are forwarded, so you can pass \`className\`, \`onClick\`, \`aria-label\`, etc.

## Constraints

- Requires React 18 or newer.
- Requires \`motion\` (added automatically by the shadcn CLI when installing the first icon).
- Tailwind CSS is recommended for sizing/coloring but not required.
- MIT licensed (${LINK.LICENSE}) — free for personal and commercial use.

## MCP tools (optional)

An MCP server is available at \`${SITE.URL}/mcp\` (Streamable HTTP). Tools: \`search_icons\` (fuzzy lookup by name/keyword), \`list_icons\` (paginated list), \`get_icon\` (install command + usage snippet for one icon). Use these when you have an MCP-compatible host instead of fetching markdown.

## Common pitfalls

- Use kebab-case for the install URL (\`arrow-right\`), not PascalCase.
- The import name is PascalCase with no \`Icon\` suffix in the user's local file (e.g. \`Activity\`, not \`ActivityIcon\`).
- Hover animation only fires on devices that support \`:hover\`. For touch, the consumer can trigger animation imperatively via component refs.

## Source

- Website: ${SITE.URL}
- Repository: ${LINK.GITHUB}
- Author: ${SITE.AUTHOR.TWITTER} (${LINK.TWITTER})
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
