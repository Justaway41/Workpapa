import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function siteReducer(state = initialState.profile, action) {
    switch (action.type) {
    case types.LOAD_SITE_SUCCESS:
        return action.profile;
    default:
        return state;
    }
}
