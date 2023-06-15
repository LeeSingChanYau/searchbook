import { AnyAction, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types/types';
import { AppDispatch, RootState } from './store';

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
    updateWishlist: (state, action: PayloadAction<Book[]>) => {
      state.wishlist = action.payload;
    },
  },
});

export const initWishlist = (() =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const newWishlist = JSON.parse(localStorage.getItem('wishlist') ?? '[]');
    dispatch(updateWishlist(newWishlist));
  }) as unknown as () => AnyAction;

export const saveWishlistToLocalStorage = ((payload: Book) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const bookItem = payload;
    const { id } = bookItem;
    const state = getState().search;
    let newWishlist;
    if (!state.wishlist.some((item) => item.id === id)) {
      newWishlist = [bookItem, ...state.wishlist];
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    } else {
      newWishlist = state.wishlist.filter((item) => item.id !== id);
    }
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    dispatch(updateWishlist(newWishlist));
  }) as unknown as (book: Book) => AnyAction;

export const { setValue, setBooks, updateWishlist } = searchSlice.actions;

export default searchSlice.reducer;
