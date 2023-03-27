import {
  projectPathContext,
  ProjectPathContextValues,
} from "@/context/project-path";
import { openProjectDirectory } from "@/samples/node-api";
import {
  Box,
  BoxProps,
  Button,
  ButtonSpinner,
  CloseButton,
  Divider,
  Flex,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { searchPackages, SearchResults } from "query-registry";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { ProjectPicker } from "./file-input";

interface Props extends BoxProps {
  setPackages: (results: SearchResults) => void;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  packageJsonFile: File | null;
}
export const SearchBar: React.FC<Props> = (props) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const { setPackages, setSearchTerm, packageJsonFile } = props;

  const getSearchedPackages = async (search: string) => {
    const packages = await searchPackages({
      query: { text: search, popularity: 1 },
    });
    setPackages(packages);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(search);
    setLoading(true);
    await getSearchedPackages(search);
    setLoading(false);
  };

  useEffect(() => {
    getSearchedPackages("typescript");
  }, []);

  return (
    <Box {...props} borderBottom={"1px solid #eee"} w="full" p="3">
      <HeaderActions packageJsonFile={packageJsonFile}/>
      <Box alignItems="center" gap="3" maxW="full" mx="auto">
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Box display="flex" alignItems="center" gap="2" w={"full"}>
            <Input
              type={"text"}
              width={"full"}
              placeholder="search package..."
              ringColor="red.400"
              rounded={"full"}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              rounded="full"
              type="submit"
              textColor="white"
              colorScheme="red"
              bg="red.400"
              w="32"
            >
              {loading ? <ButtonSpinner /> : "Search"}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

interface HeaderActionsProps {
  packageJsonFile: File | null;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({ packageJsonFile }) => {
  const [showPicker, setShowPicker] = useState(false);
  const { setPackageJsonFile } = useContext(
    projectPathContext
  ) as ProjectPathContextValues;
  return (
    <>
      <Flex alignItems="center" gap="2" mb="2">
        <Button
          rounded="full"
          size="sm"
          colorScheme="red"
          bg="gray.600"
          onClick={() => {
            setPackageJsonFile(null);
          }}
        >
          <CloseButton size="sm" />
          Close Project
        </Button>
        <Spacer />
        <Button
          size="sm"
          rounded="full"
          onClick={() => {
            setShowPicker((picker) => !picker);
          }}
        >
          Open Existing Node Project
        </Button>
        <Button
          size="sm"
          rounded="full"
          onClick={() => {
            openProjectDirectory(packageJsonFile?.path as string);
          }}
        >
          Open Project Directory
        </Button>
      </Flex>
      <Divider mb="2" />
      <ProjectPicker showPicker={showPicker} />
    </>
  );
};
