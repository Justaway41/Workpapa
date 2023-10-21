import React, { Component } from 'react';
import Util from '../../helpers/util.class';
import Globals from '../../helpers/constant';
import MyEditor from '../../components/editor/editor';

const monthRange = Util.fillRange(1, 12);

class BuildExperiencePage extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
        // console.log(this.props);
    }

    initialize = () => ({
        jobtitle: '',
        employer: '',
        city: '',
        state: '',
        zip: '',
        startmonth: '',
        startyear: '',
        endyear: '',
        endmonth: '',
        responsibilities: '',
        formErrors: {
            jobtitle: '', employer: '', city: '', state: '', startmonth: '', startyear: '', endyear: '', endmonth: '', responsibilities: ''
        },
        jobtitleVaild: false,
        employerVaild: false,
        cityVaild: false,
        stateVaild: false,
        startmonthVaild: false,
        startyearValid: false,
        endyearValid: false,
        endmonthValid: false,
        responsibilitiesValid: false,
        msg: '',
        loader: false
    })
    getEditorValue = (data) => {
        // this.setState({ responsibilities: data });
        const e = {
            target: {
                name: 'responsibilities',
                value: data
            }
        };
        this.handleUserInput(e);
        // console.log(this.state.responsibilities);
    }
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
        let jobtitleVaild = this.state.jobtitleVaild;
        let employerVaild = this.state.employerVaild;
        let cityVaild = this.state.cityVaild;
        let stateVaild = this.state.stateVaild;
        let startmonthVaild = this.state.startmonthVaild;
        let startyearValid = this.state.startyearValid;
        let endyearValid = this.state.endyearValid;
        let endmonthValid = this.state.endmonthValid;
        let responsibilitiesValid = this.state.responsibilitiesValid;

        switch (fieldName) {
        case 'jobtitle':
            jobtitleVaild = value.length > 0;
            fieldValidationErrors.jobtitle = jobtitleVaild ? '' : ' is invalid';
            break;
        case 'employer':
            employerVaild = value.length > 0;
            fieldValidationErrors.employer = employerVaild ? '' : ' is invalid';
            break;
        case 'city':
            cityVaild = value.length > 0;
            fieldValidationErrors.city = cityVaild ? '' : ' is invalid';
            break;
        case 'state':
            stateVaild = value.length > 0;
            fieldValidationErrors.state = stateVaild ? '' : ' is invalid';
            break;
        case 'startmonth':
            startmonthVaild = value.length > 0 && value >= 1 && value <= 12;
            fieldValidationErrors.startmonth = startmonthVaild ? '' : ' is invalid';
            break;
        case 'startyear':
            startyearValid = value.length > 0 && (value >= 1950 && value <= new Date().getFullYear());
            fieldValidationErrors.startyear = startyearValid ? '' : ' is invalid';
            break;
        case 'endyear':
            endyearValid = value.length > 0 && (value >= 1950 && value <= new Date().getFullYear());
            fieldValidationErrors.endyear = endyearValid ? '' : ' is invalid';
            break;
        case 'endmonth':
            endmonthValid = value.length > 0 && value >= 1 && value <= 12;
            fieldValidationErrors.endmonth = endmonthValid ? '' : ' is invalid';
            break;
        case 'responsibilities':
            responsibilitiesValid = value.length > 0;
            fieldValidationErrors.responsibilities = responsibilitiesValid ? '' : ' is invalid';
            break;
        default:
            break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            jobtitleVaild,
            employerVaild,
            cityVaild,
            stateVaild,
            startmonthVaild,
            startyearValid,
            endyearValid,
            endmonthValid,
            responsibilitiesValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.jobtitleVaild && this.state.employerVaild && this.state.cityVaild && this.state.stateVaild && this.state.startmonthVaild && this.state.startyearValid && this.state.endyearValid && this.state.endmonthValid && this.state.responsibilitiesValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleContactRequest = (e) => {
        e.preventDefault();
        const resumeBuild = Util.getDataFromSessionStorage('resumeBuild');

        const experienceData = {
            jobtitle: this.state.jobtitle,
            employer: this.state.employer,
            city: this.state.city,
            state: this.state.state,
            startmonth: this.state.startmonth,
            startyear: this.state.startyear,
            endyear: this.state.endyear,
            endmonth: this.state.endmonth,
            responsibilities: this.state.responsibilities
        };
        const resumeBuildData = {
            template: resumeBuild.template,
            contact: resumeBuild.contact,
            experience: resumeBuild.experience || []
        };
        resumeBuildData.experience.push(experienceData);
        Util.setDataToSessionStorage('resumeBuild', resumeBuildData);

        this.props.history.push('/build-resume/list-experience');
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
                    <h3>You are almost done - Provide your Work History</h3>
                    <p>Let employers see where you’ve worked before</p><br />
                    {/* <form name="form"> */}
                    <div className="row control-group">
                        <div className="control-group col-xs-6">
                            <div className={`form-group floating-label-form-group controls ${this.errorClass(this.state.formErrors.jobtitle)}`} >
                                <label htmlFor="name">Job Title</label>
                                <input type="text" className="form-control" placeholder="Job Title" name="jobtitle" value={this.state.jobtitle} onChange={this.handleUserInput} />
                            </div>
                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'jobtitle' }} />
                        </div>
                        <div className="control-group col-xs-6">
                            <div className={`form-group floating-label-form-group controls ${this.errorClass(this.state.formErrors.employer)}`} >
                                <label htmlFor="name">Employer</label>
                                <input type="text" className="form-control" placeholder="Employer" name="employer" value={this.state.employer} onChange={this.handleUserInput} />
                            </div>
                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'employer' }} />
                        </div>
                    </div>
                    <div className="row" >
                        <div className="control-group col-xs-6">
                            <div className={`form-group floating-label-form-group controls ${this.errorClass(this.state.formErrors.city)}`} >
                                <label>City</label>
                                <input type="text" className="form-control" placeholder="City" name="city" value={this.state.city} onChange={this.handleUserInput} />
                            </div>
                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'city' }} />
                        </div>
                        <div className="control-group col-xs-6">
                            <div className={`form-group floating-label-form-group controls ${this.errorClass(this.state.formErrors.state)}`} >
                                <label>State</label>
                                <input type="text" className="form-control" placeholder="State" name="state" value={this.state.state} onChange={this.handleUserInput} />
                            </div>
                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'state' }} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="control-group col-xs-3">
                            <div className={`form-group floating-label-form-group controls ${this.errorClass(this.state.formErrors.startmonth)}`} >
                                {/* <label>Start Month</label> */}
                                <select style={{ marginTop: '25px' }} className="form-control" name="startmonth" onChange={this.handleUserInput}>
                                    <option value="">Start Month</option>
                                    {monthRange.map(item => <option value={item} key={item}>{Globals.months[item - 1]}</option>)}
                                </select>
                                {/* <input type="number" className="form-control" placeholder="Start Month" name="startmonth" min="1960" max="2018" value={this.state.startmonth} onChange={this.handleUserInput} /> */}
                            </div>
                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'startmonth' }} />
                        </div>
                        <div className="control-group col-xs-3">
                            <div className={`form-group floating-label-form-group controls ${this.errorClass(this.state.formErrors.startyear)}`} >
                                <label>Start Year</label>
                                <input type="number" className="form-control" placeholder="Start Year" name="startyear" value={this.state.startyear} onChange={this.handleUserInput} />
                            </div>
                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'startyear' }} />
                        </div>
                        <div className="control-group col-xs-3">
                            <div className={`form-group floating-label-form-group controls ${this.errorClass(this.state.formErrors.endmonth)}`} >
                                {/* <label>End Month</label> */}
                                <select style={{ marginTop: '25px' }} className="form-control" name="endmonth" onChange={this.handleUserInput}>
                                    <option value="">End Month</option>
                                    {monthRange.map(item => <option value={item} key={item}>{Globals.months[item - 1]}</option>)}
                                </select>
                                {/* <input type="number" className="form-control" placeholder="End Month" name="endmonth" value={this.state.endmonth} onChange={this.handleUserInput} /> */}
                            </div>
                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'endmonth' }} />
                        </div>
                        <div className="control-group col-xs-3">
                            <div className={`form-group floating-label-form-group controls ${this.errorClass(this.state.formErrors.endyear)}`} >
                                <label>End Year</label>
                                <input type="number" className="form-control" placeholder="End Year" name="endyear" value={this.state.endyear} onChange={this.handleUserInput} />
                            </div>
                            <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'endyear' }} />
                        </div>
                    </div>
                    <div className="row control-group">
                        <br /><br />
                        <p>Add your responsibilities and achievements in this role.</p>
                        <div className={`form-group col-xs-12 floating-label-form-group controls ${this.errorClass(this.state.formErrors.responsibilities)}`} >
                            <label>Responsibilities</label>
                            <MyEditor getEditorValue={this.getEditorValue} editorClassName="demo-editor" />
                            {/* <textarea rows="5" className="form-control" placeholder="Responsibilities" name="responsibilities" value={this.state.responsibilities} onChange={this.handleUserInput} /> */}
                        </div>
                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'responsibilities' }} />
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

export default BuildExperiencePage;
