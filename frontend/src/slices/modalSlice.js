import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { isOpen: false, type: '' },
  reducers: {
    setModalShow: (state, action) => {
      const { isOpen, type } = action.payload;
      state.isOpen = isOpen;
      state.type = type;
    },
    removeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { setModalShow, removeModal } = modalSlice.actions;
export default modalSlice.reducer;
