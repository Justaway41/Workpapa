import React, { Component } from 'react';
import axios from 'axios';

import Globals from '../../helpers/constant';

// console.log(Constant.Globals.API);

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
    }

    initialize = () => ({
        name: '',
        email: '',
        phone: '',
        message: '',
        formErrors: {
            name: '', email: '', phone: '', message: ''
        },
        nameVaild: false,
        emailValid: false,
        phoneValid: false,
        messageValid: false,
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
        let emailValid = this.state.emailValid;
        let phoneValid = this.state.phoneValid;
        let nameValid = this.state.nameValid;
        let messageValid = this.state.messageValid;

        switch (fieldName) {
        case 'name':
            nameValid = value.length > 0;
            fieldValidationErrors.name = nameValid ? '' : ' is invalid';
            break;
        case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
        case 'phone':
            phoneValid = value.length >= 10;
            fieldValidationErrors.phone = phoneValid ? '' : ' is invalid';
            break;
        case 'message':
            messageValid = value.length > 20;
            fieldValidationErrors.message = messageValid ? '' : ' should be atleast 20 character';
            break;
        default:
            break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid,
            phoneValid,
            nameValid,
            messageValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.phoneValid && this.state.nameValid && this.state.messageValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleContactRequest = (e) => {
        e.preventDefault();
        this.setState({ loader: true });
        // console.log(this.state);
        axios.post(Globals.API.contact_us, {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            message: this.state.message
        })
            .then(() => {
            // console.log(response);
                this.setState(this.initialize());
                this.setState({ loader: false, msg: 'Thanks for contacting us. our team will contact you in next 2 working days' });
            });
        // .catch((error) => {
        //     console.log(error);
        // });

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

                    <form name="form" onSubmit={this.handleContactRequest} >
                        <div className="row control-group">
                            <div className={`form-group col-xs-12 floating-label-form-group controls ${this.errorClass(this.state.formErrors.name)}`} >
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" placeholder="Name" name="name" value={this.state.name} onChange={this.handleUserInput} />
                            </div>
                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'name' }} />
                        </div>
                        <div className="row control-group" >
                            <div className={`form-group col-xs-12 floating-label-form-group controls ${this.errorClass(this.state.formErrors.email)}`} >
                                <label htmlFor="email">Email Address</label>
                                <input type="email" className="form-control" placeholder="Email Address" name="email" value={this.state.email} onChange={this.handleUserInput} />
                            </div>
                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'email' }} />
                        </div>
                        <div className="row control-group" >
                            <div className={`form-group col-xs-12 floating-label-form-group controls ${this.errorClass(this.state.formErrors.phone)}`} >
                                <label>Phone Number</label>
                                <input type="tel" className="form-control" placeholder="Phone Number" name="phone" value={this.state.phone} onChange={this.handleUserInput} />
                            </div>
                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'phone' }} />
                        </div>
                        <div className="row control-group">
                            <div className={`form-group col-xs-12 floating-label-form-group controls ${this.errorClass(this.state.formErrors.message)}`} >
                                <label>Message</label>
                                <textarea rows="5" className="form-control" placeholder="Message" name="message" value={this.state.message} onChange={this.handleUserInput} />
                            </div>
                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'message' }} />
                        </div>
                        <br />
                        {this.state.msg !== '' &&
                                <div className="alert alert-success" >{this.state.msg}</div>
                        }
                        <div className="row">
                            <div className="form-group col-xs-12">
                                <button className="btn btn-success btn-lg" disabled={!this.state.formValid || this.state.loader}>{this.props.btnTxt}
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

Contact.defaultProps = {
    btnTxt: 'Submit'
};

export default Contact;
