import { cacheLife, cacheTag } from "next/cache";
import { getIcons } from "@/actions/get-icons";
import { SITE } from "@/constants";
import { kebabToPascalCase } from "@/lib/kebab-to-pascal";
import { SERVER_EVENT, trackServer } from "@/lib/server-analytics";

const buildIconsIndex = async () => {
  "use cache";
  cacheLife("max");
  cacheTag("icons");

  const icons = getIcons();

  const iconLinks = icons
    .map((icon) => {
      const pascal = kebabToPascalCase(icon.name);
      return `- [${pascal}](${SITE.URL}/icons/${icon.name}.md)`;
    })
    .join("\n");

  return `# ${SITE.NAME} — icons index

> Per-icon markdown links for all ${icons.length} animated icons. Up one level: ${SITE.URL}/llms.txt

## Icons

${iconLinks}
`;
};

export async function GET(req: Request) {
  trackServer(SERVER_EVENT.LLMS_VIEW, {
    page: "icons/llms.txt",
    userAgent: req.headers.get("user-agent") ?? "",
  });

  return new Response(await buildIconsIndex(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=0, must-revalidate",
    },
  });
}
