/* eslint-disable @typescript-eslint/ban-ts-comment */
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
  Spinner,
  Center,
  Stack,
  HStack,
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
import { Quotas, dateFromNow } from "@utils/misc";
import {
  createBookmarkSchema,
  createBookmarkSchema_LICENSED,
} from "@utils/validators/create-bookmark-schema";
import debounce from "lodash.debounce";
import { useBooks } from "@hooks/books";
import { useUser } from "@hooks/user";
import { NoBookmarks } from "./components/no-bookmarks";
import { antagonist, protector } from "@utils/protector";
import { SelectField } from "@components/select";
import { BookType, Books, bookTypes, filterBooks, months } from "@utils/filter";
import { MetaData } from "@components/metadata";

export const Dashboard = () => {
  const { booksThisMonth, twib } = useUser();
  const { openToast } = useToastContext();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { books, loading, refetchBooks } = useBooks();

  const [, setSearchTerm] = React.useState<string>("");
  const [searchError, setSearchError] = React.useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [filteredBooks, setFilteredBooks] = React.useState<Books>([]);
  const [isDeletePending, setDeletePending] = React.useState<boolean>(false);
  const [decipheredLinks, setBookLinks] = React.useState<string[]>([]);

  const [filterError, setFilterError] = React.useState<string>("");
  const [currentTypeFilterValue, setTypeFilterValue] =
    React.useState<BookType>("simple");
  const [currentMonthFilterValue, setMonthFilterValue] =
    React.useState<number>(0);

  React.useEffect(() => {
    setFilteredBooks(books || []);
  }, [books]);

  // decrypted book links
  React.useEffect(() => {
    const fetchAndDecryptLinks = async () => {
      const linksArray = await Promise.all(
        filteredBooks.map(async (book) => {
          return await antagonist(
            book?.book_link as string,
            twib?.id as string
          );
        }) || []
      );

      setBookLinks(linksArray || []);
    };

    fetchAndDecryptLinks();
  }, [filteredBooks, twib?.id]);

  const createSimpleBookmark = React.useCallback(
    async (title: string, link: string) => {
      const { error } = await supabase.from("books").insert({
        id: `${twib?.id}`,
        title: title,
        book_type:
          link.includes("twitter") || link.includes("x.com")
            ? "simple"
            : "external",
        book_id: crypto.randomUUID(),
        book_link: await protector(link, twib?.id),
        book_created_at: new Date().toISOString(),
      });

      if (!error) {
        openToast(`Bookmarked successfully!"`, "success");
        refetchBooks();
        setFilteredBooks(books || []);
        onClose();
      } else {
        openToast(error.message, "error");
      }
    },
    [onClose, books, openToast, refetchBooks, twib?.id]
  );

  const deleteBook = async (id: string) => {
    try {
      setDeletePending(true);
      const { error } = await supabase.from("books").delete().eq("book_id", id);

      if (!error) {
        setDeletePending(false);
        openToast("Bookmark deleted successfully!", "success");
        refetchBooks();

        onClose();
      } else {
        setDeletePending(false);
        openToast(error.message, "error");
      }
    } catch (error) {
      setDeletePending(false);
      openToast("Something went wrong. Please try again.", "error");
    }
  };

  const debouncedSearch = debounce((searchQuery: string) => {
    setSearchTerm(searchQuery.toLowerCase());

    const filtered = books?.filter((book) =>
      book.title?.toLowerCase().includes(searchQuery)
    );

    setFilteredBooks(filtered || []);

    if (filtered?.length === 0) {
      setSearchError("No bookmarks with this title exist.");
    } else {
      setSearchError("");
    }
  }, 300);

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    debouncedSearch(query);
  };

  const monthOptions = Object.keys(months).map((month, index) => ({
    value: index,
    label: month,
  }));

  const typeOptions = Object.keys(bookTypes).map((bookType) => ({
    value: bookType,
    label: bookType,
  }));

  const onMonthFilter = (value: number) => {
    // @ts-ignore
    const filteredByMonth = filterBooks(books).byMonth(value);

    setMonthFilterValue(value);
    const filterByTypeAndMonth = filterBooks(filteredByMonth).byType(
      currentTypeFilterValue
    );

    setFilteredBooks(filterByTypeAndMonth || []);

    if (filterByTypeAndMonth.length === 0) {
      setFilterError("You did not create any bookmark in this month");
    }
  };

  const onTypeFilter = (type: BookType) => {
    // @ts-ignore
    const filteredByType = filterBooks(books).byType(type);

    setTypeFilterValue(type);
    const filteredByMonthAndType = filterBooks(filteredByType).byMonth(
      currentMonthFilterValue
    );

    setFilteredBooks(filteredByMonthAndType || []);

    if (filteredByMonthAndType.length === 0) {
      setFilterError("No bookmarks found with this filter");
    }
  };

  return (
    <>
      <MetaData url="twibbok.app" pageTitle="Dashboard &mdash; twiBook" />

      <DashboardLayout>
        {filteredBooks.length === 0 && books?.length === 0 ? (
          <NoBookmarks openModal={onOpen} />
        ) : (
          <Box py=".8em">
            <Stack direction={{ lg: "row", base: "column", md: "column" }}>
              <Box width={{ lg: "50%", base: "100%", md: "100%" }}>
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
                    border="1px solid var(--matte-black)"
                    _placeholder={{ color: "var(--alt-text)" }}
                    _hover={{ border: "2px solid var(--matte-black)" }}
                  />
                </InputGroup>
              </Box>

              <HStack
                width={{ lg: "50%", md: "100%", base: "100%" }}
                marginTop={{ base: "-1em", md: "-1em", lg: "0" }}
              >
                <Box width={{ lg: "50%", base: "50%", md: "50%" }}>
                  <SelectField
                    options={monthOptions}
                    onChange={(choice) => onMonthFilter(choice.value)}
                    placeholder="Filter by month"
                  />
                </Box>

                <Box width={{ lg: "50%", base: "50%", md: "50%" }}>
                  <SelectField
                    options={typeOptions}
                    placeholder="Filter by type"
                    onChange={(choice) => onTypeFilter(choice.value)}
                  />
                </Box>
              </HStack>
            </Stack>

            {searchError !== "" ? (
              <Text color="var(--alt-text)" textAlign="center" py="1em">
                {searchError}
              </Text>
            ) : null}

            {filterError !== "" && filteredBooks.length === 0 ? (
              <Text color="var(--alt-text)" textAlign="center" py="1em">
                {filterError}
              </Text>
            ) : null}

            {loading ? (
              <Center>
                <Spinner mt="2.5em" color="var(--matte-black)" />
              </Center>
            ) : (
              <Flex gap="1em" flexWrap="wrap" my="2em">
                {filteredBooks?.map(
                  ({ book_id, book_type, title, book_created_at }, index) => {
                    return (
                      <BookmarkCard
                        title={title}
                        id={book_id}
                        type={book_type}
                        bookId={book_id}
                        bookLink={decipheredLinks?.[index]}
                        pendingDelete={isDeletePending}
                        key={`book-${index}-${book_id}`}
                        onDelete={() => deleteBook(book_id)}
                        createdAt={dateFromNow(book_created_at)}
                      />
                    );
                  }
                )}
              </Flex>
            )}

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
          title={
            booksThisMonth === Quotas.FREE && twib?.has_license === false
              ? `Upgrade to ${
                  twib.license_type === "free"
                    ? "Basic"
                    : twib?.license_type === "basic"
                    ? "Pro"
                    : twib?.license_type === "pro"
                    ? "Custom"
                    : "Basic"
                }`
              : "Create a simple bookmark"
          }
        >
          {(booksThisMonth === Quotas.FREE && twib?.has_license === false) ||
          (booksThisMonth === Quotas.BASIC && twib?.license_type === "basic") ||
          (booksThisMonth === Quotas.PRO && twib?.license_type === "pro") ? (
            <Box>
              <Text py=".8em" color="var(--alt-text)">
                You have exhausted your monthly quota. upgrade to{" "}
                {twib?.license_type === "free"
                  ? "Basic"
                  : twib?.license_type === "basic"
                  ? "Pro"
                  : twib?.license_type === "pro"
                  ? "Custom"
                  : "Basic"}{" "}
                to do more with twiBook.
              </Text>

              <Box my=".4em" mt=".4em">
                <CustomButton
                  type="button"
                  height="50px"
                  width="100%"
                  fontSize="20px"
                  fontWeight="400"
                  hoverBg="var(--true-purple)"
                  background="var(--true-purple)"
                >
                  Upgrade to{" "}
                  <Box
                    as="span"
                    pt=".2em"
                    px=".4em"
                    mx=".1em"
                    borderRadius="3px"
                    fontSize="16px"
                    fontWeight="bold"
                    background="var(--true-purple-600)"
                  >
                    PRO
                  </Box>
                </CustomButton>
              </Box>
            </Box>
          ) : (
            <Formik
              initialValues={{ bookmarkTitle: "", bookmarkLink: "" }}
              validationSchema={
                twib?.license_type === "free" || twib?.has_license === false
                  ? createBookmarkSchema
                  : createBookmarkSchema_LICENSED
              }
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
          )}
        </ModalLayout>
      </DashboardLayout>
    </>
  );
};
