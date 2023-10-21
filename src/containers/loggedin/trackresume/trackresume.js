import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Table } from 'react-bootstrap';

import ReactHtmlParser from 'react-html-parser';
import * as actions from '../../../actions';

import Util from '../../../helpers/util.class';
import ScrollToTop from '../../../components/scrolltotop/scrolltotop';
// import HeaderLoggedIn from '../../../components/header/headerloggedin';
// import Footer from '../../../components/footer/footer';
import Steps from '../../../components/steps/steps';
// import Contact from '../../../components/contact/contact';
import ProfileApi from '../../../api/profileApi';
import OtherApi from '../../../api/otherApi';
import FormErrors from '../../../components/formerror/formerror';
import Auth from '../../../helpers/auth.class';
import Globals from '../../../helpers/constant';
import MyEditor from '../../../components/editor/editor';
import WriterApi from '../../../api/writerApi';

class TrackResumePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            service: [],
            writer: [],
            mail: [],
            resumeCompleted: [],
            message: '',
            formErrors: { message: '' },
            messageValid: false,
            msg: '',
            error: '',
            loader: false
        };
    }

    // componentWillReceiveProps(nextProps) {
    //     //console.log(nextProps);
    //     if(this.props.geo !== nextProps.geo){
    //         //this.setState({converstionRate: nextProps.geo.currencyConverter, currency: Util.currency(nextProps.geo.currencyCode), resumeText: Util.getResumeTxt(nextProps.geo.countryCode)});
    //     }
    // }
    componentDidMount() {
        const userId = Auth.getUser().id_user;
        if (userId) {
            this.props.actions.toggleLoader(1);
            ProfileApi.getPaidService(userId)
                .then((response) => {
                    if (response.status === 'Success') {
                        this.props.actions.toggleLoader(-1);
                        this.setState({ service: response.data });
                    }
                });
            // .catch((error) => {
            // // this.setState({msg: error, loader: false});
            //     console.log(error);
            // });
            this.props.actions.toggleLoader(1);
            ProfileApi.getResumeTrack(userId)
                .then((response) => {
                    if (response.status === 'Success') {
                        this.setState({ track: response.data });
                    }
                    return response;
                })
                .then(res => ProfileApi.getTrackMessage(userId, res.data.id_package))
                .then((dat) => {
                    // console.log(dat);
                    if (dat.status === 'Success') {
                        this.setState({ mail: dat.data });
                    }
                    return dat;
                    // this.props.actions.toggleLoader(-1);
                })
                .then(() => WriterApi.getProfileById(this.state.track.id_writer))
                .then((dat) => {
                    // console.log(dat);
                    if (dat.status === 'Success') {
                        this.setState({ writer: dat.data });
                    }
                    // return dat;
                    this.props.actions.toggleLoader(-1);
                });

            this.props.actions.toggleLoader(1);
            ProfileApi.getCompletedResume(userId)
                .then((response) => {
                    if (response.status === 'Success') {
                        this.setState({ resumeCompleted: response.data });
                    }
                    this.props.actions.toggleLoader(-1);
                });
            // .catch((error) => {
            // // this.setState({msg: error, loader: false});
            //     console.log(error);
            // });
        }
    }
    testfun() {
        this.props.history.push('/payment/confirmation/RRS');
    }
    stepData(track) {
        let stepDesc1;
        let stepDesc2;
        let stepDesc3;
        let stepDesc4;
        const status1 = 'complete';
        let status2;
        let status3;
        let status4;
        if (track) {
            if (track.step1) {
                stepDesc1 = `Resume Initiated on ${Util.dateFormat(track.step1)}`;
            } else stepDesc2 = 'Resume Initiated';
            if (track.step2) {
                status2 = 'complete';
                stepDesc2 = `Resume Received on ${Util.dateFormat(track.step2)}`;
            } else {
                status2 = 'disabled';
                stepDesc2 = 'Waiting to upload resume';
            }
            if (track.step2) {
                status3 = 'active';
                stepDesc3 = 'Resume Service in progress';
            } else {
                status3 = 'disabled';
                stepDesc3 = 'Resume Service yet to start';
            }
            if (track.step4) {
                status3 = 'complete';
                stepDesc3 = 'Resume Service Completed';
                status4 = 'complete';
                stepDesc4 = `Completion on ${Util.dateFormat(track.step4)}`;
            } else if (track.step2) {
                status4 = 'disabled';
                // track.comp_est = '2019-01-05 01:01:01';
                const d = new Date(track.comp_est);
                // const d = new Date(track.step2);
                const d1 = new Date();
                // let d2 = new Date(d.getTime() + (4 * 24 * 60 * 60 * 1000));
                if (d.getTime() < d1.getTime()) {
                    // d2 = new Date(d1.getTime() + (1 * 24 * 60 * 60 * 1000));
                    stepDesc4 = `${Math.round((d1.getTime() - d.getTime()) / (3600 * 1000 * 24))} day(s) Over due`;
                } else {
                    stepDesc4 = `Expected Completion by ${Util.dateFormat(d)}`;
                }
            } else {
                status4 = 'disabled';
                stepDesc4 = 'Pending CV/Resume or template';
            }
        }
        return [
            {
                stepTxt: 'Step 1',
                stepDesc: stepDesc1,
                status: status1
            },
            {
                stepTxt: 'Step 2',
                stepDesc: stepDesc2,
                status: status2
            },
            {
                stepTxt: 'Step 3',
                stepDesc: stepDesc3,
                status: status3
            },
            {
                stepTxt: 'Step 4',
                stepDesc: stepDesc4,
                status: status4
            }
        ];
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(
            { [name]: value },
            () => { this.validateField(name, value); }
        );
    }
    getEditorValue = (data) => {
        const e = {
            target: {
                name: 'message',
                value: data
            }
        };
        this.handleUserInput(e);
    }
    validateField(fieldName, value) {
        const fieldValidationErrors = this.state.formErrors;
        let messageValid = this.state.messageValid;

        switch (fieldName) {
        case 'message':
            messageValid = value.length > 20;
            fieldValidationErrors.message = messageValid ? '' : ' should be atleast 20 character';
            break;
        default:
            break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            messageValid
        }, this.validateForm);
    }
    validateForm() {
        this.setState({ formValid: this.state.messageValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    handleRequest = (e) => {
        e.preventDefault();
        this.props.actions.toggleLoader(1);
        this.setState({ loader: true });
        const request = {
            id_user: this.props.profile.id_user,
            name: this.props.profile.firstname,
            email: this.props.profile.email,
            message: this.state.message,
            id_package: this.state.track.id_package
        };
        OtherApi.sendTrackMessage(request)
            .then((response) => {
                if (response.status === 'Success') {
                    // this.setState({service: response.data});
                    this.setState({
                        error: '', message: '', loader: false, msg: 'Thanks for contacting us. our team will contact you in next 1 working days'
                    });
                } else {
                    this.setState({ msg: '', loader: false, error: response.msg });
                }
            })
            .then(() => ProfileApi.getTrackMessage(this.props.profile.id_user, this.state.track.id_package))
            .then((dat) => {
                if (dat.status === 'Success') {
                    this.setState({ mail: dat.data });
                }
                this.props.actions.toggleLoader(-1);
            });
        // .catch((error) => {
        //     // this.setState({msg: error, loader: false});
        //     console.log(error);
        // });
        return false;
    }
    downloadFile = (filename) => {
        window.open(filename);
    }
    render() {
        return (
            <div>
                <ScrollToTop />
                <Helmet>
                    <title>WorkPapa | Track Resume Status</title>
                </Helmet>
                <section id="about">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2>Track your resume progress</h2>
                                <hr className="star-primary" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-10 col-sm-offset-1 ">
                                <Steps stepData={this.stepData(this.state.track)} />
                            </div>
                        </div>
                        {this.state.track && this.state.track.pending_resume !== '0' &&
                        <div className="row">
                            <div className="col-sm-12 text-center">
                                Currently there are {this.state.track.pending_resume} CV Pending before you.
                            </div>
                        </div>
                        }
                        {this.state.resumeCompleted.length > 0 &&
                            <div className="row">
                                <div className="col-sm-8 col-sm-offset-2">
                                    <h5>Document to download: (Click the link to download )</h5>
                                    <Table striped bordered condensed>
                                        <tbody>
                                            {this.state.resumeCompleted.map(doc =>
                                                (
                                                    <tr key={doc.filename}>
                                                        <td>
                                                            <a className="pointer" onClick={() => this.downloadFile(`${Globals.resumeDoneUrl}${doc.filename}`)}>{doc.filename}</a>
                                                        </td>
                                                        <td>
                                                            {doc.date_cmp}
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }
                        {!!this.state.track &&
                            <div className="row">
                                <div className="col-md-8 col-md-offset-2">
                                    <Table striped bordered condensed>
                                        <tbody>
                                            <tr>
                                                <th>Item</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                            <tr>
                                                <td>Resume/CV file</td>
                                                <td>{this.state.track.step2 ? 'Complete' : 'Incomplete'}</td>
                                                <td>{this.state.track.step2 ? 'No Action Needed' : <Link to="/member/uploadresume">Upload CV/Resume</Link>}</td>
                                            </tr>
                                            <tr>
                                                <td>Template</td>
                                                <td>{Object.keys(this.state.track.template).length !== 0 ? 'Complete' : 'Incomplete'}</td>
                                                <td>{Object.keys(this.state.track.template).length !== 0 ? 'No Action Needed' : <Link to="/member/choosetemplate">Choose Template</Link>}</td>
                                            </tr>
                                            <tr>
                                                <td>Questionaire</td>
                                                <td>{this.state.track.questionaire && Object.keys(this.state.track.questionaire).length !== 0 ? 'Complete' : 'Incomplete'}</td>
                                                <td>{this.state.track.questionaire && Object.keys(this.state.track.questionaire).length !== 0 ? 'No Action Needed' : <Link to="/member/questionaire">Fill questionaire</Link>}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        }
                        <div className="row">
                            <div className="col-md-5">
                                <div className="col-sm-11 col-sm-offset-1">
                                    <h5>Services purchased:</h5>
                                    <Table striped bordered condensed>
                                        <tbody>
                                            <tr>
                                                <th>Package</th>
                                                <th>Price</th>
                                            </tr>
                                            {this.state.service.addon && JSON.parse(this.state.service.addon).map(addons =>
                                                (
                                                    <tr key={`${addons.id}-${addons.label}`}>
                                                        <td>{addons.label}</td>
                                                        <td>{addons.price === 0 ? 'Free' : (this.state.service.geo ? Util.currency(JSON.parse(this.state.service.geo).currencyCode) : '$') + Util.round(addons.price * (this.state.service.geo ? JSON.parse(this.state.service.geo).currencyConverter : 1))}</td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </Table>
                                    {/* )} */}
                                </div>
                                {Object.keys(this.state.writer).length > 0 &&
                                        <div className="col-sm-11 col-sm-offset-1 well">
                                            <div className="row">
                                                <div className="col-md-7">
                                                    {this.state.writer.profile_img !== null &&
                                                        <img src={`${Globals.profilePicUrl}/writer/${this.state.writer.profile_img}`} className="img-circle " width="60px" height="60px" alt={this.state.writer.profile_img} />
                                                    }
                                                    {this.state.writer.profile_img === null &&
                                                        <img src={`${Globals.publicUrl}/assets/images/profile-pic.png`} className="img-circle " width="60px" height="60px" alt={this.state.writer.profile_img} />
                                                    }
                                                    <strong>{`${this.state.writer.first_name} ${this.state.writer.last_name}`}</strong>
                                                    <br />
                                                    {this.state.writer.skills.map(item =>
                                                        (
                                                            <span key={item.name} className="badge badge-secondary">{item.name}</span>
                                                        ))}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div><strong>Country:</strong> {this.state.writer.country}</div>
                                                    <div><strong>Member Since:</strong> {this.state.writer.date_join}</div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-md-12">
                                                    {this.state.writer.about_me}
                                                </div>
                                            </div>
                                        </div>
                                }
                            </div>
                            <div className="col-md-7">
                                <p className="small">You can email WorkPapa at <strong>support@workpapa.com</strong>, or by using the form below. We&apos;re here to answer any questions you may have about the resume process.</p>
                                <Table striped bordered condensed >
                                    <tbody>
                                        <tr>
                                            <td colSpan="2"><h5>Conversation</h5></td>
                                        </tr>
                                        {
                                            this.state.mail.map(item =>
                                                (
                                                    <tr key={item.id_msg}>
                                                        <td className="col-md-2"><strong>{(item.from_user === this.props.profile.id_user) ? 'You' : 'Writer Reply'}</strong></td>
                                                        <td className="col-md-10">{ReactHtmlParser(item.message)}</td>
                                                    </tr>
                                                ))
                                        }
                                    </tbody>
                                </Table>

                                <form name="form" onSubmit={this.handleRequest} >

                                    <div className="row control-group">
                                        <div className={`form-group col-xs-12 floating-label-form-group controls ${this.errorClass(this.state.formErrors.message)}`} >
                                            {/* <label>Message</label> */}
                                            <MyEditor getEditorValue={this.getEditorValue} editorClassName="demo-editor" />
                                            {/* <textarea rows="3" className="form-control" placeholder="Write your queries" name="message" value={this.state.message} onChange={this.handleUserInput} /> */}
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'message' }} />
                                    </div>
                                    <br />
                                    {this.state.msg !== '' &&
                                            <div className="alert alert-success" >{this.state.msg}</div>
                                    }
                                    {this.state.error !== '' &&
                                            <div className="alert alert-danger" >{this.state.error}</div>
                                    }
                                    <div className="row">
                                        <div className="form-group col-xs-12">
                                            <button className="btn btn-success btn-lg" disabled={!this.state.formValid || this.state.loader}>Submit
                                                <i className="icon icon-arrow" />
                                            </button>
                                            {this.state.loader &&
                                                <img alt="loader" src={Globals.loader.smallbutton} />
                                            }
                                        </div>
                                    </div>
                                </form>
                            </div>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrackResumePage));

// export default TrackResumePage;
