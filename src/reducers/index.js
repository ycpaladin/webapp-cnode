import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import topicListReducer from './topicListReducer';
import topicReducer from './topicReducer';
const rootReducer = combineReducers({
    topicListReducer,
    topicReducer,
    routing: routerReducer
});

export default rootReducer;