// src/store/slices/idsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const idsSlice = createSlice({
    name: 'ids',
    initialState: {
        staffId: null,         // Inicializa staffId
        institutionId: null,   // Inicializa institutionId
    },
    reducers: {
        setStaffId: (state, action) => {
            state.staffId = action.payload; // Establece el staff_id en el estado
        },
        setInstitutionId: (state, action) => {
            state.institutionId = action.payload; // Establece el institution_id en el estado
        },
        clearStaffId: (state) => {
            state.staffId = null; // Limpia el staff_id
        },
        clearInstitutionId: (state) => {
            state.institutionId = null; // Limpia el institution_id
        },
    },
});

export const { setStaffId, setInstitutionId, clearStaffId, clearInstitutionId } = idsSlice.actions;

export default idsSlice.reducer;
