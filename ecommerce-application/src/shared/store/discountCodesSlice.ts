import { createSlice } from '@reduxjs/toolkit';

type DiscountCodesState = {
  discountCodes: { name: string; code: string }[];
};

const initialState: DiscountCodesState = {
  discountCodes: [],
};

const discountCodesSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setDiscountCodes(state, action) {
      state.discountCodes = action.payload.discountCodes;
    },
  },
});

export const { setDiscountCodes } = discountCodesSlice.actions;
export default discountCodesSlice.reducer;
