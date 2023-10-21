import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Tab, Tabs } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';

// import propTypes from 'prop-types';
import FormErrors from '../../components/formerror/formerror';
import guaranteeImg from '../../assets/img/badge-satisfactionGuarantee.svg';
import PaypalBtn from '../../components/paypal/paypal';
import Spinner from '../../components/spinner/spinner';
import Steps from '../../components/steps/steps';
import ScrollToTop from '../../components/scrolltotop/scrolltotop';
import addonData from '../../data/addon.json';
import paymentApi from '../../api/paymentApi';
import Util from '../../helpers/util.class';
import SalaryData from '../../data/salary.json';
import Globals from '../../helpers/constant';

const imgShield = require('../../assets/img/shield48.png');

class PaymentServicePage extends Component {
    constructor(props) {
        super(props);
        this.setUpPaymentForDirectAccess();
        this.sessionPackage = Util.getDataFromSessionStorage('package');
        // console.log(encodeURI(JSON.stringify(this.sessionPackage)));
        if (!this.sessionPackage) {
            this.props.history.push('/payment/servicemenu/RRS/FGR');
        }
        this.state = this.initialize();
        this.template = {};
        this.addonData = addonData;
    }
    componentDidMount() {
        if (this.sessionPackage) {
            // const { totalPrice } = this.sessionPackage;
            const totalPrice = this.calTotalPrice(this.sessionPackage);
            // console.log(totalPrice);
            const selAddonData = [];
            this.sessionPackage.addon.forEach((element) => {
                const addon = this.getSingleAddon(element);
                selAddonData.push(addon);
            });
            this.template = this.sessionPackage.template;

            this.setState({
                addonData: selAddonData,
                totalPrice
            });

            if (this.sessionPackage.discount) {
                if (parseInt(this.sessionPackage.discount, 10) > 0) {
                    const discount = parseInt(this.sessionPackage.discount, 10);
                    this.setState({
                        discount,
                        totalPrice: totalPrice - (totalPrice * (discount / 100))
                    });
                }
            } else {
                const mailinglist = Util.getDataFromLocalStorage('mailinglist', 'string');
                if (mailinglist) {
                    paymentApi.checkforDiscount(mailinglist)
                        .then((response) => {
                            if (parseInt(response.data.discount, 10) > 0) {
                                const discount = parseInt(response.data.discount, 10);
                                this.setState({
                                    discount,
                                    totalPrice: this.state.totalPrice - Util.round(this.state.totalPrice * (discount / 100))
                                });
                            }
                        });
                }
            }
        } else {
            this.props.history.push('/payment/servicemenu/RRS/FGR');
        }
        paymentApi.setUpCard();
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.geo !== nextProps.geo) {
            this.updateState(nextProps);
        }
    }
    initialize() {
        return {
            name: '',
            card: '',
            email: '',
            password: '',
            expMonth: '',
            expYear: '',
            cvv: '',
            formErrors: {
                name: '',
                card: '',
                email: '',
                password: '',
                expMonth: '',
                expYear: '',
                cvv: '',
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
            currency: (!this.props.geo.currencyCode) ? '$' : Util.currency(this.props.geo.currencyCode),
            currencyCode: (!this.props.geo.currencyCode) ? 'USD' : this.props.geo.currencyCode,
            conversionRate:
                (!this.props.geo.currencyConverter) ? 1 : this.props.geo.currencyConverter,
            selPackage:
                this.props.packageData.service.product[this.sessionPackage.base],
            selExperience:
                this.props.packageData.service.experience[this.sessionPackage.experience],
            addonData: [],
            totalPrice: 0,
            discount: 0,
            paymentType: 'card',
        };
    }
    setUpPaymentForDirectAccess() {
        if (this.props.match.params.package) {
            const getPackage = JSON.parse(decodeURI(this.props.match.params.package));
            if (getPackage && (!getPackage.base || !getPackage.experience || !getPackage.addon)) {
                this.props.history.push('/payment/servicemenu/RRS/FGR');
            }
            // let totalPrice = this.props.packages.product[getPackage.base][getPackage.experience];
            // Object.keys(this.props.packages.addon).forEach((key) => {
            //     key = parseInt(key, 10);
            //     if (getPackage.addon.indexOf(key) !== -1) {
            //         totalPrice += this.props.packages.addon[key];
            //     }
            // });
            // getPackage.totalPrice = totalPrice;
            getPackage.totalPrice = this.calTotalPrice(getPackage);
            Util.setDataToSessionStorage('package', getPackage);
        }
    }
    calTotalPrice(packageData) {
        let totalPrice = this.props.packages.product[packageData.base][packageData.experience];
        Object.keys(this.props.packages.addon).forEach((key) => {
            key = parseInt(key, 10);
            if (packageData.addon.indexOf(key) !== -1) {
                totalPrice += this.props.packages.addon[key];
            }
        });
        // totalPrice = 0.5;
        return totalPrice;
    }
    getSingleAddon(data) {
        let selAddon = {};
        this.addonData.forEach((element) => {
            element.items.forEach((ele) => {
                if (ele.id === data) {
                    ele.price = this.props.packages.addon[ele.id];
                    selAddon = ele;
                }
            });
        });
        return selAddon;
    }


    updateState = (props) => {
        this.setState({
            // selPackage: selPackage,
            currency: Util.currency(props.geo.currencyCode),
            currencyCode: props.geo.currencyCode,
            conversionRate: props.geo.currencyConverter,
        });
    }

    handleUserInput = (e) => {
        const { name, value } = e.target;
        // const value = e.target.value;
        this.setState(
            {
                [name]: value,
            },
            () => {
                this.validateField(name, value);
            },
        );
    }
    validateField(fieldName, value) {
        const fieldValidationErrors = this.state.formErrors;
        let {
            emailValid,
            passwordValid,
            expMonthValid,
            expYearValid,
            nameValid,
            cardValid,
            cvvValid,
        } = this.state;
        // let emailValid = this.state.emailValid;
        // let passwordValid = this.state.passwordValid;
        // let expMonthValid = this.state.expMonthValid;
        // let expYearValid = this.state.expYearValid;
        // let nameValid = this.state.nameValid;
        // let cardValid = this.state.cardValid;
        // let cvvValid = this.state.cvvValid;

        switch (fieldName) {
        case 'name':
            nameValid = value.length > 0;
            fieldValidationErrors.name = nameValid ? '' : ' is invalid';
            break;
        case 'card':
            cardValid = /^\d{15}$/.test(value) || /^\d{16}$/.test(value);
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
            cvvValid,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.emailValid && this.state.passwordValid && this.state.cardValid && this.state.expMonthValid && this.state.expYearValid && this.state.nameValid && this.state.cvvValid
        });
    }

    errorClass(error) {
        return (!error.length ? '' : 'has-error');
    }

    handerPaypalSuccess = (dat) => {
        this.setState({
            loader: true,
        });
        let pakdesc = `${this.state.selPackage.name} (${this.props.packages.product[this.state.selPackage.code][this.state.selExperience.code]}) ###`;
        this.state.addonData.forEach((ele) => {
            pakdesc = `${pakdesc} ${ele.label} (${ele.price}) ###`;
        });
        const addon = [];
        addon.push({
            id: this.state.selPackage.code, label: this.state.selPackage.name, price: this.props.packages.product[this.state.selPackage.code][this.state.selExperience.code],
        });
        this.state.addonData.map(item => addon.push(item));
        const totalPrice = this.state.totalPrice;
        // if (this.state.discount) {
        //     totalPrice = this.state.totalPrice - Util.round(this.state.totalPrice * (parseInt(this.state.discount, 10) / 100));
        // }
        // if (Util.getCountryData(this.props.geo.countryCode).currency !== 'usd') {
        //     totalPrice = Util.round(totalPrice * this.state.conversionRate);
        // }
        let salary = null;
        if (this.sessionPackage && this.sessionPackage.hasOwnProperty('salary')) {
            salary = SalaryData[this.sessionPackage.salary];
            salary.data = salary.data[this.props.geo.countryCode.toLowerCase()];
        }
        const request = {
            id_cust: dat.payerID,
            productName: this.state.selPackage.name,
            experience: this.state.selExperience.code,
            total: totalPrice,
            usdTotal: totalPrice,
            password: this.state.password,
            email: this.state.email,
            addon: JSON.stringify(addon),
            id_prod: this.state.selPackage.code,
            label: pakdesc,
            discount: this.state.discount,
            salary: JSON.stringify(salary),
            geo: JSON.stringify(this.props.geo),
            template: JSON.stringify(this.template),
            response: JSON.stringify(dat),
            currency: 'usd'
        };
        paymentApi.makePaypalPayment(request)
            .then((result) => {
                this.setState({
                    loader: false,
                });
                if (result.status === 'Success') {
                    Util.setDataToSessionStorage('currentUser', result.data);
                    // this.setLoggedInUser(result.data);
                    // this.paymentService.isPayment = true;
                    // this.router.navigate(['/payment/confirmation/', this.code]);
                    this.props.history.push(`/payment/confirmation/${this.sessionPackage.base}`);
                } else {
                    // this.errorMessage = result.msg;
                    this.setState({
                        errorMessage: result.msg,
                    });
                }
            });
    }
    handerPaypalFailer = (error) => {
        this.setState({
            errorMessage: error,
        });
    }
    handlePaypalRequest = (e) => {
        e.preventDefault();
        this.setState({
            cardValid: true,
            expMonthValid: true,
            expYearValid: true,
            nameValid: true,
            cvvValid: true,
        }, this.validateForm);

        const self = this;
        Object.keys({
            email: '', password: '',
        }).map(item => self.setState(
            { [item]: self.state[item] },
            () => { self.validateField(item, self.state[item]); }
        ));
        if (!this.state.formValid) {
            return false;
        }
        return true;
    }

    handleRequest = (e) => {
        e.preventDefault();
        const paymentDone = Util.getDataFromSessionStorage('paymentDone', 'string');
        if (paymentDone) {
            if (paymentDone === 'initalize') {
                this.setState({ loader: false, errorMessage: 'Payment is in progress...' });
            } else {
                this.setState({ loader: false, errorMessage: 'Payment Already Done' });
            }
            return false;
        }
        Util.setDataToSessionStorage('paymentDone', 'initalize');
        // let self = this;
        // Object.keys(this.state.formErrors).map(function(item,i){
        //     return self.setState ({[item]: self.state[item]},
        //         () => { self.validateField(item, self.state[item])});
        // })
        // if(!this.state.formValid){
        //     return false;
        // }
        this.setState({ loader: true });
        paymentApi.getCardToken(
            this.state.name,
            this.state.card,
            this.state.expMonth,
            this.state.expYear,
            this.state.cvv
        )
            .then(token =>
                // let self = this;
                // console.log(token);
                token).then((token) => {
                // let self = this;
                let pakdesc = `${this.state.selPackage.name} (${this.props.packages.product[this.state.selPackage.code][this.state.selExperience.code]}) ### `;
                this.state.addonData.forEach((ele) => {
                    pakdesc = `${pakdesc + ele.label} (${ele.price})  ### `;
                });
                const addon = [];
                addon.push({
                    id: this.state.selPackage.code,
                    label: this.state.selPackage.name,
                    price: this.props.packages.product[this.state.selPackage.code][this.state.selExperience.code]
                });
                this.state.addonData.map(item => addon.push(item));
                let totalPrice = this.state.totalPrice;
                const usdTotal = this.state.totalPrice;
                // totalPrice = 0.5;
                // if (this.state.discount) {
                //     totalPrice = this.state.totalPrice - Util.round(this.state.totalPrice * (parseInt(this.state.discount, 10) / 100));
                // }
                if (Util.getCountryData(this.props.geo.countryCode).currency !== 'usd') {
                    totalPrice = Util.round(totalPrice * this.state.conversionRate);
                }
                let salary = null;
                if (this.sessionPackage && this.sessionPackage.hasOwnProperty('salary')) {
                    salary = SalaryData[this.sessionPackage.salary];
                    salary.data = salary.data[this.props.geo.countryCode.toLowerCase()];
                }
                const request = {
                    token,
                    productName: this.state.selPackage.name,
                    experience: this.state.selExperience.code,
                    total: totalPrice,
                    usdTotal,
                    password: this.state.password,
                    email: this.state.email,
                    addon: JSON.stringify(addon),
                    id_prod: this.state.selPackage.code,
                    label: pakdesc,
                    discount: this.state.discount,
                    salary: JSON.stringify(salary),
                    geo: JSON.stringify(this.props.geo),
                    template: JSON.stringify(this.template),
                    currency: Util.getCountryData(this.props.geo.countryCode).currency
                };
                return paymentApi.makePayment(request);
            }).then((result) => {
                if (result.status === 'Success') {
                    Util.setDataToSessionStorage('currentUser', result.data);
                    Util.setDataToSessionStorage('token', result.data.token);
                    Util.setDataToSessionStorage('paymentDone', 'success');
                    // this.setLoggedInUser(result.data);
                    // this.paymentService.isPayment = true;
                    // this.router.navigate(['/payment/confirmation/', this.code]);
                    this.setState({ loader: false });
                    this.props.history.push(`/payment/confirmation/${this.sessionPackage.base}`);
                } else {
                    // this.errorMessage = result.msg;
                    this.setState({ loader: false, errorMessage: result.msg });
                    Util.removeFromSessionStorage('paymentDone');
                }
            })
            .catch((error) => {
                this.setState({ loader: false, errorMessage: error });
                Util.removeFromSessionStorage('paymentDone');
            });
        return false;
    }

    handleSelect = (paymentType) => {
        this.setState({ paymentType });
        // this.setState(this.initializeForm());
    }

    stepData() {
        return [
            {
                stepTxt: 'Step 1',
                stepDesc: 'Select Package',
                status: 'complete'
            },
            {
                stepTxt: 'Step 2',
                stepDesc: 'Customise CV',
                status: 'complete'
            },
            {
                stepTxt: 'Step 3',
                stepDesc: 'Billing',
                status: 'active'
            },
            {
                stepTxt: 'Step 4',
                stepDesc: 'Confirmation',
                status: 'disabled'
            }
        ];
    }

    render() {
        return (
            <div>
                <ScrollToTop />
                <Spinner message={'Processing your payment... <br/>Do not click multiple times on "place your order" or reload the page.'} loader={this.state.loader} />
                {/* <HeaderPayment /> */}
                <Helmet>
                    <title>WorkPapa | Payment</title>
                </Helmet>
                <div className="top-spacer">
                    <div className="container block" id="purchase_form">
                        <Steps stepData={this.stepData()} />
                        <div className="row">
                            <div className="col-md-7 col-xs-12">
                                {!!this.state.discount &&
                                <div className="alert alert-success" >
                                    Congratualtion! you are eligible for {this.state.discount}% off on resume service today
                                </div>
                                }
                                <div className="card hidden-md hidden-lg" id="summary_card">
                                    {/* <h4>Order Summary</h4> */}
                                    <table width="100%" >
                                        <tbody>
                                            {/* <tr>
                                                <td className="col-xs-9" style={{ paddingBottom: '2px' }}>
                                                    {this.state.selPackage.name} Package
                                                </td>
                                                <td className="price_cell text-center" style={{ paddingBottom: '2px' }}>
                                                    {(!this.props.packages.product[this.state.selPackage.code][this.state.selExperience.code]) ? '' : Util.showPrice(this.props.packages.product[this.state.selPackage.code][this.state.selExperience.code], this.state.conversionRate, this.state.currency, this.state.currencyCode)}
                                                </td>
                                            </tr>
                                            {!!this.state.discount &&
                                            <tr>
                                                <td className="price_cell text-success">
                                                    <h6>Discount {this.state.discount}%</h6>
                                                </td>
                                                <td className="price_cell text-success text-right">
                                                    <h5>{Util.showPrice(this.state.totalPrice * (parseInt(this.state.discount, 10) / 100), this.state.conversionRate, this.state.currency, this.state.currencyCode)}</h5>
                                                </td>
                                            </tr>
                                            } */}
                                            <tr>
                                                <td><h4>Order total:</h4>
                                                </td>
                                                <td className="price_cell text-right">
                                                    {/* {Util.currency(this.state.currency)}{Util.round(this.state.totalPrice*this.state.conversionRate)} */}
                                                    {Util.showPrice(this.state.totalPrice, this.state.conversionRate, this.state.currency, this.state.currencyCode)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <h2 className="subscribe-title text-center">Place Your Order</h2>
                                <Tabs activeKey={this.state.paymentType} onSelect={this.handleSelect} id="uncontrolled-tab-example">
                                    <Tab eventKey="card" title="Credit Card">
                                        <div className="card" style={{ borderTop: 'none' }}>
                                            <div id="form-container" >
                                                <form method="post" onSubmit={this.handleRequest} >
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
                                                                    <span>Password</span><span className="text-danger">*</span><span className="badge badge-secondary" data-tip="Creating this password will be you password to login workpapa to view the status of your project">?</span><ReactTooltip />
                                                                </label>
                                                                <input type="password" autoComplete="off" className="form-control" maxLength="16" placeholder="Password" name="password" onChange={this.handleUserInput} />
                                                                <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'password' }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {!!this.state.errorMessage &&
                                                    <div className=" alert alert-danger" >{this.state.errorMessage}</div>
                                                    }
                                                    <div className="row text-center">
                                                        <button className="btn btn-danger btn-lg" disabled={!this.state.formValid || !!this.state.loader}>Place Your Order</button>
                                                        {!!this.state.loader &&
                                                        <img alt="loader" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                                        }
                                                    </div>
                                                    <div className="row text-center">
                                                        <small>By placing your order, you agree to WorkPapa's Terms of Service.</small>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="paypal" title="Paypal">
                                        <div className="card" style={{ borderTop: 'none' }}>
                                            <div id="form-container" >
                                                <form method="post" onSubmit={this.handlePaypalRequest} >
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
                                                    {!!this.state.errorMessage &&
                                                    <div className=" alert alert-danger" >{this.state.errorMessage}</div>
                                                    }
                                                    <div className="row text-center">
                                                        <PaypalBtn currency="USD" total={this.state.totalPrice} email={this.state.email} password={this.state.password} description={`${this.state.selPackage.name} Package`} handerPaypalSuccess={this.handerPaypalSuccess} handerPaypalFailer={this.handerPaypalFailer} />
                                                        {!!this.state.loader &&
                                                        <img alt="loader" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                                        }
                                                    </div>
                                                    <div className="row text-center">
                                                        <small>By placing your order, you agree to WorkPapa's Terms of Service.</small>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </Tab>
                                </Tabs>
                                <small>
                                    What comes next? Good question! After you submit your order, you&apos;ll receive a short questionnaire to help your writer get started.
                                </small>
                            </div>
                            <div className="col-md-5 col-xs-12  sidebar" style={{ marginTop: '73px' }}>
                                {this.props.site.pendingResume && this.props.site.pendingResume < Globals.site.FAST_SERVICE_RESUME_LIMIT &&
                                    <div className="row">
                                        <div className="col-lg-12 " >
                                            <h4>Fast 24 - 48 hour delivery</h4>
                                        </div>
                                    </div>
                                }
                                <div className="card visible-md visible-lg" id="summary_card">
                                    <h4>Order Summary</h4>
                                    <table >
                                        <tbody>
                                            <tr>
                                                <td className="col-xs-9" style={{ paddingBottom: '2px' }}>
                                                    {this.state.selPackage.name} Package
                                                </td>
                                                <td className="price_cell text-center" style={{ paddingBottom: '2px' }}>
                                                    {(!this.props.packages.product[this.state.selPackage.code][this.state.selExperience.code]) ? '' : Util.showPrice(this.props.packages.product[this.state.selPackage.code][this.state.selExperience.code], this.state.conversionRate, this.state.currency, this.state.currencyCode)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '0px' }}>
                                                    <small>Work with a writer that understands the local market</small>
                                                </td>
                                                <td className="price_cell text-right" style={{ padding: '0px' }}>
                                                    Included
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '0px' }}>
                                                    <small>Rewrite/Optimize your summary</small>
                                                </td>
                                                <td className="price_cell text-right" style={{ padding: '0px' }}>
                                                    Included
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '0px' }}>
                                                    <small>Rewrite your job experience(s)</small>
                                                </td>
                                                <td className="price_cell text-right" style={{ padding: '0px' }}>
                                                    Included
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '0px' }}>
                                                    <small>Quantify your job experience(s)</small>
                                                </td>
                                                <td className="price_cell text-right" style={{ padding: '0px' }}>
                                                    Included
                                                </td>
                                            </tr>
                                            {this.state.addonData.map(item =>
                                                (
                                                    <tr key={item.id}>
                                                        <td style={{ padding: '0px' }}>
                                                            <small>{item.label}</small>
                                                        </td>
                                                        <td className="price_cell text-right" style={{ padding: '0px' }}>
                                                            {item.price ? `${Util.currency(this.state.currency)}${Util.round((item.price) * this.state.conversionRate)}` : 'Included'}
                                                        </td>
                                                    </tr>
                                                ))}
                                            {!!this.state.discount &&
                                            <tr>
                                                <td className="price_cell text-success">
                                                    <h6>Discount {this.state.discount}%</h6>
                                                </td>
                                                <td className="price_cell text-success text-right">
                                                    <h5>{Util.showPrice(this.state.totalPrice * (parseInt(this.state.discount, 10) / 100), this.state.conversionRate, this.state.currency, this.state.currencyCode)}</h5>
                                                </td>
                                            </tr>
                                            }
                                            <tr className="total">
                                                <td>Order total:
                                                </td>
                                                <td className="price_cell text-right">
                                                    {/* {Util.currency(this.state.currency)}{Util.round(this.state.totalPrice*this.state.conversionRate)} */}
                                                    {Util.showPrice(this.state.totalPrice, this.state.conversionRate, this.state.currency, this.state.currencyCode)}
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
                                    <div style={{ float: 'left', margin: '10px', minHeight: '70px' }}>
                                        <img src={imgShield} width="48" height="58" alt="secure" />
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
            </div>
        );
    }
}

// PaymentServicePage.propTypes = {
//     geo: propTypes.shape({ currencyCode: 'USD', currencyConverter: 1 }).isRequired,
//     packages: propTypes.shape({ product: [] }).isRequired,
//     history: propTypes.shape([]).isRequired,
//     packageData: propTypes.shape({ service: { product: [] } }).isRequired,
// };

// function mapStateToProps(state, ownProps) {
//     return {
//       geo: state.location,
//       packages: state.packages
//     };
// }
export default PaymentServicePage;
// export default withRouter(connect(mapStateToProps)(PaymentServicePage));
// export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaymentServicePage);
