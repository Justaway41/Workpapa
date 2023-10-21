import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../../../actions';
// import ServiceApi from '../../../api/serviceApi';

import officeSpace from '../data/office-space.json';

// var Constant = require('../../helpers/constant');
// console.log(Constant.Globals.API);

class ListServicePage extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
    }

    componentDidMount() {
        console.log(this.props);
        // this.getServiceData();
    }
    initialize = () => ({
        // dataSet: []
    })
    // getServiceData = () => {
    //     const params = {
    //         serviceId: this.props.serviceId,
    //         categoryId: this.props.categoryId
    //     };
    //     ServiceApi.getService(params)
    //         .then((result) => {
    //             if (result.status === 'Success') {
    //                 this.setState({ dataSet: result.data });
    //             }
    //         });
    // }

    getCategoryName = categoryId => officeSpace.serviceCategory.find(data => data.code === categoryId);

    contactRequest = (serviceId) => {
        this.props.contactRequest(serviceId);
    }
    render() {
        if (this.props.dataSet.length === 0) {
            return null;
        }
        return (
            <div>
                <div className="container" style={{ marginBottom: '40px' }}>
                    <div className="row" style={{ marginTop: '20px' }}>
                        <div className="col-md-8 col-md-offset-2">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Business Name</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Industry</th>
                                        <th scope="col">Service</th>
                                        <th scope="col">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.dataSet.length > 0 && this.props.dataSet.map(ele =>
                                        (
                                            <tr key={`service-${ele.id_service}`}>
                                                <td><Link to={`/services/detail/${ele.id_service}`}>{ele.business_name}</Link></td>
                                                <td>{this.getCategoryName(ele.id_category).name}</td>
                                                <td>{ele.industry}</td>
                                                <td>{ele.service}</td>
                                                <td>${ele.price}</td>
                                                <td>
                                                    {Object.keys(this.props.profile).length &&
                                                        <button
                                                            className="btn btn-success"
                                                            onClick={() => this.contactRequest(ele.id_service)}
                                                        >Contact
                                                        </button>
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListServicePage));
// export default LoginPage;
