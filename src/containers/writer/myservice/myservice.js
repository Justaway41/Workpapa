import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button, Modal, Table } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import UserMessages from '../messages/usermessages';
import UploadDocument from '../uploaddocument/uploaddocument';
// import StarRatingComponent from 'react-star-rating-component';
// import { Table } from 'react-bootstrap';
import * as actions from '../../../actions';

import Util from '../../../helpers/util.class';
import ScrollToTop from '../../../components/scrolltotop/scrolltotop';

// import ProfileApi from '../../../api/profileApi';
// import OtherApi from '../../../api/otherApi';
// import Globals from '../../../helpers/constant';
import Auth from '../../../helpers/auth.class';
import WriterApi from '../../../api/writerApi';

class MyServicePage extends Component {
    constructor(props) {
        super(props);
        let packageData = {};
        if (Object.keys(props.geo).length > 0) {
            packageData = Util.getPackageData(props.geo).service.product;
        }
        this.state = {
            // profile: {},
            lists: {},
            packageData,
            userId: '',
            packageId: '',
            showModal: false,
            showMessageModal: false,
            showQuestionerModal: false,
            quesData: []
        };
    }

    componentDidMount() {
        this.getMyService();
    }

    componentWillReceiveProps(nextProps) {
        // if (this.props.profile !== nextProps.profile) {
        //     this.setState({
        //         profile: nextProps.profile
        //     });
        // }
        if (this.props.geo !== nextProps.geo) {
            const packageData = Util.getPackageData(nextProps.geo);
            this.setState({
                packageData: packageData.service.product
            });
        }
    }

    getMyService = () => {
        const writerId = Auth.getWriter().id_writer;
        if (writerId) {
            this.props.actions.toggleLoader(1);
            WriterApi.getMyService(writerId)
                .then((response) => {
                    if (response.status === 'Success') {
                        this.setState({ lists: response.data });
                    }
                    this.props.actions.toggleLoader(-1);
                });
        }
    }

    showPopup = () => {
        this.setState({ showModal: true });
    }

    closePopup = () => {
        this.setState({ showModal: false, showMessageModal: false, showQuestionerModal: false });
    }

    showMessagePopup = () => {
        this.setState({ showMessageModal: true });
    }

    showQuestionerPopup = () => {
        this.setState({ showQuestionerModal: true });
    }
    markedResumeDone = (packageId) => {
        const request = {
            id_package: packageId
        };
        WriterApi.markedResumeDone(request)
            .then((response) => {
                if (response.status === 'Success') {
                    this.getMyService();
                }
            });
    };

    getUserMessages = (userId, packageId) => {
        this.setState({ userId, packageId });
        this.showMessagePopup();
    }
    showUserQuestioner = (questionaire) => {
        this.setState({ quesData: JSON.parse(questionaire) });
        this.showQuestionerPopup();
        // this.getUserQuestioner(packageId);
    }

