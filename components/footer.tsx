const Footer = () => {
  return (
    <footer className="mt-auto mb-6 flex w-full items-center justify-center gap-1 font-sans text-secondary text-xs">
      <span>analytics by</span>
      <a
        className="underline underline-offset-3 transition-[decoration-color] duration-100 focus-within:outline-offset-0 hover:decoration-primary focus-visible:outline-1 focus-visible:outline-primary"
        href="https://openpanel.dev"
        rel="noopener"
        tabIndex={0}
        target="_blank"
      >
        OpenPanel
      </a>
    </footer>
  );
};

export { Footer };
