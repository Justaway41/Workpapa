import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions';
// import Auth from '../../../helpers/auth.class';
import ServiceApi from '../../../api/serviceApi';
import FormErrors from '../../../components/formerror/formerror';
import ScrollToTop from '../../../components/scrolltotop/scrolltotop';
import SiteApi from '../../../api/siteApi';
import officeSpace from '../data/office-space.json';

// var Constant = require('../../helpers/constant');
// console.log(Constant.Globals.API);

class CreateOfficeSpacePage extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
        console.log(props);
    }

    componentDidMount() {
        SiteApi.getSiteLocation()
            .then((response) => {
                if (response.status === 'Success') {
                    this.setState({ locationData: response.data });
                }
            });
    }

    initialize = () => ({
        locationData: [],
        category: '',
        address: '',
        type: '',
        price: '',
        locationType: '',
        priceUnit: 'per-hour',
        city: '',
        businessName: '',
        yearStarted: '',
        formErrors: {
            category: '', address: '', type: '', price: '', locationType: '', city: '', businessName: '', yearStarted: ''
        },
        categoryValid: false,
        addressValid: false,
        typeValid: false,
        priceValid: false,
        locationTypeValid: false,
        businessNameValid: false,
        yearStartedValid: false,
        cityValid: false,
        msg: '',
        loader: false,
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
        let categoryValid = this.state.categoryValid;
        let addressValid = this.state.addressValid;
        let typeValid = this.state.typeValid;
        let priceValid = this.state.priceValid;
        let locationTypeValid = this.state.locationTypeValid;
        let cityValid = this.state.cityValid;
        let businessNameValid = this.state.businessNameValid;
        let yearStartedValid = this.state.yearStartedValid;

        switch (fieldName) {
        case 'category':
            categoryValid = value.length > 0;
            fieldValidationErrors.name = categoryValid ? '' : ' is invalid';
            break;
        case 'address':
            addressValid = value.length > 0;
            fieldValidationErrors.name = addressValid ? '' : ' is invalid';
            break;
        case 'type':
            typeValid = value.length > 0;
            fieldValidationErrors.name = typeValid ? '' : ' is invalid';
            break;
        case 'price':
            priceValid = value.length > 0;
            fieldValidationErrors.name = priceValid ? '' : ' is invalid';
            break;
        case 'locationType':
            locationTypeValid = value.length > 0;
            fieldValidationErrors.name = locationTypeValid ? '' : ' is invalid';
            break;
        case 'city':
            cityValid = value.length > 0;
            fieldValidationErrors.name = cityValid ? '' : ' is invalid';
            break;
        case 'businessName':
            businessNameValid = value.length > 0;
            fieldValidationErrors.name = businessNameValid ? '' : ' is invalid';
            break;
        case 'yearStarted':
            yearStartedValid = value.length > 0;
            fieldValidationErrors.name = yearStartedValid ? '' : ' is invalid';
            break;
        default:
            break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            categoryValid,
            addressValid,
            typeValid,
            priceValid,
            locationTypeValid,
            cityValid,
            businessNameValid,
            yearStartedValid,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.categoryValid && this.state.addressValid && this.state.typeValid && this.state.priceValid && this.state.locationTypeValid && this.state.cityValid && this.state.businessNameValid && this.state.yearStartedValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleContactRequest = (e) => {
        e.preventDefault();
        this.setState({ loader: true });
        const formData = new FormData();

        formData.append('writerId', this.props.profile.id_writer);
        formData.append('category', this.state.category);
        formData.append('address', this.state.address);
        formData.append('city', this.state.city);
        formData.append('type', this.state.type);
        formData.append('price', this.state.price);
        formData.append('priceUnit', this.state.priceUnit);
        formData.append('locationType', this.state.locationType);
        formData.append('businessName', this.state.businessName);
        formData.append('yearStarted', this.state.yearStarted);

        this.props.actions.toggleLoader(1);
        ServiceApi.createOfficeSpace(formData)
            .then((response) => {
                // console.log(response);
                if (response.status === 'Success') {
                    this.props.actions.toggleLoader(-1);
                    this.setState({ loader: false });
                    this.props.history.push('/services/searchservice');
                } else {
                    this.props.actions.toggleLoader(-1);
                    this.setState({ msg: response.msg, loader: false });
                }
            })
            .catch((error) => {
                this.props.actions.toggleLoader(-1);
                this.setState({ msg: error, loader: false });
                // console.log(error);
            });

        return false;
    }

    render() {
        if (Object.keys(this.props.profile).length === 0) {
            return null;
        }
        return (
            <div>
                <Helmet>
                    <title>WorkPapa | Service</title>
                </Helmet>
                <ScrollToTop />

                <div className="top-spacer" >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2>List your office space</h2>
                                <hr className="star-primary" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-md-offset-1">
                                <form name="form" onSubmit={this.handleContactRequest} >
                                    <div className="row control-group">
                                        <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.category)}`} >
                                            <label htmlFor="category">
                                                Select the category?
                                            </label>
                                            <select className="form-control" name="category" value={this.state.category} onChange={this.handleUserInput} >
                                                <option value="" >Select Category</option>
                                                {officeSpace.officeCategory.map(dat =>
                                                    <option key={dat.code} value={dat.code} >{dat.name}</option>)
                                                }
                                            </select>
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'category' }} />
                                    </div>
                                    <div className="row control-group">
                                        <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.address)}`} >
                                            <label htmlFor="address">
                                                Address
                                            </label>
                                            <input type="text" className="form-control" placeholder="Address" name="address" value={this.state.address} onChange={this.handleUserInput} />
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'address' }} />
                                    </div>
                                    <div className="row control-group">
                                        <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.city)}`} >
                                            <label htmlFor="city">
                                                Location
                                            </label>
                                            <select className="form-control" name="city" value={this.state.city} onChange={this.handleUserInput} >
                                                <option value="" >Select Location</option>
                                                {this.state.locationData.map(dat =>
                                                    <option key={dat.id_location} value={dat.id_location} >{dat.name}</option>)
                                                }
                                            </select>
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'city' }} />
                                    </div>
                                    <div className="row control-group" >
                                        <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.type)}`} >
                                            <label htmlFor="type">Office Type</label>
                                            <select className="form-control" name="type" value={this.state.type} onChange={this.handleUserInput} >
                                                <option value="" >Select Type</option>
                                                {officeSpace.officeType.map(dat =>
                                                    <option key={dat.code} value={dat.code} >{dat.name}</option>)
                                                }
                                            </select>
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'type' }} />
                                    </div>
                                    <div className="row control-group" >
                                        <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.price)}`} >
                                            <label>Price</label>
                                            <input type="text" className="form-control" style={{ width: '200px', float: 'left' }} placeholder="Price" name="price" value={this.state.price} onChange={this.handleUserInput} />
                                            <select className="form-control" style={{ width: '200px', float: 'left' }} name="priceUnit" value={this.state.priceUnit} onChange={this.handleUserInput} >
                                                {officeSpace.officePricingUnit.map(dat =>
                                                    <option key={dat.code} value={dat.code} >{dat.name}</option>)
                                                }
                                            </select>
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'price' }} />
                                    </div>
                                    <div className="row control-group" >
                                        <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.businessName)}`} >
                                            <label htmlFor="businessName">Business Name</label>
                                            <input type="text" className="form-control" placeholder="Business Name" name="businessName" value={this.state.businessName} onChange={this.handleUserInput} />
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'businessName' }} />
                                    </div>
                                    <div className="row control-group" >
                                        <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.yearStarted)}`} >
                                            <label htmlFor="yearStarted">Year of started business</label>
                                            <input type="text" className="form-control" placeholder="Start year" name="yearStarted" value={this.state.yearStarted} onChange={this.handleUserInput} />
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'yearStarted' }} />
                                    </div>
                                    <div className="row control-group" >
                                        <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.locationType)}`} >
                                            <label>Location Type</label>
                                            {/* <input type="text" className="form-control" placeholder="location" name="location" value={this.state.location} onChange={this.handleUserInput} /> */}
                                            <select className="form-control" name="locationType" value={this.state.locationType} onChange={this.handleUserInput} >
                                                <option value="" >Select Location Type</option>
                                                {officeSpace.officeLocationType.map(dat =>
                                                    <option key={dat.code} value={dat.code} >{dat.name}</option>)
                                                }
                                            </select>
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'locationType' }} />
                                    </div>
                                    {this.state.msg !== '' &&
                                        <div className="alert alert-danger" >{this.state.msg}</div>
                                    }

                                    <div className="row">
                                        <div className="form-group col-xs-12">
                                            <button className="btn btn-success btn-lg" disabled={!this.state.formValid || this.state.loader}>
                                                Post now
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

function mapStateToProps(state) {
    return {
        loader: state.loader
    };
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateOfficeSpacePage));
// export default LoginPage;
