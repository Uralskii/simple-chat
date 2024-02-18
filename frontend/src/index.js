import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

const app = () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(
    <App />,
  );
};

app();
