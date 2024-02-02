import { Center, Box, Input } from "@chakra-ui/react";
import { CustomButton } from "../components/button";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();

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
          onClick={() => navigate("/dashboard")}
        >
          sign in
        </CustomButton>
      </Box>
    </Center>
  );
};
