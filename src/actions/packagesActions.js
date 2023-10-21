import * as types from './actionTypes';
import packagesApi from '../api/packagesApi';

export function loadPackagesSuccess(packages) {
    return {
        type: types.LOAD_PACKAGES_SUCCESS, packages
    };
}
export function loadPackages(geo) {
    // make async call to api, handle promise, dispatch action when promise is resolved
    return function (dispatch) {
        return packagesApi.getPackages(geo).then((packages) => {
            dispatch(loadPackagesSuccess(packages.data));
        }).catch((error) => {
            throw (error);
        });
    };
}
