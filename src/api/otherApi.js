import Globals from '../helpers/constant';

class OtherApi {
    static sendTrackMessage(request) {
        return fetch(Globals.API.send_track_message, {
            method: 'post',
            body: JSON.stringify(request)
        }).then(response => response.json()).catch(error => error);
    }
    static getRotation(request) {
        return fetch(`${Globals.API.get_rotation}&trk_group=${request.trkGroup}`)
            .then(response => response.json()).catch(error => error);
    }
    static getPricing(salary) {
        return fetch(`${Globals.API.get_pricing}&salary=${salary}`)
            .then(response => response.json()).catch(error => error);
    }
    static saveOrderSalary(request) {
        return fetch(Globals.API.save_order_salary, {
            method: 'post',
            body: JSON.stringify(request)
        }).then(response => response.json()).catch(error => error);
    }
    static saveSearch(request) {
        return fetch(Globals.API.save_search, {
            method: 'post',
            body: JSON.stringify(request)
        }).then(response => response.json()).catch(error => error);
    }
    static getPendingResume() {
        return fetch(`${Globals.API.get_pending_resume}`)
            .then(response => response.json()).catch(error => error);
    }
    static getMetaData(url) {
        return fetch(`${Globals.API.get_metadata}&url=${url}`).then(response => response.json()).catch(error => error);
    }
    static getSeoLink() {
        return fetch(`${Globals.API.get_seolink}`).then(response => response.json()).catch(error => error);
    }
}

export default OtherApi;
