import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions';
import ScrollToTop from '../../../components/scrolltotop/scrolltotop';
// import FormErrors from '../../../components/formerror/formerror';
import Questionaire from '../../../data/questionaire.json';
import ProfileApi from '../../../api/profileApi';

class QuestionairePage extends Component {
    constructor(props) {
        super(props);
        this.form = {};
        this.state = {
            quesData: Questionaire,
            error: '',
            msg: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e, key) {
        e.target.classList.add('active');
        // this.setState({
        //     [e.target.name]: e.target.value
        // });
        const quesData = this.state.quesData;
        quesData[key].answer = e.target.value;
        this.setState({ quesData });
        this.showInputError(e.target.name);
    }

    handleSubmit(e) {
        e.preventDefault();

        // console.log('component state', JSON.stringify(this.state));

        if (!this.showFormErrors()) {
            // console.log('form is invalid: do not submit');
        } else {
            // console.log('form is valid: submit');
            const request = {
                questionaire: JSON.stringify(this.state.quesData),
                id_user: this.props.profile.id_user
            };
            this.props.actions.toggleLoader(1);
            ProfileApi.updateQuestionaire(request)
                .then((response) => {
                    if (response.status === 'Success') {
                        this.setState({ msg: 'Thank you for Uploading Resume' });
                        this.props.history.push('/member/track');
                    } else {
                        this.setState({ msg: '', error: response.msg });
                    }
                    this.props.actions.toggleLoader(-1);
                });
        }
    }

    showFormErrors() {
        const inputs = document.querySelectorAll('input');
        let isFormValid = true;

        inputs.forEach((input) => {
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
        const label = document.getElementById(`${refName}Label`).textContent;
        const error = document.getElementById(`${refName}Error`);
        const isPassword = refName.indexOf('password') !== -1;
        const isPasswordConfirm = refName === 'passwordConfirm';

        if (isPasswordConfirm) {
            if (this.form.password.value !== this.form.passwordConfirm.value) {
                this.form.passwordConfirm.setCustomValidity('Passwords do not match');
            } else {
                this.form.passwordConfirm.setCustomValidity('');
            }
        }

        if (!validity.valid) {
            if (validity.valueMissing) {
                error.textContent = `${label} is a required field`;
            } else if (validity.typeMismatch) {
                error.textContent = `${label} should be a valid email address`;
            } else if (isPassword && validity.patternMismatch) {
                error.textContent = `${label} should be longer than 4 chars`;
            } else if (isPasswordConfirm && validity.customError) {
                error.textContent = 'Passwords do not match';
            }
            return false;
        }

        error.textContent = '';
        return true;
    }

    render() {
        return (
            <div>
                <ScrollToTop />
                <Helmet>
                    <title>WorkPapa | Questionaire </title>
                </Helmet>
                <section id="root">
                    <div className="container">
                        <div className="col-md-8 col-sm-12">
                            <h3>Questionaire</h3>
                            {this.state.msg !== '' &&
                                    <div className="alert alert-sucess">{this.state.msg}</div>
                            }
                            {this.state.error !== '' &&
                                    <div className="alert alert-danger">{this.state.error}</div>
                            }
                            <form noValidate>
                                {this.state.quesData.map((item, key) => (
                                    <div className="form-group" key={item.id}>
                                        <label id={`${item.id}Label`} >{item.label}</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name={item.id}
                                            value={item.answer}
                                            ref={(val) => { this.form[item.id] = val; }}
                                            onChange={(e) => { this.handleChange(e, key); }}
                                            required={item.required}
                                        />
                                        <div className="error" id={`${item.id}Error`} />
                                    </div>
                                ))}
                                {/* <div className="form-group">
                                        <label id="usernameLabel">Username</label>
                                        <input
                                            className="form-control"
                                            type="email"
                                            name="username"
                                            ref={(val) => { this.form.username = val; }}
                                            value={this.state.username}
                                            onChange={this.handleChange}
                                            required
                                        />
                                        <div className="error" id="usernameError" />
                                    </div>
                                    <div className="form-group">
                                        <label id="passwordLabel">Password</label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            name="password"
                                            ref={(val) => { this.form.password = val; }}
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            pattern=".{5,}"
                                            required
                                        />
                                        <div className="error" id="passwordError" />
                                    </div>
                                    <div className="form-group">
                                        <label id="passwordConfirmLabel">Confirm Password</label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            name="passwordConfirm"
                                            ref={(val) => { this.form.passwordConfirm = val; }}
                                            value={this.state.passwordConfirm}
                                            onChange={this.handleChange}
                                            required
                                        />
                                        <div className="error" id="passwordConfirmError" />
                                    </div> */}
                                <div className="form-group">
                                    <button
                                        className="btn btn-lg btn-outline btn-success"
                                        onClick={this.handleSubmit}
                                    >Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionairePage));

// export default QuestionairePage;
