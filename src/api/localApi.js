import Globals from '../helpers/constant';

class LocalApi {
    static addLocalService(request) {
        return fetch(Globals.API.add_local_service, {
            method: 'post',
            body: request
        }).then(response => response.json()).catch(error => error);
    }
    static uploadResume(request) {
        return fetch(Globals.API.resume_upload, {
            method: 'post',
            body: request
        }).then(response => response.json()).catch(error => error);
    }
    static getLocalSearched(request) {
        return fetch(`${Globals.API.get_local_searched}&category=${request.category}&zipcode=${request.zipcode}`)
            .then(response => response.json()).catch(error => error);
    }

    static getLocalDetail(request) {
        return fetch(`${Globals.API.get_local_detail}&id_provider=${request.id_provider}`)
            .then(response => response.json()).catch(error => error);
    }
}
export default LocalApi;
