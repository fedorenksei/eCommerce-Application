import { createSlice } from '@reduxjs/toolkit';

const customerDataSlice = createSlice({
  name: 'customerData',
  initialState: {
    customerData: null,
  },
  reducers: {
    setCustomerData(state, action) {
      console.log(action);
      state.customerData = action.payload.customerInfo;
    },
  },
});

export const { setCustomerData } = customerDataSlice.actions;
export default customerDataSlice.reducer;
