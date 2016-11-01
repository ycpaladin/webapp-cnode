
import fetch from 'isomorphic-fetch';

const apiUrlBase = 'https://cnodejs.org/api/v1';

import { actionTypes } from '../constants/actionTypes';
let {    GET_TOPIC_LISTS, GET_TOPIC_LISTS_FIRST, GET_TOPIC_LISTS_FETCHING } = actionTypes;

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
                setTimeout(() => {
                    dispatch({
                        type: GET_TOPIC_LISTS_FIRST,
                        result
                    });
                }, 50000);

            } else {
                dispatch({
                    type: GET_TOPIC_LISTS,
                    result
                });
            }

        })
    }
}