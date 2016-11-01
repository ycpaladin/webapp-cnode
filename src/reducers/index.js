import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import topicReducer from './topicReducer';

const rootReducer = combineReducers({
    topicReducer,
    routing: routerReducer
});

export default rootReducer;