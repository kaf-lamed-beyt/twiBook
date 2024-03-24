import { Box, ChakraProvider, useDisclosure } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import type { PlasmoCSConfig, PlasmoGetInlineAnchorList } from "plasmo"
import React from "react"

import { supabase } from "~core/supabase"

import { CustomButton } from "../../src/components/button"
import { InputField } from "../../src/components/input-field"
import { ModalLayout } from "../../src/components/modal-layout"

import "../../src/context/toast-provider"

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
function CreateBookmark () {
  //   const { twib } = useUser()
  //   const { publicKey } = useKeys()
  //   const { openToast } = useToastContext()
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

      if (tweetId) {
        const response = await fetch(`/api/tweet?tweetId=${tweetId}`)
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
          //   openToast(`Bookmarked successfully!"`, "success")
          onClose()
        } else {
          //   openToast(error.message, "error")
        }
      }
    },
    [onClose]
  )

  return (
    <ChakraProvider>
      <CustomButton
        type="button"
        style={{
          background: "var(--true-purple)",
          height: "30px",
          width: "100%",
          border: "none",
          color: "#fff",
          fontSize: "15px",
          borderRadius: "18px",
          textTransform: "capitalize",
          margin: "0 22px",
          ":hover": {
            cursor: "pointer"
          },
          fontWeight: "500"
        }}
        // @ts-ignore
        onClick={openModal}>
        bookmark
      </CustomButton>

      <ModalLayout
        isOpen={isOpen}
        onClose={onClose}
        title="Create bookmark"
        size="md">
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
                  hoverBg="var(--true-purple)"
                  loading={formik.isSubmitting}
                  background="var(--true-purple)"
                  loadingText="creating bookmark...">
                  Create bookmark
                </CustomButton>
              </Box>
            </Form>
          )}
        </Formik>
      </ModalLayout>
    </ChakraProvider>
  )
}

export default CreateBookmark
