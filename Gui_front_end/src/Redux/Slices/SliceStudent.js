import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const domain = window.location.hostname 

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export const fetchStudent = createAsyncThunk(
  'student/fetchStudent',
  async () => {
      const token = getCookie('AuthCookie'); // Obtener el token de la cookie
      console.log(token);

      const response = await fetch(`http://${domain}:8000/api/students/students/`, {
          headers: {
              Authorization: `Bearer ${token}`, // Agregar el token al header
              'Content-Type': 'application/json', // Especificar el tipo de contenido, si es necesario
          },
          withCredentials: true,
          credentials: 'include', 
      });

      if (!response.ok) {
          throw new Error('Failed to fetch student');
      }
      return response.json();
  }
);

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudent.pending, (state) => {
        state.loading = true; // Indica que la carga ha comenzado
        state.error = null; // Resetea cualquier error anterior
      })
      .addCase(fetchStudent.fulfilled, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.items = action.payload; // Almacena los productos en el estado
      })
      .addCase(fetchStudent.rejected, (state, action) => {
        state.loading = false; // La carga ha terminado
        state.error = action.error.message; // Almacena el error
      });
  },
});

// Exporta el reducer
export default studentSlice.reducer;
