import {
    GET_SELECTED_LIST
} from '../constants/actionTypes';

const initialState = {
    list: [],
};

export default function getSelectedList(state = initialState, action) {
    switch (action.type) {
        case GET_SELECTED_LIST:
            return {...state, ...{list: action.payload.list}};
        default:
            return state;
    }
}