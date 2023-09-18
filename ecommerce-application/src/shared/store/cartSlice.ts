import { createSlice } from '@reduxjs/toolkit';
import { CartState } from '../types/interfaces';

const initialState: CartState = {
  version: 0,
  id: '',
  lineItems: [],
  totalPrice: 0,
  discountedPrice: 0,
  totalLineItemQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action: { payload: CartState }) {
      state.version = action.payload.version;
      state.id = action.payload.id;
      state.lineItems = action.payload.lineItems;
      state.totalPrice = action.payload.totalPrice;
      state.discountedPrice = action.payload.discountedPrice;
      state.discountCodeId = action.payload.discountCodeId;
      state.totalLineItemQuantity = action.payload.totalLineItemQuantity || 0;
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
