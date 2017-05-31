import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, getHistory } from './configureStore';
import Routers from './routes';
import './assets/iconfont/demo.css';
import '../node_modules/flex.css/dist/data-flex.css';
import './assets/second.scss';

const store = configureStore();
const history = getHistory();

render(
  <Provider store={store}>
    <Routers history={history} />
  </Provider>,
  document.querySelector('#container'));
