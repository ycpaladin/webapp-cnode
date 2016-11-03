import './assets/iconfont/demo.css';
import '../node_modules/flex.css/dist/data-flex.css';

import './assets/second.scss';


import React from 'react';
import {render} from 'react-dom';
import { configureStore, getHistory} from './configureStore';
import Routers from './routes';
import {Provider} from 'react-redux';

const store = configureStore();
const history = getHistory();

render(
    <Provider store={store}>
        <Routers history={history} />
    </Provider>,
    document.querySelector('#container')
);