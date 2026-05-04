import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { z } from "zod";

import { LINK, SITE } from "@/constants";
import { ICON_LIST } from "@/icons";
import { kebabToPascalCase } from "@/lib/kebab-to-pascal";
import { SERVER_EVENT, trackServer } from "@/lib/server-analytics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type IconRecord = (typeof ICON_LIST)[number];

const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun"] as const;
type PackageManager = (typeof PACKAGE_MANAGERS)[number];

const installCommand = (name: string, pm: PackageManager) => {
  const url = `${SITE.URL}/r/${name}.json`;
  const cmds: Record<PackageManager, string> = {
    npm: `npx shadcn@latest add "${url}"`,
    pnpm: `pnpm dlx shadcn@latest add "${url}"`,
    yarn: `yarn dlx shadcn@latest add "${url}"`,
    bun: `bunx --bun shadcn@latest add "${url}"`,
  };
  return cmds[pm];
};

const usageSnippet = (name: string) => {
  const pascal = kebabToPascalCase(name);
  return `import { ${pascal} } from "@/components/icons/${name}";

export function Demo() {
  return <${pascal} className="size-6" />;
}`;
};

const summarize = (icon: IconRecord) => ({
  name: icon.name,
  component: kebabToPascalCase(icon.name),
  url: `${SITE.URL}/icons/${icon.name}`,
  markdown: `${SITE.URL}/icons/${icon.name}.md`,
  registry: `${SITE.URL}/r/${icon.name}.json`,
  keywords: icon.keywords,
});

const scoreIcon = (icon: IconRecord, query: string) => {
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  const name = icon.name.toLowerCase();
  if (name === q) return 1000;
  if (name.startsWith(q)) return 500;
  if (name.includes(q)) return 200;
  const keywordHit = icon.keywords.some((k) => k.toLowerCase().includes(q));
  if (keywordHit) return 50;
  return 0;
};

const buildServer = () => {
  const server = new McpServer(
    {
      name: SITE.NAME,
      version: "1.0.0",
    },
    {
      instructions: `Tools for ${SITE.NAME} (${SITE.URL}) — a library of ${ICON_LIST.length}+ animated React icons. Use search_icons for fuzzy lookup, list_icons for browsing, and get_icon for installation details.`,
    }
  );

  server.registerTool(
    "search_icons",
    {
      title: "Search icons",
      description:
        "Fuzzy-search icons by name or keyword. Returns top matches with install URLs.",
      inputSchema: {
        query: z
          .string()
          .min(1)
          .describe("Search term, e.g. 'arrow' or 'cloud upload'"),
        limit: z.number().int().min(1).max(50).optional().default(10),
      },
    },
    ({ query, limit }) => {
      trackServer(SERVER_EVENT.MCP_TOOL_CALL, { tool: "search_icons", query });
      const matches = ICON_LIST.map((icon) => ({
        icon,
        score: scoreIcon(icon, query),
      }))
        .filter((m) => m.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit ?? 10)
        .map((m) => summarize(m.icon));

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              { query, count: matches.length, results: matches },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  server.registerTool(
    "list_icons",
    {
      title: "List icons",
      description:
        "Paginated list of all available icons. Use offset to page through results.",
      inputSchema: {
        limit: z.number().int().min(1).max(200).optional().default(50),
        offset: z.number().int().min(0).optional().default(0),
      },
    },
    ({ limit, offset }) => {
      trackServer(SERVER_EVENT.MCP_TOOL_CALL, { tool: "list_icons" });
      const start = offset ?? 0;
      const take = limit ?? 50;
      const slice = ICON_LIST.slice(start, start + take).map(summarize);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                total: ICON_LIST.length,
                offset: start,
                limit: take,
                results: slice,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  server.registerTool(
    "get_icon",
    {
      title: "Get icon details",
      description:
        "Return install command, usage snippet, keywords, and links for a single icon by kebab-case name.",
      inputSchema: {
        name: z
          .string()
          .min(1)
          .describe("Kebab-case icon name, e.g. 'arrow-right'"),
        package_manager: z.enum(PACKAGE_MANAGERS).optional().default("npm"),
      },
    },
    ({ name, package_manager }) => {
      trackServer(SERVER_EVENT.MCP_TOOL_CALL, { tool: "get_icon", name });
      const icon = ICON_LIST.find((i) => i.name === name);
      if (!icon) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Icon "${name}" not found. Use search_icons or list_icons to discover available names.`,
            },
          ],
        };
      }
      const pm = package_manager ?? "npm";
      const detail = {
        ...summarize(icon),
        install: installCommand(icon.name, pm),
        usage: usageSnippet(icon.name),
        license: `MIT — ${LINK.LICENSE}`,
      };
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(detail, null, 2),
          },
        ],
      };
    }
  );

  return server;
};

const handler = async (req: Request) => {
  const transport = new WebStandardStreamableHTTPServerTransport({});
  const server = buildServer();
  await server.connect(transport);
  const response = await transport.handleRequest(req);
  req.signal.addEventListener("abort", () => {
    transport.close().catch(() => {
      /* ignore */
    });
  });
  return response;
};

export { handler as GET, handler as POST, handler as DELETE };
