import { Center, Text, Box, Link } from "@chakra-ui/react";

interface FallbackUIProps {
  error: {
    message: string;
  };
}

export const FallbackUI = ({ error }: FallbackUIProps) => {
  return (
    <Center height="100vh">
      <Box textAlign="center">
        <Text my=".8em" fontSize="30px" textAlign="center">
          {error.message}
        </Text>

        <Text fontSize="30px" color="var(--alt-text)" pb=".6em">
          Sorry! Something went wrong. But, do not worry. It isn&apos;t your
          fault.
        </Text>

        <Text fontSize="30px" color="var(--alt-text)">
          Try refreshing this page. If the error still persists. Try reaching
          out to us on{" "}
          <Link
            color="#fff"
            textDecoration="underline"
            isExternal
            href="https://twitter.com/usetwibook"
          >
            Twitter
          </Link>
        </Text>
      </Box>
    </Center>
  );
};
