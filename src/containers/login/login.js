import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import * as actions from '../../actions';
import Auth from '../../helpers/auth.class';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import ProfileApi from '../../api/profileApi';
import WriterApi from '../../api/writerApi';
import ForgotPassword from '../../components/forgotpassword/forgotpassword';
import ScrollToTop from '../../components/scrolltotop/scrolltotop';

// var Constant = require('../../helpers/constant');
// console.log(Constant.Globals.API);

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
    }

    initialize = () => ({
        email: '',
        password: '',
        formErrors: { email: '', password: '' },
        emailValid: false,
        passwordValid: true,
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
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
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
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleContactRequest = (e) => {
        // console.log(this.props.match.params);
        e.preventDefault();
        this.setState({ loader: true });
        // this.props.actions.toggleLoader(1);
        const request = {
            username: this.state.email,
            password: this.state.password
        };
        this.userLogin(request);
        // console.log(user);
        // if (!this.isWriter()) {
        //     this.userLogin(request);
        // } else {
        //     this.writerLogin(request);
        // }
        return false;
    }
    userLogin = (request) => {
        this.props.actions.toggleLoader(1);
        ProfileApi.login(request)
            .then((response) => {
                // console.log(response);
                if (response.status === 'Success') {
                    this.setState(this.initialize());
                    Auth.authenticateUser(response.token);
                    Auth.setUser(response.data);
                    this.setState({ loader: false });
                    this.props.actions.toggleLoader(-1);
                    this.props.history.push('/member/track');
                } else {
                    // this.props.actions.toggleLoader(-1);
                    // this.setState({ msg: response.msg, loader: false });
                    WriterApi.login(request)
                        .then((res) => {
                        // console.log(response);
                            if (res.status === 'Success') {
                                this.setState(this.initialize());
                                Auth.authenticateWriter(res.token);
                                Auth.setWriter(res.data);
                                this.setState({ loader: false });
                                this.props.actions.toggleLoader(-1);
                                if (res.data !== 'writer') {
                                    this.props.history.push('/services/dashboard');
                                } else {
                                    this.props.history.push('/seller/profile');
                                }
                            } else {
                                this.props.actions.toggleLoader(-1);
                                this.setState({ msg: res.msg, loader: false });
                            }
                        });
                }
            })
            .catch((error) => {
                this.props.actions.toggleLoader(-1);
                this.setState({ msg: error, loader: false });
                // console.log(error);
            });
    }
    // writerLogin = (request) => {
    //     this.props.actions.toggleLoader(1);
    //     WriterApi.login(request)
    //         .then((response) => {
    //             // console.log(response);
    //             if (response.status === 'Success') {
    //                 this.setState(this.initialize());
    //                 Auth.authenticateWriter(response.token);
    //                 Auth.setWriter(response.data);
    //                 this.setState({ loader: false });
    //                 this.props.actions.toggleLoader(-1);
    //                 this.props.history.push('/seller/profile');
    //             } else {
    //                 this.props.actions.toggleLoader(-1);
    //                 this.setState({ msg: response.msg, loader: false });
    //             }
    //         })
    //         .catch((error) => {
    //             this.props.actions.toggleLoader(-1);
    //             this.setState({ msg: error, loader: false });
    //             // console.log(error);
    //         });
    // }

    isWriter = () => this.props.match.params.type === 'seller';

    closePopup = () => {
        this.setState({ showForgotPasswordModal: false });
    }
    showForgotPassword = () => {
        this.setState({ showForgotPasswordModal: true });
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
                <Header {...this.props} />
                <Helmet>
                    <title>WorkPapa | Login</title>
                </Helmet>
                <ScrollToTop />
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2>Login</h2>
                                <hr className="star-primary" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-5 ">
                                <h3>Login your workpapa account</h3>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        Manage everything regarding your workpapa profile and notifications
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-6 col-md-offset-1">
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
                                            <input type="email" className="form-control" placeholder="Email Address" name="email" value={this.state.email} onChange={this.handleUserInput} />
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'email' }} />
                                    </div>
                                    <div className="row control-group" >
                                        <div className={`form-group col-xs-12 floating-label-form-group controls ${this.errorClass(this.state.formErrors.password)}`} >
                                            <label>Password </label>
                                            <input type="password" className="form-control" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.handleUserInput} />
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'password' }} />
                                    </div>

                                    <br />
                                    {this.state.msg !== '' &&
                                            <div className="alert alert-danger" >{this.state.msg}</div>
                                    }

                                    <div className="row">
                                        <div className="form-group col-xs-12">
                                            <button className="btn btn-success btn-lg" disabled={!this.state.formValid || this.state.loader}>Login
                                                <i className="icon icon-arrow" />
                                            </button>
                                            {this.state.loader &&
                                                <img alt="loader" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                            }
                                            <a onClick={this.showForgotPassword}> Forgot Password?</a>
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
                <Footer />
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
// export default LoginPage;
