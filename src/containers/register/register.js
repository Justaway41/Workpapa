import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { Modal, Table } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
// import Select from 'react-select';
import * as actions from '../../actions';
import Auth from '../../helpers/auth.class';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import WriterApi from '../../api/writerApi';
import ForgotPassword from '../../components/forgotpassword/forgotpassword';
import FormErrors from '../../components/formerror/formerror';
import ScrollToTop from '../../components/scrolltotop/scrolltotop';

// var Constant = require('../../helpers/constant');
// console.log(Constant.Globals.API);

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
    }

    componentDidMount() {
        // WriterApi.getSkill()
        //     .then((response) => {
        //         if (response.status === 'Success') {
        //             this.setState({ skillData: response.data });
        //         }
        //     });
        // WriterApi.getCountry()
        //     .then((response) => {
        //         if (response.status === 'Success') {
        //             this.setState({ countryData: response.data });
        //         }
        //     });
    }

    initialize = () => ({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        aboutme: '',
        // skills: '',
        // country: '',
        formErrors: {
            firstname: '', lastname: '', email: '', password: '', aboutme: '' // , skills: '', country: ''
        },
        firstnameVaild: false,
        lastnameValid: false,
        emailValid: false,
        passwordValid: false,
        aboutmeValid: false,
        // skillsValid: false,
        // countryValid: false,
        files: [],
        // skillData: [],
        // countryData: [],
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
        let firstnameValid = this.state.firstnameValid;
        let lastnameValid = this.state.lastnameValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let aboutmeValid = this.state.aboutmeValid;
        // let skillsValid = this.state.skillsValid;
        // let countryValid = this.state.countryValid;

        switch (fieldName) {
        case 'firstname':
            firstnameValid = value.length > 0;
            fieldValidationErrors.name = firstnameValid ? '' : ' is invalid';
            break;
        case 'lastname':
            lastnameValid = value.length > 0;
            fieldValidationErrors.email = lastnameValid ? '' : ' is invalid';
            break;
        case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
        case 'password':
            passwordValid = value.length > 6;
            fieldValidationErrors.password = passwordValid ? '' : ' is invalid';
            break;
        case 'aboutme':
            aboutmeValid = value.length > 100;
            fieldValidationErrors.aboutme = aboutmeValid ? '' : ' should be atleast 100 character';
            break;
        // case 'skills':
        //     skillsValid = value.length > 0;
        //     fieldValidationErrors.skills = skillsValid ? '' : ' is invalid';
        //     break;
        // case 'country':
        //     countryValid = value.length > 0;
        //     fieldValidationErrors.country = countryValid ? '' : ' is invalid';
        //     break;
        default:
            break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            firstnameValid,
            lastnameValid,
            emailValid,
            passwordValid,
            aboutmeValid,
            // skillsValid,
            // countryValid,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.firstnameValid && this.state.lastnameValid && this.state.emailValid && this.state.passwordValid && this.state.aboutmeValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleContactRequest = (e) => {
        e.preventDefault();
        this.setState({ loader: true });

        const formData = new FormData();
        formData.append('firstname', this.state.firstname);
        formData.append('lastname', this.state.lastname);
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
        formData.append('aboutme', this.state.aboutme);
        // formData.append('skills', JSON.stringify(this.state.skills));
        // formData.append('skills', this.state.skills);
        // formData.append('country', this.state.country);
        formData.append('file', this.state.files[0]);

        this.props.actions.toggleLoader(1);
        WriterApi.register(formData)
            .then((response) => {
                // console.log(response);
                if (response.status === 'Success') {
                    this.setState(this.initialize());
                    Auth.authenticateWriter(response.data.token);
                    Auth.setWriter(response.data);
                    this.setState({ loader: false });
                    this.props.actions.toggleLoader(-1);
                    this.props.history.push('/services/dashboard');
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
    onDrop = (files, rejected) => {
        this.setState({
            files
        });

        if (rejected.length > 0) {
            this.setState({ msg: 'File not allowed.' });
        } else {
            this.setState({ msg: '' });
        }
    }
    closePopup = () => {
        this.setState({ showForgotPasswordModal: false });
    }
    showForgotPassword = () => {
        this.setState({ showForgotPasswordModal: true });
    }
    // handleSkillChange = (skills) => {
    //     const formatSkills = [];
    //     skills.map(ele => formatSkills.push(ele.value));
    //     // console.log(formatSkills);

    //     this.setState({ skills: formatSkills });
    //     this.validateField('skills', skills);
    // }
    render() {
        // const options = [
        //     { value: '1', label: 'Resume Writer' },
        //     { value: '2', label: 'Blog Writer' },
        //     { value: '3', label: 'LinkedIn Writer' }
        // ];
        return (
            <div>
                <Header {...this.props} />
                <Helmet>
                    <title>WorkPapa | Registration</title>
                </Helmet>
                <ScrollToTop />

                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2>Get Work Assignments, gigs, projects & more on your own schedule</h2>
                                <hr className="star-primary" />
                                <p className="small">
                                    We sell much more then resume writing services.<br />
                                    No obligations, fees or contracts. Submit to a simple, free and payable job opportunities!
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-5 ">
                                <h3>Signup to list yourself as a provider and describe your services.</h3>
                                <Table condensed>
                                    <tbody>
                                        <tr>
                                            <td>Free to sign up and make a profile.</td>
                                        </tr>
                                        <tr>
                                            <td>Enter your information securely to our site, you can edit anytime.</td>
                                        </tr>
                                        <tr>
                                            <td>Get notified when your services and products have interest</td>
                                        </tr>
                                        <tr>
                                            <td>
                                            Once your customer is happy, get paid.
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
                                        <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.firstname)}`} >
                                            <label htmlFor="firstname">First Name</label>
                                            <input type="text" className="form-control" placeholder="First Name" name="firstname" value={this.state.firstname} onChange={this.handleUserInput} />
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'firstname' }} />
                                    </div>
                                    <div className="row control-group" >
                                        <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.lastname)}`} >
                                            <label htmlFor="lastname">Last Name</label>
                                            <input type="text" className="form-control" placeholder="Last Name" name="lastname" value={this.state.lastname} onChange={this.handleUserInput} />
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'lastname' }} />
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
                                    {/* <div className="row control-group" >
                                        <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.skills)}`}>
                                            <label>Skills </label>
                                            <Select
                                                isMulti
                                                name="colors"
                                                placeholder="Select Skills"
                                                options={this.state.skillData}
                                                onChange={this.handleSkillChange}
                                            />
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'skills' }} />
                                    </div>
                                     */}
                                    {/* <div className="row control-group">
                                        <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.skills)}`} >
                                            <label>Skills</label>
                                            <textarea rows="3" className="form-control" placeholder="Enter other skills comma separated" name="skills" value={this.state.skills} onChange={this.handleUserInput} />
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'skills' }} />
                                    </div> */}
                                    {/* <div className="row control-group" >
                                        <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.country)}`}>
                                            <label>Country </label>
                                            <select className="form-control" name="country" onChange={this.handleUserInput} >
                                                <option value="">Select Country</option>
                                                {this.state.countryData.map(item =>
                                                    <option key={item.id} value={item.id}>{item.name}</option>)}
                                            </select>
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'country' }} />
                                    </div> */}
                                    <div className="row control-group">
                                        <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.aboutme)}`} >
                                            <label>About Me</label>
                                            <textarea rows="3" className="form-control" placeholder="About me" name="aboutme" value={this.state.aboutme} onChange={this.handleUserInput} />
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'aboutme' }} />
                                    </div>
                                    <div className="row control-group" >
                                        <aside>
                                            <h5>Dropped files</h5>
                                            <ul>
                                                {
                                                    this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                                                }
                                            </ul>
                                        </aside>
                                        <div className="form-group col-xs-12 floating-label-form-group controls" >
                                            <div className="dropzone">
                                                <Dropzone onDrop={this.onDrop} accept="image/*" >
                                                    <p className="small text-center">Try dropping your profile picture here, or click the box to browse files to upload.</p>
                                                    <p className="small text-center">Only .png, .jpeg and .jpg will be accepted</p>
                                                </Dropzone>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterPage));
// export default LoginPage;
