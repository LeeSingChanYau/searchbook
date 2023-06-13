import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types/types';

export interface SearchState {
  value: string;
  books: Book[];
  wishlist: Book[];
}

const initialState: SearchState = {
  value: '',
  books: [],
  wishlist: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
    },
    addToWishlist: (state, action: PayloadAction<Book>) => {
      const bookToAdd = action.payload;
      const isBookInWishlist = state.wishlist.find(
        (book) => book.id === bookToAdd.id
      );
      if (!isBookInWishlist) {
        state.wishlist.push(bookToAdd);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      const bookId = action.payload;
      state.wishlist = state.wishlist.filter((book) => book.id !== bookId);
    },
  },
});

export const { setValue, setBooks, addToWishlist, removeFromWishlist } =
  searchSlice.actions;

export default searchSlice.reducer;
