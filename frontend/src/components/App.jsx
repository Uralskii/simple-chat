import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from './LoginPage.jsx';
import HomePage from './HomePage.jsx';
import ErrorPage from './ErrorPage.jsx';

// eslint-disable-next-line arrow-body-style
const App = () => {
  const authData = JSON.parse(localStorage.getItem('userId'));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={authData ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
