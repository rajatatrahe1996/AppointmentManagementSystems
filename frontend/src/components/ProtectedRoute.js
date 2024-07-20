import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Check if token exists in localStorage or any other authentication mechanism
  if (localStorage.getItem('token')) {
    return children; // Render the protected content if authenticated
  } else {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }
}