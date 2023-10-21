import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import FormErrors from '../../../components/formerror/formerror';
import WriterApi from '../../../api/writerApi';

class UploadDocument extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
    }
    initialize = () => ({
        docname: '',
        formErrors: {
            docname: ''
        },
        docnameVaild: false,
        msg: '',
        error: '',
        files: []
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
        let docnameValid = this.state.firstnameValid;

        switch (fieldName) {
        case 'docname':
            docnameValid = value.length > 0;
            fieldValidationErrors.name = docnameValid ? '' : ' is invalid';
            break;
        default:
            break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            docnameValid,
        }, this.validateForm);
    }
    validateForm() {
        this.setState({ formValid: this.state.docnameValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    handleRequest = (e) => {
        e.preventDefault();
        this.setState({ loader: true });

        const formData = new FormData();
        formData.append('id_user', this.props.userId);
        formData.append('id_package', this.props.packageId);
        formData.append('id_writer', this.props.profile.id_writer);
        formData.append('title', this.state.docname);
        formData.append('file', this.state.files[0]);

        WriterApi.uploadDocument(formData)
            .then((response) => {
                if (response.status === 'Success') {
                    this.setState(this.initialize());
                    this.setState({ loader: false, msg: 'Thank you for Uploading the documents' });
                } else {
                    this.setState({ loader: false, msg: '', error: response.msg });
                }
            });
        // .catch((error) => {
        //     console.log(error);
        // });

        return false;
    }
    onDrop = (files, rejected) => {
        this.setState({
            files
        });

        if (rejected.length > 0) {
            this.setState({ error: 'File not allowed.' });
        } else {
            this.setState({ error: '' });
        }
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center' }} >
                        <form encType="multipart/form-data" method="post" name="form" onSubmit={this.handleRequest} >
                            <div className="row control-group">
                                <div className={`form-group col-xs-12 floating-label-form-group controls ${this.errorClass(this.state.formErrors.docname)}`} >
                                    <label htmlFor="title">Document name</label>
                                    <input type="text" className="form-control" placeholder="Document name" name="docname" value={this.state.docname} onChange={this.handleUserInput} />
                                </div>
                                <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'docname' }} />
                            </div>
                            <br />
                            <div className="row control-group" >
                                <div className="form-group col-xs-12 floating-label-form-group controls" >
                                    <div className="dropzone">
                                        <Dropzone onDrop={this.onDrop} accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain, application/pdf" >
                                            <p className="small text-center">Try dropping your resume here, or click the box to browse files to upload.</p>
                                            <p className="small text-center">Only .doc, .docx, .txt and .pdf will be accepted</p>
                                        </Dropzone>
                                    </div>
                                </div>
                                {this.state.files.length > 0 &&
                                    <aside>
                                        <h5>Dropped files</h5>
                                        <ul>
                                            {
                                                this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                                            }
                                        </ul>
                                    </aside>
                                }
                            </div>
                            {this.state.msg !== '' &&
                            <div className="alert alert-success" >{this.state.msg}</div>
                            }
                            {this.state.error !== '' &&
                            <div className="alert alert-danger" >{this.state.error}</div>
                            }
                            <div className="row">
                                <div className="form-group col-xs-12 text-center">
                                    <button className="btn btn-success btn-lg" disabled={!this.state.formValid || !this.state.files.length || this.state.loader}>Upload
                                        <i className="icon icon-arrow" />
                                    </button>
                                    {this.state.loader &&
                                        <img alt="loader" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

export default UploadDocument;
