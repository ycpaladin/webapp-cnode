import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers/index'

import { browserHistory } from 'react-router' // 路由
import { syncHistoryWithStore } from 'react-router-redux' //路由使用redux管理

import Routers from './routes'

const loggerMiddleware = createLogger();

const buildStore = applyMiddleware(
    loggerMiddleware,
    thunkMiddleware
)(createStore);

const store = buildStore(rootReducer, {});

export function configureStore() {
    return store;
}

export function getHistory() {
    //保持历史同步
    const history = syncHistoryWithStore(browserHistory, store)
    return history;
}
