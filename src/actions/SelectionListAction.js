import {
    GET_SELECTED_LIST
} from '../constants/actionTypes';

export function getSelectedList(list) {
    return {
        type: GET_SELECTED_LIST,
        payload: {
            list
        }
    }
}