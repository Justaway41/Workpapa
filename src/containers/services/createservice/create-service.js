import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions';
// import Auth from '../../../helpers/auth.class';
import ServiceApi from '../../../api/serviceApi';
import SiteApi from '../../../api/siteApi';
import FormErrors from '../../../components/formerror/formerror';
import ScrollToTop from '../../../components/scrolltotop/scrolltotop';

import officeSpace from '../data/office-space.json';

// var Constant = require('../../helpers/constant');
// console.log(Constant.Globals.API);

class CreateServicePage extends Component {
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
        industry: '',
        service: '',
        price: '',
        priceUnit: 'per-hour',
        businessName: '',
        yearStarted: '',
        location: '',
        formErrors: {
            category: '', industry: '', service: '', price: '', businessName: '', yearStarted: '', location: ''
        },
        categoryValid: false,
        industryValid: false,
        serviceValid: false,
        priceValid: false,
        businessNameValid: false,
        yearStartedValid: false,
        locationValid: false,
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
        let industryValid = this.state.industryValid;
        let serviceValid = this.state.serviceValid;
        let priceValid = this.state.priceValid;
        let businessNameValid = this.state.businessNameValid;
        let yearStartedValid = this.state.yearStartedValid;
        let locationValid = this.state.locationValid;

        switch (fieldName) {
        case 'category':
            categoryValid = value.length > 0;
            fieldValidationErrors.name = categoryValid ? '' : ' is invalid';
            break;
        case 'industry':
            industryValid = value.length > 0;
            fieldValidationErrors.name = industryValid ? '' : ' is invalid';
            break;
        case 'service':
            serviceValid = value.length > 0;
            fieldValidationErrors.name = serviceValid ? '' : ' is invalid';
            break;
        case 'price':
            priceValid = value.length > 0;
            fieldValidationErrors.name = priceValid ? '' : ' is invalid';
            break;
        case 'businessName':
            businessNameValid = value.length > 0;
            fieldValidationErrors.name = businessNameValid ? '' : ' is invalid';
            break;
        case 'yearStarted':
            yearStartedValid = value.length > 0;
            fieldValidationErrors.name = yearStartedValid ? '' : ' is invalid';
            break;
        case 'location':
            locationValid = value.length > 0;
            fieldValidationErrors.name = locationValid ? '' : ' is invalid';
            break;
        default:
            break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            categoryValid,
            industryValid,
            serviceValid,
            priceValid,
            businessNameValid,
            yearStartedValid,
            locationValid,
        }, this.validateForm);
    }

    validateForm() {
        console.log(this.state.categoryValid, this.state.industryValid, this.state.serviceValid, this.state.priceValid);
        this.setState({ formValid: this.state.categoryValid && this.state.industryValid && this.state.serviceValid && this.state.priceValid && this.state.businessNameValid && this.state.yearStartedValid && this.state.locationValid });
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
        formData.append('industry', this.state.industry);
        formData.append('service', this.state.service);
        formData.append('price', this.state.price);
        formData.append('priceUnit', this.state.priceUnit);
        formData.append('businessName', this.state.businessName);
        formData.append('yearStarted', this.state.yearStarted);
        formData.append('location', this.state.location);

        this.props.actions.toggleLoader(1);
        ServiceApi.createService(formData)
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
            <section id="about">
                <Helmet>
                    <title>WorkPapa | Service</title>
                </Helmet>
                <ScrollToTop />

                <div className="top-spacer" >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2>Post your services & products</h2>
                                <hr className="star-primary" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-md-offset-1">
                                <form name="form" onSubmit={this.handleContactRequest} >
                                    <h3>Profile Details</h3>
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
                                        <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.location)}`} >
                                            <label htmlFor="location">Location</label>
                                            {/* <input type="text" className="form-control" placeholder="Location" name="location" value={this.state.location} onChange={this.handleUserInput} /> */}
                                            <select className="form-control" name="location" value={this.state.location} onChange={this.handleUserInput} >
                                                <option value="" >Select Location</option>
                                                {this.state.locationData.map(dat =>
                                                    <option key={dat.id_location} value={dat.id_location} >{dat.name}</option>)
                                                }
                                            </select>
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'location' }} />
                                    </div>
                                    <h3>Service Details</h3>
                                    <div className="row control-group">
                                        <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.category)}`} >
                                            <label htmlFor="category">
                                                Select the category?
                                            </label>
                                            <select className="form-control" name="category" value={this.state.type} onChange={this.handleUserInput} >
                                                <option value="" >Select Category</option>
                                                {officeSpace.serviceCategory.map(dat =>
                                                    <option key={dat.code} value={dat.code} >{dat.name}</option>)
                                                }
                                            </select>
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'category' }} />
                                    </div>
                                    <div className="row control-group">
                                        <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.industry)}`} >
                                            <label htmlFor="industry">
                                                What types of jobs/industries have you worked in?
                                            </label>
                                            <input type="text" className="form-control" placeholder="Industry" name="industry" value={this.state.industry} onChange={this.handleUserInput} />
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'industry' }} />
                                    </div>
                                    <div className="row control-group" >
                                        <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.service)}`} >
                                            <label htmlFor="email">What services can you provide?</label>
                                            <input type="text" className="form-control" placeholder="Service" name="service" value={this.state.service} onChange={this.handleUserInput} />
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'service' }} />
                                    </div>
                                    <div className="row control-group" >
                                        <div className={`form-group col-xs-12 controls ${this.errorClass(this.state.formErrors.price)}`} >
                                            <label>What are the prices you would charge for each service? </label>
                                            <input type="text" className="form-control" style={{ width: '200px', float: 'left' }} placeholder="Price" name="price" value={this.state.price} onChange={this.handleUserInput} />
                                            <select className="form-control" style={{ width: '200px', float: 'left' }} name="priceUnit" value={this.state.priceUnit} onChange={this.handleUserInput} >
                                                {officeSpace.servicePricingUnit.map(dat =>
                                                    <option key={dat.code} value={dat.code} >{dat.name}</option>)
                                                }
                                            </select>
                                        </div>
                                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'price' }} />
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
            </section>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateServicePage));
// export default LoginPage;
