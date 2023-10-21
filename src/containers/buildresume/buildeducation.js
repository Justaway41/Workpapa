import React, { Component } from 'react';
import Util from '../../helpers/util.class';


class BuildEducationPage extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
    }

    initialize = () => ({
        name: '',
        location: '',
        degree: '',
        field: '',
        year: '',
        formErrors: {
            name: '', location: '', degree: '', field: '', year: ''
        },
        nameVaild: false,
        locationVaild: false,
        degreeVaild: false,
        fieldVaild: false,
        yearVaild: false,
        msg: '',
        loader: false
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
        let nameVaild = this.state.nameVaild;
        let locationVaild = this.state.locationVaild;
        let degreeVaild = this.state.degreeVaild;
        let fieldVaild = this.state.fieldVaild;
        let yearVaild = this.state.yearVaild;

        switch (fieldName) {
        case 'name':
            nameVaild = value.length > 0;
            fieldValidationErrors.name = nameVaild ? '' : ' is invalid';
            break;
        case 'location':
            locationVaild = value.length > 0;
            fieldValidationErrors.location = locationVaild ? '' : ' is invalid';
            break;
        case 'degree':
            degreeVaild = value.length > 0;
            fieldValidationErrors.degree = degreeVaild ? '' : ' is invalid';
            break;
        case 'field':
            fieldVaild = value.length > 0;
            fieldValidationErrors.field = fieldVaild ? '' : ' is invalid';
            break;
        case 'year':
            yearVaild = value.length > 0 && (value >= 1950 && value <= new Date().getFullYear());
            fieldValidationErrors.year = yearVaild ? '' : ' is invalid';
            break;
        default:
            break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            nameVaild,
            locationVaild,
            degreeVaild,
            fieldVaild,
            yearVaild
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.nameVaild && this.state.locationVaild && this.state.degreeVaild && this.state.fieldVaild && this.state.yearVaild });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleContactRequest = (e) => {
        e.preventDefault();
        // this.setState({ loader: true });

        const resumeBuild = Util.getDataFromSessionStorage('resumeBuild');

        const educationData = {
            name: this.state.name,
            location: this.state.location,
            degree: this.state.degree,
            field: this.state.field,
            year: this.state.year
        };
        const resumeBuildData = {
            template: resumeBuild.template,
            contact: resumeBuild.contact,
            experience: resumeBuild.experience || [],
            education: resumeBuild.education || []
        };
        resumeBuildData.education.push(educationData);
        Util.setDataToSessionStorage('resumeBuild', resumeBuildData);

        this.props.history.push('/build-resume/list-education');
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
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2">
                    <h3>Tell us about your Education</h3>
                    <p>Help employers better understand your background</p><br />
                    {/* <form name="form" onSubmit={this.handleContactRequest} > */}
                    <div className="row control-group">
                        <div className="control-group col-xs-6">
                            <div className={`form-group floating-label-form-group controls ${this.errorClass(this.state.formErrors.name)}`} >
                                <label htmlFor="name">School Name</label>
                                <input type="text" className="form-control" placeholder="School Name" name="name" value={this.state.name} onChange={this.handleUserInput} />
                            </div>
                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'name' }} />
                        </div>
                        <div className="control-group col-xs-6">
                            <div className={`form-group floating-label-form-group controls ${this.errorClass(this.state.formErrors.location)}`} >
                                <label htmlFor="name">School Location</label>
                                <input type="text" className="form-control" placeholder="School Location" name="location" value={this.state.location} onChange={this.handleUserInput} />
                            </div>
                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'location' }} />
                        </div>
                    </div>
                    <div className="row" >
                        <div className="control-group col-xs-6">
                            <div className={`form-group floating-label-form-group controls ${this.errorClass(this.state.formErrors.degree)}`} >
                                <label>Degree</label>
                                <input type="text" className="form-control" placeholder="Degree" name="degree" value={this.state.degree} onChange={this.handleUserInput} />
                            </div>
                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'degree' }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="control-group col-xs-6">
                            <div className={`form-group floating-label-form-group controls ${this.errorClass(this.state.formErrors.field)}`} >
                                <label>Field of Study</label>
                                <input type="text" className="form-control" placeholder="Field of Study" name="field" value={this.state.field} onChange={this.handleUserInput} />
                            </div>
                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'field' }} />
                        </div>
                        <div className="control-group col-xs-3">
                            <div className={`form-group floating-label-form-group controls ${this.errorClass(this.state.formErrors.year)}`} >
                                <label>Graduation Year</label>
                                <input type="number" className="form-control" placeholder="Graduation Year" name="year" value={this.state.year} onChange={this.handleUserInput} />
                            </div>
                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'year' }} />
                        </div>
                    </div>
                    <br />
                    {this.state.msg !== '' &&
                                <div className="alert alert-success" >{this.state.msg}</div>
                    }
                    <div className="row">
                        <div className="form-group col-xs-6">
                            <button className="btn btn-default btn-lg pull-left" onClick={this.props.history.goBack}>
                                <i className="fas fa-arrow-circle-left" /> Back
                            </button>
                        </div>
                        <div className="form-group col-xs-6">
                            <button className="btn btn-danger btn-lg pull-right" disabled={!this.state.formValid || this.state.loader} onClick={this.handleContactRequest}>
                                Save & Next <i className="fas fa-arrow-circle-right" />
                            </button>
                            {this.state.loader &&
                                     <img alt="loader" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                        </div>
                    </div>
                    {/* </form> */}
                </div>
            </div>

        );
    }
}

export default BuildEducationPage;
