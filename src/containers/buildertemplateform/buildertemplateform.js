import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import SalaryNegotiation from '../../data/templates/salary-negotiation/questionaire.json';
import Util from '../../helpers/util.class';

class BuilderTemplateFormPage extends Component {
    constructor(props) {
        super(props);
        this.form = {};

        const storePackage = Util.getDataFromSessionStorage('letterData');
        // console.log(storePackage);
        let template = '';
        storePackage.forEach((element) => {
            template += `<p>${element.label}</p>`;
        });
        this.state = {
            quesData: SalaryNegotiation,
            template,
            orignaltemplate: template,
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

        let text = this.state.orignaltemplate;
        this.state.quesData.filter(item => item.answer !== '').forEach((element) => {
            const match = new RegExp(element.key, 'g');
            text = text.replace(match, `<strong>${element.answer}</strong>`);
        });
        this.setState({ template: text });
    }

    handleSubmit(e) {
        e.preventDefault();

        // console.log('component state', JSON.stringify(this.state));

        if (!this.showFormErrors()) {
            // console.log('form is invalid: do not submit');
        } else {
            // console.log('form is valid: submit');
            const requestData = {
                questionaire: JSON.stringify(this.state.quesData)
            };

            Util.setDataToSessionStorage('templateData', requestData);
            this.props.history.push('/build-template/preview');
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
                <section id="root">
                    <div className="container">
                        <div className="col-md-6 col-sm-12 well">
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
                                            // autoFocus
                                            // onFocus={(e) => { this.handleChange(e, key); }}
                                            required={item.required}
                                        />
                                        <div className="error" id={`${item.id}Error`} />
                                    </div>
                                ))}
                                <div className="form-group">
                                    <button
                                        className="btn btn-lg btn-outline btn-success"
                                        onClick={this.handleSubmit}
                                    >Preview
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6 col-sm-12" >
                            <h3>Preview</h3>
                            <div style={{ border: '1px solid #CCC', padding: '30px', marginBottom: '20px' }}>
                                {ReactHtmlParser(this.state.template)}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

// function mapStateToProps(state) {
//     return {
//         loader: state.loader
//     };
// }
// function mapDispatchToProps(dispatch) {
//     return { actions: bindActionCreators(actions, dispatch) };
// }
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BuilderTemplateFormPage));

export default BuilderTemplateFormPage;
