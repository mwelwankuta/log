import {
  installListContext,
  InstallListContextValues,
} from "@/context/install-list";
import { parseAsPackage } from "@/utils";
import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import { PackageSearchResult } from "query-registry";
import React, { Fragment, useContext } from "react";

interface Props extends PackageSearchResult {
  searchTerm?: string;
}

export const PackagesListItem: React.FC<Props> = ({
  name,
  description,
  keywords,
  searchTerm,
  version,
}) => {
  const { installList, setInstallList } = useContext(
    installListContext
  ) as InstallListContextValues;

  const packageIsInstalled = Object.hasOwn(installList, name) === true;

  return (
    <Fragment key={name}>
      <Box py="2">
        <Flex alignItems="center" justifyContent="space-between" pr="4">
          <Flex alignItems="center">
            <Text fontSize="lg" fontWeight="bold" fontFamily="monospace">
              {name}
            </Text>
            {searchTerm == name && (
              <Box px="2" bg="purple.100" rounded="md" ml="2">
                <Text fontWeight="medium" fontSize="smaller">
                  Exact Match
                </Text>
              </Box>
            )}
          </Flex>
          <Flex gap="2">
            <Button
              size="sm"
              colorScheme={packageIsInstalled ? "teal" : "green"}
              w="20"
              onClick={() => {
                if (packageIsInstalled) {
                  const withoutCurrentPage = installList;
                  delete withoutCurrentPage[name as any];
                  setInstallList(parseAsPackage(withoutCurrentPage));
                } else {
                  setInstallList(
                    parseAsPackage({ ...installList, [name]: version })
                  );
                }
              }}
            >
              {packageIsInstalled ? "Remove" : "Include"}
            </Button>
          </Flex>
        </Flex>

        <Text color="gray.500" mb="1" fontSize="sm">
          {description}
        </Text>
        <Text color="gray.500" mb="1" fontSize="sm">
          version: {version}
        </Text>

        <Flex gap="2" flexWrap="wrap">
          {keywords?.map((keyword) => (
            <Text fontSize="sm" bg="gray.200" px="2" textTransform="lowercase">
              {keyword}
            </Text>
          ))}
        </Flex>
      </Box>
      <Divider />
    </Fragment>
  );
};
