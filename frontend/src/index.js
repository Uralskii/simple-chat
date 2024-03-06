import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import store from './slices/store.js';

const app = () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  );
};

app();
