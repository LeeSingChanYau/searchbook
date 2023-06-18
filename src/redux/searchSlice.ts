import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Book, Result } from '../types/types';
import { AppDispatch, RootState } from './store';
import axios from 'axios';

export interface SearchState {
  value: string;
  books: Book[];
  suggestions: string[];
  isLoading: boolean;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

const initialState: SearchState = {
  value: '',
  books: [],
  suggestions: [],
  isLoading: false,
  itemsPerPage: 20,
  totalPages: 1,
  currentPage: 1,
};

export const search = createAsyncThunk<
  // Return type of the payload creator
  any,
  // First argument to the payload creator
  undefined,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch;
    state: RootState;
  }
>('searchbook/search', async (args, thunkAPI) => {
  const { value, currentPage, itemsPerPage } = thunkAPI.getState().search;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const maxResults = itemsPerPage;
  const res = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${value}&startIndex=${startIndex}&maxResults=${maxResults}`
  );
  const books: Result = {
    items: res.data.items.map((item: any) => {
      const volumeInfo = item.volumeInfo;
      const book: Book = {
        id: item.id,
        title: volumeInfo.title,
        subtitle: volumeInfo.subtitle,
        authors: volumeInfo.authors,
        publishedDate: volumeInfo.publishedDate,
        description: volumeInfo.description,
        thumbnail: volumeInfo.imageLinks
          ? volumeInfo.imageLinks.thumbnail
          : undefined,
      };
      return book;
    }),
    kind: res.data.kind,
    totalItems: res.data.totalItems,
  };
  console.log(books);
  return books;
});

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    updatePage: (state, action: PayloadAction<number>) => {
      const newPage = action.payload;
      console.log('updatePage called');
      if (!(newPage > state.totalPages) && newPage >= 1) {
        console.log('inside conditional statement');
        state.currentPage = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload.items;
        state.totalPages = Math.ceil(
          action.payload.totalItems / state.itemsPerPage
        );
      })
      .addCase(search.rejected, (state, action) => {
        console.log('err', action.error.message);
        state.isLoading = false;
        //show alert
      });
  },
});

export const { setValue, updatePage } = searchSlice.actions;

export default searchSlice.reducer;
