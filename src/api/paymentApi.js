import Globals from '../helpers/constant';

const Stripe = window.Stripe;
class PaymentApi {
    static makePayment(request) {
        return fetch(Globals.API.make_payment_service, {
            method: 'post',
            body: JSON.stringify(request)
        }).then(response => response.json()).catch(error => error);
    }
    static makePaypalPayment(request) {
        return fetch(Globals.API.make_payment_paypal, {
            method: 'post',
            body: JSON.stringify(request)
        }).then(response => response.json()).catch(error => error);
    }
    static setUpCard() {
        // console.log(Stripe);
        // here we setup the stripe publish key.
        // notice that this is a test key for my account so replace with production key(live)
        Stripe.setPublishableKey(Globals.payment.stripeKey);
    }
    static getCardToken = (name, card, expMonth, expYear, cvv) => new Promise((resolve, reject) => {
        // set up the card data as an object
        const dataObj = {
            number: card, exp_month: expMonth, exp_year: expYear, cvc: cvv
        };

        // Request a token from Stripe:
        Stripe.card.createToken(
            dataObj,
            (status, { error, id }) => {
                if (error) {
                    reject(error.message);
                } else {
                    resolve(id);
                }
            }
        );
    });
    static checkforDiscount(email) {
        return fetch(`${Globals.API.check_discount}&email=${email}`)
            .then(response => response.json()).catch(error => error);
    }
}

export default PaymentApi;
