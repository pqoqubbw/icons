import { getIcons } from "@/actions/get-icons";
import { LINK, SITE } from "@/constants";

export function GET() {
  const icons = getIcons();
  const iconNames = icons.map((icon) => icon.name).join(", ");

  const content = `# ${SITE.NAME}

> Beautifully crafted animated icons

${SITE.NAME} is an open-source (MIT License) collection of smooth animated icons for React projects.

## Overview

- Website: ${SITE.URL}
- GitHub: ${LINK.GITHUB}
- Author: ${SITE.AUTHOR.TWITTER} (${LINK.TWITTER})

## Tech Stack

- React components with TypeScript
- Animations powered by Motion (${LINK.MOTION})
- Based on Lucide icons (${LINK.LUCIDE})

## Installation

\`\`\`bash
npx shadcn@latest add "${SITE.URL}/r/{icon-name}.json"
\`\`\`

Replace {icon-name} with the desired icon name (kebab-case).

## Available Icons (${icons.length} total)

${iconNames}

## Usage

Each icon is a React component that animates on hover. Example:

\`\`\`tsx
import { Activity } from '@/components/icons/activity';

export function MyComponent() {
  return <Activity className="size-6" />;
}
\`\`\`

## Ports

- Svelte: https://www.movingicons.dev/ by @jis3r
- Vue: https://imfenghuang.github.io/icons/ by @imfenghuang

## License

MIT License - free for personal and commercial use.

## Contributing

Contributions welcome! See CONTRIBUTING.md for guidelines.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
