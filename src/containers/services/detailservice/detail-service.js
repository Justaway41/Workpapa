import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions';
import ScrollToTop from '../../../components/scrolltotop/scrolltotop';
import ServiceApi from '../../../api/serviceApi';

// import officeSpace from '../data/office-space.json';


// var Constant = require('../../helpers/constant');
// console.log(Constant.Globals.API);

class DetailServicePage extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
        // this.officeRef = createRef();
        // this.serviceRef = createRef();
    }

    componentDidMount() {
        this.getServiceData();
    }

    initialize = () => ({
        serviceId: '',
        dataSet: [],
        // showMessageModal: false,
        message: '',
    })
    // handleUserInput = (e) => {
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     this.setState({
    //         [name]: value
    //     });
    //     if (name === 'serviceId') {
    //         this.getServiceCategory(value);
    //     }
    // }

    getServiceData = () => {
        const serviceId = this.props.match.params.serviceId;
        const params = {
            serviceId,
        };
        ServiceApi.getServiceById(params)
            .then((result) => {
                if (result.status === 'Success') {
                    this.setState({ dataSet: result.data });
                }
            });
    }
    // closePopup = () => {
    //     this.setState({ showMessageModal: false, productId: '' });
    // }


    // handleRequest = (e) => {
    //     e.preventDefault();
    //     this.props.actions.toggleLoader(1);
    //     const request = {
    //         writerId: this.props.profile.id_writer,
    //         serviceId: this.state.serviceId,
    //         productId: this.state.productId,
    //         message: this.state.message
    //     };
    //     ServiceApi.sendUserMessage(request)
    //         .then((response) => {
    //             if (response.status === 'Success') {
    //                 // this.setState({
    //                 //     error: '', message: '', loader: false, msg: 'Message has sent successfully'
    //                 // });
    //                 this.closePopup();
    //             } else {
    //                 // this.setState({ msg: '', loader: false, error: response.msg });
    //             }
    //             this.props.actions.toggleLoader(-1);
    //         });
    //     return false;
    // }
    // contactRequest = (productId) => {
    //     this.setState({ showMessageModal: true, productId });
    // }
    render() {
        const { dataSet } = this.state;
        return (
            <div className="top-spacer" >
                <Helmet>
                    <title>WorkPapa | Dashboard</title>
                </Helmet>
                <ScrollToTop />

                <div className="container" style={{ marginBottom: '40px' }}>
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2>Service Details</h2>
                            <hr className="star-primary" />
                        </div>
                    </div>
                    <div className="col-md-6 col-md-offset-4">
                        <table className="table tabel-striped">
                            <tr>
                                <td>Bussiness Name: </td>
                                <td>{dataSet.business_name}</td>
                            </tr>
                            <tr>
                                <td>Year of started business: </td>
                                <td>{dataSet.business_name}</td>
                            </tr>
                            <tr>
                                <td>Location: </td>
                                <td>{dataSet.name}</td>
                            </tr>
                            <tr>
                                <td>Industry: </td>
                                <td>{dataSet.industry}</td>
                            </tr>
                            <tr>
                                <td>Service: </td>
                                <td>{dataSet.service}</td>
                            </tr>
                            <tr>
                                <td>Year Statred: </td>
                                <td>{dataSet.year_started}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div>
                    {/* <Modal show={this.state.showMessageModal} onHide={this.closePopup} >
                        <Modal.Header closeButton>
                            <h2 className="text-center">Contact</h2>
                        </Modal.Header>
                        <Modal.Body className="text-center">
                            <form name="form" onSubmit={this.handleRequest} >
                                <div className="row control-group">
                                    <div className={'form-group col-xs-12 floating-label-form-group controls'} >
                                        <label>Message</label>
                                        <textarea rows="3" className="form-control" placeholder="Write your queries" name="message" value={this.state.message} onChange={this.handleUserInput} />
                                    </div>
                                    <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'message' }} />
                                </div>
                                <div className="row">
                                    <div className="form-group col-xs-12">
                                        <button className="btn btn-success btn-lg" >Submit
                                            <i className="icon icon-arrow" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.closePopup}>Close X</Button>
                        </Modal.Footer>
                    </Modal> */}
                </div>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailServicePage));
// export default LoginPage;
