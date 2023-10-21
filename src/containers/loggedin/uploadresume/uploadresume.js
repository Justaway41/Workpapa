import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Helmet } from 'react-helmet';
import ScrollToTop from '../../../components/scrolltotop/scrolltotop';
import ProfileApi from '../../../api/profileApi';
import FormValidation from '../../../helpers/form.class';

class UploadResumePage extends Component {
    constructor(props) {
        super(props);
        this.form = {
            docname: ''
        };
        this.state = this.initialize();
    }
    initialize = () => ({
        docname: '',
        msg: '',
        error: '',
        files: []
    })

    handleRequest = (e) => {
        e.preventDefault();
        if (!FormValidation.showFormErrors(this.form, 'frmResume')) {
            return;
        }

        this.setState({ loader: true });

        const formData = new FormData();
        formData.append('id_user', this.props.profile.id_user);
        formData.append('title', this.state.docname);
        formData.append('file', this.state.files[0]);

        ProfileApi.uploadResume(formData)
            .then((response) => {
                if (response.status === 'Success') {
                    this.setState(this.initialize());
                    this.setState({ loader: false, msg: 'Thank you for Uploading Resume' });
                } else {
                    this.setState({ loader: false, msg: '', error: response.msg });
                }
            });
        // .catch((error) => {
        //     console.log(error);
        // });
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
    handleChange= (e) => {
        e.target.classList.add('active');
        this.setState({
            [e.target.name]: e.target.value
        });
        FormValidation.showInputError(this.form, e.target.name);
    }
    render() {
        return (
            <div>
                <ScrollToTop />
                <Helmet>
                    <title>WorkPapa | Upload Resume</title>
                </Helmet>
                <div className="top-spacer">
                    <div className="container block ">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2>Upload Your Resume</h2>
                                <hr className="star-primary" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center' }} >
                                <form noValidate encType="multipart/form-data" id="frmResume" method="post" name="form">

                                    <div className="row control-group">
                                        <div className="form-group floating-label-form-group controls">
                                            <label id="docnameLabel" >Document Type</label>
                                            <input
                                                className="form-control"
                                                placeholder="Enter Document Type (Resume, Cover letter etc)"
                                                type="text"
                                                name="docname"
                                                ref={(val) => { this.form.docname = val; }}
                                                value={this.state.docname}
                                                onChange={this.handleChange}
                                                required
                                            />
                                            <div className="error" id="docnameError" />
                                        </div>
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
                                            <button className="btn btn-success btn-lg" onClick={this.handleRequest} disabled={!this.state.files.length || this.state.loader}>Upload
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
                </div>

            </div>
        );
    }
}

export default UploadResumePage;
