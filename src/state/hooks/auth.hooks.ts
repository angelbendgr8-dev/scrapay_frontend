import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../reducer/auth.reducer";
import { selectBooks } from "../reducer/books.reducer";

export const useAuth = () => {
  const token = useSelector(selectToken);
  const books = useSelector(selectBooks);
  return useMemo(() => ({
   token, books
  }), [token, books]);
};
