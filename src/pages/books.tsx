import {
  Box,
  Button,
  Icon,
  IconButton,
  Link,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import AppLayouts from "app/layouts/AppLayouts";
import React, { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import CreateBook from "app/component/CreateBook";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { setBooks } from "app/state/reducer/books.reducer";
import { useAuth } from "app/state/hooks/auth.hooks";
import UpdateBook from "app/component/UpdateBook";
const GET_BOOKS = gql`
  query Query {
    books {
      id
      name
      description
    }
  }
`;
const DELETE_BOOK = gql`
  mutation deleteBook($id: Int!) {
    removeBook(id: $id) {
      id
      name
      description
    }
  }
`;

const Books = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [deleteBook, { data: deleted, loading: deleteLoading }] =
    useMutation(DELETE_BOOK);
  const [selected, setSelected] = useState({});
  const dispatch = useDispatch();
  const { token, books } = useAuth();

  const removeBook = (id: string) => {
    deleteBook({ variables: { id: id } });
  };
  useEffect(() => {
    if (!isEmpty(deleted)) {
      const { removeBook } = deleted;
      const newbooks = books.filter((book: any) => book.id !== removeBook.id);
      console.log(removeBook);
      dispatch(setBooks({ books: newbooks }));
    }
  }, [deleted]);

  const updateBook = (book: any) => {
    setSelected(book);
    setUpdate(true);
  };
  useEffect(() => {
    console.log(data);
    if (!isEmpty(data)) {
      dispatch(setBooks({ books: data.books }));
    }
  }, [data]);
  useEffect(() => {}, [books]);

  return (
    <AppLayouts>
      <Box
        h={"200%"}
        mt={24}
        mb={"4"}
        display={"flex"}
        alignItems={"flex-end"}
        justifyContent={"flex-end"}
      >
        {/* <AnalyticsContainer /> */}
        <Button
          _hover={{ bg: "blue.400" }}
          onClick={() => setCreate(true)}
          color="white"
          bg="blue.400"
        >
          Create Book
        </Button>
      </Box>
      {create && (
        <CreateBook isOpen={create} onClose={() => setCreate(false)} />
      )}
      {update && (
        <UpdateBook
          isOpen={update}
          book={selected}
          onClose={() => setUpdate(false)}
        />
      )}

      <TableContainer bg="white" rounded={"2xl"}>
        <Table size="md">
          <Thead bg="blue.400">
            <Tr>
              <Th color="white">Book S/N</Th>
              <Th color="white">Name</Th>
              <Th color="white">Descrition</Th>
              <Th color="white">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isEmpty(books) ? (
              <Tr>
                <Th
                  colSpan={4}
                  textAlign={"center"}
                  color="black"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  {loading ? <Spinner /> : <Text>No books available</Text>}
                </Th>
              </Tr>
            ) : (
              <>
                {books.map((book: any, index: number) => (
                  <Tr key={index}>
                    <Td>{book.id}</Td>
                    <Td>{book.name}</Td>
                    <Td>{book.description}</Td>
                    <Td>
                      <IconButton
                        onClick={() => updateBook(book)}
                        color="orange.200"
                        fontSize={"24"}
                        mr={2}
                        aria-label="Search database"
                        icon={<Icon as={FiEdit3} />}
                      />
                      <IconButton
                        onClick={() => removeBook(book.id)}
                        color="red.500"
                        fontSize={"24"}
                        aria-label="Search database"
                        icon={<Icon as={MdDeleteForever} />}
                      />
                    </Td>
                  </Tr>
                ))}
              </>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </AppLayouts>
  );
};

export default Books;
