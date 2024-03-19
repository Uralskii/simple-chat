import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice.js';
import channelsReducer from './channelSlice.js';
import messagesReducer from './messageSlice.js';

export default configureStore({
  reducer: {
    user: userReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
