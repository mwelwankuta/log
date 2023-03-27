import { Container as ChContainer, ContainerProps } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

interface Props extends ContainerProps {}

export const Container: React.FC<Props> = ({ children }) => {
  return <ChContainer mx="auto">{children}</ChContainer>;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return <Container maxW={"6xl"}>{children}</Container>;
};
