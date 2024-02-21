import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';
import channelReducer from './channelSlice.js';
import messageReducer from './messageSlice.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    channels: channelReducer,
    messages: messageReducer,
  },
});

export default store;
