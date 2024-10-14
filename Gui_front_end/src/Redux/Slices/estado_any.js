import { createSlice } from '@reduxjs/toolkit';

const sharedSlice = createSlice({
  name: 'data',
  initialState: {
    data: "null", // Estado que deseas compartir
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload; // Acción para actualizar el estado
    },
  },
});

export const { setData } = sharedSlice.actions;
export default sharedSlice.reducer;
