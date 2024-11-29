import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
  const authToken = Cookies.get('AuthCookie');
  if (!authToken) {
    // Si no hay token, redirige a la página de error
    return <Navigate to="/error" />;
  }
  // Si hay token, renderiza el componente solicitado
  return children;
};

export default PrivateRoute;
