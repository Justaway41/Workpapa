import * as types from './actionTypes';
import otherApi from '../api/otherApi';

export function toggleLoader(status) {
    return function (dispatch) {
        dispatch({
            type: types.TOGGLE_LOADER, status
        });
    };
}

export function pendingResumeSuccess(site) {
    // console.log(site);
    return {
        type: types.LOAD_PENDING_RESUME_SUCCESS, site
    };
}
export function pendingResume() {
    // make async call to api, handle promise, dispatch action when promise is resolved
    return function (dispatch) {
        return otherApi.getPendingResume()
            .then((dat) => {
                dispatch(pendingResumeSuccess(dat.data));
            }).catch((error) => {
                throw (error);
            });
    };
}

