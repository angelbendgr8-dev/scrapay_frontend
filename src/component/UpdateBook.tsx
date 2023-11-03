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
  useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "app/state/hooks/auth.hooks";
import { setBooks } from "app/state/reducer/books.reducer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
const EDIT_BOOK = gql`
  mutation updateBook($updateInfo: UpdateBookInput!) {
    updateBook(updateBookInput: $updateInfo) {
      name
      description
    }
  }
`;
function UpdateBook({
  book,
  isOpen,
  onClose,
}: {
  book: any;
  isOpen: boolean;
  onClose: any;
}) {
  const [editBook, { data, loading, error }] = useMutation(EDIT_BOOK);
  const [name, setName] = useState(book.name);
  const [description, setDescription] = useState(book.description);
  const dispatch = useDispatch();

  const { books } = useAuth();

  useEffect(() => {
    if (data) {
      console.log(data);
      const { updateBook } = data;
      const updated = books.map((temp: any) => {
        if (temp.id === book.id) {
          console.log(updateBook)
          return { id: temp.id, ...updateBook };
        }
        return temp;
      });
      console.log(updated)
      dispatch(setBooks({ books: updated }));
      onClose();
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return (
    <>
      <Modal
        colorScheme="white"
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editBook({
                  variables: {
                    updateInfo: { id: book.id, name, description },
                  },
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
                Update
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
export default UpdateBook;
