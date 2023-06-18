import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './searchSlice';
import wishlistSlice from './wishlistSlice';
import suggestionSlice from './suggestionSlice';

export const store = configureStore({
  reducer: {
    search: searchSlice,
    wishlist: wishlistSlice,
    suggestion: suggestionSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
