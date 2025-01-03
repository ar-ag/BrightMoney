import { configureStore } from '@reduxjs/toolkit';

import billReducer from '../features/bills/billSlice'
import budgetReducer from '../features/budget/budgetSlice'
export const store = configureStore({
  reducer: {
    bills:billReducer,
    budget:budgetReducer
  },
});