import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from 'store/counter/counterSlice';
import userReducer from 'store/users/usersSlice';
import itemReducer from 'store/items/itemsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userReducer,
    items: itemReducer,
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
