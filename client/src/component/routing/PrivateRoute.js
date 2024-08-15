import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ element: Component }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;

  if (loading) {
    return <div>Loading...</div>; // Or any loading spinner
  }

  return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default PrivateRoute;
