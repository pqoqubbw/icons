import { getIcons } from "@/actions/get-icons";
import { CliBlock } from "@/components/cli-block";
import { CommentBlock } from "@/components/comment";
import { IconsList } from "@/components/list";
import { LINK } from "@/constants";

const Home = () => {
  const icons = getIcons();

  return (
    <section className="mx-auto mt-[60px] flex w-full flex-col items-center justify-center">
      <h1 className="px-4 text-center font-sans text-[32px] min-[640px]:text-[42px]">
        Beautifully crafted <br />
        animated icons<span className="text-primary">*</span>
      </h1>
      <p className="mt-5 max-w-[582px] px-4 text-center font-mono text-secondary text-sm">
        an open-source (
        <a
          className="underline underline-offset-3 transition-[decoration-color] duration-100 focus-within:outline-offset-0 hover:decoration-primary focus-visible:outline-1 focus-visible:outline-primary"
          href={`${LINK.GITHUB}/blob/main/LICENSE`}
          rel="noopener noreferrer"
          tabIndex={0}
          target="_blank"
        >
          MIT License
        </a>
        ) collection of smooth animated icons for your projects. feel free to
        use them, share your feedback, and let&apos;s make this library awesome
        together
      </p>
      <p className="mt-4 font-mono text-secondary text-xs min-[640px]:text-sm">
        Crafted with{" "}
        <a
          className="bg-[#E5E5E5] px-2 py-0.5 text-primary focus-within:outline-offset-1 focus-visible:outline-1 focus-visible:outline-primary dark:bg-[#262626]"
          href={LINK.MOTION}
          rel="noopener noreferrer"
          tabIndex={0}
          target="_blank"
        >
          Motion
        </a>{" "}
        &{" "}
        <a
          className="bg-[#E5E5E5] px-2 py-0.5 text-primary focus-within:outline-offset-1 focus-visible:outline-1 focus-visible:outline-primary dark:bg-[#262626]"
          href={LINK.LUCIDE}
          rel="noopener noreferrer"
          tabIndex={0}
          target="_blank"
        >
          Lucide
        </a>
      </p>
      <CliBlock icons={icons.filter((icon) => icon.name.length <= 20)} />
      <CommentBlock />
      <IconsList icons={icons} />
    </section>
  );
};

export default Home;
