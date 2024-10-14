
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const domain = window.location.hostname 

// Thunk para realizar la llamada a la API
export const fetchStaff = createAsyncThunk(
  'staff/fetchstaff',
  async () => {
    const response = await fetch(`http://${domain}:8000/api/staff/staff/`); // Cambia esto por tu API
    if (!response.ok) {
      throw new Error('Failed to fetch staff');
    }
    return response.json();
  }
);

const staffSlice = createSlice({
  name: 'staff',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaff.pending, (state) => {
        state.loading = true; // Indica que la carga ha comenzado
        state.error = null; // Resetea cualquier error anterior
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.items = action.payload; // Almacena los productos en el estado
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.error = action.error.message; // Almacena el error
      });
  },
});

// Exporta el reducer
export default staffSlice.reducer;
