import React, { Component } from 'react';
// import { Link } from 'react-router-dom'

class FormErrors extends Component {
    render() {
        const FormError = ({ formErrors, errorField }) =>
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
            <FormError formErrors={this.props.formErrors} errorField={this.props.errorField} />
        );
    }
}

FormErrors.defaultProps = {
    formErrors: {}
};
export default FormErrors;
