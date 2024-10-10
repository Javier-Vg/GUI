// //quede aca (●'◡'●)cons
import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk'; // Asegúrate de tener esto
import logger from 'redux-logger'; // Asegúrate de tener esto
import institutionReducer from '../Redux/Slices/SliceInstitution'; //Se importan con un nombre cualquiera, no esta definido en el archico.
import staffReducer from '../Redux/Slices/SliceStaff';
import groupReducer from '../Redux/Slices/SliceGroup';
import studentReducer from '../Redux/Slices/SliceStudent';
import subjectReducer from '../Redux/Slices/SliceSubjects';
import scheduleReducer from '../Redux/Slices/SliceSchedule';
import taskReducer from '../Redux/Slices/SliceTask';

//Prueba:
import datazo from '../Redux/Slices/estado_any';

const isDev = process.env.NODE_ENV === 'development';

const Store = configureStore({
  reducer: {
    institutions: institutionReducer,
    staff: staffReducer,
    group: groupReducer,
    student: studentReducer,
    subject: subjectReducer,
    schedule: scheduleReducer,
    task: taskReducer,
    dato: datazo

  },
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware().concat(thunk);

    if (isDev) {
      middlewares.push(logger); // Solo agregar logger en desarrollo
    }

    return middlewares;
  },
  devTools: isDev, // Habilitar DevTools solo en desarrollo
  
});

export default Store;

