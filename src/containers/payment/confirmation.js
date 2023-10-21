/* eslint-disable */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Helmet } from 'react-helmet';
import ReactPixel from 'react-facebook-pixel';
import Util from '../../helpers/util.class';

import ScrollToTop from '../../components/scrolltotop/scrolltotop';
// import PaymentStep from '../../components/paymentstep/paymentstep';
import Steps from '../../components/steps/steps';
import PopUp from '../../components/popup/popup';

import Auth from '../../helpers/auth.class';

import ProfileApi from '../../api/profileApi';

class ConfirmationServicePage extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
    }

    componentWillMount() {
        if (!this.state.userId) {
            console.log(`user not found ${this.state.userId}`);
            this.props.history.push(`/payment/addon/${this.props.match.params.package}`);
        }
    }

    componentDidMount() {
        const gtag = window.gtag
        // if (location.pathname === this.props.location.pathname) {
        //     return
        // }
        if (this.props.history.action === 'PUSH' && typeof(gtag) === 'function') {
            const storePackage = Util.getDataFromSessionStorage('package');
            gtag('event', 'conversion', {
                'send_to': 'AW-772401519/0ebQCP-0xJIBEO_Sp_AC',
                'value': storePackage.totalPrice,
                'currency': 'USD',
                'transaction_id': ''
            });

            ReactPixel.init('2273470532773064');
            ReactPixel.pageView(); 
        }
    }
    initialize = () => {
        const currentUser = Auth.getUser();
        // console.log(currentUser);
        let userId;
        if (!currentUser) {
            userId = '';
        } else {
            userId = currentUser.id_user;
        }
        return {
            firstname: '',
            lastname: '',
            phone: '',
            linkedin: '',
            formErrors: {
                firstname: '', lastname: '', phone: '', linkedin: ''
            },
            firstnameVaild: false,
            lastnameValid: false,
            phoneValid: true,
            linkedinValid: true,
            loader: false,
            msg: '',
            error: '',
            userId,
            files: [],
            infoModal: true
        };
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
        let lastnameValid = this.state.lastnameValid;
        let phoneValid = this.state.phoneValid;
        let firstnameValid = this.state.firstnameValid;
        let linkedinValid = this.state.linkedinValid;

        switch (fieldName) {
        case 'firstname':
            firstnameValid = value.length > 0;
            fieldValidationErrors.name = firstnameValid ? '' : ' is invalid';
            break;
        case 'lastname':
            lastnameValid = value.length > 0;
            fieldValidationErrors.email = lastnameValid ? '' : ' is invalid';
            break;
        case 'phone':
            phoneValid = (value.length === 0 || value.length >= 10);
            fieldValidationErrors.phone = phoneValid ? '' : ' is invalid';
            break;
        case 'linkedin':
            linkedinValid = value.length > 0;
            fieldValidationErrors.linkedin = linkedinValid ? '' : ' is invalid';
            break;
        default:
            break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            lastnameValid,
            phoneValid,
            firstnameValid,
            linkedinValid,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.lastnameValid && this.state.phoneValid && this.state.firstnameValid && this.state.linkedinValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleRequest = (e) => {
        e.preventDefault();
        this.setState({ loader: true });

        const formData = new FormData();
        formData.append('firstname', this.state.firstname);
        formData.append('lastname', this.state.lastname);
        formData.append('phone', this.state.phone);
        formData.append('linkedin', this.state.linkedin);
        formData.append('id_user', this.state.userId);
        formData.append('file', this.state.files[0]);

        ProfileApi.updateProfileConfirmation(formData)
            .then((response) => {
                if (response.status === 'Success') {
                    this.setState(this.initialize());
                    this.setState({ loader: false, error:'', msg: 'Thanks for Updating profile infomation. our team will contact you in next 1 working days' });
                    if (this.props.match.params.package !== 'RTS') {
                        // this.props.history.push('/payment/confirmtemplate/'+this.props.match.params.package);
                        this.props.history.push('/member/choosetemplate');
                    } else {
                        this.props.history.push('/member/track');
                    }
                } else {
                    if(!response.msg) response.msg = 'Technical error. Contact at support@workpapa.com';
                    this.setState({ loader: false, error: response.msg });
                }
            })
            .catch((error) => {
                console.log(error);
            });

        return false;
    }

    handlePopupStatus = (showModal) => {
        this.setState(showModal);
    }
    stepData() {
        return [
            {
                stepTxt: 'Step 1',
                stepDesc: 'Payment Successful',
                status: 'complete'
            },
            {
                stepTxt: 'Step 2',
                stepDesc: 'Upload your CV/Resume',
                status: 'active'
            },
            {
                stepTxt: 'Step 3',
                stepDesc: 'Choose your CV/resume Template',
                status: 'disabled'
            }
        ];
    }
    onDrop = (files, rejected) => {
        this.setState({
            files
        });

        if (rejected.length > 0) {
            this.setState({ error: 'File not allowed.' });
        } else {
            this.setState({ error: '' });
        }
    }
    render() {
        const InfoMessage = () =>
            (
                <div>
                    <div className="text-left text-danger">
                        <h4>Before we start working on your CV/Resume, we need 2 things</h4>
                        <p className="small">
                    1.Your File (CV/Resume) in .doc, .docx, pdf or .txt format
                        </p>
                        <p className="small">
                    2.Your choice of template below.
                        </p>
                        <p className="small">
                    Until we have these items we can not start our work and the estimated time to complete
                    may get delayed.
                        </p>
                        <p className="small">
                            <strong>Continue with the flow to upload Resume/CV and choice the template.</strong>
                        </p>
                        <p className="small">
                    Thank you.
                        </p>
                    </div>
                </div>
            );
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
                {/* <HeaderPayment /> */}
                <Helmet>
                    <title>WorkPapa | Confirmation</title>
                </Helmet>
                <div className="top-spacer">
                    <div className="container block " id="purchase_form">
                        <Steps stepData={this.stepData()} />
                        <div className="row">
                            <div className="col-lg-12 ">
                                <div className="text-center">
                                    <h2>Congratulations for signing up with Workpapa</h2>
                                    <hr className="star-primary" />
                                </div>
                            </div>
                        </div>

                        {!!this.state.userId &&
                            <div className="row">
                                <div className="col-md-6 col-md-offset-3">
                                    <h3>Update your profile information</h3>
                                    <form encType="multipart/form-data" method="post" name="form" onSubmit={this.handleRequest} >
                                        <div className="row control-group">
                                            <div className={`form-group col-xs-12 floating-label-form-group controls ${this.errorClass(this.state.formErrors.firstname)}`} >
                                                <label htmlFor="firstname">First Name</label>
                                                <input type="text" className="form-control" placeholder="First Name" name="firstname" value={this.state.firstname} onChange={this.handleUserInput} />
                                            </div>
                                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'firstname' }} />
                                        </div>
                                        <div className="row control-group" >
                                            <div className={`form-group col-xs-12 floating-label-form-group controls ${this.errorClass(this.state.formErrors.lastname)}`} >
                                                <label htmlFor="lastname">Last Name</label>
                                                <input type="text" className="form-control" placeholder="Last Name" name="lastname" value={this.state.lastname} onChange={this.handleUserInput} />
                                            </div>
                                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'lastname' }} />
                                        </div>
                                        <div className="row control-group" >
                                            <div className={`form-group col-xs-12 floating-label-form-group controls ${this.errorClass(this.state.formErrors.phone)}`} >
                                                <label>Linkedin profile</label>
                                                <input type="text" className="form-control" placeholder="Enter Linkedin profile URL for your order" name="linkedin" value={this.state.linkedin} onChange={this.handleUserInput} />
                                            </div>
                                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'linkedin' }} />
                                        </div>
                                        <div className="row control-group" >
                                            <div className={`form-group col-xs-12 floating-label-form-group controls ${this.errorClass(this.state.formErrors.phone)}`} >
                                                <label>Phone Number</label>
                                                <input type="tel" className="form-control" placeholder="Enter Phone with country code (Optional)" name="phone" value={this.state.phone} onChange={this.handleUserInput} />
                                            </div>
                                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'phone' }} />
                                        </div>
                                        <div className="row control-group" >
                                            <div className="form-group col-xs-12 floating-label-form-group controls" >
                                                <div className="dropzone">
                                                    <Dropzone onDrop={this.onDrop} accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain, application/pdf" >
                                                        <p className="small text-center">Try dropping your resume here, or click the box to browse files to upload.</p>
                                                        <p className="small text-center">Only .doc, .docx, .txt and .pdf will be accepted</p>
                                                    </Dropzone>
                                                </div>
                                            </div>
                                            <aside>
                                                <h5>Dropped files</h5>
                                                <ul>
                                                    {
                                                        this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                                                    }
                                                </ul>
                                            </aside>
                                        </div>
                                        <br />
                                        {this.state.msg !== '' &&
                                            <div className="alert alert-success" >{this.state.msg}</div>
                                        }
                                        {this.state.error !== '' &&
                                            <div className="alert alert-danger" >{this.state.error}</div>
                                        }
                                        <div className="row">
                                            <div className="form-group col-xs-12">
                                                <button className="btn btn-success btn-lg" disabled={!this.state.formValid || this.state.loader}>Save & Next
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
                        }
                    </div>
                </div>
                <PopUp name="info" showModal={this.state.infoModal} title="CONGRATULATIONS FOR SIGNING UP WITH WORKPAPA" contant={InfoMessage} handlePopupStatus={this.handlePopupStatus} />

                {/* <Footer /> */}

                {/* <!-- Google Code for payment page Conversion Page --> */}
                <script type="text/javascript">
                    {/* <![CDATA[ */}
                var google_conversion_id = 854039393;
                var google_conversion_language = "en";
                var google_conversion_format = "3";
                var google_conversion_color = "ffffff";
                var google_conversion_label = "bxyDCOjVmnEQ4baelwM";
                var google_remarketing_only = false;
                    {/* ]]> */}
                </script>
                <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js" />
                <noscript>
                    <div style={{ display: 'inline' }}>
                        <img height="1" width="1" style={{ borderStyle: 'none' }} alt="" src="//www.googleadservices.com/pagead/conversion/854039393/?label=bxyDCOjVmnEQ4baelwM&amp;guid=ON&amp;script=0" />
                    </div>
                </noscript>
                
            </div>
        );
    }
}

export default ConfirmationServicePage;
