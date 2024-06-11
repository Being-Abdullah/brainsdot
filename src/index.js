import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { ConfigProvider } from './contexts/ConfigContext';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './services';
import './index.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ChakraProvider>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </ChakraProvider>
  </Provider>
);

reportWebVitals();
