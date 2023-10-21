import * as types from './actionTypes';
import profileApi from '../api/profileApi';
import WriterApi from '../api/writerApi';

export function loadProfileSuccess(profile) {
    return {
        type: types.LOAD_PROFILE_SUCCESS, profile
    };
}
export function loadProfile(token) {
    // make async call to api, handle promise, dispatch action when promise is resolved
    return function (dispatch) {
        return profileApi.getProfile(token)
            .then((profile) => {
                dispatch(loadProfileSuccess(profile.data));
            }).catch((error) => {
                throw (error);
            });
    };
}
export function updateProfile(profile) {
    return function (dispatch) {
        dispatch(loadProfileSuccess(profile));
    };
}

export function loadWriterProfileSuccess(profile) {
    return {
        type: types.LOAD_WRITER_PROFILE_SUCCESS, profile
    };
}
export function loadWriterProfile(token) {
    // make async call to api, handle promise, dispatch action when promise is resolved
    return function (dispatch) {
        return WriterApi.getProfile(token)
            .then((profile) => {
                dispatch(loadWriterProfileSuccess(profile.data));
            }).catch((error) => {
                throw (error);
            });
    };
}
export function updateWriterProfile(profile) {
    return function (dispatch) {
        dispatch(loadWriterProfileSuccess(profile));
    };
}
