import Globals from '../helpers/constant';

class ProfileApi {
    static updateProfileConfirmation(request) {
        return fetch(Globals.API.save_profile, {
            method: 'post',
            body: request
        }).then(response => response.json()).catch(error => error);
    }
    static updateTemplateConfirmation(request) {
        return fetch(Globals.API.save_resume_template, {
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
    static getProfile(token) {
        return fetch(`${Globals.API.get_profile}&token=${token}`)
            .then(response => response.json()).catch(error => error);
    }

    static login(request) {
        return fetch(Globals.API.login, {
            method: 'post',
            body: JSON.stringify(request)
        }).then(response => response.json()).catch(error => error);
    }
    // static loginUserWithToken(token) {
    //     return fetch(`${Globals.API.login_user_token}&token=${token}`)
    //         .then(response => response.json()).catch(error => error);
    // }
    static getPaidService(userId) {
        return fetch(`${Globals.API.get_paid_service}&id_user=${userId}`)
            .then(response => response.json()).catch(error => error);
    }
    static getResumeTrack(userId) {
        return fetch(`${Globals.API.get_resume_track}&id_user=${userId}`)
            .then(response => response.json()).catch(error => error);
    }
    static getTrackMessage(userId, packageId) {
        const query = `&id_user=${userId}&id_package=${packageId}`;
        return fetch(Globals.API.get_track_message + query)
            .then(response => response.json()).catch(error => error);
    }
    static getCompletedResume(userId) {
        return fetch(`${Globals.API.get_completed_resume}&id_user=${userId}`)
            .then(response => response.json()).catch(error => error);
    }
    static updateQuestionaire(request) {
        return fetch(Globals.API.update_questionaire, {
            method: 'post',
            body: JSON.stringify(request)
        }).then(response => response.json()).catch(error => error);
    }
    static forgotPassword(request) {
        return fetch(Globals.API.forgot_password, {
            method: 'post',
            body: JSON.stringify(request)
        }).then(response => response.json()).catch(error => error);
    }
}
export default ProfileApi;
