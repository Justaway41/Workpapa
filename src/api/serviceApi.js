import Globals from '../helpers/constant';

class ServiceApi {
    static register(request) {
        return fetch(Globals.API.ser_register, {
            method: 'post',
            body: request
        }).then(response => response.json()).catch(error => error);
    }
    static createService(request) {
        return fetch(Globals.API.ser_create_service, {
            method: 'post',
            body: request
        }).then(response => response.json()).catch(error => error);
    }
    static createOfficeSpace(request) {
        return fetch(Globals.API.ser_create_office_space, {
            method: 'post',
            body: request
        }).then(response => response.json()).catch(error => error);
    }
    static getOfficeSpace() {
        return fetch(`${Globals.API.ser_get_office_space}`)
            .then(response => response.json()).catch(error => error);
    }
    static getService(params) {
        return fetch(`${Globals.API.ser_get_service}&serviceId=${params.serviceId}&categoryId=${params.categoryId}`)
            .then(response => response.json()).catch(error => error);
    }
    static getServiceById(params) {
        return fetch(`${Globals.API.ser_get_service_id}&serviceId=${params.serviceId}`)
            .then(response => response.json()).catch(error => error);
    }
    static getOfficeById(params) {
        return fetch(`${Globals.API.ser_get_office_id}&serviceId=${params.serviceId}`)
            .then(response => response.json()).catch(error => error);
    }
    static sendUserMessage(request) {
        return fetch(Globals.API.ser_sent_user_message, {
            method: 'post',
            body: JSON.stringify(request)
        }).then(response => response.json()).catch(error => error);
    }
}
export default ServiceApi;
