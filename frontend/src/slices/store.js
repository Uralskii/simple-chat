import { configureStore } from '@reduxjs/toolkit';

import usersReducer from './usersSlice.js';
import channelsReducer from './channelSlice.js';
import messagesReducer from './messageSlice.js';

export default configureStore({
  reducer: {
    users: usersReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
