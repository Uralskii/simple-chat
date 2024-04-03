import React, { lazy } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router, Routes, Route, Navigate, useLocation,
} from 'react-router-dom';

import Header from './components/Header';

const LoginPage = lazy(() => import('./pages/login/LoginPage'));
const SignupPage = lazy(() => import('./pages/signup/SignupPage'));
const ChatPage = lazy(() => import('./pages/chat/HomePage'));
const ErrorPage = lazy(() => import('./pages/404/ErrorPage'));

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.user);
  const location = useLocation()

  return (
    token ? children : <Navigate to="/login" state={{ from: location }}/>
  );
};

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Header />}>
        <Route
          index
          element={(
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          )}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
