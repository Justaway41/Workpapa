/*eslint-disable */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import paypal from 'paypal-checkout';

const PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

export default class PaypalBtn extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     currency: 'INR'
        // }
        this.total = 0;
        this.currency = this.props.currency;
        this.email = this.props.email;
        this.password = this.props.password;
        this.description = this.props.description;
    }
    componentWillReceiveProps(nextProps) {
        this.total = nextProps.total;
        this.currency = nextProps.currency;
        this.email = nextProps.email;
        this.password = nextProps.password;
        this.description = nextProps.description;
        // this.state.currency = nextProps.currency;
    }
    getTotalPrice() {
        return this.total;
    }
    getCurrency() {
        return this.currency;
    }
    getDescription() {
        return this.description;
    }


    renderButton() {
        const total = this.getTotalPrice();
        const currency = this.getCurrency();
        const description = this.getDescription();
        if (this.email === '' || this.password === '') {
            return;
        }
        const opts = {
            env: 'production',
            client: {
                sandbox: 'Ac8UHFXqHvz_toL1a2wNRllVHfHMhVFQYFVTcLhMZHVtcmgeYKPk011lbWaiGZoObzyocefFaBSZG6oB',
                production: 'AR636apk89fNCLuZVcWtP--JpD5Oio4H1yLKG1CelwFynhjjEMCdGiTpFQ3Qa5O1yEkFbti_U4ruUxf1'
            },
            commit: true, // Show a 'Pay Now' button
            payment: function createPayment() {
                const paymentId = paypal.rest.payment.create(this.props.env, this.props.client, {
                    transactions: [{
                        amount: {
                            currency,
                            total,
                        },
                        description,
                    }],
                });

                paymentId.then((res) => {
                    console.log(`Processed${res}`);
                }).catch((err) => {
                    console.error(`Error${err}`);
                });

                return paymentId;
            },
            onAuthorize: (data, actions) => actions.payment.execute()
                .then(() =>
                // console.log('Success');
                // this.props.handerPaypalSuccess(data);
                    actions.payment.execute().then(() => {
                        const paymentReq = {};
                        paymentReq.paid = true;
                        paymentReq.cancelled = false;
                        paymentReq.payerID = data.payerID;
                        paymentReq.paymentID = data.paymentID;
                        paymentReq.id = data.paymentID;
                        paymentReq.paymentToken = data.paymentToken;
                        paymentReq.returnUrl = data.returnUrl;
                        // console.log(payment);
                        this.props.handerPaypalSuccess(paymentReq);
                    })).catch((err) => {
                    this.props.handerPaypalFailer(err);
                // console.error("You had an error", { err, items, total });
                }),
        };

        return (
            <PayPalButton
                env={opts.env}
                client={opts.client}
                payment={opts.payment}
                commit // Optional: show a 'Pay Now' button in the checkout flow
                onAuthorize={opts.onAuthorize}
            />
        );
    }
    render() {
        return (
            <div>
                {this.renderButton()}
            </div>);
    }
}

PaypalBtn.propTypes = {
    currency: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
};

PaypalBtn.defaultProps = {
    env: 'production',
    currency: 'USD'
};
