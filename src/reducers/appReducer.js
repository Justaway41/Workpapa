import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function appReducer(state = initialState, action) {
    switch (action.type) {
    case types.LOAD_PENDING_RESUME_SUCCESS:
        return action.site;
    default:
        return state;
    }
}
