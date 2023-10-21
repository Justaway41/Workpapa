import React, { Component } from 'react';
import Util from '../../helpers/util.class';
import MyEditor from '../../components/editor/editor';

class BuildSummaryPage extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
    }

    initialize = () => ({
        skills: '',
        formErrors: {
            summary: ''
        },
        summaryVaild: false,
        msg: '',
        loader: false
    })
    getEditorValue = (data) => {
        // this.setState({ responsibilities: data });
        const e = {
            target: {
                name: 'summary',
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
        let summaryVaild = this.state.summaryVaild;

        switch (fieldName) {
        case 'summary':
            summaryVaild = value.length > 0;
            fieldValidationErrors.name = summaryVaild ? '' : ' is invalid';
            break;
        default:
            break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            summaryVaild
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.summaryVaild });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleContactRequest = (e) => {
        e.preventDefault();
        // this.setState({ loader: true });

        const resumeBuild = Util.getDataFromSessionStorage('resumeBuild');

        const resumeBuildData = {
            template: resumeBuild.template,
            contact: resumeBuild.contact,
            experience: resumeBuild.experience,
            education: resumeBuild.education,
            skills: resumeBuild.skills,
            summary: this.state.summary
        };
        Util.setDataToSessionStorage('resumeBuild', resumeBuildData);

        this.props.history.push('/build-resume/preview');
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
                    <h3>Last step! Add a brief summary about yourself</h3>
                    <p>Make a great first impression</p><br />
                    <form name="form" onSubmit={this.handleContactRequest} >
                        <div className="row control-group">
                            <div className="control-group col-xs-12">
                                <div className={`form-group floating-label-form-group controls ${this.errorClass(this.state.formErrors.summary)}`} >
                                    <label htmlFor="name">Summary</label>
                                    {/* <textarea rows="5" className="form-control" placeholder="Summary" name="summary" value={this.state.summary} onChange={this.handleUserInput} /> */}
                                    <MyEditor getEditorValue={this.getEditorValue} editorClassName="demo-editor" />
                                </div>
                                <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'summary' }} />
                            </div>
                        </div>
                        <br />
                        {this.state.msg !== '' &&
                                <div className="alert alert-success" >{this.state.msg}</div>
                        }
                        <div className="row">
                            <div className="form-group col-xs-12">
                                <button className="btn btn-danger btn-lg pull-right" disabled={!this.state.formValid || this.state.loader}>
                                    Next: Done <i className="fas fa-arrow-circle-right" />
                                </button>
                                {this.state.loader &&
                                     <img alt="loader" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

export default BuildSummaryPage;
