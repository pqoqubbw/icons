import { getIcons } from '@/actions/get-icons';

export function GET() {
  const icons = getIcons();
  const iconNames = icons.map((icon) => icon.name).join(', ');

  const content = `# lucide-animated

> Beautifully crafted animated icons

lucide-animated is an open-source (MIT License) collection of smooth animated icons for React projects.

## Overview

- Website: https://lucide-animated.com
- GitHub: https://github.com/pqoqubbw/icons
- Author: @pqoqubbw (https://x.com/pqoqubbw)

## Tech Stack

- React components with TypeScript
- Animations powered by Motion (https://motion.dev)
- Based on Lucide icons (https://lucide.dev)

## Installation

\`\`\`bash
npx shadcn@latest add "https://lucide-animated.com/r/{icon-name}.json"
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
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
