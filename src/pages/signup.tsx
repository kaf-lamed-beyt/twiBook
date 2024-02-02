import { Center, Box, Input } from "@chakra-ui/react";
import { CustomButton } from "../components/button";

export const Signup = () => {
  return (
    <Center height="100vh">
      <Box height="fit-content" width="fit-content" px=".6em" py=".6em">
        <Input
          mb="2em"
          height="50px"
          type="text"
          placeholder="email"
          border="1px solid #333"
          _hover={{ border: "1px solid #333" }}
        />

        <CustomButton
          height="50px"
          width="100%"
          fontSize="20px"
          background="var(--true-purple)"
          hoverBg="var(--true-purple)"
        >
          sign in
        </CustomButton>
      </Box>
    </Center>
  );
};
