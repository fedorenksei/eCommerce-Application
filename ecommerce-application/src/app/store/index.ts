import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../shared/store/isAuthSlice';
import customerDataReducer from '../../shared/store/customerDataSlice';
import modalReducer from '../../shared/store/modalSlice';
import filtersParamsReducer from '../../shared/store/filtersSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    auth: authReducer,
    customerData: customerDataReducer,
    modal: modalReducer,
    filtersParams: filtersParamsReducer,
  },
});

export default store;
