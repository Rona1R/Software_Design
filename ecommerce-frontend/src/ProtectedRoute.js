import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const loggedUser = JSON.parse(localStorage.getItem("userDetails"));

  if (!loggedUser) {
    return <Navigate to="/LogIn"/>;
  }

  return children;

};

export default ProtectedRoute;
