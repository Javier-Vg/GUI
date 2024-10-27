import axios from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const domain = window.location.hostname 

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

export const fetchStaff = createAsyncThunk(
    'staff/fetchstaff',
    async () => {
        const token = getCookie('AuthCookie');
        console.log(token);

        try {
          
            const response = await axios.get(`http://${domain}:8000/api/staff/staff/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true,
                credentials: 'include', 
            });            
            return response.data; // Retornar los datos de la respuesta
        } catch (error) {
            console.error("Error fetching staff:", error.message); // Mostrar el mensaje de error
            throw error; // Propaga el error para manejarlo en el llamador
        }
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
