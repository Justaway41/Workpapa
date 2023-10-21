import Globals from '../helpers/constant';
import addonRawData from '../data/addon.json';
import packageData from '../data/packages.json';
import metaData from '../data/product/metadata.json';

const deepcopy = require('deepcopy');

class Util {
    static round(number, digit = 0) {
        if (Number.isNaN(number)) return number;
        return number.toFixed(digit);
    }
    static currency(currencyCode) {
        const symbol = {
            AUD: '$',
            BGN: 'лв',
            BRL: 'R$',
            CAD: '$',
            CHF: 'CHF',
            CNY: '¥',
            CZK: 'Kč',
            DKK: 'kr',
            GBP: '£',
            HKD: '$',
            HRK: 'kn',
            HUF: 'Ft',
            IDR: 'Rp',
            ILS: '₪',
            INR: '₹',
            JPY: '¥',
            KRW: '₩',
            MXN: '$',
            MYR: 'RM',
            NOK: 'kr',
            NZD: '$',
            PHP: '₱',
            PLN: 'zł',
            RON: 'ei',
            RUB: '₽',
            SEK: 'kr',
            SGD: '$',
            THB: '฿',
            TRY: 'TRY',
            USD: '$',
            ZAR: 'R',
            AFN: '؋',
            ALL: 'Lek',
            DZD: 'DA',
            AOA: 'AOA',
            ARS: '$',
            AMD: 'AMD',
            AWG: 'ƒ',
            AZN: 'ман',
            BSD: '$',
            BHD: 'BD',
            BDT: 'Tk',
            BBD: '$',
            BYN: 'Br',
            BYR: 'BYR',
            BZD: 'BZ$',
            BMD: '$',
            BTN: 'BTN',
            BOB: '$b',
            BAM: 'BAM',
            BWP: 'BWP',
            BIF: 'FBu',
            BND: '$',
            XOF: 'XOF',
            XAF: 'XAF',
            XPF: 'XPF',
            KHR: '៛',
            CVE: 'CVE',
            KYD: '$',
            CLP: '$',
            CLF: 'CLF',
            COP: '$',
            KMF: 'KMF',
            CDF: 'CDF',
            CRC: '₡',
            CUP: 'CUP',
            CUC: 'CUC',
            DJF: 'DJF',
            XCD: 'XCD',
            DOP: 'RD$',
            EGP: '£'
        };
        if (symbol.hasOwnProperty(currencyCode)) { return symbol[currencyCode]; }
        return currencyCode;
    }
    static setDataToLocalStorage(key, dat) {
        if (!!dat && typeof dat === 'object') {
            localStorage.setItem(key, JSON.stringify(dat));
        } else {
            localStorage.setItem(key, dat);
        }
    }
    static getDataFromLocalStorage(key, type = 'object') {
        const dat = localStorage.getItem(key);
        if (!!dat && type === 'object') {
            return JSON.parse(localStorage.getItem(key));
        }
        return localStorage.getItem(key);
    }
    static setDataToSessionStorage(key, dat) {
        if (!!dat && typeof dat === 'object') {
            sessionStorage.setItem(key, JSON.stringify(dat));
        } else {
            sessionStorage.setItem(key, dat);
        }
    }
    static getDataFromSessionStorage(key, type = 'object') {
        const dat = sessionStorage.getItem(key);
        // console.log(typeof dat)
        if (!!dat && type === 'object') {
            return JSON.parse(sessionStorage.getItem(key));
        }
        return sessionStorage.getItem(key);
    }
    static removeFromLocalStorage(key) {
        localStorage.removeItem(key);
    }
    static removeFromSessionStorage(key) {
        sessionStorage.removeItem(key);
    }
    static getResumeTxt(countryCode) {
        countryCode = countryCode.toLowerCase();
        if (countryCode === 'sa' || countryCode === 'ae') {
            return 'CV';
        }
        return 'Resume';
    }
    static showPrice(amt, converstionRate = 1, currency = '$', currencyCode = 'USD', roundTo = 0) {
        let price;
        // amt = parseInt(amt, 10);
        // converstionRate = parseInt(converstionRate, 10);
        // currencyCode = 'SGD';
        const finalAmt = this.round(amt * converstionRate, roundTo);
        if (currencyCode === 'SGD') {
            price = `${currency}${finalAmt} ${currencyCode}`;
        } else if (currencyCode === 'AED') {
            price = `${finalAmt} ${currencyCode}`;
        } else {
            price = `${currency}${finalAmt}`;
        }
        return price;
    }
    static validateCountry(country = 'us') {
        country = country.toLowerCase();
        if (!!country && !!Globals.supportedCountry[country]) {
            return country;
        }
        return 'us';
    }
    static getCountryData(country = 'us') {
        country = country.toLowerCase();
        if (!!country && !!Globals.supportedCountry[country]) {
            return Globals.supportedCountry[country];
        }
        return Globals.supportedCountry['us'];
    }
    // static displayCountryName(country = 'us') {
    //     country = country.toLowerCase();
    //     if (!!country && !!Globals.supportedCountry[country]) {
    //         return Globals.supportedCountry[country].display_name;
    //     }
    //     return 'USA';
    // }
    static dateFormat(date) {
        if (date) {
            date = date.toString().replace(/-/g, '/');
        }
        return new Date(date).toDateString();
    }
    static getAddonData(geo, site) {
        const countryCode = geo.countryCode;
        const resumeText = Util.getResumeTxt(countryCode);
        const displayCountry = geo.countryName;
        const finalAddon = [];
        const addonData = deepcopy(addonRawData);
        addonData
            .filter(element => (site.pendingResume >= Globals.site.FAST_SERVICE_RESUME_LIMIT) || (element.name !== 'group8' && site.pendingResume <= Globals.site.FAST_SERVICE_RESUME_LIMIT))
            .forEach((element) => {
            // if(element.name === 'group8' && site.daysToComplete <= 4) continue;
                element.title = element.title.replace(/##RESUMETEXT##/g, resumeText);
                element.items.forEach((ele) => {
                    ele.label = ele.label.replace(/##RESUMETEXT##/g, resumeText);
                    ele.label = ele.label.replace(/##COUNTRY##/g, displayCountry);
                    ele.label = ele.label.replace(/##RESUMEDAYS##/g, site.pendingResume);
                    ele.description = ele.description ? ele.description.replace(/##RESUMETEXT##/g, resumeText) : '';
                    ele.description = ele.description ? ele.description.replace(/##RESUMEDAYS##/g, site.pendingResume) : '';
                });
                finalAddon.push(element);
            });
        return finalAddon;
    }
    static getPackageData(geo) {
        const countryCode = geo.countryCode;
        const resumeText = Util.getResumeTxt(countryCode);
        // const displayCountry = Util.displayCountryName(countryCode);
        Object.keys(packageData.service.product).forEach((element) => {
            packageData.service.product[element].name = packageData.service.product[element].name.replace(/##RESUMETEXT##/g, resumeText);
            packageData.service.product[element].description = packageData.service.product[element].description.replace(/##RESUMETEXT##/g, resumeText);
        });
        return packageData;
    }
    static fillRange = (start, end) => Array((end - start) + 1).fill().map((item, index) => start + index);

    static getMetaData(page, product) {
        return metaData[page][product] || metaData['default'];
    }
}

export default Util;
