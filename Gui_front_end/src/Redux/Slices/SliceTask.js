
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const domain = window.location.hostname 

// Thunk para realizar la llamada a la API
export const fetchTask = createAsyncThunk(
  'Task/fetchTask',
  async () => {
    const response = await fetch(`http://${domain}:8000/api/tasks/tasks/`); // Cambia esto por tu API
    if (!response.ok) {
      throw new Error('Failed to fetch Task');
    }
    return response.json();
  }
);

const TaskSlice = createSlice({
  name: 'Task',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTask.pending, (state) => {
        state.loading = true; // Indica que la carga ha comenzado
        state.error = null; // Resetea cualquier error anterior
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.items = action.payload; // Almacena los productos en el estado
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.error = action.error.message; // Almacena el error
      });
  },
});

// Exporta el reducer
export default TaskSlice.reducer;
