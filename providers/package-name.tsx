'use client';

import { PACKAGE_MANAGER } from '@/constants';
import { createContext, useContext, useState } from 'react';

type PackageNameContextType = {
  packageName: (typeof PACKAGE_MANAGER)[keyof typeof PACKAGE_MANAGER];
  setPackageName: (
    packageName: (typeof PACKAGE_MANAGER)[keyof typeof PACKAGE_MANAGER]
  ) => void;
};

const PackageNameContext = createContext<PackageNameContextType>({
  packageName: PACKAGE_MANAGER.PNPM,
  setPackageName: () => {},
});

const PackageNameProvider = ({ children }: { children: React.ReactNode }) => {
  const [packageName, setPackageName] = useState(PACKAGE_MANAGER.PNPM);

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
      'usePackageNameContext must be used within a PackageNameProvider'
    );
  }

  return context;
};

export { PackageNameProvider, usePackageNameContext };
