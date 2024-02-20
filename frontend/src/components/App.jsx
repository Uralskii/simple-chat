import React from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from '../pages/LoginPage.jsx';
import HomePage from '../pages/HomePage.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';

const PrivateRoute = ({ children }) => {
  const authData = JSON.parse(localStorage.getItem('userId'));

  return (
    authData ? children : <Navigate to="/login" />
  );
};

const App = () => (
  <Routes>
    <Route
      path="/"
      element={(
        <PrivateRoute>
          <HomePage />
        </PrivateRoute>
      )}
    />
    <Route path="/login" element={<LoginPage />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

export default App;
