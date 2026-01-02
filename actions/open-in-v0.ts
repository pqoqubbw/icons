"use server";

import { SITE } from "@/constants";
import { getIconForV0 } from "@/helpers/get-icon-for-v0";

export async function openInV0Action(name: string) {
  try {
    const template = await getIconForV0(name);

    if (!template) {
      throw new Error(`Icon ${name} not found.`);
    }

    const payload = {
      ...template,
      meta: {
        project: SITE.NAME,
        author: SITE.AUTHOR.NAME,
        url: SITE.URL,
      },
      source: {
        title: SITE.NAME,
        url: SITE.URL,
        file: `${name}.tsx`,
      },
    };

    const response = await fetch("https://v0.dev/chat/api/templates/open", {
      method: "POST",
      body: JSON.stringify({
        version: 3,
        template: payload,
      }),
      headers: {
        "x-v0-edit-secret": process.env.V0_API_KEY ?? "",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("Unauthorized");
      }

      console.error(
        "Eror fetching /api/templates/open:",
        await response.text()
      );

      throw new Error("Something went wrong. Please try again later.");
    }

    const result = await response.json();

    return {
      error: null,
      url: result.url,
    };
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return { error: error.message, url: null };
    }

    return { error: "Something went wrong. Please try again later.", url: "" };
  }
}
