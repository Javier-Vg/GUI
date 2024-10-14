// SliceInfInstitution.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  imgInstitution: '',
  nameInstitution: ''
};

const SliceInfInstitution = createSlice({
  name: 'infInstitution',
  initialState,
  reducers: {
    setInstitutionInfo: (state, action) => {
      state.imgInstitution = action.payload.imgInstitution;
      state.nameInstitution = action.payload.nameInstitution;
    },
  },
});

export const { setInstitutionInfo } = SliceInfInstitution.actions;
export default SliceInfInstitution.reducer;
