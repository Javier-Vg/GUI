// productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const domain = window.location.hostname 

// Thunk para realizar la llamada a la API
export const fetchAssistenceStudent = createAsyncThunk(
  'AssistenceStudent/fetchAssistenceStudent',
  async () => {
    const response = await fetch(`http://${domain}:8000/api/student_assistance/student_assistance/`); // Cambia esto por tu API
    if (!response.ok) {
      throw new Error('Failed to fetch AssistenceStudent');
    }
    return response.json();
  }
);

const AssistenceStudentSlice = createSlice({
  name: 'assistence_student',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssistenceStudent.pending, (state) => {
        state.loading = true; // Indica que la carga ha comenzado
        state.error = null; // Resetea cualquier error anterior
      })
      .addCase(fetchAssistenceStudent.fulfilled, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.items = action.payload; // Almacena los productos en el estado
      })
      .addCase(fetchAssistenceStudent.rejected, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.error = action.error.message; // Almacena el error
      });
  },
});

// Exporta el reducer
export default AssistenceStudentSlice.reducer;
