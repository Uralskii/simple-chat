import axios from 'axios';

// eslint-disable-next-line object-curly-newline
import { createAsyncThunk, createSlice, createEntityAdapter, current } from '@reduxjs/toolkit';
import routes from '../routes.js';
import getAuthHeader from '../utilities/getAuthHeader.js';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const response = await axios.get(routes.channelsPath(), { headers: getAuthHeader() });
    return response.data;
  },
);

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({ status: 'idle', error: null }),
  reducers: {
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    updateChannel: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        channelsAdapter.setAll(state, action.payload);
        console.log(action.payload);
        console.log(current(state));
        state.status = 'loaded';
      });
  },
});

export const { addChannel, removeChannel, updateChannel } = channelsSlice.actions;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
