const ListEmpty = () => {
  return (
    <div className="mt-20 flex w-full flex-col items-center justify-center">
      <h3 className="text-lg">No icons found</h3>
      <p className="text-muted-foreground max-w-[350px] text-center text-xs text-pretty">
        We couldn&apos;t find any icons matching your search. Try different
        keywords.
      </p>
    </div>
  );
};

export { ListEmpty };
