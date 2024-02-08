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
import { useToastContext } from "@context/toast";
import { CustomButton } from "@components/button";
import { updateProfileSchema } from "@utils/validators/update-profile";

export const Profile = () => {
  const { openToast } = useToastContext();

  const updateProfile = async () => {
    openToast("Profile updated successfully!", "success");
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
                  38
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
                  7
                  <Box
                    as="span"
                    fontSize="25px"
                    ml="-12px"
                    _hover={{ cursor: "help" }}
                  >
                    <Tooltip
                      width="276px"
                      borderRadius="8px"
                      label="On the free plan, you can only create 15 bookmarks per month"
                      border="1px solid var(--matte-black)"
                      background="var(--eerie-black)"
                    >
                      /15
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
                  color="var(--warn)"
                  borderRadius="4px"
                  background="var(--warn-400)"
                  // border="1px solid var(--warn)"
                >
                  <Text my="auto" fontSize="12px" fontWeight="bold">
                    free
                  </Text>
                </Badge>
              </HStack>

              <Box mt="2em">
                <Formik
                  initialValues={{ username: "", fullname: "" }}
                  validationSchema={updateProfileSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    console.log(JSON.stringify(values));
                    await updateProfile();
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
                          placeholder="Caleb Olojo"
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
                          loadingText="submitting"
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
