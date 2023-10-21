import Globals from '../helpers/constant';

// const Stripe = window.Stripe;
class LibraryApi {
    static getLibHomeCategory() {
        return fetch(`${Globals.API.lib_home_category}`)
            .then(response => response.json()).catch(error => error);
    }
    static getDocumentDetails(libId) {
        return fetch(`${Globals.API.lib_document_details}&id_lib=${libId}`)
            .then(response => response.json())
            .catch(error => error);
    }
    static getDocumentForCategory(catId) {
        return fetch(`${Globals.API.lib_document_by_category}&id_cat=${catId}`)
            .then(response => response.json())
            .catch(error => error);
    }
    static saveMailingList(request) {
        return fetch(Globals.API.save_mailing_list, {
            method: 'post',
            body: JSON.stringify(request)
        }).then(response => response.json()).catch(error => error);
    }
}

export default LibraryApi;
