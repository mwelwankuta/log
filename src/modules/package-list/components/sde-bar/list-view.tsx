import {
  projectPathContext,
  ProjectPathContextValues,
} from "@/context/project-path";
import {
  toggleSyncedContext,
  ToggleSyncedContextValue,
} from "@/context/toggle-synced";
import { installPackageJsonDependencies } from "@/samples/node-api";
import { Box, Button, Divider, List, ListItem } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import type { PackageListEntry } from "./list-item";
import { PackageListItem } from "./list-item";
import { PackageListTitle } from "./list-title";

interface Props {
  title: string;
  dependencies: PackageListEntry;
  collapsible?: boolean;
  isDevDependency: boolean;
  secondaryTitleActionComponent?: JSX.Element;
  dependencyListActionVisible?: boolean;
}

export const PackageListView: React.FC<Props> = ({
  title,
  secondaryTitleActionComponent = <></>,
  dependencies,
  collapsible = true,
  dependencyListActionVisible = true,
  isDevDependency,
}) => {
  const [listVisible, setListVisible] = useState(true);

  return (
    <>
      <PackageListTitle
        title={title}
        secondaryTitleActionComponent={secondaryTitleActionComponent}
        collapsible={collapsible}
        listVisible={listVisible}
        setListVisible={setListVisible}
      />
      {listVisible == true && (
        <List>
          {Object.entries(dependencies).map(([dependency, version], indx) => (
            <>
              <ListItem key={indx} px="2">
                <PackageListItem
                  dependencyListActionVisible={dependencyListActionVisible}
                  dependency={dependency}
                  version={version}
                  isDevDependency={isDevDependency}
                  my="2"
                />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      )}
    </>
  );
};

export const SyncInstallListPackagesToModulesButton = () => {
  const { synced, setSynced } = useContext(
    toggleSyncedContext
  ) as ToggleSyncedContextValue;
  const { packageJsonFile } = useContext(
    projectPathContext
  ) as ProjectPathContextValues;

  return (
    <>
      <Divider />
      <Box p="2" gap="2">
        <Button
          size="sm"
          w="full"
          colorScheme="red"
          isDisabled={synced}
          onClick={async () => {
            const message = await installPackageJsonDependencies(
              packageJsonFile?.path as string
            );
            console.log("term", JSON.stringify(message));

            setSynced(true);
          }}
        >
          Sync Packages
        </Button>
      </Box>
    </>
  );
};
