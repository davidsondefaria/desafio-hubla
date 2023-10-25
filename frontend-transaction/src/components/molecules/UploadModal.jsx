import React from "react";
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
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const UploadModal = ({ isOpen, onClose }) => {
  const { handleSubmit, register } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(
        `${process.env.GATSBY_API_URL}/transactions`,
        {
          method: "POST",
          body: data,
        }
      );
      if (!response.ok) {
        console.log(response.status);
        throw new Error("Algo deu errado");
      }
      console.log(response.json());
      return response.json();
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    mutation.mutate(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload File</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input type="file" name="file" {...register("file")} />
            <Button type="submit" isLoading={mutation.isLoading}>
              Upload
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UploadModal;
