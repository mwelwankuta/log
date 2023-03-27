import { PackageListEntry } from "@/modules/package-list/components/sde-bar/list-item";
import { parseAsPackage } from "@/utils";
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export interface InstallListContextValues {
  installList: PackageListEntry;
  isInstallListEmpty: boolean;
  setInstallList: Dispatch<SetStateAction<PackageListEntry>>;
}

export const installListContext =
  createContext<InstallListContextValues | null>(null);

export const InstallListProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [installList, setInstallList] = useState<PackageListEntry>(
    () => parseAsPackage({})
    // parseAsPackage({ "merlee.js": "1.1.0", "push-repo": "1.2.0" })
  );

  const [isInstallListEmpty, setInstallListEmpty] = useState(
    () => JSON.stringify(installList) == JSON.stringify({})
  );

  useEffect(() => {
    setInstallListEmpty(JSON.stringify(installList) == JSON.stringify({}));
  }, [installList]);

  return (
    <installListContext.Provider
      value={{ installList, isInstallListEmpty, setInstallList }}
    >
      {children}
    </installListContext.Provider>
  );
};
