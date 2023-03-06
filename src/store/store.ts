import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from 'store/counter/counterSlice';
import userReducer from 'store/users/usersSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userReducer,
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