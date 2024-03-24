import { Center, Text, Box } from "@chakra-ui/react";

export const RouteErrorComponent = () => {
  return (
    <Center height="100vh">
      <Box>
        <Text fontSize="30px" color="var(--alt-text)">
          Oops! An error occured.
        </Text>
        <Text my=".8em" fontSize="30px" textAlign="center">
          message
        </Text>
      </Box>
    </Center>
  );
};

