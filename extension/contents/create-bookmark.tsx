import {
  Box,
  Button,
  ChakraProvider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react"
import { Form, Formik } from "formik"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor, PlasmoGetInlineAnchorList } from "plasmo"
import React from "react"

import { CustomButton } from "~components/button"
import { InputField } from "~components/input-field"
import { ToastProvider } from "~context/toast-provider"
import { supabase } from "~core/supabase"
import { useToastContext } from "~hooks/toast"

// import { useKeys } from "../../src/hooks/rsa_keys"
// import {  } from "../../src/hooks/toast"
// import { useUser } from "../../src/hooks/user"
import { extractTweetIdFromLink } from "../../src/utils/misc"
// import { protector } from "../../src/utils/protector"
import { createBookmarkSchema_LICENSED } from "../../src/utils/validators/create-bookmark-schema"

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*"],
  all_frames: true
}

console.log("should only show on twitter")

export const getInlineAnchorList: PlasmoGetInlineAnchorList = async () => {
  const anchors = document.querySelectorAll('[data-testid="bookmark"]')

  return Array.from(anchors).map((element) => ({
    element,
    insertPosition: "afterend"
  }))
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  const anchor = document.querySelector('.tweet-link')

  console.log("anchor", anchor)

  return anchor
}


const CreateBookmark = () => {
  //   const { publicKey } = useKeys()

  const { openToast } = useToastContext()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    onOpen()
  }

  const createDetailedBookmark = React.useCallback(
    async (title: string, link: string) => {
      const tweetId = extractTweetIdFromLink(link)

      const { data: session } = await supabase.auth.getSession()
      const userId = session.session.user.id

      const { data: user, error } = await supabase
        .from("account")
        .select()
        .eq("id", userId)
        .single()

      if (
        (tweetId && user.has_license === true) ||
        user.license_type === "pro"
      ) {
        const response = await fetch(
          `https://twibook.app/api/tweet?tweetId=${tweetId}`
        )
        const data = await response.json()

        const { error } = await supabase.from("books").insert({
          id: userId,
          title: title,
          book_type: "detailed",
          book_id: crypto.randomUUID(),
          book_link: link,
          book_created_at: new Date().toISOString(),
          content: JSON.stringify(data)
        })

        if (!error) {
          openToast(`Bookmarked successfully!"`, "success")
          onClose()
        } else {
          openToast(error.message, "error")
        }
      } else if (
        (!error && user.has_license === false) ||
        user.license_type === "basic" ||
        user.license_type === "free"
      ) {
        openToast(`Upgrade your account to use our extension"`, "error")
      }
    },
    [onClose, openToast]
  )

  return (
    <ChakraProvider>
      <Button
        type="button"
        // @ts-ignore
        onClick={openModal}
        style={{
          background: "#8e3dff",
          height: "30px",
          width: "100%",
          border: "none",
          color: "#fff",
          fontSize: "14px",
          borderRadius: "18px",
          textTransform: "capitalize",
          margin: "0 22px",
          cursor: "pointer",
          fontWeight: "bold"
        }}>
        bookmark
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />

        <ModalContent
          background="#131316"
          border="1px solid rgba(255, 255, 255, 0.08)">
          <ModalHeader
            fontWeight="normal"
            color="#a09d9d"
            px=".8em"
            py=".8em"
            borderBottom="1px solid #28282b">
            Create a bookmark
          </ModalHeader>
          <ModalCloseButton border="1px solid #28282b" color="#a09d9d" />
          <ModalBody px=".8em" py=".8em">
            <Formik
              initialValues={{ bookmarkTitle: "", bookmarkLink: "" }}
              validationSchema={createBookmarkSchema_LICENSED}
              onSubmit={async (values, { setSubmitting }) => {
                await createDetailedBookmark(
                  values.bookmarkTitle,
                  values.bookmarkLink
                )
                setSubmitting(false)
              }}>
              {(formik) => (
                // @ts-ignore
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
                      hoverBg="#8e3dff"
                      loading={formik.isSubmitting}
                      background="#8e3dff"
                      loadingText="creating bookmark...">
                      Create bookmark
                    </CustomButton>
                  </Box>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  )
}

const BookmarkUI = () => {
  return (
    <ToastProvider>
      <CreateBookmark />
    </ToastProvider>
  )
}

export default BookmarkUI
