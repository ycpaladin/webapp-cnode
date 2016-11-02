
import fetch from 'isomorphic-fetch';

const apiUrlBase = 'https://cnodejs.org/api/v1';

import { actionTypes } from '../constants/actionTypes';
let {
    GET_TOPIC_LISTS_COMPLETED,
    GET_TOPIC_LISTS_FIRST_COMPLETED,
    GET_TOPIC_LISTS_FETCHING,
    GO_BACK_TOPIC_LIST,

    GET_TOPIC_BYID_FETCHING,
    GET_TOPIC_BYID_COMPLETED
} = actionTypes;

export function getTopics(page = 1, tab = 'all', limit = 15, mdrender = true) {
    return dispatch => {
        dispatch({
            type: GET_TOPIC_LISTS_FETCHING,
            result: {
                page, limit, tab
            }
        });
        let apiUrl = `${apiUrlBase}/topics?page=${page}&tab=${tab}&limit=${limit}&mdrender=${mdrender}`;
        fetch(apiUrl).then(response => response.json()).then(({ success, data }) => {
            let result = { page, limit, tab, data }
            if (page == 1) {
                // setTimeout(() => {
                dispatch({
                    type: GET_TOPIC_LISTS_FIRST_COMPLETED,
                    result
                });
                // }, 50000);

            } else {
                dispatch({
                    type: GET_TOPIC_LISTS_COMPLETED,
                    result
                });
            }

        })
    }
}

export function goBackTopicList() {
    return dispatch => {
        dispatch({ type: GO_BACK_TOPIC_LIST })
    }
}


export function getTopicById(topicId) {
    return dispatch => {
        dispatch({
            type: GET_TOPIC_BYID_FETCHING
        })
        let apiUrl = `${apiUrlBase}/topic/${topicId}`;
        fetch(apiUrl).then(r => r.json()).then(({success, data}) => {
            dispatch({
                type: GET_TOPIC_BYID_COMPLETED,
                result: data
            })
        });
    }
}