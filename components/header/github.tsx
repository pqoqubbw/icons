import Link from 'next/link';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { ArrowUpRight, Star } from 'lucide-react';

import { LINK } from '@/constants';
import { Button } from '../ui/button';
import { CountUpNumber } from './count-up-number';

const getGithubStars = async () => {
  try {
    if (!process.env.GITHUB_TOKEN && process.env.NODE_ENV === 'development') {
      return 0;
    }

    const res = await fetch('https://api.github.com/repos/pqoqubbw/icons', {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    if (!res.ok) {
      return 0;
    }

    const data = await res.json();

    return data.stargazers_count || 0;
  } catch (error) {
    console.error('Failed to fetch GitHub stars:', error);
    return 0;
  }
};

async function HeaderGithub() {
  const stars = await getGithubStars();

  return (
    <Button variant="outline" asChild className="min-w-[150px]">
      <Link
        href={LINK.GITHUB}
        target="_blank"
        className="flex items-center !justify-between"
      >
        <GitHubLogoIcon className="mr-1 ml-1" />
        {stars > 0 ? (
          <div className="flex items-center gap-1">
            <Star className="size-3!" fill="#e3b341" stroke="#e3b341" />
            <CountUpNumber number={stars} />
          </div>
        ) : (
          'check repo'
        )}
        <ArrowUpRight className="text-muted-foreground h-4 w-4" />
      </Link>
    </Button>
  );
}

export { HeaderGithub };
