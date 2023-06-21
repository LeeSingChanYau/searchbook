import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store';

export interface SearchState {
  suggestions: string[];
  showSuggestion: boolean;
}

const initialState: SearchState = {
  suggestions: [],
  showSuggestion: false,
};

export const searchSuggestions = createAsyncThunk<
  // Return type of the payload creator
  any,
  // First argument to the payload creator
  undefined,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch;
    state: RootState;
  }
>('searchbook/searchSuggestion', async (args, thunkAPI) => {
  const { value } = thunkAPI.getState().search;
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${value}&startIndex=0&maxResults=10`
  );
  if (!res.ok) {
    throw new Error('Request failed');
  }
  const data = await res.json();
  const suggestions: string[] = data.items.map((item: any) => {
    const volumeInfo = item.volumeInfo;
    const book: string = volumeInfo.title;
    return book;
  });
  console.log(suggestions);
  return suggestions;
});

export const suggestionSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    updateShowSuggestion: (state, action) => {
      state.showSuggestion = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchSuggestions.fulfilled, (state, action) => {
      state.suggestions = action.payload;
    });
  },
});

export const { updateShowSuggestion } = suggestionSlice.actions;

export default suggestionSlice.reducer;
