import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider as RollBar, ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';

import AppRoutes from './AppRoutes.jsx';
import initI18next from './initI18next.js';
import store from './slices/store.js';
import ChatContainer from './components/ChatContainer.jsx';
import Header from './components/Header.jsx';

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
          <BrowserRouter>
            <ChatContainer>
              <Header />
              <AppRoutes />
              <ToastContainer />
            </ChatContainer>
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </RollBar>
  );
};

export default init;
