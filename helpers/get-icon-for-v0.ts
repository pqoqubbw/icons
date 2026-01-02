/** biome-ignore-all lint/suspicious/noTemplateCurlyInString: ignore */
import { SITE } from "@/constants";

const getIconForV0 = async (name: string) => {
  try {
    const iconData = await (await fetch(`${SITE.URL}/r/${name}.json`)).json();

    const componentName = name
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("");

    const iconName = `${componentName}Icon`;

    const template = {
      name,
      type: "registry:component",
      title: name,
      source: {
        title: SITE.NAME,
        url: SITE.URL,
        file: `${name}.tsx`,
      },
      registryDependencies: iconData.registryDependencies || [],
      files: [
        {
          path: "page.tsx",
          content:
            `import { ${iconName} } from "@/components/${name}"\n\n` +
            "export default function Page() {\n" +
            "  return (\n" +
            '    <div className="flex min-h-svh items-center justify-center">\n' +
            `      <${iconName} />\n` +
            "    </div>\n" +
            "  )\n" +
            "}\n",
          type: "registry:page",
          target: "app/page.tsx",
        },
        {
          path: "layout.tsx",
          content:
            `import type { Metadata } from 'next'\n` +
            `import { Geist } from 'next/font/google'\n\n` +
            "const geist = Geist({\n" +
            `  subsets: ['latin'],\n` +
            `  variable: '--font-sans',\n` +
            "})\n\n" +
            "export const metadata: Metadata = {\n" +
            `  title: '${name} Icon',\n` +
            `  description: 'Animated ${name} icon component from lucide-animated',\n` +
            "}\n\n" +
            "export default function RootLayout({\n" +
            "  children,\n" +
            "}: Readonly<{\n" +
            "  children: React.ReactNode\n" +
            "}>) {\n" +
            "  return (\n" +
            '    <html lang="en">\n' +
            "      <body className={`${geist.variable} font-sans antialiased`}>\n" +
            "        {children}\n" +
            "      </body>\n" +
            "    </html>\n" +
            "  )\n" +
            "}\n",
          type: "registry:page",
          target: "app/layout.tsx",
        },
        {
          path: `components/${name}.tsx`,
          content: iconData.files[0].content,
          type: "registry:component",
          target: `components/${name}.tsx`,
        },
      ],
    };

    return template;
  } catch (error) {
    console.error(`Error reading registry file ${name}:`, error);
    return null;
  }
};

export { getIconForV0 };
