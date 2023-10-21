import React, { Component } from 'react';
// import Dropzone from 'react-dropzone'
import { Helmet } from 'react-helmet';
import ScrollToTop from '../../../components/scrolltotop/scrolltotop';
import FormErrors from '../../../components/formerror/formerror';
// import Auth from '../../../helpers/auth.class'
import ProfileApi from '../../../api/profileApi';

class UpdateProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
    }
    componentWillMount() {
        if (!this.state.userId) {
            this.props.history.push(`/payment/addon/${this.props.match.params.package}`);
        }
    }
    componentDidMount() {
        this.validateForm();
    }
    initialize = () => {
        const userData = {
            firstnameValid: false,
            lastnameValid: false,
            phoneValid: true,
            linkedinValid: true
        };
        if (this.props.profile.firstname) {
            userData.firstnameValid = true;
        }
        if (this.props.profile.lastname) {
            userData.lastnameValid = true;
        }
        return {
            firstname: this.props.profile.firstname,
            lastname: this.props.profile.lastname,
            phone: this.props.profile.phone,
            linkedin: this.props.profile.url_linkedin,
            formErrors: {
                firstname: '', lastname: '', phone: '', linkedin: ''
            },
            firstnameValid: userData.firstnameValid,
            lastnameValid: userData.lastnameValid,
            phoneValid: true,
            linkedinValid: true,
            loader: false,
            msg: '',
            error: '',
            userId: this.props.profile.id_user,
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
                    this.setState({ loader: false });
                    this.props.history.push('/member/track');
                } else {
                    this.setState({ loader: false, error: response.msg });
                }
            });
        // .catch((error) => {
        //     console.log(error);
        // });

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
    onDrop(files, rejected) {
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
        return (
            <div>
                <ScrollToTop />
                <Helmet>
                    <title>WorkPapa | Update Profile</title>
                </Helmet>
                <div className="top-spacer">
                    <div className="container block " id="purchase_form">

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
                                                <label>Phone Number</label>
                                                <input type="tel" className="form-control" placeholder="Enter Phone with country code (Optional)" name="phone" value={this.state.phone} onChange={this.handleUserInput} />
                                            </div>
                                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'phone' }} />
                                        </div>
                                        <div className="row control-group" >
                                            <div className={`form-group col-xs-12 floating-label-form-group controls ${this.errorClass(this.state.formErrors.phone)}`} >
                                                <label>Linkedin profile</label>
                                                <input type="text" className="form-control" placeholder="Enter Linkedin profile URL (Optional)" name="linkedin" value={this.state.linkedin} onChange={this.handleUserInput} />
                                            </div>
                                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'linkedin' }} />
                                        </div>
                                        <br />
                                        {this.state.error !== '' &&
                                            <div className="alert alert-danger" >{this.state.error}</div>
                                        }
                                        <div className="row">
                                            <div className="form-group col-xs-12">
                                                <button className="btn btn-success btn-lg" disabled={!this.state.formValid || this.state.loader}>Update Profile
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

            </div>
        );
    }
}

export default UpdateProfilePage;
