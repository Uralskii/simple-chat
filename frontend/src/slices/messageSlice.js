import axios from 'axios';

import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import routes from '../utilities/routes.js';
import getAuthHeader from '../utilities/getAuthHeader.js';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    const response = await axios.get(routes.getMessagesPath(), { headers: getAuthHeader() });
    return response.data;
  },
);

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState({ status: 'idle', error: null }),
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, messagesAdapter.addMany);
  },
});

export const { addMessage } = messagesSlice.actions;
export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
