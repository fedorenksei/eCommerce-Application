import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isShown: false,
    text: '',
  },
  reducers: {
    setIsShown(state, action) {
      state.isShown = action.payload.isShown;
    },
    setText(state, action) {
      state.text = action.payload.text;
    },
  },
});

export const { setIsShown, setText } = modalSlice.actions;
export default modalSlice.reducer;
