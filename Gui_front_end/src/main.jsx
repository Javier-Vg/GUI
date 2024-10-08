// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa createRoot desde react-dom/client
import { Provider } from 'react-redux';
import App from './App';
import Store from './Redux/Store';

// Obtén el elemento root del DOM
const rootElement = document.getElementById('root');

// Crea el root usando createRoot
const root = ReactDOM.createRoot(rootElement);

// Renderiza la aplicación con Provider y el store
root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);
