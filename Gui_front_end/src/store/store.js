// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './inputSlice';

const store = configureStore({
  reducer: {
    login: loginSlice
  }
});

export default store;
