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
import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk'; // Asegúrate de tener esto
import logger from 'redux-logger'; // Asegúrate de tener esto
import institutionReducer from '../Redux/Slices/SliceInstitution'; //Se importan con un nombre cualquiera, no esta definido en el archico.
import staffReducer from '../Redux/Slices/SliceStaff';
import groupReducer from '../Redux/Slices/SliceGroup';
import studentReducer from '../Redux/Slices/SliceStudent';
import subjectReducer from '../Redux/Slices/SliceSubjects';
import scheduleReducer from '../Redux/Slices/SliceSchedule';

const Store = configureStore({
  reducer: {
    institutions: institutionReducer,
    staff: staffReducer,
    group: groupReducer,
    student: studentReducer,
    subject: subjectReducer,
    schedule: scheduleReducer

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, logger),//Se usa solo en desarrollo.
});

export default Store;

