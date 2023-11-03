import authReducer from "./reducer/auth.reducer";
import bookReducer from "./reducer/books.reducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth.service";
import { setupListeners } from "@reduxjs/toolkit/query";


const reducers = combineReducers({
    authReducer,
    bookReducer,
    [authApi.reducerPath]: authApi.reducer,
})
export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
