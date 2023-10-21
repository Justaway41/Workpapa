import React, { Component } from 'react';
// import OtherApi from '../../api/otherApi';
import Util from '../../helpers/util.class';
import SalaryData from '../../data/salary.json';
import otherApi from '../../api/otherApi';

class SalaryPricing extends Component {
    constructor(props) {
        super(props);
        this.form = {
            salary: '',
            base: 'RRS',
            experience: 'ECR'
        };
        this.state = {
            salary: '',
            salaryError: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps);
    // }
    handleChange(e) {
        e.target.classList.add('active');
        this.setState({
            [e.target.name]: e.target.value
        });
        this.showInputError(e.target.name);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ salaryError: '' });
        // console.log('component state', JSON.stringify(this.state));

        // if (!this.showFormErrors()) {
        // // console.log('form is invalid: do not submit');
        // } else {
        // console.log('form is valid: submit');
        if (this.state.salary !== '') {
            let salary = null;
            salary = SalaryData[this.state.salary];
            salary.data = salary.data[this.props.country];
            const request = {
                salary: JSON.stringify(salary)
            };
            otherApi.saveOrderSalary(request);

            const packageSelected = {
                base: this.form.base,
                salary: this.state.salary,
                experience: this.form.experience,
                totalPrice: SalaryData[this.state.salary].price,
                template: {},
                addon: []
            };
            Util.setDataToSessionStorage('package', packageSelected);
            this.props.history.push(`/payment/addon/${this.form.base}/${this.form.experience}`);
        } else {
            this.setState({ salaryError: 'Desired salary is a mandatory' });
        }
    }

    // getPricing = (e) => {
    //     e.preventDefault();
    //     if (!this.showFormErrors()) {
    //         // console.log('form is invalid: do not submit');
    //     } else {
    //         // console.log('form is valid: submit');
    //         const salary = Util.round(this.state.salary / this.props.conversionRate);
    //         OtherApi.getPricing(salary)
    //             .then((response) => {
    //                 if (response.status === 'Success') {
    //                     this.setState({ error: '', basePrice: response.data.price });
    //                 } else {
    //                     this.setState({ error: response.msg });
    //                 }
    //             // this.props.actions.toggleLoader(false);
    //             });
    //     }
    // }

    // enableSalaryEdit = () => {
    //     this.setState({ salary: '', basePrice: 0 });
    // }

    showFormErrors() {
        let isFormValid = true;
        const selects = document.querySelectorAll('#frmForgot select');
        selects.forEach((input) => {
            input.classList.add('active');

            const isInputValid = this.showInputError(input.name);

            if (!isInputValid) {
                isFormValid = false;
            }
        });
        return isFormValid;
    }

    showInputError(refName) {
        const validity = this.form[refName].validity;
        const label = 'Salary';// document.getElementById(`${refName}Label`).textContent;
        const error = document.getElementById(`${refName}Error`);
        // if (parseInt(this.form.salary.value, 10) <= 0) {
        //     this.form.salary.setCustomValidity('error');
        //     error.textContent = 'Select salary range';
        // } else {
        //     this.form.salary.setCustomValidity('');
        // }

        if (!validity.valid) {
            if (validity.valueMissing) {
                error.textContent = `${label} is a mandatory field`;
            } // else if (validity.typeMismatch) {
            //     error.textContent = `${label} should be a valid email address`;
            // } else if (validity.customError) {
            //     // error.textContent = '';
            // }
            return false;
        }

        error.textContent = '';
        return true;
    }

    render() {
        return (
            <div className="portfolio-item">
                <div className="portfolio-link">
                    <h5>Choose Desired Salary & Get Pricing</h5>
                    <img src={require('../../assets/img/icons8-Manager-50.png')} className="img-responsive img-centered" alt="" />
                    <div className="description text-center">
                        <form noValidate id="frmForgot">
                            <div className="form-group">
                                <select
                                    name="salary"
                                    className="form-control"
                                    required
                                    onChange={this.handleChange}
                                    ref={(val) => { this.form.salary = val; }}
                                >
                                    <option value="">Choose Desired Salary</option>
                                    {Object.keys(SalaryData).filter(item => SalaryData[item].data[this.props.country]).map(item => <option key={SalaryData[item].id} value={SalaryData[item].id}> up to {SalaryData[item].data[this.props.country].salary} /year</option>)}
                                </select>
                                <div className="error" id="salaryError">{this.state.salaryError}</div>
                            </div>
                            <div className="form-group">
                                <a
                                    className="btn btn-lg btn-outline btn-success"
                                    onClick={this.handleSubmit}
                                >Get Pricing <i className="fas fa-arrow-circle-right" />
                                </a>
                            </div>
                        </form>
                    </div>
                    {/* {this.state.salary !== '' &&
                        <div className="text-center">
                            (starting at {Util.showPrice(SalaryData[this.state.salary].price, this.props.conversionRate, this.props.currency, this.props.currencyCode, 0)})
                        </div>
                    } */}
                </div>
            </div>
        );
    }
}

SalaryPricing.defaultProps = {
    country: 'us',
};

export default SalaryPricing;
