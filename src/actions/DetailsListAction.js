import {
    GET_DETAILS_LIST_REQUEST,
    LOAD_MORE
} from '../constants/actionTypes';
import data from '../../data/data.json';

export function getDetailsRequest() {
    return {
        type: GET_DETAILS_LIST_REQUEST,
        payload: {
            items: data
        }
    }
}

export function loadMore() {
    return {
        type: LOAD_MORE,
        payload: {
            currentPage: 1
        }
    }
}