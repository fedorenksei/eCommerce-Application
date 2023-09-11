import { createSlice } from '@reduxjs/toolkit';

type CartState = {
  version: number;
  id: string;
  lineItems: { id: string; quantity: number }[];
};

const initialState: CartState = {
  version: 0,
  id: '',
  lineItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      state.version = action.payload.version;
      state.id = action.payload.id;
      state.lineItems = action.payload.lineItems;
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
