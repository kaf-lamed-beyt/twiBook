import React from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Tooltip,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { DashboardLayout } from "./components/layout";
import { BookmarkCard } from "./components/bookmark-card";
import { CustomButton } from "@components/button";
import { Plus, Search } from "lucide-react";
import { ModalLayout } from "@components/modal-layout";
import { Form, Formik } from "formik";
import { InputField } from "@components/input-field";
import { useToastContext } from "@hooks/toast";
import { supabase } from "@utils/supabase";
import { useAuthContext } from "@hooks/auth";
import { dateFromNow } from "@utils/misc";
import { createBookmarkSchema } from "@utils/validators/create-bookmark-schema";
import debounce from "lodash.debounce";

export const Dashboard = () => {
  const { openToast } = useToastContext();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { user } = useAuthContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [books, setBooks] = React.useState<any[]>([]);
  const [, setSearchTerm] = React.useState<string>("");
  const [searchError, setSearchError] = React.useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [filteredBooks, setFilteredBooks] = React.useState<any[]>([]);

  const getBooks = React.useCallback(async () => {
    const { data, error } = await supabase.from("books").select();

    if (!error) {
      setBooks(data);
    }
  }, []);

  React.useEffect(() => {
    getBooks();
  }, [getBooks]);

  const createSimpleBookmark = async (title: string, link?: string) => {
    const { error } = await supabase.from("books").insert({
      id: `${user?.id}`,
      title: title,
      book_link: link,
      book_type: "simple",
      book_id: crypto.randomUUID(),
      book_created_at: new Date().toISOString(),
    });

    if (!error) {
      openToast(`Bookmarked successfully!"`, "success");
      getBooks();
    } else {
      openToast(error.message, "error");
    }
  };

  const deleteBook = async (id: string) => {
    const { error } = await supabase.from("books").delete().eq("book_id", id);

    if (!error) {
      openToast("Bookmark deleted successfully!", "success");
      onClose();
      setBooks(books.filter((book) => book.book_id !== id));
    } else {
      openToast(error.message, "error");
    }
  };

  const debouncedSearch = debounce((searchQuery: string) => {
    setSearchTerm(searchQuery.toLowerCase());

    const filtered = books.filter((book) =>
      book.title?.toLowerCase().includes(searchQuery)
    );

    setFilteredBooks(filtered);

    if (filtered.length === 0) {
      setSearchError("No bookmarks with this title exist.");
    } else {
      setSearchError("");
    }
  }, 300);

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    debouncedSearch(query);
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
            onChange={(e) => onSearch(e)}
            background="var(--eerie-black)"
            placeholder="Search bookmarks..."
            _focusVisible={{ border: "none" }}
            border="1px solid var(--matte-black)"
            _placeholder={{ color: "var(--alt-text)" }}
            _hover={{ border: "2px solid var(--matte-black)" }}
          />
        </InputGroup>

        {searchError !== "" ? (
          <Text color="var(--alt-text)">{searchError}</Text>
        ) : null}

        {/* <Flex gap="1em" flexWrap="wrap" my="2em">
            {Bookmarks.map(({ id, type, title, createdAt }, index) => {
              return (
                <BookmarkCard
                  key={`book-${index}-${id}`}
                  id={id}
                  type={type}
                  title={title}
                  createdAt={createdAt}
                  bookLink={""}
                />
              );
            })}
          </Flex> */}

        <Flex gap="1em" flexWrap="wrap" my="2em">
          {filteredBooks.map(
            (
              { book_id, book_type, title, book_link, book_created_at },
              index
            ) => {
              return (
                <BookmarkCard
                  title={title}
                  id={book_id}
                  type={book_type}
                  bookLink={book_link}
                  bookId={book_id}
                  key={`book-${index}-${book_id}`}
                  onDelete={() => deleteBook(book_id)}
                  createdAt={dateFromNow(book_created_at)}
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
                  Create bookmark
                </CustomButton>
              </Box>
            </Form>
          )}
        </Formik>
      </ModalLayout>
    </DashboardLayout>
  );
};
