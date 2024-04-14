import axios from 'axios';
import routes from '../routes';
import getAuthHeader from '../utilities/getAuthHeader';

export const createChannel = async (channel) => {
  const res = await axios.post(routes.channelsPath(), channel, { headers: getAuthHeader() });
  return res.data;
};

export const removeChannel = async (id) => {
  await axios.delete(routes.idChannelPath(id), { headers: getAuthHeader() });
};

export const renameChannel = async (id, channel) => {
  await axios.patch(routes.idChannelPath(id), channel, { headers: getAuthHeader() });
};
