import React, { Component } from 'react';
import { FormGroup, FormControl, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Select from 'react-select';
// import {Typeahead} from 'react-bootstrap-typeahead';
// import FormErrors from '../formerror/formerror';

class FormElement extends Component {
    constructor(props) {
        super(props);
        // console.log(props);
        this.state = this.initialize();
        this.options = [
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' }
        ];
    }

    initialize = () => ({
        name: '',
        card: '',
        formErrors: { name: '', card: '' },
        nameVaild: false,
        cardVaild: false,
        loader: false
    });

    validateField(fieldName, value) {
        const fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let expMonthValid = this.state.expMonthValid;
        let expYearValid = this.state.expYearValid;
        let nameValid = this.state.nameValid;
        let cardValid = this.state.cardValid;
        let cvvValid = this.state.cvvValid;

        switch (fieldName) {
        case 'name':
            nameValid = value.length > 0;
            fieldValidationErrors.name = nameValid ? '' : ' is invalid';
            break;
        case 'card':
            cardValid = /^\d{15}$/.test(value) || /^\d{16}$/.test(value);
            fieldValidationErrors.card = cardValid ? '' : ' is invalid';
            break;
        case 'expMonth':
            expMonthValid = value.length > 0;
            fieldValidationErrors.expMonth = expMonthValid ? '' : ' is invalid';
            break;
        case 'expYear':
            expYearValid = value.length > 0;
            fieldValidationErrors.expYear = expYearValid ? '' : ' is invalid';
            break;
        case 'cvv':
            cvvValid = /^\d{3}$/.test(value) || /^\d{4}$/.test(value);
            fieldValidationErrors.cvv = cvvValid ? '' : ' is invalid';
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
            cardValid,
            nameValid,
        }, this.validateForm);
    }
    validateForm() {
        this.setState({ formValid: this.state.cardValid && this.state.nameValid });
    }
    errorClass(error) {
        return (error.length === 0 ? null : 'error');
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(
            { [name]: value },
            () => { this.validateField(name, value); }
        );
    }

    render() {
        return (
            <div>

                <Form inline>

                    <FormGroup bsSize="large" controlId="formInlineName" validationState={this.errorClass(this.state.formErrors.name)}>
                        {/* <ControlLabel>Name</ControlLabel> */}
                        {' '}

                        <Select onChange={this.onChange} options={this.options} simpleValue value="one" />
                        {/* <FormControl type="text" placeholder="Jane Doe" name="name" value={this.state.name} onChange={this.handleUserInput.bind(this)} />
                    <FormErrors formErrors={this.state.formErrors} errorField={{name: 'name'}} />     */}

                    </FormGroup>
                    {' '}
                    <FormGroup bsSize="large" controlId="formInlineEmail">
                        {/* <ControlLabel>Email</ControlLabel> */}
                        {' '}
                        <FormControl type="email" placeholder="jane.doe@example.com" />

                    </FormGroup>
                    {' '}
                    <Button type="submit" bsStyle="success" bsSize="large" >
                    Send invitation
                    </Button>
                </Form>

            </div>

        );
    }
}

FormElement.PropTypes = {
    formData: PropTypes.array.isRequired
};
export default FormElement;
