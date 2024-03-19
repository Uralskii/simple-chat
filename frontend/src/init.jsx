import React from 'react';
import { Provider } from 'react-redux';
import { Provider as RollBar, ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';

import AppRoutes from './AppRoutes.jsx';

import initI18next from './initI18next.js';
import store from './slices/store.js';

const rollbarConfig = {
  accessToken: 'POST_CLIENT_ITEM_ACCESS_TOKEN',
  environment: 'production',
};

const init = async () => {
  await initI18next();

  return (
    <RollBar config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <AppRoutes />
          <ToastContainer />
        </Provider>
      </ErrorBoundary>
    </RollBar>
  );
};

export default init;
