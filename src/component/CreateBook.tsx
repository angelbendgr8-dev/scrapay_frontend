import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { addBook } from "app/state/reducer/books.reducer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const CREATE_BOOK = gql`
  mutation CreateBook($createBookData: CreateBookInput!) {
    createBook(createBookInput: $createBookData) {
      id
      name
      description
    }
  }
`;

function CreateBook({ isOpen, onClose }: { isOpen: boolean; onClose: any }) {
  const [createBook, { data, loading }] = useMutation(CREATE_BOOK);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(addBook({ book: data.createBook }));
      onClose();
    }
  }, [data]);

  return (
    <>
      <Modal colorScheme="white" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createBook({
                  variables: { createBookData: { name, description } },
                });
              }}
            >
              <Text>Title</Text>
              <Input
                value={name}
                onChange={(input) => setName(input.target.value)}
              />
              <Text mt={"3"}>Description</Text>
              <Input
                value={description}
                onChange={(input) => setDescription(input.target.value)}
              />
              <Button
                mx="auto"
                my={3}
                type="submit"
                isLoading={loading}
                colorScheme="blue"
              >
                Create
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
export default CreateBook;
