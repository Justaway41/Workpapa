import Globals from '../helpers/constant';

class SiteApi {
    static getLocation() {
        return fetch(Globals.API.get_geo).then(response => response.json()).catch(error => error);
    }
    static getCategory(category = '') {
        let url;
        if (category === '') {
            url = Globals.API.get_category;
        } else {
            url = `${Globals.API.get_category}&category=${category}`;
        }
        return fetch(url).then(response => response.json()).catch(error => error);
    }
    static getZipCode(zipcode = '') {
        let url;
        if (zipcode === '') {
            url = Globals.API.get_zipcode;
        } else {
            url = `${Globals.API.get_zipcode}&zipcode=${zipcode}`;
        }
        return fetch(url).then(response => response.json()).catch(error => error);
    }
    static getSiteLocation() {
        return fetch(Globals.API.get_site_location).then(response => response.json()).catch(error => error);
    }
}
export default SiteApi;
