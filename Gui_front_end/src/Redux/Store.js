// //quede aca (●'◡'●)cons
import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk'; // Asegúrate de tener esto
import logger from 'redux-logger'; // Asegúrate de tener esto
import institutionReducer from '../Redux/Slices/SliceInstitution'; //Se importan con un nombre cualquiera, no esta definido en el archico.
import staffReducer from '../Redux/Slices/SliceStaff';
import groupReducer from '../Redux/Slices/SliceGroup';

const Store = configureStore({
  reducer: {
    institution: institutionReducer,
    staff: staffReducer,
    group: groupReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, logger),//Se usa solo en desarrollo.
});

export default Store;

