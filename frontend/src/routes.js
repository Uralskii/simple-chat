const routes = {
  channelsPath: () => '/api/v1/channels',
  messagesPath: () => '/api/v1/messages',
  idChannelPath: (id) => `/api/v1/channels/${id}`,
  loginPath: () => 'api/v1/login',
  signUpPath: () => 'api/v1/signup',
};

export default routes;
