const kebabToPascalCase = (str: string): string =>
  `${str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("")}Icon`;

export { kebabToPascalCase };
