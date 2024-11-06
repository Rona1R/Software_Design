import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const loggedUser = JSON.parse(localStorage.getItem("userDetails"));

  if (!loggedUser || !(loggedUser.roles.includes("Admin") || loggedUser.roles.includes("Menaxher"))) {
    return <Navigate to="/access-denied" />;
  }

  return children;

};

export default PrivateRoute;
