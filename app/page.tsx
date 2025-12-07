import { getIcons } from '@/actions/get-icons';
import { CliBlock } from '@/components/cli-block';
import { IconsList } from '@/components/list';

const Home = () => {
  const icons = getIcons();

  return (
    <section className="mx-auto mt-[60px] flex w-full flex-col items-center justify-center">
      <h1 className="px-4 text-center font-sans text-[32px] min-[640px]:text-[42px]">
        Beautifully crafted <br />
        animated icons<span className="text-primary">*</span>
      </h1>
      <p className="text-secondary mt-5 max-w-[582px] px-4 text-center font-mono text-sm">
        an open-source (
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={0}
          className="hover:decoration-primary focus-visible:outline-primary underline underline-offset-3 transition-[decoration-color] duration-50 focus-within:outline-offset-0 focus-visible:outline-1"
        >
          MIT License
        </a>
        ) collection of smooth animated icons for your projects. feel free to
        use them, share your feedback, and let's make this library awesome
        together
      </p>
      <p className="text-secondary mt-4 font-mono text-xs min-[640px]:text-sm">
        Crafted with{' '}
        <a
          href="https://motion.dev"
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={0}
          className="focus-visible:outline-primary text-primary bg-[#E5E5E5] px-2 py-0.5 focus-within:outline-offset-1 focus-visible:outline-1 dark:bg-[#262626]"
        >
          Motion
        </a>{' '}
        &{' '}
        <a
          href="https://lucide.dev"
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={0}
          className="focus-visible:outline-primary text-primary bg-[#E5E5E5] px-2 py-0.5 focus-within:outline-offset-1 focus-visible:outline-1 dark:bg-[#262626]"
        >
          Lucide
        </a>
      </p>
      <CliBlock icons={icons.filter((icon) => icon.name.length <= 20)} />
      <IconsList icons={icons} />
    </section>
  );
};

export default Home;
