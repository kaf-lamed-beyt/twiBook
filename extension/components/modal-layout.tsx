import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react"

interface ModalLayoutProps {
  title: string
  children: React.ReactNode
  size:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "full"
  onClose: () => void
  isOpen: boolean
}

export const ModalLayout = ({
  size,
  title,
  onClose,
  isOpen,
  children
}: ModalLayoutProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "sm", md: size, lg: size }}
      isCentered>
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
          {title}
        </ModalHeader>
        <ModalCloseButton border="1px solid #28282b" color="#a09d9d" />
        <ModalBody px=".8em" py=".8em">
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
