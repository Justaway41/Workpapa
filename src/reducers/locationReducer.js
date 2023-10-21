import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function locationReducer(state = initialState.location, action) {
    switch (action.type) {
    case types.LOAD_LOCATION_SUCCESS:
        return action.location;
    default:
        return state;
    }
}
