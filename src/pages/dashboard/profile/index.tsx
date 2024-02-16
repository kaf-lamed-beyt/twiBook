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
import { CalendarClock, LibraryBig, Settings } from "lucide-react";
import { Form, Formik } from "formik";
import { InputField } from "@components/input-field";
import { useToastContext } from "@hooks/toast";
import { CustomButton } from "@components/button";
import { updateProfileSchema } from "@utils/validators/update-profile";
import { Hint } from "@components/hint";
import { useUser } from "@hooks/user";
import { supabase } from "@utils/supabase";

export const Profile = () => {
  const { openToast } = useToastContext();
  const { twib, booksThisMonth } = useUser();

  const fullname = `${twib?.firstname} ${twib?.lastname}`;

  const updateProfile = async (
    fullname?: string,
    email?: string,
    username?: string
  ) => {
    const name = fullname?.split(" ");
    const firstName = name?.[0];
    const lastName = name?.[1];

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
              border="2px solid var(--matte-black)"
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
              border="2px solid var(--matte-black)"
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
                      label="On the free plan, you can only create 15 bookmarks per month"
                    >
                      <Box as="span" marginLeft="10px">
                        /15 <Hint />
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
                    twib?.haslicense === false
                      ? "var(--warn)"
                      : twib.haslicense === true
                      ? "var(--success)"
                      : "var(--warn)"
                  }
                  background={
                    twib?.haslicense === false
                      ? "var(--warn-400)"
                      : twib.haslicense === true
                      ? "var(--success-400)"
                      : "var(--warn-400)"
                  }
                >
                  <Text my="auto" fontSize="12px" fontWeight="bold">
                    {twib.haslicense === true
                      ? "pro"
                      : twib.haslicense === false
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
                    await updateProfile(
                      values.fullname,
                      values.email,
                      values.username
                    );
                    setSubmitting(false);
                  }}
                >
                  {(formik) => (
                    <Form>
                      <Box my=".8em">
                        <FormLabel color="var(--alt-text)">Username</FormLabel>
                        <InputField
                          type="text"
                          name="username"
                          placeholder="Enter your preferred username"
                        />
                      </Box>

                      <Box my=".8em">
                        <FormLabel color="var(--alt-text)">Fullname</FormLabel>
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
                          update
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
  );
};
