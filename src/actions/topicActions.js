import fetch from 'isomorphic-fetch';
import actionTypes from '../constants/actionTypes';

const apiUrlBase = 'https://cnodejs.org/api/v1';


const {
  GET_TOPIC_LISTS_COMPLETED,
  // GET_TOPIC_LISTS_FIRST_COMPLETED,
  GET_TOPIC_LISTS_FETCHING,
  GO_BACK_TOPIC_LIST,

  GET_TOPIC_BYID_FETCHING,
  GET_TOPIC_BYID_COMPLETED,
  SWITCH_TAB,
} = actionTypes;

export function getTopics(page = 1, tab = 'all', scrollTop = 0, showFetching = false, limit = 15, mdrender = true) {
  return (dispatch) => {
    dispatch({
      type: GET_TOPIC_LISTS_FETCHING,
      result: {
        page, limit, tab, showFetching,
      },
    });
    const apiUrl = `${apiUrlBase}/topics?page=${page}&tab=${tab}&limit=${limit}&mdrender=${mdrender}`;
    fetch(apiUrl).then(response => response.json()).then(({ data }) => {
      const result = { page, limit, tab, scrollTop, data };
      dispatch({
        type: GET_TOPIC_LISTS_COMPLETED,
        result,
      });
    });
  };
}

export function goBackTopicList() {
  return (dispatch) => {
    dispatch({ type: GO_BACK_TOPIC_LIST });
  };
}


export function getTopicById(topicId) {
  return (dispatch) => {
    dispatch({
      type: GET_TOPIC_BYID_FETCHING,
    });
    const apiUrl = `${apiUrlBase}/topic/${topicId}`;
    fetch(apiUrl).then(r => r.json()).then(({ data }) => {
      dispatch({
        type: GET_TOPIC_BYID_COMPLETED,
        result: data,
      });
    });
  };
}


export function switchTab(tab, scrollTop) {
  return {
    type: SWITCH_TAB,
    result: {
      tab,
      scrollTop,
    },
  };
}
