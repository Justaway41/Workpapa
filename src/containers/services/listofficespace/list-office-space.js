import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../../../actions';
import officeSpace from '../data/office-space.json';
// import ServiceApi from '../../../api/serviceApi';

// var Constant = require('../../helpers/constant');
// console.log(Constant.Globals.API);

class ListOfficeSpacePage extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
    }

    componentDidMount() {
        // this.getServiceData();
    }

    initialize = () => ({
        // dataSet: []
    })
    contactRequest = (serviceId) => {
        this.props.contactRequest(serviceId);
    }

    getLocationType = (type) => {
        if (type) {
            return officeSpace.officeLocationType.find(data => data.code === type);
        }
        return '';
    }
    getOfficeType = (type) => {
        if (type) {
            return officeSpace.officeType.find(data => data.code === type);
        }
        return '';
    }

    render() {
        if (this.props.dataSet.length === 0) {
            return null;
        }
        return (
            <div>
                <div className="container" style={{ marginBottom: '40px' }}>
                    <div className="row" style={{ marginTop: '20px' }}>
                        <div className="col-md-10 col-md-offset-1">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Business Name</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Location Type</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.dataSet.length > 0 && this.props.dataSet.map(ele =>
                                        (
                                            <tr key={`office-${ele.id_office_space}`}>
                                                <td><Link to={`/services/office/${ele.id_office_space}`}>{ele.business_name}</Link></td>
                                                <td>{ele.address}, {ele.name}</td>
                                                <td>{this.getLocationType(ele.location_type).name}</td>
                                                <td>{this.getOfficeType(ele.type).name}</td>
                                                <td>${ele.price}{ele.price_unit}</td>
                                                <td>
                                                    {Object.keys(this.props.profile).length &&
                                                    <button
                                                        className="btn btn-success"
                                                        onClick={() => this.contactRequest(ele.id_office_space)}
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListOfficeSpacePage));
// export default LoginPage;
