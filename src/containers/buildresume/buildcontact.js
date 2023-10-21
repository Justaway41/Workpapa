import React, { Component } from 'react';
import Util from '../../helpers/util.class';

// import axios from 'axios';

// import Globals from '../../helpers/constant';

// console.log(Constant.Globals.API);

class BuildContactPage extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
    }

    initialize = () => ({
        firstname: '',
        lastname: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        phone: '',
        formErrors: {
            firstname: '', zip: '', lastname: '', address: '', city: '', email: '', phone: '', state: ''
        },
        firstnameVaild: false,
        lastnameVaild: false,
        addressVaild: false,
        cityVaild: false,
        stateVaild: false,
        zipVaild: false,
        emailValid: false,
        phoneValid: false,
        msg: '',
        loader: false
    })
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
        let firstnameVaild = this.state.firstnameVaild;
        let lastnameVaild = this.state.lastnameVaild;
        let addressVaild = this.state.addressVaild;
        let cityVaild = this.state.cityVaild;
        let stateVaild = this.state.stateVaild;
        let zipVaild = this.state.zipVaild;
        let emailValid = this.state.emailValid;
        let phoneValid = this.state.phoneValid;

        switch (fieldName) {
        case 'firstname':
            firstnameVaild = value.length > 0;
            fieldValidationErrors.name = firstnameVaild ? '' : ' is invalid';
            break;
        case 'lastname':
            lastnameVaild = value.length > 0;
            fieldValidationErrors.name = lastnameVaild ? '' : ' is invalid';
            break;
        case 'address':
            addressVaild = value.length > 0;
            fieldValidationErrors.name = addressVaild ? '' : ' is invalid';
            break;
        case 'city':
            cityVaild = value.length > 0;
            fieldValidationErrors.name = cityVaild ? '' : ' is invalid';
            break;
        case 'state':
            stateVaild = value.length > 0;
            fieldValidationErrors.name = stateVaild ? '' : ' is invalid';
            break;
        case 'zip':
            zipVaild = value.length > 0;
            fieldValidationErrors.name = zipVaild ? '' : ' is invalid';
            break;
        case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
        case 'phone':
            phoneValid = value.length >= 10;
            fieldValidationErrors.phone = phoneValid ? '' : ' is invalid';
            break;
        default:
            break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            firstnameVaild,
            lastnameVaild,
            addressVaild,
            cityVaild,
            stateVaild,
            zipVaild,
            emailValid,
            phoneValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.firstnameVaild && this.state.lastnameVaild && this.state.addressVaild && this.state.cityVaild && this.state.stateVaild && this.state.zipVaild && this.state.emailValid && this.state.phoneValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleRequest = (e) => {
        e.preventDefault();
        const resumeBuild = Util.getDataFromSessionStorage('resumeBuild');

        const contactData = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            phone: this.state.phone,
            email: this.state.email
        };
        const resumeBuildData = {
            template: resumeBuild.template,
            contact: contactData
        };
        Util.setDataToSessionStorage('resumeBuild', resumeBuildData);
        this.props.history.push('/build-resume/experience');
        return false;
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
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2">
                    <h3>Let's complete your Resume Heading</h3>
                    <p>This section shows your contact information so hiring managers can contact you.</p><br />
                    <form name="form" onSubmit={this.handleRequest} >
                        <div className="row control-group">
                            <div className="control-group col-xs-6">
                                <div className={`form-group floating-label-form-group controls ${this.errorClass(this.state.formErrors.firstname)}`} >
                                    <label htmlFor="name">First Name</label>
                                    <input type="text" className="form-control" placeholder="First Name" name="firstname" value={this.state.firstname} onChange={this.handleUserInput} />
                                </div>
                                <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'firstname' }} />
                            </div>
                            <div className="control-group col-xs-6">
                                <div className={`form-group floating-label-form-group controls ${this.errorClass(this.state.formErrors.lastname)}`} >
                                    <label htmlFor="name">Last Name</label>
                                    <input type="text" className="form-control" placeholder="Last Name" name="lastname" value={this.state.lastname} onChange={this.handleUserInput} />
                                </div>
                                <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'lastname' }} />
                            </div>
                        </div>
                        <div className="row control-group" >
                            <div className={`form-group col-xs-12 floating-label-form-group controls ${this.errorClass(this.state.formErrors.address)}`} >
                                <label htmlFor="email">Street Address</label>
                                <input type="text" className="form-control" placeholder="Street Address" name="address" value={this.state.address} onChange={this.handleUserInput} />
                            </div>
                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'address' }} />
                        </div>
                        <div className="row" >
                            <div className="control-group col-xs-6">
                                <div className={`form-group floating-label-form-group controls ${this.errorClass(this.state.formErrors.city)}`} >
                                    <label>City</label>
                                    <input type="text" className="form-control" placeholder="City" name="city" value={this.state.city} onChange={this.handleUserInput} />
                                </div>
                                <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'city' }} />
                            </div>
                            <div className="control-group col-xs-3">
                                <div className={`form-group floating-label-form-group controls ${this.errorClass(this.state.formErrors.state)}`} >
                                    <label>State</label>
                                    <input type="text" className="form-control" placeholder="State" name="state" value={this.state.state} onChange={this.handleUserInput} />
                                </div>
                                <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'state' }} />
                            </div>
                            <div className="control-group col-xs-3">
                                <div className={`form-group floating-label-form-group controls ${this.errorClass(this.state.formErrors.zip)}`} >
                                    <label>Zip Code</label>
                                    <input type="text" className="form-control" placeholder="Zip Code" name="zip" value={this.state.zip} onChange={this.handleUserInput} />
                                </div>
                                <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'zip' }} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="control-group col-xs-6">
                                <div className={`form-group floating-label-form-group controls ${this.errorClass(this.state.formErrors.phone)}`} >
                                    <label>Phone Number</label>
                                    <input type="tel" className="form-control" placeholder="Phone Number" name="phone" value={this.state.phone} onChange={this.handleUserInput} />
                                </div>
                                <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'phone' }} />
                            </div>
                            <div className="control-group col-xs-6">
                                <div className={`form-group floating-label-form-group controls ${this.errorClass(this.state.formErrors.email)}`} >
                                    <label>Email Address</label>
                                    <input type="email" className="form-control" placeholder="Email Address" name="email" value={this.state.email} onChange={this.handleUserInput} />
                                </div>
                                <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'email' }} />
                            </div>
                        </div>
                        <br />
                        {this.state.msg !== '' &&
                                <div className="alert alert-success" >{this.state.msg}</div>
                        }
                        <div className="row">
                            <div className="form-group col-xs-12">
                                <button className="btn btn-danger btn-lg pull-right" disabled={!this.state.formValid || this.state.loader}>Next : Work History
                                    <i className="icon icon-arrow" />
                                </button>
                                {this.state.loader &&
                                     <img alt="loader" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

export default BuildContactPage;
