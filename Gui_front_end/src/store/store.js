// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './inputSlice';
import institutionSlice from './institutionSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    institution: institutionSlice, // Reducer para el institutionId
  }
});

export default store;
