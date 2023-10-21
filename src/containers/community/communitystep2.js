import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Util from '../../helpers/util.class';
import FormErrors from '../../components/formerror/formerror';
import LibraryApi from '../../api/libraryApi';
import ScrollToTop from '../../components/scrolltotop/scrolltotop';

class CommunityStep2Page extends Component {
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

    handleRequest = (e) => {
        e.preventDefault();
        // console.log(">>>>>>>");
        this.setState({ loader: true });

        const request = {
            email: this.state.email,
            phone: '',
            product: 'LBA', // TEXT LIBRARY DATABASE
            source: 'L',
            discount: 0
        };
        // this.props.actions.toggleLoader(true);
        LibraryApi.saveMailingList(request)
            .then((response) => {
                if (response.status === 'Success') {
                    // const storePackage = Util.getDataFromSessionStorage('textLibrary');
                    const storePackage = {};
                    storePackage['plan'] = 'LBA';
                    storePackage['email'] = this.state.email;
                    storePackage['password'] = this.state.password;
                    Util.setDataToSessionStorage('textLibrary', storePackage);
                    this.setState({ loader: false });
                    this.props.history.push('/textlibrary/payment');
                } else {
                    this.setState({ msg: response.msg, loader: false });
                }
            })
            .catch((error) => {
                // this.props.actions.toggleLoader(false);
                this.setState({ msg: error, loader: false });
                // console.log(error);
            });

        // return false;
    }
    render() {
        return (
            <section id="cummunity">
                <ScrollToTop />
                <div className="row">
                    <div className="container">
                        <div className="col-xs-5 col-md-offset-4 text-center" >
                            <div className="card">
                                <p className="small">STEP 1 OF 3 </p>
                                <h4>Create your account.</h4>
                                <p className="small">Just two more steps and you're finished!<br />We hate paperwork, too.</p>
                                <form name="form" method="post" onSubmit={this.handleRequest} >
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
                                            <button className="btn btn-success btn-lg" disabled={!this.state.formValid || this.state.loader}>CONTINIUE
                                                <i className="icon icon-arrow" />
                                            </button>
                                            {/* <Link className="btn btn-lg btn-outline btn-success" to="/marketplace/signup-step3" >CONTINIUE</Link> */}

                                            {this.state.loader &&
                                            <img alt="loader" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                            }
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(CommunityStep2Page);
