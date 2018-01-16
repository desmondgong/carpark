import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import storeFactory from './stores/configureStore';
import App from './containers/App';
import './resources/sass/index.scss';

const store = storeFactory();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content'),
);
