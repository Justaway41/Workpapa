import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import * as actions from '../../../actions';
import ScrollToTop from '../../../components/scrolltotop/scrolltotop';
import ServiceApi from '../../../api/serviceApi';
import FormErrors from '../../../components/formerror/formerror';

import officeSpace from '../data/office-space.json';

import ListOfficeSpacePage from '../listofficespace/list-office-space';
import ListServicePage from '../listservice/list-service';

// var Constant = require('../../helpers/constant');
// console.log(Constant.Globals.API);

class SearchServicePage extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
        // this.officeRef = createRef();
        // this.serviceRef = createRef();
    }

    initialize = () => ({
        serviceId: '',
        categoryId: '',
        categoryList: [],
        dataSet: [],
        showMessageModal: false,
        message: '',
        productId: ''
    })
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
        if (name === 'serviceId') {
            this.getServiceCategory(value);
        }
    }
    searchService = () => {
        this.getServiceData();
        // this.serviceRef.current.getServiceData();
    }
    getServiceData = () => {
        const params = {
            serviceId: this.state.serviceId,
            categoryId: this.state.categoryId
        };
        ServiceApi.getService(params)
            .then((result) => {
                if (result.status === 'Success') {
                    this.setState({ dataSet: result.data });
                }
            });
    }
    closePopup = () => {
        this.setState({ showMessageModal: false, productId: '' });
    }

    getServiceCategory = (serviceId) => {
        let category = [];
        if (serviceId === '1') {
            category = officeSpace.serviceCategory;
        } else if (serviceId === '2') {
            category = officeSpace.officeCategory;
        }
        this.setState({
            categoryList: category
        });
        // return category;
    }
    onServiceSelection = (e) => {
        this.handleUserInput(e);
        this.setState({ dataSet: [] });
    }
    handleRequest = (e) => {
        e.preventDefault();
        this.props.actions.toggleLoader(1);
        const request = {
            writerId: this.props.profile.id_writer,
            serviceId: this.state.serviceId,
            productId: this.state.productId,
            message: this.state.message
        };
        ServiceApi.sendUserMessage(request)
            .then((response) => {
                if (response.status === 'Success') {
                    // this.setState({
                    //     error: '', message: '', loader: false, msg: 'Message has sent successfully'
                    // });
                    this.closePopup();
                } else {
                    // this.setState({ msg: '', loader: false, error: response.msg });
                }
                this.props.actions.toggleLoader(-1);
            });
        return false;
    }
    contactRequest = (productId) => {
        this.setState({ showMessageModal: true, productId });
    }
    render() {
        return (
            <div className="top-spacer" >
                <Helmet>
                    <title>WorkPapa | Dashboard</title>
                </Helmet>
                <ScrollToTop />

                <div className="container" style={{ marginBottom: '40px' }}>
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2>Service</h2>
                            <hr className="star-primary" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-md-offset-2 text-center">
                            <select className="form-control" name="serviceId" value={this.state.serviceId} onChange={e => this.onServiceSelection(e)} >
                                <option value="" >Select Service</option>
                                {officeSpace.serviceList.map(dat =>
                                    <option key={dat.code} value={dat.code} >{dat.name}</option>)
                                }
                            </select>
                        </div>
                        {this.state.categoryList.length > 0 &&
                        <div className="col-lg-4 text-center">
                            <select className="form-control" name="categoryId" value={this.state.categoryId} onChange={this.handleUserInput} >
                                <option value="" >Select Category</option>
                                {this.state.categoryList.map(dat =>
                                    <option key={dat.code} value={dat.code} >{dat.name}</option>)
                                }
                            </select>
                        </div>
                        }
                        <button className="btn btn-success" onClick={this.searchService}>
                            Search
                        </button>
                    </div>
                    { this.state.serviceId === '1' &&
                        <ListServicePage {...this.props} contactRequest={this.contactRequest} dataSet={this.state.dataSet} serviceId={this.state.serviceId} categoryId={this.state.categoryId} />
                    }
                    { this.state.serviceId === '2' &&
                        <ListOfficeSpacePage {...this.props} contactRequest={this.contactRequest} dataSet={this.state.dataSet} serviceId={this.state.serviceId} categoryId={this.state.categoryId} />
                    }
                </div>
                <div>
                    <Modal show={this.state.showMessageModal} onHide={this.closePopup} >
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
                    </Modal>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchServicePage));
// export default LoginPage;
