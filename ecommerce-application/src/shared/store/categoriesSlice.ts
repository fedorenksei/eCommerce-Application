import { createSlice } from '@reduxjs/toolkit';

type CategoriesState = {
  categoriesData: Record<string, string>;
};

const initialState: CategoriesState = {
  categoriesData: {},
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categoriesData = action.payload;
      console.log(state.categoriesData);
    },
  },
});

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
