import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as RollBar, ErrorBoundary } from '@rollbar/react';

import AppRoutes from './AppRoutes.jsx';
import initI18next from './initI18next.js';
import store from './slices/store.js';

const init = async () => {
  await initI18next();

  const rollbarConfig = {
    accessToken: 'POST_CLIENT_ITEM_ACCESS_TOKEN',
    environment: 'production',
  };

  return (
    <RollBar config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </RollBar>
  );
};

export default init;
