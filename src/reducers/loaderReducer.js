import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loaderReducer(state = initialState.loader, action) {
    switch (action.type) {
    case types.TOGGLE_LOADER:
        return state + action.status;
    default:
        return state;
    }
}
