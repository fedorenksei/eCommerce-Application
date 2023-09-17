import { createSlice } from '@reduxjs/toolkit';

type CartState = {
  id: string;
  lineItems: { id: string; quantity: number }[];
};

const initialState: CartState = {
  id: '',
  lineItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      state.id = action.payload.id;
      state.lineItems = action.payload.lineItems;
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
