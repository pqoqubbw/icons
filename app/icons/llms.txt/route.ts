import { getIcons } from "@/actions/get-icons";
import { SITE } from "@/constants";
import { kebabToPascalCase } from "@/lib/kebab-to-pascal";
import { SERVER_EVENT, trackServer } from "@/lib/server-analytics";

export function GET(req: Request) {
  trackServer(SERVER_EVENT.LLMS_VIEW, {
    page: "icons/llms.txt",
    userAgent: req.headers.get("user-agent") ?? "",
  });
  const icons = getIcons();

  const iconLinks = icons
    .map((icon) => {
      const pascal = kebabToPascalCase(icon.name);
      return `- [${pascal}](${SITE.URL}/icons/${icon.name}.md)`;
    })
    .join("\n");

  const content = `# ${SITE.NAME} — icons index

> Per-icon markdown links for all ${icons.length} animated icons. Up one level: ${SITE.URL}/llms.txt

## Icons

${iconLinks}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
