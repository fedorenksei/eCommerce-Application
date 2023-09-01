import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filtersParams',
  initialState: {
    colors: [],
    genders: [],
    prices: {
      min: 0,
      max: 0,
    },
    sizes: [],
    styles: [],
  },
  reducers: {
    setFiltersState(state, action) {
      state = action.payload;
    },
  },
});

export const { setFiltersState } = filtersSlice.actions;
export default filtersSlice.reducer;
