import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from './pages/signin/LoginPage';
import SignUpPage from './pages/signup/SignUpPage';
import HomePage from './pages/chat/HomePage';
import ErrorPage from './pages/404/ErrorPage';
import Header from './components/Header';

import { setCredentials } from './slices/usersSlice.js';

const PrivateRoute = ({ children }) => {
  const authData = JSON.parse(localStorage.getItem('userId'));
  const dispatch = useDispatch();

  if (authData) {
    dispatch(setCredentials(authData));
    return children;
  }
  return (
    <Navigate to="/login" />
  );
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Header />}>
      <Route
        index
        element={(
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        )}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
