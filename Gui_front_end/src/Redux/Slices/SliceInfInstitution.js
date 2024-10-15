import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  imgInstitution: '',
  nameInstitution: '',
  role: '' // Agregamos el rol al estado inicial
};

const SliceInfInstitution = createSlice({
  name: 'infInstitution',
  initialState,
  reducers: {
    setInstitutionInfo: (state, action) => {
      state.imgInstitution = action.payload.imgInstitution;
      state.nameInstitution = action.payload.nameInstitution;
      state.role = action.payload.role; // Agregamos el rol al payload
      state.auth = action.payload.auth; // Agregamos el auth
    },
  },
});

export const { setInstitutionInfo } = SliceInfInstitution.actions;
export default SliceInfInstitution.reducer;
