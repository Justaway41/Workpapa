/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Util from '../../helpers/util.class';
import guaranteeImg from '../../assets/img/badge-satisfactionGuarantee.svg';

import ScrollToTop from '../../components/scrolltotop/scrolltotop';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import PaymentStep from '../../components/steps/steps';

import addonData from '../../data/addon.json';
import packageData from '../../data/packages.json';

import paymentApi from '../../api/paymentApi';

class StripCreditCard extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
    }

    componentDidMount() {
        // console.log(this.props.location);
        if (this.props.location.hasOwnProperty('countryCode')) {
            this.updateState(this.props);
        }

        const packageSelected = sessionStorage.getItem('package');
        if (packageSelected) {
            const seessionData = JSON.parse(packageSelected);
            const totalPrice = JSON.parse(packageSelected).totalPrice;
            const selAddonData = [];
            seessionData.addon.forEach((element) => {
                const addon = this.getSingleAddon(element);
                selAddonData.push(addon);
            });
            this.setState({ addonData: selAddonData, totalPrice });
        }
        paymentApi.setUpCard();
    }
    componentWillReceiveProps(nextProps) {
        // if(this.props.location !== nextProps.location){
        this.updateState(nextProps);
        // }
    }

    initialize = () => ({
        name: '',
        card: '',
        email: '',
        password: '',
        expMonth: '',
        expYear: '',
        cvv: '',
        formErrors: {
            name: '', card: '', email: '', password: '', expMonth: '', expYear: '', cvv: ''
        },
        nameVaild: false,
        cardVaild: false,
        emailValid: false,
        passwordValid: false,
        expMonthValid: false,
        expYearValid: false,
        cvvValid: false,
        msg: '',
        errorMessage: '',
        loader: false,
        currency: '$',
        conversionRate: 1,
        selPackage: packageData.product.service[this.props.match.params.package],
        addonData: [],
        totalPrice: 0,
        discount: 0
    })

    getSingleAddon(data) {
        let selAddon = {};

        addonData.forEach((element) => {
            element.items.forEach((ele) => {
                if (ele.id === data) {
                    return selAddon = ele;
                }
            });
        });
        return selAddon;
    }

    updateState = (props) => {
        this.setState({ currency: Util.currency(props.location.currencyCode) });

        if (props.packages.basic) {
            const selPackage = {
                code: this.state.selPackage.code,
                name: this.state.selPackage.name,
                description: this.state.selPackage.description,
                price: [
                    { amt: packageData.product.service[this.props.match.params.package].price[0].amt, month: 1, save: 30 }
                ]
            };
            const conversionRate = props.location.currencyConverter;
            this.setState({
                selPackage,
                conversionRate,
                totalPrice: 0
            });
        }
    }

    updateState = (props) => {
        this.setState({ currency: Util.currency(props.location.currencyCode) });

        if (props.packages.basic) {
            const selPackage = {
                code: this.state.selPackage.code,
                name: this.state.selPackage.name,
                description: this.state.selPackage.description,
                price: [
                    { amt: packageData.product.service[this.props.match.params.package].price[0].amt, month: 1, save: 30 }
                ]
            };
            const conversionRate = props.location.currencyConverter;
            this.setState({
                selPackage,
                conversionRate
            });
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(
            { [name]: value },
            () => { this.validateField(name, value); }
        );
    }

    validateField(fieldName, value) {
        const fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let expMonthValid = this.state.expMonthValid;
        let expYearValid = this.state.expYearValid;
        let nameValid = this.state.nameValid;
        let cardValid = this.state.cardValid;
        let cvvValid = this.state.cvvValid;

        switch (fieldName) {
        case 'name':
            nameValid = value.length > 0;
            fieldValidationErrors.name = nameValid ? '' : ' is invalid';
            break;
        case 'card':
            cardValid = /^\d{16}$/.test(value);
            fieldValidationErrors.card = cardValid ? '' : ' is invalid';
            break;
        case 'expMonth':
            expMonthValid = value.length > 0;
            fieldValidationErrors.expMonth = expMonthValid ? '' : ' is invalid';
            break;
        case 'expYear':
            expYearValid = value.length > 0;
            fieldValidationErrors.expYear = expYearValid ? '' : ' is invalid';
            break;
        case 'cvv':
            cvvValid = /^\d{3}$/.test(value) || /^\d{4}$/.test(value);
            fieldValidationErrors.cvv = cvvValid ? '' : ' is invalid';
            break;
        case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
        case 'password':
            passwordValid = value.length > 6;
            fieldValidationErrors.password = passwordValid ? '' : ' is invalid';
            break;
        default:
            break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid,
            passwordValid,
            cardValid,
            expMonthValid,
            expYearValid,
            nameValid,
            cvvValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid && this.state.cardValid && this.state.expMonthValid && this.state.expYearValid && this.state.nameValid && this.state.cvvValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleRequest(e) {
        e.preventDefault();
        const self = this;
        Object.keys(this.state.formErrors).map((item) => {
            self.setState(
                { [item]: self.state[item] },
                () => { self.validateField(item, self.state[item]); }
            );
        });

        if (!this.state.formValid) {
            return;
        }
        this.setState({ loader: true });
        paymentApi.getCardToken(
            this.state.name,
            this.state.card,
            this.state.expMonth,
            this.state.expYear,
            this.state.cvv
        )
            .then(() => {
                // let self = this;
                const request = {};
                paymentApi.makePayment(request)
                    .then(() => {

                    }).catch((error) => {
                        this.setState({ errorMessage: error });
                    });
            }).catch((error) => {
                this.setState({ errorMessage: error });
            });
    }

    render() {
        const FormErrors = ({ formErrors, errorField }) =>
            (
                <div>
                    {Object.keys(formErrors).map((fieldName) => {
                        if (formErrors[fieldName].length > 0 && fieldName === errorField.name) {
                            return (
                                <p className="small text-danger help-error" key={fieldName}>{fieldName} {formErrors[fieldName]}</p>
                            );
                        }
                        return '';
                    })}
                </div>
            );
        return (
            <div>
                <ScrollToTop />
                <Header {...this.props} />
                <div className="top-spacer">
                    <div className="container block purchaseContent" id="purchase_form">
                        <PaymentStep step1="complete" step2="complete" step3="active" step4="disabled" />

                        <div className="row">
                            <div className="col-md-7 col-xs-12">
                                {!!this.state.discount &&
                                <div className="alert alert-success" >
                                    Congratualtion! you are eligible for {this.state.discount}% off on resume service today
                                </div>
                                }
                                <div className="card hidden-md hidden-lg" id="summary_card">
                                    <h4>Order Summary</h4>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td style={{ paddingBottom: '2px' }}>
                                                    ghghghghg
                                                </td>
                                                <td className="price_cell" style={{ paddingBottom: '2px' }} >
                                                    {/* {{Util.getCurrencySymbol(appConfig.geoCurrency.currencyCode)}} {{prodData.price[0].amt*convestionRate | number : '1.2-2'}} */}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" style={{ borderTop: '0px', paddingtop: '0px' }}>
                                                    <p className="tinyFont">
                                                        {/* {{prodData.description}} */}
                                                    </p>
                                                </td>
                                            </tr>

                                            <tr >
                                                <td style={{ padding: '0px' }}>
                                                    <small>jjjj</small>
                                                </td>
                                                <td className="price_cell" style={{ padding: '0px' }}>
                                                    {/* {{appConfig.getCurrencySymbol(appConfig.geoCurrency.currencyCode)}} {{addon.price*convestionRate | number : '1.2-2'}} */}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td style={{ paddingBottom: '2px' }}>
                                                    Discount 55%
                                                </td>
                                                <td className="price_cell" style={{ paddingBottom: '2px' }}>
                                                    {/* {{Util.getCurrencySymbol(appConfig.geoCurrency.currencyCode)}} {{((amtBeforeDiscount*discount)/100)*convestionRate | number : '1.2-2'}} */}
                                                </td>
                                            </tr>
                                            <tr className="total">
                                                <td>Order total:
                                                </td>
                                                <td className="price_cell">
                                                    {/* {{Util.getCurrencySymbol(appConfig.geoCurrency.currencyCode)}} {{amount*convestionRate | number : '1.2-2'}} */}
                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>
                                </div>

                                <h2 className="subscribe-title text-center">Place Your Order</h2>
                                <div className="card">
                                    {!!this.state.errorMessage &&
                                    <div className=" alert alert-danger" >errorMessage</div>
                                    }
                                    <div id="form-container" >
                                        <form method="post" onSubmit={this.handleRequest.bind(this)} >

                                            <div id="card-group" className="form-group">
                                                <div className="row">
                                                    <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.name)}`}>
                                                        <label htmlFor="name"><span>Card Holder Name</span><span className="text-danger">*</span></label>
                                                        <input type="text" className="form-control" placeholder="Name" name="name" value={this.state.name} onChange={this.handleUserInput} />
                                                    </div>
                                                    <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'name' }} />
                                                </div>
                                                <div className="row ">
                                                    <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.card)}`}>
                                                        <label htmlFor="ccNo">
                                                            <span>Credit/Debit Card Number</span><span className="text-danger">*</span>
                                                        </label>
                                                        <input type="text" autoComplete="off" className="form-control" maxLength="16" placeholder="Card Number" name="card" value={this.state.card} onChange={this.handleUserInput} />
                                                    </div>
                                                    <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'card' }} />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-8 col-xs-12">
                                                    <div className="form-group">
                                                        <label htmlFor="exp"> <span>Expiration Date (MM/YYYY)</span><span className="text-danger">*</span> </label>
                                                        <div id="exp_month" className={` controls ${this.errorClass(this.state.formErrors.expMonth)}`}>
                                                            <select className="exp-month form-control" id="expMonth" name="expMonth" onChange={this.handleUserInput} >
                                                                <option value="">MM</option>
                                                                <option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>
                                                            </select>

                                                        </div>
                                                        <div id="exp_year" className={` controls ${this.errorClass(this.state.formErrors.expYear)}`}>
                                                            <div className="twenty">20</div>
                                                            <select id="expYear" className="exp-year form-control" name="expYear" onChange={this.handleUserInput} >
                                                                <option value="">YY</option>
                                                                <option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option><option value="32">32</option><option value="33">33</option><option value="34">34</option><option value="35">35</option><option value="36">36</option><option value="37">37</option>
                                                            </select>

                                                        </div>
                                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'expMonth' }} />
                                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'expYear' }} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-4 col-xs-12">
                                                    <div id="cvv-group" className={` form-group controls ${this.errorClass(this.state.formErrors.cvv)}`} >
                                                        <label htmlFor="cvv">
                                                            <span>CVV Code</span><span className="text-danger">*</span>
                                                        </label>
                                                        <input type="text" size="4" autoComplete="off" maxLength="4" className="form-control" id="cvv" placeholder="CVV" name="cvv" onChange={this.handleUserInput} />
                                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'cvv' }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row" >

                                                <div className="col-sm-6 col-xs-12">
                                                    <div className={` form-group controls ${this.errorClass(this.state.formErrors.email)}`}>
                                                        <label htmlFor="email">
                                                            <span>Email</span><span className="text-danger">*</span>
                                                        </label>
                                                        <input type="text" autoComplete="off" className="form-control" maxLength="50" placeholder="Email Address" name="email" onChange={this.handleUserInput} />
                                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'email' }} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 col-xs-12">
                                                    <div className={` form-group controls ${this.errorClass(this.state.formErrors.password)}`} >
                                                        <label htmlFor="password">
                                                            <span>Password</span><span className="text-danger">*</span>
                                                        </label>
                                                        <input type="password" autoComplete="off" className="form-control" maxLength="16" placeholder="Password" name="password" onChange={this.handleUserInput} />
                                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'password' }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row text-center">
                                                <button className="btn btn-danger btn-lg" disabled={!!this.state.loader}>Place Your Order</button>
                                                {!!this.state.loader &&
                                                    <img alt="loader" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                                }
                                            </div>
                                            <div className="row text-center">
                                                <small>By placing your order, you agree to WorkPapa&apos;s Terms of Service.</small>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                                <small>
                                    What comes next? Good question! After you submit your order, you&apos;ll receive a short questionnaire to help your writer get started.
                                </small>
                            </div>
                            <div className="col-md-5 col-xs-12  sidebar" style={{ marginTop: '73px' }}>
                                <div className="card visible-md visible-lg" id="summary_card">
                                    <h4>Order Summary</h4>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td style={{ paddingBottom: '2px' }}>
                                                    {this.state.selPackage.name} Package
                                                </td>
                                                <td className="price_cell" style={{ paddingBottom: '2px' }}>
                                                    {this.state.currency}{Util.round(this.state.selPackage.price[0].amt * this.state.conversionRate)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" style={{ borderTop: '0px', paddingTop: '0px' }}>
                                                    <p className="tinyFont">
                                                        {this.state.selPackage.description}
                                                    </p>
                                                </td>
                                            </tr>
                                            {this.state.addonData.map(item =>
                                                (
                                                    <tr key={item.label}>
                                                        <td style={{ padding: '0px' }}>
                                                            <small>{item.label}</small>
                                                        </td>
                                                        <td className="price_cell" style={{ padding: '0px' }}>
                                                            {item.price ? `${Util.currency(this.state.currency)}${Util.round(item.price * this.state.conversionRate)}` : 'Free'}
                                                        </td>
                                                    </tr>
                                                ))}
                                            {!!this.state.discount &&
                                            <tr >
                                                <td style={{ paddingBottom: '2px' }}>
                                                    Discount {this.state.discount}%
                                                </td>
                                                <td className="price_cell" style={{ paddingBottom: '2px' }} />
                                            </tr>
                                            }
                                            <tr className="total">
                                                <td>Order total:
                                                </td>
                                                <td className="price_cell">
                                                    {Util.currency(this.state.currency)}{Util.round(this.state.totalPrice * this.state.conversionRate)}
                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>
                                </div>

                                <div className="card promiseCard">
                                    <h4>Our Promise to You</h4>
                                    <p>The first step to getting hired is getting your resume in professional shape.  When you work with our certified resume writers, you&apos;re working with experts in <em>your</em> industry.</p>
                                    <span className="badge-guarantee guarantee-satisfaction relativeGuarantee" style={{ background: `0 0,url(${guaranteeImg}) top center no-repeat` }} />

                                </div>

                                <div className="card promiseCard">
                                    <div style={{ float: 'left' }}>
                                        <img src={require('../../assets/img/shield48.png')} width="48" height="58" alt="secure" />
                                    </div>
                                    <div>
                                        <h4>Secure payment</h4>
                                        <p>Your details are encrypted and protected via a 256-bit SSL connection</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        location: state.location,
        packages: state.packages
    };
}

export default withRouter(connect(mapStateToProps)(StripCreditCard));
