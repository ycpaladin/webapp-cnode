import { actionTypes } from '../constants/actionTypes';
import { List } from 'immutable';
let { GET_TOPIC_LISTS_COMPLETED, GET_TOPIC_LISTS_FIRST_COMPLETED, GET_TOPIC_LISTS_FETCHING, GO_BACK_TOPIC_LIST } = actionTypes;

const defaultState = {
    isFetching: false,
    tab: 'all',
    page: 1,
    limit: 10,
    shouldFetch: true,
    list: List.of(...[])

}

export default function topicListReducer(state = defaultState, action) {
    let { type, result} = action;
    switch (type) {
        case GO_BACK_TOPIC_LIST:
            return Object.assign({}, state, {
                isFetching: false,
                shouldFetch: false
            });
        case GET_TOPIC_LISTS_FETCHING:
            return Object.assign({}, state, {
                tab: result.tab,
                page: result.page,
                limit: result.limit,
                isFetching: true
            });
        case GET_TOPIC_LISTS_FIRST_COMPLETED:

            return Object.assign({}, state, {
                tab: result.tab,
                page: result.page,
                limit: result.limit,
                list: List.of(...result.data),
                isFetching: false
            });
        case GET_TOPIC_LISTS_COMPLETED:
            return Object.assign({}, state, {
                tab: result.tab,
                page: result.page,
                limit: result.limit,
                list: state.list.push(...result.data),
                isFetching: false
            });

        default:
            return state;
    }
}