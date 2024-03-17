import {
  Text,
  Flex,
  Box,
  Stack,
  Tooltip,
  HStack,
  Badge,
  FormLabel,
} from "@chakra-ui/react";
import { DashboardLayout } from "../components/layout";
import { CalendarClock, LibraryBig, BookOpen, Settings } from "lucide-react";
import { Form, Formik } from "formik";
import { InputField } from "@components/input-field";
import { useToastContext } from "@hooks/toast";
import { CustomButton } from "@components/button";
import { updateProfileSchema } from "@utils/validators/update-profile";
import { Hint } from "@components/hint";
import { useUser } from "@hooks/user";
import { supabase } from "@utils/supabase/client";
import { Quotas } from "@utils/misc";
import { MetaData } from "@components/metadata";

export const Profile = () => {
  const { openToast } = useToastContext();
  const { twib, booksThisMonth, freePreviews } = useUser();

  const fullname = `${twib?.firstname} ${twib?.lastname}`;

  const updateProfile = async (
    firstName?: string,
    lastName?: string,
    email?: string,
    username?: string
  ) => {
    try {
      const { error } = await supabase
        .from("account")
        .update({
          first_name: firstName,
          last_name: lastName,
          email: email,
          username: username,
        })
        .eq("id", twib?.id);

      if (!error) {
        openToast("Profile updated successfully!", "success");
      } else {
        openToast(error.message, "error");
      }
    } catch (error) {
      openToast("Something went wrong. Please try again.", "error");
    }
  };

  return (
    <>
      <MetaData url="twibook.app" pageTitle="Profile &mdash; twiBook" />

      <DashboardLayout>
        <Box py=".8em" mt="1.4em">
          <Flex gap="4em" flexWrap={{ base: "wrap", lg: "nowrap", md: "wrap" }}>
            <Stack
              spacing={4}
              direction={{ base: "column", lg: "column", md: "row" }}
              width={{ base: "100%", md: "100%", lg: "50%" }}
              flexWrap={{ base: "wrap", md: "nowrap", lg: "wrap" }}
            >
              <Box
                px="1.2em"
                py=".5em"
                borderRadius="8px"
                background="var(--eerie-black)"
                border="1px solid var(--matte-black)"
                width={{ lg: "100%", md: "48%", base: "100%" }}
              >
                <HStack justifyContent="space-between" color="var(--alt-text)">
                  <Text fontSize="90px" fontWeight="700">
                    {twib?.books?.length}
                  </Text>
                  <Box mt="-4em">
                    <LibraryBig size="25" />
                  </Box>
                </HStack>
                <Text
                  py=".6em"
                  float="right"
                  fontSize={{ base: "18px", lg: "25px", md: "18px" }}
                  color="var(--alt-text)"
                >
                  Total bookmarks
                </Text>
              </Box>

              <Box
                px="1.2em"
                py=".5em"
                width={{ lg: "100%", md: "50%", base: "100%" }}
                borderRadius="8px"
                background="var(--eerie-black)"
                border="1px solid var(--matte-black)"
              >
                <HStack justifyContent="space-between" color="var(--alt-text)">
                  <Text fontSize="90px" fontWeight="700">
                    {booksThisMonth}
                    <Box
                      as="span"
                      fontSize="25px"
                      ml="-12px"
                      _hover={{ cursor: "pointer" }}
                    >
                      <Tooltip
                        width="276px"
                        borderRadius="8px"
                        background="var(--eerie-black)"
                        border="1px solid var(--matte-black)"
                        color="var(--alt-text)"
                        label={`On the free plan, you can only create ${Quotas.FREE} bookmarks per month`}
                      >
                        <Box as="span" marginLeft="10px">
                          /
                          {twib?.license_type === "free"
                            ? Quotas.FREE
                            : twib?.license_type === "basic"
                            ? Quotas.BASIC
                            : twib?.license_type === "pro"
                            ? Quotas.PRO
                            : Quotas.FREE}
                          <Hint />
                        </Box>
                      </Tooltip>
                    </Box>
                  </Text>
                  <Box mt="-4em">
                    <CalendarClock size="25" />
                  </Box>
                </HStack>
                <Text
                  py=".6em"
                  float="right"
                  fontSize={{ base: "18px", lg: "25px", md: "18px" }}
                  color="var(--alt-text)"
                >
                  Bookmarks this month.
                </Text>
              </Box>

              {twib?.has_license === false || twib?.license_type === "free" ? (
                <Box
                  px="1.2em"
                  py=".5em"
                  width={{ lg: "100%", md: "50%", base: "100%" }}
                  borderRadius="8px"
                  background="var(--eerie-black)"
                  border="1px solid var(--matte-black)"
                >
                  <HStack
                    justifyContent="space-between"
                    color="var(--alt-text)"
                  >
                    <Text fontSize="90px" fontWeight="700">
                      {freePreviews}
                      <Box
                        as="span"
                        fontSize="25px"
                        ml="-12px"
                        _hover={{ cursor: "pointer" }}
                      >
                        <Tooltip
                          width="276px"
                          borderRadius="8px"
                          background="var(--eerie-black)"
                          border="1px solid var(--matte-black)"
                          color="var(--alt-text)"
                          label={`On the free plan, you only get ${Quotas.FREE_PREVIEWS} tweet previews per month`}
                        >
                          <Box as="span" marginLeft="10px">
                            /{Quotas.FREE_PREVIEWS}
                            <Hint />
                          </Box>
                        </Tooltip>
                      </Box>
                    </Text>
                    <Box mt="-4em">
                      <BookOpen size="25" />
                    </Box>
                  </HStack>
                  <Text
                    py=".6em"
                    float="right"
                    fontSize={{ base: "18px", lg: "25px", md: "18px" }}
                    color="var(--alt-text)"
                  >
                    Tweet Previews this month
                  </Text>
                </Box>
              ) : null}
            </Stack>

            <Box
              background="var(--eerie-black)"
              border="1px solid var(--matte-black)"
              height="fit-content"
              width={{ base: "100%", md: "100%", lg: "50%" }}
              borderRadius="8px"
              color="var(--alt-text)"
              pb="1.4em"
            >
              <HStack
                py="1em"
                px="1.2em"
                justifyContent="space-between"
                borderBottom="1px solid var(--matte-black)"
              >
                <Text fontSize="20px">Account information</Text>
                <Settings size="25px" style={{ cursor: "pointer" }} />
              </HStack>

              <Box py=".8em" px="1.2em">
                <HStack spacing={2} my=".8em">
                  <Text fontSize="20px">Current plan: </Text>
                  <Badge
                    borderRadius="4px"
                    color={
                      twib?.has_license === false ||
                      twib?.license_type === "free"
                        ? "var(--warn)"
                        : twib?.has_license === true
                        ? "var(--success)"
                        : "var(--warn)"
                    }
                    background={
                      twib?.has_license === false ||
                      twib?.license_type === "free"
                        ? "var(--warn-400)"
                        : twib?.has_license === true &&
                          twib?.license_type === "basic"
                        ? "var(--success-400)"
                        : twib?.has_license === true &&
                          twib?.license_type === "pro"
                        ? "var(--true-pruple-600)"
                        : "var(--warn-400)"
                    }
                  >
                    <Text my="auto" fontSize="12px" fontWeight="bold">
                      {twib?.has_license === true &&
                      twib?.license_type === "pro"
                        ? "pro"
                        : twib?.has_license === true &&
                          twib?.license_type === "basic"
                        ? "basic"
                        : twib?.has_license === false
                        ? "free"
                        : "free"}
                    </Text>
                  </Badge>
                </HStack>

                <Box mt="2em">
                  <Formik
                    initialValues={{
                      username: twib?.username,
                      fullname: fullname,
                      email: twib?.email,
                    }}
                    validationSchema={updateProfileSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                      const name = values.fullname.split(" ");

                      const firstName = name?.[0];
                      const lastName = name?.[1];

                      await updateProfile(
                        firstName,
                        lastName,
                        values.email,
                        values.username
                      );
                      setSubmitting(false);
                    }}
                  >
                    {(formik) => (
                      <Form>
                        <Box my=".8em">
                          <FormLabel color="var(--alt-text)">
                            Username
                          </FormLabel>
                          <InputField
                            type="text"
                            name="username"
                            placeholder="Your user name from Twitter"
                          />
                        </Box>

                        <Box my=".8em">
                          <FormLabel color="var(--alt-text)">
                            Fullname
                          </FormLabel>
                          <InputField
                            type="text"
                            name="fullname"
                            placeholder="Schwazz Speckwick"
                          />
                        </Box>

                        <Box my=".8em">
                          <FormLabel color="var(--alt-text)">Email</FormLabel>
                          <InputField
                            type="email"
                            name="email"
                            placeholder="you@mail.com"
                          />
                        </Box>

                        <Box float="right" mt=".4em">
                          <CustomButton
                            type="submit"
                            height="50px"
                            width="150px"
                            fontSize="20px"
                            fontWeight="normal"
                            background="var(--true-purple)"
                            hoverBg="var(--true-purple)"
                            loading={formik.isSubmitting}
                            loadingText="Updating..."
                          >
                            Update
                          </CustomButton>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Box>
      </DashboardLayout>
    </>
  );
};
