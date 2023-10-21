import * as types from './actionTypes';
import SiteApi from '../api/siteApi';

export function loadLocationSuccess(location) {
    return {
        type: types.LOAD_LOCATION_SUCCESS, location
    };
}
export function loadLocation() {
    // make async call to api, handle promise, dispatch action when promise is resolved
    return function (dispatch) {
        return SiteApi.getLocation()
            .then((location) => {
                dispatch(loadLocationSuccess(location.data));
            }).catch((error) => {
                throw (error);
            });
    };
}
