/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Center, Text, Box } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";

export const RouteErrorComponent = () => {
  const error = useRouteError();

  return (
    <Center height="100vh">
      <Box>
        <Text fontSize="30px" color="var(--alt-text)">
          Oops! An error occured.
        </Text>
        <Text my=".8em" fontSize="30px" textAlign="center">
          {/* @ts-expect-error */}
          {error.statusText || error.message}
        </Text>
      </Box>
    </Center>
  );
};
