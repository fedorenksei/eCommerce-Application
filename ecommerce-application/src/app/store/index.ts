import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../shared/store/isAuthSlice';
import customerDataReducer from '../../shared/store/customerDataSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    auth: authReducer,
    customerData: customerDataReducer,
  },
});

export default store;
