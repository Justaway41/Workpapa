import React, { Component } from 'react';
import axios from 'axios';
import Util from '../../helpers/util.class';

import Globals from '../../helpers/constant';

// console.log(Constant.Globals.API);

class FeedBack extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
    }

    initialize = () => ({
        email: '',
        phone: '',
        formErrors: { email: '', phone: '', message: '' },
        emailValid: false,
        phoneValid: true,
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

        switch (fieldName) {
        case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
        case 'phone':
            phoneValid = (value.length === 0 || value.length >= 10);
            fieldValidationErrors.phone = phoneValid ? '' : ' is invalid';
            break;
        default:
            break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid,
            phoneValid,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.phoneValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleContactRequest = (e) => {
        e.preventDefault();
        this.setState({ loader: true });
        // console.log(this.props.trkId);
        const self = this;
        let trkId = '';
        if (this.props.trkId) {
            trkId = this.props.trkId;
        }
        axios.post(Globals.API.save_mailing_list, {
            email: this.state.email,
            phone: this.state.phone,
            product: 'RFB',
            source: 'H',
            discount: 10,
            trkId
        })
            .then(() => {
            // console.log(self.state);
                this.setState({ loader: false, msg: 'Thanks for contacting us. our team will contact you in next 2 working days' });
                Util.setDataToLocalStorage('mailinglist', self.state.email);
                this.setState(this.initialize());
                this.props.doAction(false);
                // this.props.history.push('/success/popup');
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
            <div>
                <form name="form" onSubmit={this.handleContactRequest} >
                    {/* <div className="row control-group">
                        <div className={`form-group col-xs-12 floating-label-form-group controls ${this.errorClass(this.state.formErrors.name)}`} >
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" placeholder="Name" name="name"  value={this.state.name} onChange={this.handleUserInput} />
                        </div>
                        <FormErrors formErrors={this.state.formErrors} errorField={{name: 'name'}} />
                    </div> */}
                    <div className="row control-group" >
                        <div className={`form-group col-xs-12 floating-label-form-group controls ${this.errorClass(this.state.formErrors.email)}`} >
                            <label htmlFor="email">Email Address</label>
                            <input type="email" className="form-control" placeholder="Your email Address" name="email" value={this.state.email} onChange={this.handleUserInput} />
                        </div>
                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'email' }} />
                    </div>
                    <div className="row control-group" >
                        <div className={`form-group col-xs-12 floating-label-form-group controls ${this.errorClass(this.state.formErrors.phone)}`} >
                            <label>Phone Number</label>
                            <input type="tel" className="form-control" placeholder="Your phone number with country code (Optional)" name="phone" value={this.state.phone} onChange={this.handleUserInput} />
                        </div>
                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'phone' }} />
                    </div>

                    <br />
                    {this.state.msg !== '' &&
                        <div className="alert alert-success" >{this.state.msg}</div>
                    }

                    <div className="row">
                        <div className="form-group col-xs-12">
                            <button className={`btn btn-lg ${this.props.btnclass}`} disabled={!this.state.formValid || this.state.loader}>{this.props.btnText}
                                <i className="icon icon-arrow" />
                            </button>
                            <div className="feedback-form-text">
                                <p className="small first">{this.props.supText1}</p>
                                <p className="small second" style={{ fontSize: '12px' }}>{this.props.supText2}</p>
                            </div>
                            {this.state.loader &&
                                <img alt="loader" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                        </div>
                    </div>
                </form>
                {this.state.loader === true &&
                    <div>
                        <script type="text/javascript">
                        var google_conversion_id = 854039393;
                        var google_conversion_label = { 'nL0XCOefkIMBEOG2npcD' };
                        var google_remarketing_only = false;
                        </script>
                        <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js" />
                        <noscript>
                            <div style={{ display: 'inline' }}>
                                <img height="1" width="1" style={{ borderStyle: 'none' }} alt="" src="//www.googleadservices.com/pagead/conversion/854039393/?label=nL0XCOefkIMBEOG2npcD&amp;guid=ON&amp;script=0" />
                            </div>
                        </noscript>
                    </div>
                }
            </div>
        );
    }
}

FeedBack.defaultProps = {
    resumeText: 'Resume',
    btnText: 'Get Free Resume Feedback',
    btnclass: 'btn-success'
};
export default FeedBack;
