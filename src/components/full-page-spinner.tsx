import { Flex, FlexProps, Spinner } from "@chakra-ui/react";
import React from "react";

interface Props extends FlexProps {}
export const FullPageSpinner: React.FC<Props> = (props) => {
  return (
    <Flex
      {...props}
      height="full"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner size={"md"} mx="auto" my="auto" />
    </Flex>
  );
};
