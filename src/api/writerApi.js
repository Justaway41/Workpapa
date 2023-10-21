import Globals from '../helpers/constant';

class WriterApi {
    static register(request) {
        return fetch(Globals.API.wrt_register, {
            method: 'post',
            body: request
        }).then(response => response.json()).catch(error => error);
    }
    static getProfile(token) {
        return fetch(`${Globals.API.wrt_get_profile}&token=${token}`)
            .then(response => response.json()).catch(error => error);
    }
    static getProfileById(writerId) {
        return fetch(`${Globals.API.wrt_get_profilebyid}&id_writer=${writerId}`)
            .then(response => response.json()).catch(error => error);
    }
    static login(request) {
        return fetch(Globals.API.wrt_login, {
            method: 'post',
            body: JSON.stringify(request)
        }).then(response => response.json()).catch(error => error);
    }
    static getFeedback(writerId) {
        return fetch(`${Globals.API.wrt_get_feedback}&id_writer=${writerId}`)
            .then(response => response.json()).catch(error => error);
    }
    static getPendingService(writerId) {
        return fetch(`${Globals.API.wrt_get_service_pending}&id_writer=${writerId}`)
            .then(response => response.json()).catch(error => error);
    }
    static startWriting(request) {
        return fetch(Globals.API.wrt_start_writing, {
            method: 'post',
            body: JSON.stringify(request)
        }).then(response => response.json()).catch(error => error);
    }
    static markedResumeDone(request) {
        return fetch(Globals.API.wrt_resume_done, {
            method: 'post',
            body: JSON.stringify(request)
        }).then(response => response.json()).catch(error => error);
    }
    static getMyService(writerId) {
        return fetch(`${Globals.API.wrt_my_service}&id_writer=${writerId}`)
            .then(response => response.json()).catch(error => error);
    }
    static getUserMessages(packageId, userId) {
        const query = `&id_user=${userId}&id_package=${packageId}`;
        return fetch(Globals.API.wrt_get_user_message + query)
            .then(response => response.json()).catch(error => error);
    }
    static sendUserMessage(request) {
        return fetch(Globals.API.wrt_sent_user_message, {
            method: 'post',
            body: JSON.stringify(request)
        }).then(response => response.json()).catch(error => error);
    }
    static uploadDocument(request) {
        return fetch(Globals.API.wrt_document_upload, {
            method: 'post',
            body: request
        }).then(response => response.json()).catch(error => error);
    }
    static getSkill() {
        return fetch(`${Globals.API.wrt_get_skill}`)
            .then(response => response.json()).catch(error => error);
    }
    static getCountry() {
        return fetch(`${Globals.API.wrt_get_country}`)
            .then(response => response.json()).catch(error => error);
    }
    static getUserQuestioner(packageId) {
        const query = `&id_package=${packageId}`;
        return fetch(Globals.API.wrt_get_user_questioner + query)
            .then(response => response.json()).catch(error => error);
    }
}
export default WriterApi;
