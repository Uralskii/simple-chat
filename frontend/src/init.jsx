import React from 'react';
import { Provider } from 'react-redux';
import { Provider as RollBar, ErrorBoundary } from '@rollbar/react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import AppRoutes from './AppRoutes.jsx';
import Modal from './components/modals/Modal.jsx';
import Toast from './components/toast/Toast.jsx';

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
          <Toast />
          <Modal />
        </Provider>
      </ErrorBoundary>
    </RollBar>
  );
};

export default init;
