import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Table } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
// import otherApi from '../../api/otherApi';
import Util from '../../helpers/util.class';

import ScrollToTop from '../../components/scrolltotop/scrolltotop';
import Steps from '../../components/steps/steps';
import ResumeProcess from '../../components/resumeprocess/resumeprocess';
import FAQ from '../../components/faq/faq';
import Globals from '../../helpers/constant';

const deepcopy = require('deepcopy');


class PaymentAddonPage extends Component {
    constructor(props) {
        super(props);
        this.setSelected = this.setSelected.bind(this);
        this.addonData = JSON.parse(JSON.stringify(props.addonData));
        this.state = this.initialize();
    }

    componentDidMount() {
        if (this.props.geo.hasOwnProperty('countryCode')) {
            this.updateState(this.props);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.geo !== nextProps.geo ||
            this.props.addonData !== nextProps.addonData ||
            this.props.site !== nextProps.site) {
            this.updateState(nextProps);
        }
    }

    initialize = () => ({
        showModal: true,
        resumeText: 'Resume',
        currency: (!this.props.geo.currencyCode) ? '$' : Util.currency(this.props.geo.currencyCode),
        currencyCode: (!this.props.geo.currencyCode) ? 'USD' : this.props.geo.currencyCode,
        conversionRate: (!this.props.geo.currencyConverter) ? 1 : this.props.geo.currencyConverter,
        selPackage: this.props.packageData.service.product[this.props.match.params.package], // packageData.product.service[this.props.match.params.package],
        selExperience: this.props.packageData.service.experience[this.props.match.params.experience],
        addonData: JSON.parse(JSON.stringify(this.props.addonData)),
        totalPrice: this.props.packages.product[this.props.match.params.package][this.props.match.params.experience],
        pendingResume: 0,
    })
    updateState = (props) => {
        // this.setState({currency: Util.currency(props.geo.currencyCode)});
        this.setState({
            // addonData: this.addonData,
            // selPackage: selPackage,
            resumeText: Util.getResumeTxt(props.geo.currencyCode),
            currency: Util.currency(props.geo.currencyCode),
            conversionRate: props.geo.currencyConverter,
            currencyCode: props.geo.currencyCode,
            addonData: JSON.parse(JSON.stringify(props.addonData)),
            pendingResume: props.site.pendingResume,
            // totalPrice: packageData.product.service[this.props.match.params.package].price[0].amt
        });
        this.addonData = deepcopy(JSON.parse(JSON.stringify(props.addonData)));
    }

    calTotal(totalPrice, price, selected) {
        if (!selected) {
            totalPrice += price;
        } else {
            totalPrice -= price;
        }
        return totalPrice;
    }

    // setSelected(selected) {
    //     let totalPrice = this.state.totalPrice;
    //     this.state.addonData.forEach((dat) => {
    //         console.log(dat);
    //         dat.items.forEach((element) => {
    //             if (element.id === selected) {
    //                 totalPrice += element.price;
    //             }
    //         });
    //     });
    //     this.setState({ totalPrice });
    // }

    setSelected(data, selected) {
        let totalPrice = this.state.totalPrice;

        data.forEach((element) => {
            if (element.radio === true) {
                if (element.id === selected) {
                    if (element.selected !== true) {
                        totalPrice = this.calTotal(totalPrice, element.price, false);
                        element.selected = true;
                    }
                } else if (element.selected === true) {
                    totalPrice = this.calTotal(totalPrice, element.price, true);
                    element.selected = false;
                }
            } else if (element.id === selected) {
                if (element.selected === true) {
                    totalPrice = this.calTotal(totalPrice, element.price, true);
                    element.selected = false;
                } else {
                    totalPrice = this.calTotal(totalPrice, element.price, false);
                    element.selected = true;
                }
            }
        });
        this.setState({ totalPrice });
    }

