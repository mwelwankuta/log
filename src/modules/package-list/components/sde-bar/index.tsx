import {
  packageDependencyListContext,
  PackageDependencyListContextValues,
} from "@/context/dependency-list";
import {
  installListContext,
  InstallListContextValues,
} from "@/context/install-list";
import {
  toggleSyncedContext,
  ToggleSyncedContextValue,
} from "@/context/toggle-synced";
import { addToPackageJsonFile, readPackageJsonFile } from "@/samples/node-api";
import { parseAsPackage } from "@/utils";
import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { PackageListEntry } from "./list-item";
import {
  PackageListView,
  SyncInstallListPackagesToModulesButton,
} from "./list-view";

interface Props {
  packageJsonFile: File | null;
}

export const SideBar: React.FC<Props> = ({ packageJsonFile }) => {
  const { packageDependencyList, setPackageDependencyList } = useContext(
    packageDependencyListContext
  ) as PackageDependencyListContextValues;

  const { installList, setInstallList, isInstallListEmpty } = useContext(
    installListContext
  ) as InstallListContextValues;

  const { setSynced } = useContext(
    toggleSyncedContext
  ) as ToggleSyncedContextValue;

  useEffect(() => {
    const { dependencies, devDependencies } = readPackageJsonFile(
      packageJsonFile?.path as string
    );
    setPackageDependencyList({ dependencies, devDependencies });
    return () => {
      setPackageDependencyList(null);
    };
  }, []);
  return (
    <Flex direction="column" h="100vh">
      <Box flex="1" overflowY="scroll" h="full">
        {packageDependencyList && (
          <>
            {!isInstallListEmpty && (
              <PackageListView
                title="install list"
                secondaryTitleActionComponent={
                  <InstallListHeader
                    packageJsonFile={packageJsonFile}
                    installList={installList}
                    setInstallList={setInstallList}
                    setPackageDependencyList={setPackageDependencyList}
                    toggleSynced={() => setSynced(false)}
                  />
                }
                collapsible={false}
                dependencyListActionVisible={false}
                dependencies={installList}
                isDevDependency={false}
              />
            )}
            <PackageListView
              title="dependencies"
              dependencies={packageDependencyList.dependencies}
              isDevDependency={false}
            />
            <PackageListView
              title="devDependencies"
              dependencies={packageDependencyList.devDependencies}
              isDevDependency={true}
            />
          </>
        )}
      </Box>
      <SyncInstallListPackagesToModulesButton />
    </Flex>
  );
};

interface InstallListHeaderProps
  extends Omit<InstallListContextValues, "isInstallListEmpty">,
    Omit<PackageDependencyListContextValues, "packageDependencyList"> {
  packageJsonFile: File | null;
  toggleSynced: () => void;
}
const InstallListHeader: React.FC<InstallListHeaderProps> = ({
  packageJsonFile,
  installList,
  setInstallList,
  setPackageDependencyList,
  toggleSynced,
}) => {
  return (
    <Flex gap="2">
      <Button size="sm" onClick={() => setInstallList(parseAsPackage({}))}>
        Clear
      </Button>
      <Button
        size="sm"
        colorScheme="red"
        bg="red.400"
        onClick={() => {
          const parsedInstallList = parseAsPackage(
            installList as PackageListEntry
          );
          for (const dependency of Object.entries(parsedInstallList)) {
            addToPackageJsonFile(
              dependency,
              packageJsonFile?.path as string,
              false
            );
          }
          setPackageDependencyList(
            readPackageJsonFile(packageJsonFile?.path as string)
          );
          setInstallList(parseAsPackage({}));
          toggleSynced();
        }}
      >
        Add to packages
      </Button>
    </Flex>
  );
};
