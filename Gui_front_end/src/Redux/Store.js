// import { combineReducers } from '@reduxjs/toolkit';
// import { configureStore } from '@reduxjs/toolkit';
// import { thunk } from 'redux-thunk'; 

// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // Usará localStorage por defecto
// import SliceInfInstitution from '../Redux/Slices/SliceInfInstitution';

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

// // Configuración de persistencia
// const persistConfig = {
//   key: 'root',
//   storage,
// };

// // Combinar todos los reducers en uno solo
// const rootReducer = combineReducers({
//     institutions: institutionReducer,
//     staff: staffReducer,
//     group: groupReducer,
//     student: studentReducer,
//     subject: subjectReducer,
//     schedule: scheduleReducer,
//     task: taskReducer,
//     login: loginReducer,
//     contract: contractReducer,
//     event: eventReducer,
//     infInstitution: SliceInfInstitution,
// });

// // Aplicar persistencia al rootReducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const Store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware({
//       serializableCheck: false, // Deshabilita la verificación de serialización
//     }).concat(thunk);
//   },
//   devTools: isDev,
// });

// export const persistor = persistStore(Store);
// export default Store;
import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; 
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // Cambiado a sessionStorage
import SliceInfInstitution from '../Redux/Slices/SliceInfInstitution';
import AssignmentGroup from '../Redux/Slices/sliceAssignmentGroup'
import institutionReducer from '../Redux/Slices/SliceInstitution';
import staffReducer from '../Redux/Slices/SliceStaff';
import groupReducer from '../Redux/Slices/SliceGroup';
import studentReducer from '../Redux/Slices/SliceStudent';
import subjectReducer from '../Redux/Slices/SliceSubjects';
import scheduleReducer from '../Redux/Slices/SliceSchedule';
import taskReducer from '../Redux/Slices/SliceTask';
import loginReducer from '../Redux/Slices/SliceLogin';
import contractReducer from '../Redux/Slices/SliceContract';
import eventReducer from '../Redux/Slices/SliceEvent';
import fetchGrades from './Slices/SliceGrades';
import idsReducer from './Slices/IdSlice';
import searchReducer from '../Redux/Slices/searchSlice'
// import AssignmentGroup from '../Redux/Slices/sliceAssignmentGroup';
const isDev = process.env.NODE_ENV === 'development';

// Configuración de persistencia
const persistConfig = {
  key: 'root',
  storage, // Esto ahora se refiere a sessionStorage
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
    grades: fetchGrades,
    groupAssignment: AssignmentGroup, 
    infInstitution: SliceInfInstitution,
    ids: idsReducer,
    search: searchReducer
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
