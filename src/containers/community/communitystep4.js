import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Util from '../../helpers/util.class';
import FormErrors from '../../components/formerror/formerror';
import paymentApi from '../../api/paymentApi';
// import PlanData from '../../data/library/plans.json';
import ScrollToTop from '../../components/scrolltotop/scrolltotop';
import packageData from '../../data/packages.json';
import Globals from '../../helpers/constant';

// const TRIAL = 7;
// console.log(packageData.service.library);

// const productDescription = 'Unlimited Streaming in SD';

class CommunityStep4Page extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
        this.sessionPackage = Util.getDataFromSessionStorage('textLibrary');
        if (!Object.keys(this.sessionPackage).length) {
            this.props.history.push('/payment/signup-step1');
        }
        this.productDescription = packageData.service.library[this.sessionPackage.plan].description;
    }
    componentDidMount() {
        paymentApi.setUpCard();
        this.updateState(this.props);
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
            expMonth: '',
            expYear: '',
            cvv: '',
            formErrors: {
                name: '',
                card: '',
                expMonth: '',
                expYear: '',
                cvv: '',
            },
            nameVaild: false,
            cardVaild: false,
            expMonthValid: false,
            expYearValid: false,
            cvvValid: false,
            msg: '',
            errorMessage: '',
            loader: false,
            currency: (!this.props.geo.currencyCode) ? '$' : Util.currency(this.props.geo.currencyCode),
            conversionRate:
                (!this.props.geo.currencyConverter) ? 1 : this.props.geo.currencyConverter,
            totalPrice: 0
        };
    }

    updateState = (props) => {
        this.setState({
            totalPrice: props.packages[this.sessionPackage.plan],
            currency: Util.currency(props.geo.currencyCode),
            conversionRate: props.geo.currencyConverter
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
            expMonthValid,
            expYearValid,
            nameValid,
            cardValid,
            cvvValid,
        } = this.state;

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
        default:
            break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            cardValid,
            expMonthValid,
            expYearValid,
            nameValid,
            cvvValid,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.cardValid && this.state.expMonthValid && this.state.expYearValid && this.state.nameValid && this.state.cvvValid
        });
    }

    errorClass(error) {
        return (!error.length ? '' : 'has-error');
    }

    // onFirstNamePaste(event) {
    //     let value = event.target.value;
    //     const name = event.target.name;
    //     // const text = event.clipboardData.getData('Text');
    //     value = value.split(' ').join('');
    //     this.setState({ [name]: value });
    // }

    handleRequest = (e) => {
        e.preventDefault();
        // const paymentDone = Util.getDataFromSessionStorage('paymentDone', 'string');
        // if (paymentDone) {
        //     if (paymentDone === 'initalize') {
        //         this.setState({ loader: false, errorMessage: 'Payment is in progress...' });
        //     } else {
        //         this.setState({ loader: false, errorMessage: 'Payment Already Done' });
        //     }
        //     return false;
        // }
        // Util.setDataToSessionStorage('paymentDone', 'initalize');

        this.setState({ loader: true });
        paymentApi.getCardToken(
            this.state.name,
            this.state.card,
            this.state.expMonth,
            this.state.expYear,
            this.state.cvv
        )
            .then((token) => {
                console.log(token, packageData.service.library);
                const productName = this.productDescription;
                let totalPrice = this.state.totalPrice;
                if (Util.getCountryData(this.props.geo.countryCode).currency !== 'usd') {
                    totalPrice = Util.round(totalPrice * this.state.conversionRate);
                }
                totalPrice = '0.5';

                const pakdesc = `${productName} (${totalPrice}) `;
                // const currency = Util.getCountryData(this.props.geo.countryCode).currency;
                const currency = 'usd';

                const request = {
                    token,
                    productName,
                    experience: '',
                    total: totalPrice,
                    password: this.sessionPackage.password,
                    email: this.sessionPackage.email,
                    addon: '',
                    id_prod: this.sessionPackage.plan,
                    label: pakdesc,
                    discount: 0,
                    geo: JSON.stringify(this.props.geo),
                    template: '',
                    currency,
                    nb_month: '1',
                    trial: Globals.community.Globals.community.TRIAL
                };
                return paymentApi.makePayment(request);
            })
            .then((result) => {
                if (result.status === 'Success') {
                    Util.setDataToSessionStorage('currentUser', result.data);
                    Util.setDataToSessionStorage('token', result.data.token);
                    this.setState({ loader: false });
                    this.props.history.push('/textlibrary/confirmation');
                } else {
                    // this.errorMessage = result.msg;
                    this.setState({ loader: false, errorMessage: result.msg });
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({ loader: false, errorMessage: error });
            });
        return false;
    }

    render() {
        return (
            <section id="cummunity">
                <ScrollToTop />
                <div className="row">
                    <div className="container">
                        <div className="col-lg-12 text-center" style={{ marginTop: '20px' }}>
                            <div className="col-xs-6 col-md-offset-3">
                                <div className="row">
                                    <div className="col-xs-12">
                                        <div className="alert alert-info">Enjoy your {Globals.community.TRIAL} days. It's free.</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <p className="small">STEP 2 OF 3 </p>
                                    <h4>Set up your credit or debit card.</h4>
                                    <i className="fab fa-cc-visa fa-3" aria-hidden="true" /> <i className="fab fa-cc-mastercard fa-3" aria-hidden="true" />
                                </div>
                                <div className="row">
                                    <div >
                                        <div className="card">
                                            <div id="form-container" className="text-left">
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
                                                        <div className="row">
                                                            <div className="col-xs-12">
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
                                                        </div>
                                                        <div className="row">
                                                            <div id="cvv-group" className={` col-xs-12 form-group controls ${this.errorClass(this.state.formErrors.cvv)}`} >
                                                                <label htmlFor="cvv">
                                                                    <span>CVV Code</span><span className="text-danger">*</span>
                                                                </label>
                                                                <input type="text" size="4" autoComplete="off" maxLength="4" className="form-control" id="cvv" placeholder="CVV" name="cvv" onChange={this.handleUserInput} />
                                                                <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'cvv' }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {this.props.packages &&
                                                    <div className="row">
                                                        <div className="col-xs-12">
                                                            <p className="small">{`Your membership begins with ${Globals.community.TRIAL} days free. Starting ${new Date().toLocaleDateString()}, you will be charged ${Util.showPrice(this.state.totalPrice, this.state.conversionRate, this.state.currency, this.state.currencyCode)} per month until you cancel.`}
                                                                <br />
                                                                *Access an unlimited number of documents.
                                                            </p>
                                                            {/* {this.productDescription} at {Util.showPrice(this.state.totalPrice, this.state.conversionRate, this.state.currency, this.state.currencyCode)} a month after free trial. */}
                                                        </div>
                                                        {/* <div className="col-xs-4 text-right">
                                                            <Link to="/textlibrary/select-plan">Change</Link>
                                                        </div> */}
                                                    </div>
                                                    }
                                                    {!!this.state.errorMessage &&
                                                            <div className=" alert alert-danger" >{this.state.errorMessage}</div>
                                                    }
                                                    <div className="row text-center">
                                                        <button className="btn btn-danger btn-lg" disabled={!this.state.formValid || !!this.state.loader}>START YOUR FREE TRIAL</button>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default CommunityStep4Page;
