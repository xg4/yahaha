import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { unionBy } from 'lodash';
import { RootState } from '../';

type MessagesState = {
  list: Message[];
};

const initialState: MessagesState = {
  list: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<{ messages: Message[] }>) => {
      state.list = unionBy(action.payload.messages, state.list, 'id');
    },
  },
});

export const selectMessages = (state: RootState) => state.messages;

export const selectMessagesByKey = (state: RootState) => state.messages;

export const { add } = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
