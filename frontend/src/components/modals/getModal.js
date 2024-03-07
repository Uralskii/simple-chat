import AddModal from './AddModal';

const modals = {
  adding: AddModal,
  removing: '',
  renaming: '',
};

export default (modalName) => modals[modalName];
