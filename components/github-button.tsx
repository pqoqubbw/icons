import { unstable_cache } from 'next/cache';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

import { LINK } from '@/constants';

const DEFAULT_STARS = 6077;
const CACHE_TIME = 86400; // 1 day

const fetchGithubStars = async (): Promise<number> => {
  try {
    const res = await fetch('https://api.github.com/repos/pqoqubbw/icons', {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    if (!res.ok) {
      return DEFAULT_STARS;
    }

    const data = await res.json();

    return data.stargazers_count < DEFAULT_STARS
      ? DEFAULT_STARS
      : data.stargazers_count;
  } catch (error) {
    console.error('Failed to fetch GitHub stars:', error);
    return DEFAULT_STARS;
  }
};

const getGithubStars = unstable_cache(fetchGithubStars, ['github-stars'], {
  revalidate: CACHE_TIME,
});

const GithubStartsButton = async () => {
  const stars =
    process.env.NODE_ENV === 'production'
      ? await getGithubStars()
      : DEFAULT_STARS;

  return (
    <a
      href={LINK.GITHUB}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Star on GitHub (${stars.toLocaleString()} stars)`}
      tabIndex={0}
      className="focus-visible:outline-primary group/github-stars flex items-center gap-2 bg-white px-2.5 py-2 focus-within:outline-offset-2 focus-visible:outline-1 dark:bg-white/10"
    >
      <GitHubLogoIcon className="size-4" aria-hidden="true" />
      <span
        className="font-sans text-sm tracking-[-0.4px] text-black tabular-nums [text-shadow:-0.1px_0_0_currentColor,0.1px_0_0_currentColor] dark:text-white"
        aria-hidden="true"
      >
        {stars.toLocaleString()}
      </span>
      <svg
        aria-hidden="true"
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-neutral-400 transition-colors duration-100 group-hover/github-stars:text-[#e3b341]"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.45803 2.89654e-06C6.6061 0.000101587 6.75082 0.0440267 6.87397 0.126243C6.99712 0.208458 7.09317 0.325286 7.15003 0.462003L8.56003 3.855L12.224 4.148C12.3717 4.15988 12.5125 4.2152 12.6287 4.30699C12.7449 4.39878 12.8314 4.52293 12.8772 4.66379C12.923 4.80464 12.926 4.9559 12.8859 5.09849C12.8459 5.24108 12.7645 5.36861 12.652 5.465L9.86103 7.855L10.714 11.43C10.7483 11.574 10.7392 11.725 10.6878 11.8638C10.6364 12.0027 10.5451 12.1233 10.4253 12.2103C10.3056 12.2973 10.1627 12.347 10.0148 12.353C9.86685 12.359 9.72045 12.3211 9.59403 12.244L6.45603 10.33L3.32103 12.245C3.19461 12.3221 3.04821 12.36 2.90027 12.354C2.75234 12.348 2.60949 12.2983 2.48972 12.2113C2.36996 12.1243 2.27864 12.0037 2.22726 11.8649C2.17589 11.726 2.16676 11.575 2.20103 11.431L3.05303 7.857L0.263028 5.467C0.150277 5.37074 0.0685828 5.24323 0.028266 5.10056C-0.0120509 4.9579 -0.00918217 4.80648 0.0365099 4.66545C0.082202 4.52441 0.168667 4.40008 0.284984 4.30816C0.401301 4.21624 0.54225 4.16086 0.690028 4.149L4.35303 3.856L5.76303 0.463003C5.81993 0.325626 5.91638 0.208264 6.04013 0.125824C6.16387 0.0433847 6.30933 -0.000410263 6.45803 2.89654e-06Z"
          fill="currentColor"
        />
      </svg>
    </a>
  );
};

export { GithubStartsButton };
