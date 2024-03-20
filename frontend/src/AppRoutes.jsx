import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import LoginPage from './pages/login/LoginPage';
import SignUpPage from './pages/signup/SignUpPage';
import ChatPage from './pages/chat/HomePage';
import ErrorPage from './pages/404/ErrorPage';
import Header from './components/Header';

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.user);

  return (
    token ? children : <Navigate to="/login" />
  );
};

const AppRoutes = () => (
  <Router>
    <div className="d-flex flex-column h-100">
      <Header />
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
    </div>
  </Router>
);

export default AppRoutes;
