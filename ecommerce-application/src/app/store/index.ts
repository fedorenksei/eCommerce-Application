import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../shared/store/isAuthSlice';
import customerDataReducer from '../../shared/store/customerDataSlice';
import modalReducer from '../../shared/store/modalSlice';
import filtersParamsReducer from '../../shared/store/filtersSlice';
import categoriesReducer from '../../shared/store/categoriesSlice';
import cartReducer from '../../shared/store/cartSlice';
import discountCodesReducer from '../../shared/store/discountCodesSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    auth: authReducer,
    customerData: customerDataReducer,
    modal: modalReducer,
    filtersParams: filtersParamsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    discountCodes: discountCodesReducer,
  },
});

export default store;
