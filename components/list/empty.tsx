const ListEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-20">
      <h3 className="text-lg">No icons found</h3>
      <p className="text-xs text-muted-foreground max-w-[350px] text-center text-pretty">
        We couldn&apos;t find any icons matching your search. Try different
        keywords.
      </p>
    </div>
  );
};

export { ListEmpty };
