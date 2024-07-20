import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }) {
  // Check if token exists in localStorage or any other authentication mechanism
  if (localStorage.getItem('token')) {
    return <Navigate to="/" replace />; // Redirect to home if authenticated
  } else {
    return children; // Render the public content if not authenticated
  }
}
