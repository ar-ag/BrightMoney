import { configureStore } from '@reduxjs/toolkit';

import billReducer from '../features/bills/billSlice'

export const store = configureStore({
  reducer: {
    bills:billReducer
  },
});