import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppRoutes from './AppRoutes.jsx';
import initI18next from './initI18next.js';
import store from './slices/store.js';

const init = async () => {
  await initI18next();

  console.log(store.getState());

  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
};

export default init;
