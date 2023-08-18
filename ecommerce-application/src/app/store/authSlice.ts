import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    customerInfo: null,
  },
  reducers: {
    setAuth(state, action) {
      state.isAuth = action.payload.isAuth;
      state.customerInfo = action.payload.customerInfo;
    },
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
