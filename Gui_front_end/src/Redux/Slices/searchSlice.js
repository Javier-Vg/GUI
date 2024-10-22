// Redux Slice: searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchTerm: '',  // Estado para almacenar el término de búsqueda
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload; // Actualiza el término de búsqueda
        },
        clearSearchTerm: (state) => {
            state.searchTerm = ''; // Limpia el término de búsqueda
        },
    },
});

export const { setSearchTerm, clearSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
