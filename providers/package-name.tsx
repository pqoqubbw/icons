"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { PACKAGE_MANAGER, STORAGE_KEY } from "@/constants";

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
  const [packageName, setPackageNameState] = useState<PackageManager>(
    PACKAGE_MANAGER.PNPM
  );

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as PackageManager | null;
    if (stored && Object.values(PACKAGE_MANAGER).includes(stored)) {
      setPackageNameState(stored);
    }
  }, []);

  const setPackageName = useCallback((value: PackageManager) => {
    setPackageNameState(value);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, value);
    }
  }, []);


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
