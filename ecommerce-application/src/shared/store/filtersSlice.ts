import { createSlice } from '@reduxjs/toolkit';
import { FiltersState } from '../types/interfaces';

const initialState: FiltersState = {
  variantParams: {
    colors: [],
    genders: [],
    materials: [],
    brands: [],
  },
  priceParams: {
    min: 0,
    max: 0,
  },
};
const filtersSlice = createSlice({
  name: 'filtersParams',
  initialState,
  reducers: {
    setFiltersState(state, action) {
      state.variantParams = action.payload.variantParams;
      state.priceParams = action.payload.priceParams;
    },
  },
});

export const { setFiltersState } = filtersSlice.actions;
export default filtersSlice.reducer;
