import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/users";
import { postsReducer } from "./reducers/posts";
import { commentsReducer } from "./reducers/comments";

export const store = configureStore({
  reducer: {
    userReducer,
    postsReducer,
    commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
