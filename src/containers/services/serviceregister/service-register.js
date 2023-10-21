import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { Modal, Table } from 'react-bootstrap';
import * as actions from '../../../actions';
import Auth from '../../../helpers/auth.class';
import ServiceApi from '../../../api/serviceApi';
import ForgotPassword from '../../../components/forgotpassword/forgotpassword';
import FormErrors from '../../../components/formerror/formerror';
import ScrollToTop from '../../../components/scrolltotop/scrolltotop';

// var Constant = require('../../helpers/constant');
// console.log(Constant.Globals.API);

class ServiceRegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
    }

    componentDidMount() {

    }

    initialize = () => ({
        fullname: '',
        email: '',
        password: '',
        formErrors: {
            fullname: '', email: '', password: ''
        },
        fullnameValid: false,
        emailValid: false,
        passwordValid: false,
        msg: '',
        loader: false,
        showForgotPasswordModal: false
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
        let fullnameValid = this.state.fullnameValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
        case 'fullname':
            fullnameValid = value.length > 0;
            fieldValidationErrors.name = fullnameValid ? '' : ' is invalid';
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
            fullnameValid,
            emailValid,
            passwordValid,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.fullnameValid && this.state.emailValid && this.state.passwordValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleContactRequest = (e) => {
        e.preventDefault();
        this.setState({ loader: true });
        const formData = new FormData();
        const fullname = this.state.fullname.split(' ');
        if (fullname.length > 2) {
            formData.append('firstname', fullname[0]);
            formData.append('lastname', fullname[1]);
        } else {
            formData.append('firstname', this.state.fullname);
            formData.append('lastname', '');
        }

        formData.append('email', this.state.email);
        formData.append('password', this.state.password);

        this.props.actions.toggleLoader(1);
        ServiceApi.register(formData)
            .then((response) => {
                // console.log(response);
                if (response.status === 'Success') {
                    this.setState(this.initialize());
                    Auth.authenticateWriter(response.data.token);
                    Auth.setWriter(response.data);
                    this.setState({ loader: false });
                    this.props.actions.toggleLoader(-1);
                    this.props.history.push('/service/dashboard');
                } else {
                    this.props.actions.toggleLoader(-1);
                    this.setState({ msg: response.msg, loader: false });
                }
            })
            .catch((error) => {
                this.props.actions.toggleLoader(-1);
                this.setState({ msg: error, loader: false });
                // console.log(error);
            });

        return false;
    }

    showForgotPassword = () => {
        this.setState({ showForgotPasswordModal: true });
    }

    render() {
        // const options = [
        //     { value: '1', label: 'Resume Writer' },
        //     { value: '2', label: 'Blog Writer' },
        //     { value: '3', label: 'LinkedIn Writer' }
        // ];
        return (
            <div>
                <Helmet>
                    <title>WorkPapa | Registration</title>
                </Helmet>
                <ScrollToTop />

                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2>Start getting paid for your services & products</h2>
                                <hr className="star-primary" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-5 ">
                                <h3>Signup as a service provider & seller</h3>
                                <Table condensed>
                                    <tbody>
                                        <tr>
                                            <td>Free to sign up.</td>
                                        </tr>
                                        <tr>
                                            <td>Enter your information securely to our site. your information is not public to anyone but a customer.</td>
                                        </tr>
                                        <tr>
                                            <td>Get notified when your services and products sell.</td>
                                        </tr>
                                        <tr>
                                            <td>
                                            Once customer is happy get paid.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Sell more and earn more.
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Link to="/login/seller" className="btn btn-success btn-lg"> Already have account? </Link>
                            </div>
                            <div className="col-md-6 col-md-offset-1">
                                <form name="form" onSubmit={this.handleContactRequest} >
                                    <div className="row control-group">
                                        <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.fullname)}`} >
                                            <label htmlFor="fullname">Full Name</label>
                                            <input type="text" className="form-control" placeholder="Full Name" name="fullname" value={this.state.fullname} onChange={this.handleUserInput} />
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'fullname' }} />
                                    </div>
                                    <div className="row control-group" >
                                        <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.email)}`} >
                                            <label htmlFor="email">Email Address</label>
                                            <input type="email" className="form-control" placeholder="Email Address" name="email" value={this.state.email} onChange={this.handleUserInput} />
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'email' }} />
                                    </div>
                                    <div className="row control-group" >
                                        <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.password)}`} >
                                            <label>Password </label>
                                            <input type="password" className="form-control" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.handleUserInput} />
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'password' }} />
                                    </div>
                                    {this.state.msg !== '' &&
                                        <div className="alert alert-danger" >{this.state.msg}</div>
                                    }

                                    <div className="row">
                                        <div className="form-group col-xs-12">
                                            <button className="btn btn-success btn-lg" disabled={!this.state.formValid || this.state.loader}>Get started
                                                <i className="icon icon-arrow" />
                                            </button>
                                            {this.state.loader &&
                                                <img alt="loader" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                            }
                                            &nbsp;<Link to="/login/seller" className="btn btn-success btn-lg"> Already have account? </Link>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.showForgotPasswordModal} onHide={this.closePopup} >
                    <Modal.Header closeButton>
                        <Modal.Title>Recover password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ForgotPassword />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loader: state.loader
    };
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServiceRegisterPage));
// export default LoginPage;
