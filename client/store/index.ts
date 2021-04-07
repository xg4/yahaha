import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { messagesReducer } from './slices';

export * from './slices';

const rootReducer = combineReducers({
  messages: messagesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
});
