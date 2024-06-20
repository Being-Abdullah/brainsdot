import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const accessToken = getCookieValue('accessToken');
  const userId = getCookieValue('userId');

  // Check if both accessToken and userId are present
  if (accessToken && userId) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
};

export default AuthGuard;
