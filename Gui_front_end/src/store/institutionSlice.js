// src/store/institutionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  institutionId: '', // Estado inicial para el ID de la institución
};

const institutionSlice = createSlice({
  name: 'institution',
  initialState,
  reducers: {
    setInstitutionId: (state, action) => {
      state.institutionId = action.payload; // Actualiza el estado con el nuevo institutionId
    },
  },
});

export const { setInstitutionId, clearInstitutionId } = institutionSlice.actions;

export default institutionSlice.reducer; // Exporta el reducer
