import Globals from '../helpers/constant';

class PackagesApi {
    static getPackages(geo) {
        // geo.countryCode = 'US';
        return fetch(`${Globals.API.final_price}&countryCode=${geo.countryCode}`)
            .then(response => response.json()).catch(error => error);
    }
}

export default PackagesApi;
