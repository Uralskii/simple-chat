import { toast } from 'react-toastify';

const notification = {
  addChannel: (message) => toast.success(message),
  removeChannel: (message) => toast.success(message),
  renameChannel: (message) => toast.success(message),
  errorNotify: (message) => toast.error(message),
};

export default notification;
