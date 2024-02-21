import { createSlice } from '@reduxjs/toolkit';

const channelSlice = createSlice({
  name: 'channels',
  initialState: { channels: [] },
  reducers: {
    getChannels: (state, action) => {
      state.channels = action.payload;
    },
  },
});

export const { getChannels } = channelSlice.actions;
export default channelSlice.reducer;
