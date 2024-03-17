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
import { CustomButton } from "../src/components/button";
import React from "react";
import { supabase } from "../src/utils/supabase/client";
import { Formik, Form } from "formik";
import { InputField } from "@components/input-field";
import { signInSchema } from "@utils/validators/auth-schema";
import { MoveLeft } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useToastContext } from "../src/hooks/toast";
import { useAuthContext } from "@hooks/auth";
import { setCookie } from "cookies-next";
import { GrTwitter } from "react-icons/gr";
import { authCookieOptions } from "@utils/misc";
import { Provider } from "@supabase/supabase-js";
import { MetaData } from "@components/metadata";
import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();

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
  const { openToast } = useToastContext();
  const { authenticator } = useAuthContext();

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

  const onEmailSignIn = async (email: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        data: {
          email: email,
        },
      },
    });

    if (!error && data.session === null) {
      localStorage.setItem("email", email);
      openToast("Check your mail", "success");
      setOtpScreen(true);
    }
  };

  // const onRequestInvite = async (email: string) => {
  //   const { error } = await supabase.auth.admin.inviteUserByEmail(email);

  //   if (!error) {
  //     openToast("An invite has been sent to you.", "success");
  //   } else {
  //     openToast(error.message, "error");
  //   }
  // };

  const OAuthSignIn = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/oauth`,
      },
    });

    if (!error) {
      authenticator(true);
      setCookie("_prov", data.provider, {
        ...authCookieOptions,
      });

      openToast("Processing...", "success");
    } else {
      openToast("Something went wrong! Try again.", "error");
    }
  };

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

    if (!error) {
      openToast("You are logged in.", "success");
      localStorage.setItem("twbu", (session?.user?.email as string) ?? "");

      authenticator(true, session?.user);
      setCookie("_at", session?.access_token, {
        path: "/",
        maxAge: 24 * 24 * 60,
      });

      setVerifyLoading(false);
      router.push("/dashboard");
    } else {
      openToast(error?.message, "error");
      setVerifyLoading(false);
    }
  };

  let decryptedEmail;

  if (typeof window !== "undefined") {
    decryptedEmail = localStorage.getItem("email");
  }

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
          {decryptedEmail}
        </Text>
      </Text>
      <Text fontSize="14px" color="var(--alt-text)">
        It&apos;ll expire in 60 seconds.
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
        type="button"
        fontSize="18px"
        fontWeight="400"
        loading={isVerifyLoading}
        hoverBg="var(--true-purple)"
        background="var(--true-purple)"
        onClick={() => verifyEmailAndLogin()}
      >
        Verify Email
      </CustomButton>
    </Box>
  );

  return (
    <React.Fragment>
      <MetaData
        url="twibook.netlify.app"
        pageTitle="Sign In &mdash; twiBook"
        previewImage="https://res.cloudinary.com/meje/image/upload/v1708159678/twb-prev_wklhoz.png"
        description="Twitter bookmarks alternative. Save, organize and sort tweets. Bookmark tweets by copying the link to a tweet and save it in your twiBook dashboard."
      />

      <Center height="100vh" px={{ base: ".5em" }}>
        {!otpScreen ? (
          <Box
            height="fit-content"
            width="fit-content"
            px=".6em"
            py=".6em"
            background="var(--eerie-black)"
            border="1px solid var(--matte-black)"
            pb="1.4em"
            borderRadius="6px"
          >
            <Text py=".5em" fontSize="x-large">
              Sign In.
            </Text>
            <Text pb="1em" fontSize="15px" color="var(--alt-text)">
              Don&apos;t worry, we&apos;ll create an account for you
              automatically.
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
                      <InputField
                        type="email"
                        name="email"
                        placeholder="email"
                      />

                      <Box mt="1.4em">
                        <CustomButton
                          type="submit"
                          height="50px"
                          width="100%"
                          fontSize="16px"
                          fontWeight="normal"
                          background="var(--true-purple)"
                          hoverBg="var(--true-purple)"
                          loading={formik.isSubmitting}
                        >
                          Continue with Email
                        </CustomButton>
                      </Box>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>

            <Box my="1.4em" position="relative" padding="4">
              <Divider borderColor="var(--alt-text)" />
              <AbsoluteCenter
                px="4"
                color="var(--alt-text)"
                background="var(--eerie-black)"
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
                leftIcon={<GrTwitter size="25" color="#26a7de" />}
                hoverBg="var(--matte-black)"
                background="var(--matte-black)"
                loadingText="Hyyyy"
                onClick={() => OAuthSignIn("twitter")}
              >
                Continue with Twitter
              </CustomButton>

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
                onClick={() => OAuthSignIn("google")}
              >
                Continue with Google
              </CustomButton>

              {/* <CustomButton
              type="button"
              height="50px"
              width="100%"
              fontWeight="normal"
              variant="outline"
              fontSize="16px"
              leftIcon={<BsGithub size="25" />}
              hoverBg="var(--matte-black)"
              background="var(--matte-black)"
              onClick={() => onGithubSignIn()}
            >
              Continue with GitHub
            </CustomButton> */}
            </VStack>
          </Box>
        ) : (
          otp
        )}
      </Center>
    </React.Fragment>
  );
}
