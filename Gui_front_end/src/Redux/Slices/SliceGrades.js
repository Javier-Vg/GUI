// productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const domain = window.location.hostname;

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};
// Thunk para realizar la llamada a la API
export const fetchGrades = createAsyncThunk("grades/fetchGrades", async () => {
  const token = getCookie("AuthCookie"); // Obtener el token de la cookie
  const response = await fetch(`http://${domain}:8000/api/grades/grades/`, {
    headers: {
      Authorization: `Bearer ${token}`, // Agregar el token en los headers
      "Content-Type": "application/json", // Especificar el tipo de contenido si es necesario
    },
    withCredentials: true,
    credentials: "include",
  }); // Cambia esto por tu API
  if (!response.ok) {
    throw new Error("Failed to fetch Grades");
  }
  return response.json();
});

const GradesSlice = createSlice({
  name: "grades",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGrades.pending, (state) => {
        state.loading = true; // Indica que la carga ha comenzado
        state.error = null; // Resetea cualquier error anterior
      })
      .addCase(fetchGrades.fulfilled, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.items = action.payload; // Almacena los productos en el estado
      })
      .addCase(fetchGrades.rejected, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.error = action.error.message; // Almacena el error
      });
  },
});

// Exporta el reducer
export default GradesSlice.reducer;
