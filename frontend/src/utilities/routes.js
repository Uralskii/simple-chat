const routes = {
  channelsPath: () => '/api/v1/channels',
  messagesPath: () => '/api/v1/messages',
  deleteChannelPath: (id) => `/api/v1/channels/${id}`,
};

export default routes;
