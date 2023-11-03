import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface BookState {
  books: any;
}

const initialState: BookState = {
  books: [],
};

export const bookSlice = createSlice({
  name: "bookReducer",
  initialState,
  reducers: {
    setBooks: (state, {payload: {books}}: PayloadAction<{books: any}>) => {
      state.books= books ;
    },
    addBook: (state, {payload: {book}}: PayloadAction<{book: any}>) => {
      state.books.push(book);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBooks, addBook } = bookSlice.actions;

export default bookSlice.reducer;

export const selectBooks = (state: RootState) => state.bookReducer.books;
