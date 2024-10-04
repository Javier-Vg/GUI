// store/inputSlice.js
import { createSlice } from '@reduxjs/toolkit';

const inputSlice = createSlice({
  name: 'input',
  initialState: {
    username: '',
    password: '',
    institutionId: null, // Agrega el estado para el ID de la institución
  },
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setInstitutionId(state, action) {
      state.institutionId = action.payload; // Nueva acción para establecer la institución
    },
  },
});

export const { setUsername, setPassword, setInstitutionId } = inputSlice.actions;
export default inputSlice.reducer;
