import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";

interface ModalLayoutProps {
  title: string;
  children: React.ReactNode;
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
    | "full";
  onClose: () => void;
  isOpen: boolean;
}

export const ModalLayout = ({
  size,
  title,
  onClose,
  isOpen,
  children,
}: ModalLayoutProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "sm", md: size, lg: size }}
      isCentered
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent
        background="var(--alte-black)"
        border="1px solid var(--alte-grey)"
      >
        <ModalHeader
          fontWeight="normal"
          color="var(--alt-text)"
          px=".8em"
          py=".8em"
          borderBottom="1px solid var(--matte-black)"
        >
          {title}
        </ModalHeader>
        <ModalCloseButton
          border="1px solid var(--matte-black)"
          color="var(--alt-text)"
        />
        <ModalBody px=".8em" py=".8em">
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
