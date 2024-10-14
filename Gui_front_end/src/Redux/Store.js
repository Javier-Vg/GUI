// // quede aca (●'◡'●)cons
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import {thunk} from 'redux-thunk';
// import logger from "redux-logger";
// import { Reducer } from "./Reducer";

// const rootreducer = combineReducers(
//   { user: Reducer 
//     //Aca añadirias otro reducer, 
//   });

// const Store = configureStore({
//   reducer: rootreducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, logger),
// });
// //quede aca (●'◡'●)cons




// import { configureStore } from '@reduxjs/toolkit';
// import {thunk} from 'redux-thunk'; // Asegúrate de tener esto
// // import logger from 'redux-logger'; // Asegúrate de tener esto
// import institutionReducer from '../Redux/Slices/SliceInstitution'; //Se importan con un nombre cualquiera, no esta definido en el archico.
// import staffReducer from '../Redux/Slices/SliceStaff';
// import groupReducer from '../Redux/Slices/SliceGroup';
// import studentReducer from '../Redux/Slices/SliceStudent';
// import subjectReducer from '../Redux/Slices/SliceSubjects';
// import scheduleReducer from '../Redux/Slices/SliceSchedule';
// import taskReducer from '../Redux/Slices/SliceTask';
// import loginReducer from '../Redux/Slices/SliceLogin';
// import contractReducer from '../Redux/Slices/SliceContract';
// import eventReducer from '../Redux/Slices/SliceEvent';
// const isDev = process.env.NODE_ENV === 'development';

// const Store = configureStore({
//   reducer: {
//     institutions: institutionReducer,
//     staff: staffReducer,
//     group: groupReducer,
//     student: studentReducer,
//     subject: subjectReducer,
//     schedule: scheduleReducer,
//     task: taskReducer,
//     login: loginReducer,
//     contract: contractReducer,
//     event: eventReducer

//   },
//   middleware: (getDefaultMiddleware) => {
//     const middlewares = getDefaultMiddleware().concat(thunk);

//     // if (isDev) {
//     //   middlewares.push(logger); // Solo agregar logger en desarrollo
//     // }

//     return middlewares;
//   },
//   devTools: isDev, // Habilitar DevTools solo en desarrollo
  
// });

// export default Store;

import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; 
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usará localStorage por defecto
import institutionReducer from '../Redux/Slices/SliceInstitution';
import staffReducer from '../Redux/Slices/SliceStaff';
import groupReducer from '../Redux/Slices/SliceGroup';
import studentReducer from '../Redux/Slices/SliceStudent';
import subjectReducer from '../Redux/Slices/SliceSubjects';
import scheduleReducer from '../Redux/Slices/SliceSchedule';
import taskReducer from '../Redux/Slices/SliceTask';
import loginReducer from '../Redux/Slices/SliceLogin';
import SliceInfInstitution from '../Redux/Slices/SliceInfInstitution';

const isDev = process.env.NODE_ENV === 'development';

// Configuración de persistencia
const persistConfig = {
  key: 'root',
  storage,
};

// Combinar todos los reducers en uno solo
const rootReducer = combineReducers({
    institutions: institutionReducer,
    staff: staffReducer,
    group: groupReducer,
    student: studentReducer,
    subject: subjectReducer,
    schedule: scheduleReducer,
    task: taskReducer,
    login: loginReducer,
    contract: contractReducer,
    event: eventReducer,
    infInstitution: SliceInfInstitution,
});

// Aplicar persistencia al rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false, // Deshabilita la verificación de serialización
    }).concat(thunk);
  },
  devTools: isDev,
});

export const persistor = persistStore(Store);
export default Store;
