// institutionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const domain = window.location.hostname 

// Thunk para realizar la llamada a la API
export const fetchInstitution = createAsyncThunk(
  'institutions/fetchinstitutions',
  async () => {
    const response = await fetch(`http://${domain}:8000/api/institutions/institution/`); // Cambia esto por tu API
    if (!response.ok) {
      throw new Error('Failed to fetch institutions');
    }
    return response.json();
  }
);

const institutionSlice = createSlice({
  name: 'institutions',
  initialState: {
    items: [],
    loading: false,
    error: null,
    InstitutionID: 0
  },
  reducers: {
    setID: (state, action) => {
      state.institution_id = action.payload; // Establece el valor del id de la institucion.
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstitution.pending, (state) => {
        state.loading = true; // Indica que la carga ha comenzado
        state.error = null; // Resetea cualquier error anterior
      })
      .addCase(fetchInstitution.fulfilled, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.items = action.payload; // Almacena los institutionos en el estado
      })
      .addCase(fetchInstitution.rejected, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.error = action.error.message; // Almacena el error
      });
  },
});

// Exportar la acción generada, el id
export const { setID } = institutionSlice.actions;

// Exporta el reducer
export default institutionSlice.reducer;
