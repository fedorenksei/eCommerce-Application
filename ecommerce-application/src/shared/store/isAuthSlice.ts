import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
  },
  reducers: {
    setAuth(state, action) {
      state.isAuth = action.payload.isAuth;
    },
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
