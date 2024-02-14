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
import { CustomButton } from "@components/button";
import { Plus, Search } from "lucide-react";
import { ModalLayout } from "@components/modal-layout";
import { Form, Formik } from "formik";
import { InputField } from "@components/input-field";
import { createBookmarkSchema } from "@utils/validators/create-bookmark-schema";
import { useToastContext } from "@hooks/toast";
import { supabase } from "@utils/supabase";
import { useAuthContext } from "@hooks/auth";
import React from "react";
import { NoBookmarks } from "./components/no-bookmarks";

export const Dashboard = () => {
  const { openToast } = useToastContext();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { user } = useAuthContext();

  const [books, setBooks] = React.useState<[]>([]);

  const createSimpleBookmark = async (title: string, link?: string) => {
    const { error } = await supabase.from("books").insert({
      id: user?.id,
      title: title,
      book_link: link,
      book_type: "simple",
      book_id: crypto.randomUUID(),
      book_created_at: new Date().toISOString(),
    });

    if (!error) {
      openToast(`Bookmarked successfully!"`, "success");
    } else {
      openToast(error.message, "error");
    }
  };

  React.useEffect(() => {
    async () => {
      const { data, error } = await supabase.from("books").select();

      if (!error) {
        setBooks(data);
      }
    };
  }, []);

  console.log(books);

  return (
    <DashboardLayout>
      {books.length === 0 ? (
        <NoBookmarks />
      ) : (
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

          {/* <Flex gap="1em" flexWrap="wrap" my="2em">
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
        </Flex> */}

          <Flex gap="1em" flexWrap="wrap" my="2em">
            {books.map(
              ({ book_id, book_type, title, book_created_at }, index) => {
                return (
                  <BookmarkCard
                    title={title}
                    id={book_id}
                    type={book_type}
                    createdAt={book_created_at}
                    key={`book-${index}-${book_id}`}
                  />
                );
              }
            )}
          </Flex>

          <Flex
            justifyContent="flex-end"
            mb="1.4em"
            position="fixed"
            bottom="-16px"
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
      )}

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
