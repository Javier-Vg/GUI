// productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const domain = window.location.hostname 

// Thunk para realizar la llamada a la API
export const fetchAssignmentGroup = createAsyncThunk(
  'assignmentGroup/fetchAssignmentGroup',
  async () => {
    const response = await fetch(`http://${domain}:8000/api/group_assignment/group_assignment/`); // Cambia esto por tu API
    if (!response.ok) {
      throw new Error('Failed to fetch AssignmentGroup');
    }
    return response.json();
  }
);

const assignmentGroupSlice = createSlice({
  name: 'group_assignment',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignmentGroup.pending, (state) => {
        state.loading = true; // Indica que la carga ha comenzado
        state.error = null; // Resetea cualquier error anterior
      })
      .addCase(fetchAssignmentGroup.fulfilled, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.items = action.payload; // Almacena los productos en el estado
      })
      .addCase(fetchAssignmentGroup.rejected, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.error = action.error.message; // Almacena el error
      });
  },
});

// Exporta el reducer
export default assignmentGroupSlice.reducer;
