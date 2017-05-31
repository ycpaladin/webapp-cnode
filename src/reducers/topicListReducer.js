import { List } from 'immutable';
import actionTypes from '../constants/actionTypes';


const {
    // 请求完成
  GET_TOPIC_LISTS_COMPLETED,
  // 第一次请求完成？
  // GET_TOPIC_LISTS_FIRST_COMPLETED,
  // 正在请求
  GET_TOPIC_LISTS_FETCHING,
  // 从文章中返回到列表中
  GO_BACK_TOPIC_LIST,
  //
  SWITCH_TAB,
 } = actionTypes;


const defaultState = {
  isFetching: false,
  tab: 'all',
  all: {
    page: 1,
    scrollTop: 0,
    list: List.of(...[]),
  },
};


export default function topicListReducer(state = defaultState, action) {
  const { type, result } = action;
  switch (type) {
    case GO_BACK_TOPIC_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        shouldFetch: false,
      });
    case GET_TOPIC_LISTS_FETCHING:
      const { tab, page } = result;
      const { list, scrollTop } = state[tab] || { list: List.of(...[]), scrollTop: 0 };
      return Object.assign({}, state, {
        isFetching: true,
        tab,
        [tab]: {
          page,
          scrollTop,
          list,
        },
      });
    case GET_TOPIC_LISTS_COMPLETED:
      const tabName = result.tab;
      return Object.assign({}, state, {
        isFetching: false,
        tab: tabName,
        [tabName]: {
          page: result.page,
          scrollTop: state[tabName].scrollTop,
          list: state[tabName].list.push(...result.data),
        },
      });
    case SWITCH_TAB:
      return Object.assign({}, state, {
        tab: result.tab,
        [state.tab]: { ...state[state.tab], scrollTop: result.scrollTop },
        [result.tab]: state[result.tab] || {
          page: 1,
          list: List.of(...[]),
        },
      });
    default:
      return state;
  }
}
