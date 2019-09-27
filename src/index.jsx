/* eslint-disable import/no-extraneous-dependencies */
/*
  issue with react-hot-loader
  eventhough those 2 dependencies are only used in development
  eslint has no way to tell that and outputs an error
*/

// react dependencies
import React from 'react';
import ReactDOM from 'react-dom';
// hot reload for development
import { AppContainer } from 'react-hot-loader';

// react redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

import App from './App';

import './diagram-control';

import './style.scss';

const root = document.getElementById('root');

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    root
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
