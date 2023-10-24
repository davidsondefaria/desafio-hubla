import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

const Header = () => {
  const onLogin = () => {
    console.log("O botão foi clicado");
  };
  return (
    <Flex
      as="header"
      width="full"
      align="center"
      justify="space-between"
      padding={4}
      boxShadow="md"
    >
      <Text fontSize="2xl" fontWeight="bold">
        Desafio HUBLA
      </Text>
      <Box>
        <Button onClick={onLogin} colorScheme="teal">
          Login
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