    moveNext() {
        const storePackage = Util.getDataFromSessionStorage('package');
        let isError = false;
        let template = {};
        if (storePackage && storePackage.hasOwnProperty('template')) {
            template = storePackage.template;
        }
        let salary;
        if (storePackage && storePackage.hasOwnProperty('salary')) {
            salary = storePackage.salary;
        }
        const packageSelected = {
            base: this.props.match.params.package,
            experience: this.props.match.params.experience,
            totalPrice: this.state.totalPrice,
            template,
            salary,
            addon: []
        };
        const addonData = this.state.addonData;
        addonData.forEach((element) => {
            if (element.required && !isError) {
                isError = true;
            }
            element.items.forEach((ele) => {
                if (ele.selected) {
                    if (element.required && isError) {
                        isError = false;
                    }
                    packageSelected.addon.push(ele.id);
                }
            });
            if (element.required && isError) {
                element.error = true;
            }
        });
        this.setState({ addonData });
        if (!isError) {
            Util.setDataToSessionStorage('package', packageSelected);
            if (this.props.profile && this.props.profile.id_profile) {
                this.props.history.push(`/payment/checkout/${JSON.stringify(packageSelected)}`);
            } else {
                this.props.history.push('/payment/checkout');
            }
            // this.props.history.push(`/payment/addonstep1/${this.props.match.params.package}/${this.props.match.params.experience}`);
        }
    }
    stepData() {
        return [
            {
                stepTxt: 'Step 1',
                stepDesc: 'Select Package',
                status: 'complete'
            },
            {
                stepTxt: 'Step 2',
                stepDesc: 'Cover Letter & More',
                status: 'active'
            },
            {
                stepTxt: 'Step 3',
                stepDesc: 'Billing',
                status: 'disabled'
            },
            {
                stepTxt: 'Step 4',
                stepDesc: 'Confirmation',
                status: 'disabled'
            }
        ];
    }

