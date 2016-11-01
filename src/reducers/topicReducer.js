import { actionTypes } from '../constants/actionTypes';
let { GET_TOPIC_LISTS, GET_TOPIC_LISTS_FIRST, GET_TOPIC_LISTS_FETCHING } = actionTypes;

const defaultState = {
    isFetching: false,
    tab: 'all',
    page: 1,
    limit: 10,
    list: []

}

// function getState({ tab, page, limit, data}) {
//     return {
//         tab, page, limit, data
//     }
// }

export default function articleReducer(state = defaultState, action) {
    let { type, result} = action;
    switch (type) {

        case GET_TOPIC_LISTS_FETCHING:
            return Object.assign({}, state, {
                tab: result.tab,
                page: result.page,
                limit: result.limit,
                isFetching: true
            });
        case GET_TOPIC_LISTS_FIRST:

            return Object.assign({}, state, {
                tab: result.tab,
                page: result.page,
                limit: result.limit,
                list: result.data,
                isFetching: false
            });
        case GET_TOPIC_LISTS:
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