import React, { Component } from 'react';
import ProfileApi from '../../api/profileApi';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.form = {
            email: ''
        };
        this.state = {
            email: '',
            msg: '',
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.target.classList.add('active');
        this.setState({
            [e.target.name]: e.target.value
        });
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
                email: this.state.email,
                type: this.props.type
            };
            // this.props.actions.toggleLoader(true);
            ProfileApi.forgotPassword(request)
                .then((response) => {
                    if (response.status === 'Success') {
                        this.setState({ msg: 'Password is sent to your email', error: '' });
                    } else {
                        this.setState({ msg: '', error: response.msg });
                    }
                    // this.props.actions.toggleLoader(false);
                });
        }
    }

    showFormErrors() {
        const inputs = document.querySelectorAll('#frmForgot input');
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
        // const isPassword = refName.indexOf('password') !== -1;
        // const isPasswordConfirm = refName === 'passwordConfirm';

        // if (isPasswordConfirm) {
        //     if (this.form.password.value !== this.form.passwordConfirm.value) {
        //         this.form.passwordConfirm.setCustomValidity('Passwords do not match');
        //     } else {
        //         this.form.passwordConfirm.setCustomValidity('');
        //     }
        // }

        if (!validity.valid) {
            if (validity.valueMissing) {
                error.textContent = `${label} is a required field`;
            } else if (validity.typeMismatch) {
                error.textContent = `${label} should be a valid email address`;
            }
            return false;
        }

        error.textContent = '';
        return true;
    }

    render() {
        return (
            <div>
                {this.state.msg === '' ?
                    (
                        <form noValidate id="frmForgot">
                            {this.state.error !== '' &&
                                <div className="alert alert-danger">{this.state.error}</div>
                            }
                            <div className="form-group">
                                <label id="emailLabel">Email</label>
                                <input
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    ref={(val) => { this.form.email = val; }}
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    required
                                />
                                <div className="error" id="emailError" />
                            </div>
                            <div className="form-group">
                                <button
                                    className="btn btn-success"
                                    onClick={this.handleSubmit}
                                >Submit
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="alert alert-success">
                            {this.state.msg}
                        </div>
                    )}

            </div>
        );
    }
}

ForgotPassword.defaultProps = {
    type: 'user',
};

export default ForgotPassword;
