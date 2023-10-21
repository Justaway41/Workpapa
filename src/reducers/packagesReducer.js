import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function packagesReducer(state = initialState.packages, action) {
    switch (action.type) {
    case types.LOAD_PACKAGES_SUCCESS:
        return action.packages;
    default:
        return state;
    }
}