    uploadDocument = (userId, packageId) => {
        // userId = 111;
        // packageId = 248;
        this.setState({ userId, packageId });
        this.showPopup();
    }
    downloadFile = (filename) => {
        window.open(filename);
    }
    // getUserQuestioner = (packageId) => {
    //     this.props.actions.toggleLoader(1);
    //     WriterApi.getUserQuestioner(packageId)
    //         .then((dat) => {
    //             if (dat.status === 'Success') {
    //                 this.setState({ quesData: JSON.parse(dat.data.questionaire) });
    //                 this.showQuestionerPopup();
    //             }
    //             this.props.actions.toggleLoader(-1);
    //         });
    // }
    render() {
        return (
            <div>
                <ScrollToTop />
                <Helmet>
                    <title>WorkPapa | My Service</title>
                </Helmet>
                <section id="about">
                    <div className="top-spacer" >
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <h2>My service</h2>
                                    <hr className="star-primary" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-7 well">
                                    {this.state.lists.length > 0 &&

                                        this.state.lists.map(dat =>
                                            (
                                                <div className="row" key={`${dat.id_package}-${dat.step1}`} >
                                                    <div className="col-md-12">
                                                        {Object.keys(this.state.packageData).length > 0 &&
                                                            <h4>{this.state.packageData[dat.product].name} <span className="pull-right">Service #: {dat.id_package}</span></h4>
                                                        }
                                                        <div>
                                                            <strong>Purchase Date:</strong> {dat.step1}
                                                            <span className="pull-right"><strong>Completed Date:</strong> {dat.comp_est}</span>
                                                        </div>
                                                        <strong>Service</strong>
                                                        { dat.addon && JSON.parse(dat.addon).map(element => (
                                                            <div key={`${dat.id_package}-${element.id}-${element.label}`}>{element.label}</div>
                                                        ))}
                                                        <hr style={{ borderTop: '1px solid #fff' }} />
                                                        <strong>Template</strong>
                                                        <div>{JSON.parse(dat.template).label}</div>
                                                        <hr style={{ borderTop: '1px solid #fff' }} />
                                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                            {dat.step2 &&
                                                                <button
                                                                    className="btn btn-success"
                                                                    onClick={() => this.downloadFile(`${dat.resume}`)}
                                                                >Resume
                                                                </button>
                                                            }
                                                            &nbsp;
                                                            <button
                                                                className="btn btn-success"
                                                                onClick={() => this.showUserQuestioner(dat.questionaire)}
                                                            >Questioner
                                                            </button>
                                                            &nbsp;
                                                            <button
                                                                className="btn btn-success"
                                                                onClick={() => this.getUserMessages(dat.id_user, dat.id_package)}
                                                            >Message
                                                            </button>
                                                            &nbsp;
                                                            <button
                                                                className="btn btn-success"
                                                                onClick={() => this.uploadDocument(dat.id_user, dat.id_package)}
                                                            >Upload Document
                                                            </button>
                                                            &nbsp;
                                                            {dat.step1 && dat.step3 && !dat.step4 &&
                                                                <button
                                                                    className="btn btn-danger"
                                                                    onClick={this.markedResumeDone}
                                                                >Mark Completed
                                                                </button>
                                                            }
                                                        </div>
                                                        <hr style={{ borderTop: '1px solid #fff' }} />

                                                    </div>
                                                </div>
                                            ))

                                    }
                                    {this.state.lists.length <= 0 &&
                                <div className="alert alert-warning text-center">No data found</div>
                                    }
                                </div>
                                <div className="col-md-4 well pull-right">
                                    <h4>Helpful tips for you:</h4>
                                    <p className="small">
                                        To start any project, please visit<br />
                                        The “Opportunity” tab<br />
                                        And click “Start Project”<br />
                                    </p>
                                    <p className="small">
                                        To see any projects that you have already<br />
                                        Started please click on “Past Work”<br />
                                        To see all current and past work you have done.<br />
                                        There you can see what needs to be worked on, all questions, files and messages from the client for each project.
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>
                    {this.state.userId !== '' &&
                    <div>
                        <Modal show={this.state.showMessageModal} onHide={this.closePopup} >
                            <Modal.Header closeButton>
                                <h2 className="text-center">Messages</h2>
                            </Modal.Header>
                            <Modal.Body className="text-center">
                                <UserMessages userId={this.state.userId} packageId={this.state.packageId} profile={this.props.profile} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.closePopup}>Close X</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    // <UserMessages userId={this.state.userId} profile={this.props.profile} />

                    }
                    {this.state.packageId !== '' &&
                    <div>
                        <Modal show={this.state.showModal} onHide={this.closePopup} >
                            <Modal.Header closeButton>
                                <h2 className="text-center">Upload Document</h2>
                            </Modal.Header>
                            <Modal.Body className="text-center">
                                <UploadDocument userId={this.state.userId} packageId={this.state.packageId} profile={this.props.profile} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.closePopup}>Close X</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    // <UploadDocument userId={this.state.userId} packageId={this.state.packageId} profile={this.props.profile} />

                    }
                    {this.state.quesData !== '' &&
                    <div>
                        <Modal show={this.state.showQuestionerModal} onHide={this.closePopup} >
                            <Modal.Header closeButton>
                                <h2 className="text-center">Questioner</h2>
                            </Modal.Header>
                            <Modal.Body className="text-center">
                                <Table striped bordered condensed className="text-left">
                                    <tbody>
                                        {this.state.quesData.map(item =>
                                            (
                                                <tr key={item.id}>
                                                    <td>
                                                        <strong>{ReactHtmlParser(item.label)}</strong><br />
                                                        {ReactHtmlParser(item.answer)}
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.closePopup}>Close X</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                    }
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyServicePage));

// export default ServiceListPage;
