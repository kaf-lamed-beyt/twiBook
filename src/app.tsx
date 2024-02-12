import { Center, Text, Box } from "@chakra-ui/react";
import { CustomButton } from "./components/button";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <Center height="100vh">
      <Box>
        <Text
          as="h1"
          textAlign="center"
          fontSize={{ base: "28px", md: "45px", lg: "100px" }}
          fontWeight="900"
        >
          Twitter
          <Box
            as="span"
            mx=".2em"
            px=".2em"
            py=".1em"
            background="var(--true-purple)"
          >
            bookmarks
          </Box>
          alternative
        </Text>

        <Text
          textAlign="center"
          fontSize={{ base: "18px", md: "22px", lg: "36px" }}
          py=".5em"
        >
          Save tweets. Come back and quote them later.
        </Text>

        <Box textAlign="center" mt={{ base: "1em", md: "3em", lg: "3em" }}>
          <CustomButton
            type="button"
            hoverBg="var(--true-purple)"
            background="var(--true-purple)"
            onClick={() => navigate("/signin")}
            rightIcon={
              <MoveRight
                size="25px"
                style={{
                  background: "var(--true-purple)",
                }}
              />
            }
          >
            get started
          </CustomButton>
        </Box>
      </Box>
    </Center>
  );
}

export default App;
