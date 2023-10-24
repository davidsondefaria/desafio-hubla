// src/components/UploadModal.tsx
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-use-form";

const UploadModal = ({ isOpen, onClose }) => {
  const { handleSubmit } = useForm();

  const onSubmit = (data) => {
    // TODO POST '/transaction'
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload File</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input type="file" name="file" />
            <Button type="submit">Upload</Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UploadModal;
