import { createSlice, current } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: { messages: [] },
  reducers: {
    getMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
      console.log(current(state));
    },
  },
});

export const { getMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
