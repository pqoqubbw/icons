import { cacheLife } from "next/cache";
import { SITE } from "@/constants";

const buildManifest = async () => {
  "use cache";
  cacheLife("max");

  return {
    skills: [
      {
        name: SITE.NAME,
        description: `Install and use animated React icons from ${SITE.URL}`,
        url: `${SITE.URL}/skill.md`,
      },
    ],
  };
};

export async function GET() {
  return Response.json(await buildManifest(), {
    headers: {
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
