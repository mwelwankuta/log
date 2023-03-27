import type { PackageListEntry } from "@/modules/package-list/components/sde-bar/list-item";
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

export type ContextDependencyListItem = {
  dependencies: PackageListEntry;
  devDependencies: PackageListEntry;
};

export interface PackageDependencyListContextValues {
  packageDependencyList: ContextDependencyListItem | null;
  setPackageDependencyList: Dispatch<
    SetStateAction<ContextDependencyListItem | null>
  >;
}

export const packageDependencyListContext =
  createContext<PackageDependencyListContextValues | null>(null);

export const PackageDependencyListProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [packageDependencyList, setPackageDependencyList] =
    useState<ContextDependencyListItem | null>(null);

  return (
    <packageDependencyListContext.Provider
      value={{ packageDependencyList, setPackageDependencyList }}
    >
      {children}
    </packageDependencyListContext.Provider>
  );
};
