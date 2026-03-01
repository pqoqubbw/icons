import { PACKAGE_MANAGER } from "@/constants";

const getPackageManagerPrefix = (
  packageManager: (typeof PACKAGE_MANAGER)[keyof typeof PACKAGE_MANAGER]
) => {
  switch (packageManager) {
    case PACKAGE_MANAGER.PNPM:
      return "pnpm dlx";
    case PACKAGE_MANAGER.NPM:
      return "npx";
    case PACKAGE_MANAGER.YARN:
      return "npx";
    case PACKAGE_MANAGER.BUN:
      return "bunx --bun";
    case PACKAGE_MANAGER.FLUTTER:
      return "flutter pub add";
    default:
      return "npx";
  }
};

const isFlutter = (
  packageManager: (typeof PACKAGE_MANAGER)[keyof typeof PACKAGE_MANAGER]
) => packageManager === PACKAGE_MANAGER.FLUTTER;

export { getPackageManagerPrefix, isFlutter };
