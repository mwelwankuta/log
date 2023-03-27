import { zIndex } from "@/constants";
import {
  Button,
  Flex,
  StatDownArrow,
  StatUpArrow,
  Text,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  title: string;
  secondaryTitleActionComponent: JSX.Element;
  listVisible: boolean;
  collapsible: boolean;
  setListVisible: Dispatch<SetStateAction<boolean>>;
}

export const PackageListTitle: React.FC<Props> = ({
  secondaryTitleActionComponent,
  title,
  listVisible,
  collapsible,
  setListVisible,
}) => (
  <Flex
    borderBottom="1px solid #eee"
    zIndex={zIndex.stickyTitles}
    position="sticky"
    justifyContent="space-between"
    alignItems="center"
    bg="white"
    top="0"
    h="14"
    py="4"
    px="2"
  >
    <Text fontWeight="bold">{title}</Text>
    {secondaryTitleActionComponent}
    {collapsible && (
      <Button
        size="xs"
        background="transparent"
        onClick={() => setListVisible((listVisibility) => !listVisibility)}
      >
        <DropDownButton color="black" down={listVisible} />
      </Button>
    )}
  </Flex>
);

interface DropDownButtonProps {
  color: string;
  down: boolean;
}
const DropDownButton: React.FC<DropDownButtonProps> = ({ color, down }) => (
  <>
    {down ? (
      <StatUpArrow color={color} cursor="pointer" />
    ) : (
      <StatDownArrow color={color} cursor="pointer" />
    )}
  </>
);
