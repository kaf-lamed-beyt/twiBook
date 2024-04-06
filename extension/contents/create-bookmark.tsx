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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { supabase } from "core/supabase"
import { Form, Formik } from "formik"
import type { PlasmoCSConfig, PlasmoGetInlineAnchorList } from "plasmo"
import React from "react"

import { CustomButton } from "~components/button"
import { InputField } from "~components/input-field"
import { ToastProvider } from "~context/toast-provider"
import { useToastContext } from "~hooks/toast"

import "../../src/utils/misc"
import "react-dom/client"

import { useKeys } from "~hooks/rsa_keys"
import { protector } from "~utils/protector"

import { createBookmarkSchema_LICENSED } from "../../src/utils/validators/create-bookmark-schema"

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*"],
  all_frames: true
}

const queryClient = new QueryClient()

export const getInlineAnchorList: PlasmoGetInlineAnchorList = async () => {
  const anchors = document.querySelectorAll('[data-testid="bookmark"]')

  return Array.from(anchors).map((element) => {
    const tweetContainer = element.closest('[data-testid="tweet"]')
    const closest = element.parentElement.querySelector("plasmo-csui")

    const tweetLink = tweetContainer
      .querySelector('a[href*="/status/"]')
      .getAttribute("href")

    if (closest) {
      // Wait for the shadow root to become available
      if (closest.shadowRoot) {
        // Access the shadow root
        const shadowRoot = closest.shadowRoot
        const content = shadowRoot.querySelector("#plasmo-inline")

        if (content) {
          content.querySelector("button").setAttribute("dtl", tweetLink)
        } else {
          console.error("Content within shadow root not found")
        }
      } else {
        console.error("Shadow root not found")
      }
    } else {
      console.error("plasmo-csui element not found")
    }

    return {
      element,
      insertPosition: "beforebegin"
    }
  })
}

const CreateBookmark = () => {
  const { openToast } = useToastContext()
  const { publicKey } = useKeys()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [tweetLink, setTweetLink] = React.useState<string>("")

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()

    const link = event.currentTarget.getAttribute("dtl")
    setTweetLink(link || "") // Set to empty string if attribute is not found

    onOpen()
  }

  const createDetailedBookmark = React.useCallback(
    async (title: string, link: string) => {
      const { data: session } = await supabase.auth.getSession()
      const userId = session.session.user.id

      const { data: user, error } = await supabase
        .from("account")
        .select()
        .eq("id", userId)
        .single()

      if (user.has_license === true || user.license_type === "pro") {
        if (!publicKey) return

        const { error } = await supabase.from("books").insert({
          id: userId,
          title: title,
          book_type: "detailed",
          book_id: crypto.randomUUID(),
          book_link: await protector(link, publicKey),
          book_created_at: new Date().toISOString(),
          platform: await protector("ext", publicKey)
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
    [onClose, openToast, publicKey]
  )

  return (
    <ChakraProvider>
      <Button
        type="button"
        id="twibook__button"
        onClick={(e) => openModal(e)}
        style={{
          background: "#8e3dff",
          height: "30px",
          width: "fit-content",
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
              initialValues={{
                bookmarkTitle: "Untitled bookmark",
                bookmarkLink: `https://twitter.com${tweetLink}`
              }}
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
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <CreateBookmark />
      </ToastProvider>
    </QueryClientProvider>
  )
}

export default BookmarkUI
