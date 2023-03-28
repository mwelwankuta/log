import { ProjectPicker } from "@/components/file-input";
import {
  Box,
  Button,
  ButtonSpinner,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export const ProjectPathSelector: React.FC = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      setLoading(false);
      setShowPicker(false);
    };
  }, []);

  return (
    <Box display="flex" alignItems="center" justifyContent="center" h="100vh">
      <Box>
        <Box mb="3">
          <Text fontSize="2xl" fontFamily="mono">
            Node Package Manager (Unofficial)
          </Text>
          <Text fontSize="xl" fontFamily="mono">
            Easier package management
          </Text>
          <Divider mt="2" />
        </Box>

        <Flex gap="2">
          <Button w="full" size="lg" colorScheme="red">
            New Node Project
          </Button>
          <Button
            w="full"
            size="lg"
            bg="transparent"
            onClick={() => {
              setLoading(true);
              setShowPicker(true);
            }}
          >
            {loading ? <ButtonSpinner /> : "Open Existing"}
          </Button>
        </Flex>
        <Divider mt="3" />
      </Box>
      <ProjectPicker showPicker={showPicker} />
    </Box>
  );
};
