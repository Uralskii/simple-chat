import React from 'react';
import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';

import LoginPage from '../pages/LoginPage.jsx';
import HomePage from '../pages/HomePage.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';
import Header from './Header.jsx';

import { setCredentials } from '../services/userSlice.js';

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

const App = () => (
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
      <Route path="*" element={<ErrorPage />} />
    </Route>
  </Routes>
);

export default App;
