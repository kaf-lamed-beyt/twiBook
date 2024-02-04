import {
  Center,
  Box,
  Text,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import { CustomButton } from "../components/button";
import React from "react";
import { supabase } from "../utils/supabase";
import { Formik, Form } from "formik";
import { InputField } from "@components/input-field";
import { signInSchema } from "@utils/validators/auth-schema";
import { MoveLeft } from "lucide-react";

export const SignIn = () => {
  // const navigate = useNavigate();
  const [otpScreen, setOtpScreen] = React.useState<boolean>(false);

  const onEmailSignIn = async (email: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: "localhost:5173/otp",
      },
    });

    if (!error) {
      localStorage.setItem("email", email);
      localStorage.setItem("user-data", JSON.stringify(data));
      setOtpScreen(true);

      // navigate("/dashboard")
    }
  };

  const otp = (
    <Box className="slide-in-right" transition="all .1s ease-in">
      <HStack
        py=".6em"
        spacing={2}
        _hover={{ cursor: "pointer" }}
        onClick={() => setOtpScreen(false)}
      >
        <MoveLeft size="25" />
        <Text my="auto">Go back</Text>
      </HStack>
      <Text fontSize="20px" color="var(--alt-text)" width="100%">
        Enter the OTP we sent to{" "}
        <Text as="span" fontWeight="700">
          {localStorage.getItem("email")}
        </Text>
      </Text>

      <HStack my="2em" align="center">
        <PinInput otp>
          <PinInputField height="60px" width="60px" border="1px solid #333" />
          <PinInputField height="60px" width="60px" border="1px solid #333" />
          <PinInputField height="60px" width="60px" border="1px solid #333" />
          <PinInputField height="60px" width="60px" border="1px solid #333" />
          <PinInputField height="60px" width="60px" border="1px solid #333" />
          <PinInputField height="60px" width="60px" border="1px solid #333" />
        </PinInput>
      </HStack>
    </Box>
  );

  return (
    <Center height="100vh">
      {!otpScreen ? (
        <Box height="fit-content" width="fit-content" px=".6em" py=".6em">
          <Text py=".5em" fontSize="x-large">
            Sign In.
          </Text>
          <Text pb="1em" size="sm" color="var(--alt-text)">
            Don't worry, we'll create an account for you automatically.
          </Text>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={signInSchema}
            onSubmit={async (values, { setSubmitting }) => {
              await onEmailSignIn(values.email);
              setSubmitting(false);
            }}
          >
            {(formik) => (
              <Form>
                <Box>
                  <InputField name="email" placeholder="email" />

                  <Box mt="1.4em">
                    <CustomButton
                      type="submit"
                      height="50px"
                      width="100%"
                      fontSize="20px"
                      background="var(--true-purple)"
                      hoverBg="var(--true-purple)"
                      loading={formik.isSubmitting}
                      loadingText="preparing"
                    >
                      sign in
                    </CustomButton>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      ) : (
        otp
      )}
    </Center>
  );
};