    render() {
        if (!Object.keys(this.props.packages.product).length && !Object.keys(this.props.packageData).length && !Object.keys(this.props.addonData).length) {
            return (
                <div />
            );
        }
        return (
            <div>
                <ScrollToTop />
                {/* <HeaderPayment /> */}
                <Helmet>
                    <title>WorkPapa | Select Addon for you Order </title>
                </Helmet>
                <div className="top-spacer">
                    <div className="container">
                        <Steps stepData={this.stepData()} />
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                    <h3>{this.props.packageData.service.product[this.props.match.params.package].name} Package</h3>
                                    <p className="small">
                                        <small>{this.props.packageData.service.product[this.props.match.params.package].description.replace(/##RESUMETEXT##/g, this.state.resumeText)}</small>
                                        {this.state.pendingResume && this.state.pendingResume < Globals.site.FAST_SERVICE_RESUME_LIMIT &&
                                            <div>
                                                <br /> Fast 24 - 48 hour delivery
                                            </div>
                                        }
                                    </p>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                    <h3>
                                        {Util.showPrice(this.props.packages.product[this.props.match.params.package][this.props.match.params.experience], this.state.conversionRate, this.state.currency, this.state.currencyCode)}
                                        {/* {this.state.currency}{Util.round(this.state.selPackage.price[0].amt*this.state.conversionRate,2)} */}
                                    </h3>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-lg-12 ">

                                    {!!Object.keys(this.state.addonData).length && this.state.addonData.map((dat, i) =>
                                        (
                                            <Table condensed hover key={dat.title} className="noborder">
                                                <thead>
                                                    <tr style={{ backgroundColor: dat.color }}><td><h4><i className={`${dat.icon} fa-lg`} /> {ReactHtmlParser(dat.title)}</h4></td></tr>
                                                </thead>
                                                <tbody>
                                                    {!!dat.type &&
                                                    <tr>
                                                        <td>
                                                            <div>
                                                                <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                                                    {dat.error &&
                                                                        <div className="alert alert-danger override-msg">
                                                                            Please select one
                                                                            <ScrollToTop />
                                                                        </div>
                                                                    }
                                                                    <select className="form-control" onChange={(e) => { this.setSelected(dat.items, parseInt(e.target.value, 10), i); }} >
                                                                        {dat.required &&
                                                                            <option value="" defaultValue="">Select One</option>
                                                                        }
                                                                        {dat.items.map(item =>
                                                                            <option key={item.id} value={item.id} defaultValue={item.selected}>{item.label} - {Util.currency(this.state.currency)}{Util.round(item.price * this.state.conversionRate)}</option>)}
                                                                    </select>
                                                                </div>
                                                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 text-right">
                                                                    {dat.items.map(item =>
                                                                        (item.selected ? (!item.price ? 'Included' : Util.currency(this.state.currency) + (Util.round(item.price * this.state.conversionRate))) : ''))}
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    }
                                                    {!dat.type && dat.items.map(item =>
                                                        (
                                                            <tr key={item.label}>
                                                                <td>
                                                                    <div>
                                                                        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                                                            <p className="small" onClick={() => { this.setSelected(dat.items, item.id, i); }}>
                                                                                {!!item.radio &&
                                                                                <input type="radio" name={dat.name} disabled={item.selected} checked={item.selected} value={item.id} />
                                                                                }
                                                                                {!item.radio &&
                                                                                <input type="checkbox" name="cv" disabled={item.price === 0} checked={item.selected} />
                                                                                }
                                                                                &nbsp;{item.label} {item.description ? ReactHtmlParser(`<small><i>(${item.description})</i></small>`) : ''} - {Util.currency(this.state.currency)}{Util.round(item.price * this.state.conversionRate)}
                                                                            </p>
                                                                        </div>
                                                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 text-right">
                                                                            {item.selected ? (!item.price ? 'Included' : Util.currency(this.state.currency) + (Util.round(item.price * this.state.conversionRate))) : ''}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </Table>
                                        ))}
                                </div>

                            </div>
                            <div className="row" style={{ borderTop: '2px solid #ccc' }}>
                                <div className="col-lg-12">
                                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                        <h3>Total</h3>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 text-right">
                                        <h3>
                                            {/* {Util.currency(this.state.currency)}{Util.round(this.state.totalPrice*this.state.conversionRate)} */}
                                            {Util.showPrice(this.state.totalPrice, this.state.conversionRate, this.state.currency, this.state.currencyCode)}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="col-lg-4 col-md-4 col-md-offset-4 col-sm-3 col-xs-12">
                                        <a style={{ width: '100%' }} className="btn btn-danger btn-lg" onClick={() => { this.moveNext(); }}>Next <i className="fas fa-arrow-circle-right" aria-hidden="true" /></a> <br /><br />
                                    </div>
                                </div>

                            </div>
                            <ResumeProcess resumeText={this.state.resumeText} />
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <h4> 500 Resumes already created</h4>
                            <div className="card visible-md visible-lg" id="summary_card">
                                <h5>What&apos;s Included In Our Package?</h5>
                                <ul>
                                    {!!Object.keys(this.addonData).length && this.addonData.map(dat =>
                                        (
                                            dat.items.map(item =>
                                                (
                                                    item.selected ? (
                                                        <li><small>{item.label}</small> </li>
                                                    ) : ('')
                                                ))

                                        ))}
                                    <li><small>Work with a writer that understands the local market</small></li>
                                    <li><small>Rewrite/Optimize your summary to achieve your career goal</small></li>
                                    <li><small>Rewrite your job experience(s) to show your true value</small></li>
                                    <li><small>Add numerical proof to your existing experience</small></li>
                                    <li><small>Reshuffling your tasks within each role to show importance</small></li>
                                </ul>
                            </div>


                            <div className="panel panel-default" id="steps">
                                <div className="portfolio-item">
                                    <div className="portfolio-link">
                                        <h4 className="text-center">Our Guarantee!</h4>

                                        <ul style={{ listStyleType: 'none' }}>
                                            <li>Original Writing</li>
                                            <li>100% Satisfaction Guaranteed</li>
                                            <li>Unlimited revisions for 1 week</li>
                                            {/* <li>Ability to finish in 3 days max (also sometimes within 1 day)</li> */}
                                            <li>24 hours a day 7 days a week service</li>
                                            <li>Highly experienced CV/Resume writers who know the local market</li>
                                            <li>Delivered in Microsoft Word and/or PDF format</li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                            <h2 className="text-center">FAQ</h2>
                            <FAQ />
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        );
    }
}

// function mapStateToProps(state, ownProps) {
//     return {
//       geo: state.location,
//       packages: state.packages
//     };
// }

export default PaymentAddonPage;
// export default withRouter(connect(mapStateToProps)(PaymentAddonPage));
