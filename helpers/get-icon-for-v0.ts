import { promises as fs } from 'fs';
import path from 'path';

const getIconForV0 = async (name: string) => {
  try {
    const iconData =
      process.env.NODE_ENV === 'development'
        ? JSON.parse(
            await fs.readFile(
              path.join(process.cwd(), 'public', 'c', `${name}.json`),
              'utf-8'
            )
          )
        : await (
            await fetch(`https://icons.pqoqubbw.dev/c/${name}.json`)
          ).json();

    const componentName = name
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    const iconName = `${componentName}Icon`;

    const template = {
      name,
      type: 'registry:component',
      title: name,
      source: {
        title: 'pqoqubbw/icons',
        url: 'https://icons.pqoqubbw.dev',
        file: `${name}.tsx`,
      },
      registryDependencies: iconData.registryDependencies || [],
      files: [
        {
          path: 'page.tsx',
          content:
            `import { ${iconName} } from "@/components/${name}"\n\n` +
            'export default function Page() {\n' +
            '  return (\n' +
            '    <div className="flex min-h-svh items-center justify-center">\n' +
            `      <${iconName} />\n` +
            '    </div>\n' +
            '  )\n' +
            '}\n',
          type: 'registry:page',
          target: 'app/page.tsx',
        },
        {
          path: 'layout.tsx',
          content:
            `import type { Metadata } from 'next'\n` +
            `import { Geist } from 'next/font/google'\n\n` +
            'const geist = Geist({\n' +
            `  subsets: ['latin'],\n` +
            `  variable: '--font-sans',\n` +
            '})\n\n' +
            'export const metadata: Metadata = {\n' +
            `  title: '${name} Icon',\n` +
            `  description: 'Animated ${name} icon component from pqoqubbw/icons',\n` +
            '}\n\n' +
            'export default function RootLayout({\n' +
            '  children,\n' +
            '}: Readonly<{\n' +
            '  children: React.ReactNode\n' +
            '}>) {\n' +
            '  return (\n' +
            '    <html lang="en">\n' +
            '      <body className={`${geist.variable} font-sans antialiased`}>\n' +
            '        {children}\n' +
            '      </body>\n' +
            '    </html>\n' +
            '  )\n' +
            '}\n',
          type: 'registry:page',
          target: 'app/layout.tsx',
        },
        {
          path: `components/${name}.tsx`,
          content: iconData.files[0].content,
          type: 'registry:component',
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
