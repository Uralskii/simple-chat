import axios from 'axios';

import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import routes from '../utilities/routes.js';
import getAuthHeader from '../utilities/getAuthHeader.js';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const response = await axios.get(routes.getChannelsPath(), { headers: getAuthHeader() });
    return response.data;
  },
);

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({ status: 'idle', error: null }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, channelsAdapter.addMany);
  },
});

export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
