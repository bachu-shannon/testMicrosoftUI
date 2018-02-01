import {
    GET_DETAILS_LIST_REQUEST,
    LOAD_MORE
} from '../constants/actionTypes';

const initialState = {
    items: [],
    limit: 10,
    currentPage: 1
};

export default function getDetailsList(state = initialState, action) {
    switch (action.type) {
        case GET_DETAILS_LIST_REQUEST:
            return {...state, ...{items: action.payload.items}};
        case LOAD_MORE:
            return {
                ...state,
                ...{
                    currentPage: state.currentPage + action.payload.currentPage
                }
            };
        default:
            return state;
    }
}