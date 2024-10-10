// src/store/loginSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  password: ''
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    }
  }
});

export const { setUsername, setPassword } = loginSlice.actions;

export default loginSlice.reducer;
