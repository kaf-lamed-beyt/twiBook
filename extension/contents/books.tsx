import {
  Box,
  Button,
  ChakraProvider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { LibraryBig } from "lucide-react"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import React from "react"

import { BookmarkCard } from "~components/book-card"
import { ToastProvider } from "~context/toast-provider"
import { supabase } from "~core/supabase"
import { useBooks } from "~hooks/books"
import { useKeys } from "~hooks/rsa_keys"
import { useToastContext } from "~hooks/toast"
import { dateFromNow } from "~utils/misc"
import { antagonist } from "~utils/protector"

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: document.querySelector('[data-testid="sidebarColumn"]'),
  insertPosition: "afterend"
})

const Bookmarks = () => {
  const { openToast } = useToastContext()
  const { privateKey } = useKeys()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { books, loading, refetchBooks } = useBooks()

  const [mainBooks, setMainBooks] = React.useState([])
  const [decipheredLinks, setBookLinks] = React.useState<string[]>([])
  const [isDeletePending, setDeletePending] = React.useState<boolean>(false)

  React.useEffect(() => {
    setMainBooks(books || [])
  }, [books])

  const deleteBook = async (id: string) => {
    try {
      setDeletePending(true)
      const { error } = await supabase.from("books").delete().eq("book_id", id)

      if (!error) {
        setDeletePending(false)
        openToast("Bookmark deleted successfully!", "success")
        refetchBooks()

        onClose()
      } else {
        setDeletePending(false)
        openToast(error.message, "error")
      }
    } catch (error) {
      setDeletePending(false)
      openToast("Something went wrong. Please try again.", "error")
    }
  }

  // decrypted book links
  React.useEffect(() => {
    const fetchAndDecryptLinks = async () => {
      const linksArray = await Promise.all(
        mainBooks.map(async (book) => {
          return await antagonist(book?.book_link as string, privateKey)
        }) || []
      )

      // @ts-ignore
      setBookLinks(linksArray || [])
    }

    fetchAndDecryptLinks()
  }, [mainBooks, privateKey])

  return (
    <ChakraProvider>
      <Box position="relative">
        <Button
          style={{
            border: "none",
            height: "70px",
            width: "70px",
            borderRadius: "100%",
            background: "#131316",
            marginTop: "20px",
            color: " #fff",
            cursor: "pointer"
          }}
          onClick={onOpen}>
          <LibraryBig size="25" />
        </Button>

        <Box
          style={{
            position: "absolute",
            top: "18px",
            right: "0",
            height: "15px",
            width: "15px",
            borderRadius: "100%",
            background: "#8e3dff"
          }}
        />
      </Box>

      <Drawer size="sm" isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <DrawerContent
          mx="2em"
          my="2em"
          background="#131316"
          height="600px"
          overflowY="auto"
          borderRadius="12px"
          border="1px solid rgba(255, 255, 255, 0.08)">
          <DrawerCloseButton border="1px solid #28282b" color="#a09d9d" />
          <DrawerHeader
            px=".8em"
            py=".8em"
            fontWeight="normal"
            color="#fff"
            borderBottom="1px solid #28282b">
            <Text
              as="h3"
              fontSize={{ lg: "27px", md: "25px" }}
              fontWeight="600"
              display={{ lg: "block", md: "none", base: "none" }}
              onClick={() => window.open("https://twibook.app", "_blank")}
              cursor="pointer">
              twi
              <Text as="span" color="#8e3dff" textDecoration="underline">
                Book
              </Text>
            </Text>
          </DrawerHeader>

          <DrawerBody px=".8em" py="1em">
            {mainBooks.length === 0 ? (
              <Text fontSize="16px" py="1.4em" textAlign="center" color="#fff">
                Bookmarks created with the extension will show up here.
              </Text>
            ) : (
              <Stack direction="column" spacing="3">
                {mainBooks?.map(
                  (
                    { book_id, book_type, title, book_created_at, content },
                    index
                  ) => {
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
                    )
                  }
                )}
              </Stack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </ChakraProvider>
  )
}

const queryClient = new QueryClient()

const BookmarkList = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Bookmarks />
      </ToastProvider>
    </QueryClientProvider>
  )
}

export default BookmarkList
