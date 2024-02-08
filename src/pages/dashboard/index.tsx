import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { DashboardLayout } from "./components/layout";
import { BookmarkCard } from "./components/bookmark-card";
import { Bookmarks } from "@utils/data";
import { CustomButton } from "@components/button";
import { Plus, Search } from "lucide-react";
import { ModalLayout } from "@components/modal-layout";
import { Form, Formik } from "formik";
import { InputField } from "@components/input-field";
import { createBookmarkSchema } from "@utils/validators/create-bookmark-schema";
import { useToastContext } from "@hooks/toast";

export const Dashboard = () => {
  const { openToast } = useToastContext();
  const { onOpen, isOpen, onClose } = useDisclosure();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const createSimpleBookmark = async (title: string, link?: string) => {
    openToast(`${title} bookmarked successfully!"`, "success");
  };

  return (
    <DashboardLayout>
      <Box py=".8em">
        <InputGroup my="1.4em" border="none">
          <InputLeftElement mt=".3em">
            <Search size="25" color="var(--alt-text)" />
          </InputLeftElement>
          <Input
            py="1.2em"
            px="1.8em"
            height="50px"
            width="100%"
            color="var(--alt-text)"
            background="var(--eerie-black)"
            placeholder="Search bookmarks..."
            _focusVisible={{ border: "none" }}
            border="1px solid var(--matte-black)"
            _placeholder={{ color: "var(--alt-text)" }}
            _hover={{ border: "2px solid var(--matte-black)" }}
          />
        </InputGroup>

        <Flex gap="1em" flexWrap="wrap" my="2em">
          {Bookmarks.map(({ id, type, title, createdAt }, index) => {
            return (
              <BookmarkCard
                key={`book-${index}-${id}`}
                id={id}
                type={type}
                title={title}
                createdAt={createdAt}
              />
            );
          })}
        </Flex>
        {/* <NoBookmarks /> */}

        <Flex
          justifyContent="flex-end"
          mb="1.4em"
          position="fixed"
          bottom="10px"
          right="20px"
        >
          <CustomButton
            rounded
            type="button"
            width="50px"
            height="50px"
            onClick={onOpen}
            hoverBg="var(--true-purple)"
            background="var(--true-purple)"
          >
            <Tooltip
              placement="left"
              label="create a simple bookmark"
              background="var(--eerie-black)"
              border="1px solid var(--matte-black)"
            >
              <Plus size="55" />
            </Tooltip>
          </CustomButton>
        </Flex>
      </Box>

      <ModalLayout
        size="md"
        isOpen={isOpen}
        onClose={onClose}
        title="Create a simple bookmark"
      >
        <Formik
          initialValues={{ bookmarkTitle: "", bookmarkLink: "" }}
          validationSchema={createBookmarkSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await createSimpleBookmark(
              values.bookmarkTitle,
              values.bookmarkLink
            );
            setSubmitting(false);
          }}
        >
          {(formik) => (
            <Form>
              <Box my=".8em">
                <InputField
                  type="text"
                  name="bookmarkTitle"
                  placeholder="Give your bookmark a title."
                />
              </Box>

              <Box my=".8em">
                <InputField
                  type="text"
                  name="bookmarkLink"
                  placeholder="Link to the tweet"
                />
              </Box>

              <Box my=".4em" mt=".4em">
                <CustomButton
                  type="submit"
                  height="50px"
                  width="100%"
                  fontSize="20px"
                  fontWeight="400"
                  hoverBg="var(--true-purple)"
                  loading={formik.isSubmitting}
                  background="var(--true-purple)"
                  loadingText="creating bookmark..."
                >
                  create bookmark
                </CustomButton>
              </Box>
            </Form>
          )}
        </Formik>
      </ModalLayout>
    </DashboardLayout>
  );
};
