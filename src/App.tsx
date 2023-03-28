import { Box } from "@chakra-ui/react";
import { useContext } from "react";
import {
  projectPathContext,
  ProjectPathContextValues,
} from "./context/project-path";
import { PackageList } from "./modules/package-list";
import { ProjectPathSelector } from "./modules/project-path-selector";

export default function App() {
  const { packageJsonFile } = useContext(
    projectPathContext
  ) as ProjectPathContextValues;

  return (
    <>
      {packageJsonFile == null ? (
        <>
          <ProjectPathSelector />
        </>
      ) : (
        <>
          <Box w="full" mx="auto" overflow="hidden">
            <PackageList />
          </Box>
        </>
      )}
    </>
  );
}
