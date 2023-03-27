import { FullPageSpinner } from "@/components/full-page-spinner";
import { SearchBar } from "@/components/search-bar";
import {
  projectPathContext,
  ProjectPathContextValues,
} from "@/context/project-path";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { SearchResults } from "query-registry";
import React, { useContext, useState } from "react";
import { SideBar } from "./components/sde-bar";
import { PackagesListItem } from "./packages-list-item";

export const PackageList: React.FC = () => {
  const [packages, setPackages] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { packageJsonFile } = useContext(
    projectPathContext
  ) as ProjectPathContextValues;

  return (
    <Grid gridTemplateColumns={"60% 40%"}>
      <GridItem>
        <SearchBar
          packageJsonFile={packageJsonFile}
          setSearchTerm={setSearchTerm}
          setPackages={(searchResults) => {
            setLoading(false);
            setPackages(searchResults);
          }}
        />

        <Box flex="1" overflowY="scroll" h="90vh">
          {loading && <FullPageSpinner />}

          {packages?.objects.map(({ package: pk }) => (
            <PackagesListItem {...pk} searchTerm={searchTerm} />
          ))}
        </Box>
      </GridItem>

      <GridItem borderLeft="1px solid #eee">
        <SideBar packageJsonFile={packageJsonFile} />
      </GridItem>
    </Grid>
  );
};
