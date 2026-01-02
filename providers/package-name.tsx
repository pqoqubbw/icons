"use client";

import { createContext, useContext, useState } from "react";

import { PACKAGE_MANAGER } from "@/constants";

type PackageManager = (typeof PACKAGE_MANAGER)[keyof typeof PACKAGE_MANAGER];

type PackageNameContextType = {
  packageName: PackageManager;
  setPackageName: (packageName: PackageManager) => void;
};

const PackageNameContext = createContext<PackageNameContextType>({
  packageName: PACKAGE_MANAGER.PNPM,
  setPackageName: (_packageName: PackageManager) => {
    return;
  },
});

const PackageNameProvider = ({ children }: { children: React.ReactNode }) => {
  const [packageName, setPackageName] = useState<PackageManager>(
    PACKAGE_MANAGER.PNPM
  );

  return (
    <PackageNameContext.Provider value={{ packageName, setPackageName }}>
      {children}
    </PackageNameContext.Provider>
  );
};

const usePackageNameContext = () => {
  const context = useContext(PackageNameContext);

  if (!context) {
    throw new Error(
      "usePackageNameContext must be used within a PackageNameProvider"
    );
  }

  return context;
};

export { PackageNameProvider, usePackageNameContext };
