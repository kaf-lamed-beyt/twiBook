import {
  Center,
  Box,
  Text,
  PinInput,
  PinInputField,
  Divider,
  VStack,
  HStack,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { CustomButton } from "../components/button";
import React from "react";
import { supabase } from "../utils/supabase";
import { Formik, Form } from "formik";
import { InputField } from "@components/input-field";
import { signInSchema } from "@utils/validators/auth-schema";
import { MoveLeft } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { db } from "@utils/db";
import { users } from "@utils/schema";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const navigate = useNavigate();
  const [pin, setPin] = React.useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
    fifth: "",
    sixth: "",
  });
  const [otpScreen, setOtpScreen] = React.useState<boolean>(false);
  const [isVerifyLoading, setVerifyLoading] = React.useState<boolean>(false);

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
    }
  };

  const onPinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setPin((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const singlePin = Object.values(pin)
    .map((pin) => pin)
    .slice(0, 6)
    .join("");

  const verifyEmailAndLogin = async () => {
    setVerifyLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      email: localStorage.getItem("email") as string,
      token: singlePin,
      type: "email",
    });

    console.log(session);

    if (!error) {
      db.insert(users).values({
        fullName: "",
        userId: crypto.randomUUID(),
        hasLicense: false,
        email: session?.user?.email,
        books: [],
      });
      setVerifyLoading(false);
      navigate("/dashboard");
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
      <Text
        maxW="442px"
        fontSize={{ base: "18px", lg: "20px" }}
        color="var(--alt-text)"
      >
        Enter the OTP we sent to{" "}
        <Text as="span" fontWeight="700" color="#fff">
          {localStorage.getItem("email")}
        </Text>
      </Text>
      <Text fontSize="14px" color="var(--alt-text)">
        It'll expire in 60 seconds.
      </Text>
      <Text my=".1em" fontSize="14px" color="var(--alt-text)">
        You can always go back and get another one.
      </Text>

      <HStack my="2em" spacing={{ lg: 4, base: 2, md: 4 }}>
        <PinInput otp placeholder="2">
          {Array.from({ length: 6 }, (_, index) => {
            return (
              <PinInputField
                _hover={{
                  cursor: "pointer",
                  border: "2px solid var(--true-purple)",
                }}
                name={Object.keys(pin)[index]}
                key={index}
                height="60px"
                width="60px"
                border="2px solid var(--matte-black)"
                onChange={(e) => onPinChange(e)}
                _focusVisible={{ border: "2px solid var(--true-purple)" }}
              />
            );
          })}
        </PinInput>
      </HStack>

      <CustomButton
        height="50px"
        width="100%"
        fontWeight="400"
        fontSize="18px"
        hoverBg="var(--true-purple)"
        background="var(--true-purple)"
        type="button"
        loading={isVerifyLoading}
        onClick={() => verifyEmailAndLogin()}
      >
        verify email
      </CustomButton>
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
          <Box mb=".6em">
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
                      >
                        sign in
                      </CustomButton>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>

          <Box my="1.4em" position="relative" padding="4">
            <Divider color="var(--matte-black)" />
            <AbsoluteCenter
              px="4"
              color="var(--alt-text)"
              background="var(--primary)"
            >
              OR
            </AbsoluteCenter>
          </Box>

          <VStack spacing={6}>
            <CustomButton
              type="button"
              height="50px"
              width="100%"
              fontWeight="normal"
              variant="outline"
              fontSize="16px"
              leftIcon={<FcGoogle size="25" />}
              hoverBg="var(--matte-black)"
              background="var(--matte-black)"
            >
              continue with google
            </CustomButton>

            <CustomButton
              type="button"
              height="50px"
              width="100%"
              fontWeight="normal"
              variant="outline"
              fontSize="16px"
              leftIcon={<BsGithub size="25" />}
              hoverBg="var(--matte-black)"
              background="var(--matte-black)"
            >
              continue with gitHub
            </CustomButton>
          </VStack>
        </Box>
      ) : (
        otp
      )}
    </Center>
  );
};
