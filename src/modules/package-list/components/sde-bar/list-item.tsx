import {
  packageDependencyListContext,
  PackageDependencyListContextValues,
} from "@/context/dependency-list";
import {
  projectPathContext,
  ProjectPathContextValues,
} from "@/context/project-path";
import {
  toggleSyncedContext,
  ToggleSyncedContextValue,
} from "@/context/toggle-synced";
import {
  deleteFromPackageJsonFile,
  readPackageJsonFile,
} from "@/samples/node-api";
import { Box, BoxProps, Button, Text } from "@chakra-ui/react";
import { useContext } from "react";

interface Props extends BoxProps {
  isDevDependency: boolean;
  isInstalled?: boolean;
  dependencyListActionVisible: boolean;
  dependency: string;
  version: string;
}

/**
 * any json object with a string as a value conforms to `PackageListEntry`
 */
export type PackageListEntry = [string, string];

export const PackageListItem: React.FC<Props> = (props) => {
  const {
    dependency,
    isDevDependency,
    dependencyListActionVisible = true,
    version,
  } = props;

  const { packageJsonFile } = useContext(
    projectPathContext
  ) as ProjectPathContextValues;

  const { setPackageDependencyList } = useContext(
    packageDependencyListContext
  ) as PackageDependencyListContextValues;

  const { setSynced } = useContext(
    toggleSyncedContext
  ) as ToggleSyncedContextValue;

  return (
    <Box
      {...props}
      display="flex"
      gap="2"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Text>{dependency}</Text>
        <Text fontSize="small" mt="-1" color="#777">
          version: {version}
        </Text>
      </Box>
      {dependencyListActionVisible && (
        <Button
          size="sm"
          bg="transparent"
          onClick={() => {
            deleteFromPackageJsonFile(
              packageJsonFile?.path as string,
              dependency,
              isDevDependency
            );
            setPackageDependencyList(
              readPackageJsonFile(packageJsonFile?.path as string)
            );
            setSynced(false);
          }}
        >
          Remove
        </Button>
      )}
    </Box>
  );
};
