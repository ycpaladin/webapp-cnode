import actionTypes from '../constants/actionTypes';

const { GET_TOPIC_BYID_FETCHING, GET_TOPIC_BYID_COMPLETED } = actionTypes;

const defaultState = {
  isFetching: false,
  topic: null,
};

export default function topicReducer(state = defaultState, { type, result }) {
  switch (type) {
    case GET_TOPIC_BYID_FETCHING:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_TOPIC_BYID_COMPLETED:
      return Object.assign({}, state, {
        isFetching: false,
        topic: result,
      });
    default: return state;
  }
}
