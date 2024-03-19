import React from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LoginPage from './pages/signin/LoginPage';
import SignUpPage from './pages/signup/SignUpPage';
import ChatPage from './pages/chat/HomePage';
import ErrorPage from './pages/404/ErrorPage';

import { setCredentials } from './slices/usersSlice';

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const auth = JSON.parse(localStorage.getItem('userId'));

  if (auth) {
    dispatch(setCredentials(auth));
    return children;
  }
  return (
    <Navigate to="/login" />
  );
};

const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={(
        <PrivateRoute>
          <ChatPage />
        </PrivateRoute>
      )}
    />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

export default AppRoutes;
