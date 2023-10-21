import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Table } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import Util from '../../helpers/util.class';

import addonData from '../../data/product/addon.json';
import packageData from '../../data/product/packages.json';

import ScrollToTop from '../../components/scrolltotop/scrolltotop';
import Steps from '../../components/steps/steps';
import ResumeProcess from '../../components/resumeprocess/resumeprocess';
import FAQ from '../../components/faq/faq';
import Globals from '../../helpers/constant';

class ProductServiceMenuPage extends Component {
    constructor(props) {
        super(props);
        this.productType = this.props.match.params.type;
        // import('../../data/product/addon.json')
        //     .then((addonData) => {
        //         this.addonData = JSON.parse(JSON.stringify(addonData));
        //     });
        this.setSelected = this.setSelected.bind(this);
        this.addonData = [];
        if (addonData[this.productType]) {
            this.addonData = JSON.parse(JSON.stringify(addonData[this.productType]));
        }
        this.packageData = JSON.parse(JSON.stringify(packageData.packages[this.productType]));
        this.state = this.initialize();

        // this.packagePrice = this.props.packages;
        // let storePackage = Util.getDataFromSessionStorage('package');
        // if(!!storePackage){
        //     this.state.addonData.forEach(element => {
        //         element.items.forEach(ele => {
        //             if(storePackage.addon.indexOf(ele.id) !== -1){
        //                 ele.selected = true
        //                 this.state.totalPrice += ele.price;
        //             }
        //         });
        //     });
        // }
        // console.log(this.props.match.params)
    }
    componentDidMount() {
        if (this.props.geo.hasOwnProperty('countryCode')) {
            this.updateState(this.props);
        }
    }
    componentWillReceiveProps(nextProps) {
        this.addonData = JSON.parse(JSON.stringify(nextProps.addonData));
        this.updateState(nextProps);
    }
    initialize = () => {
        // console.log(this.props);
        const packageCode = this.props.match.params.package;
        // let experienceCode = '';
        // if (this.props.match.params.experience) {
        //     experienceCode = this.props.match.params.experience;
        // }
        const totalPrice = 0;
        // const storePackage = Util.getDataFromSessionStorage('package');
        // if (storePackage) {
        //     this.props.addonData.forEach((element) => {
        //         element.items.forEach((ele) => {
        //             if (storePackage.addon.indexOf(ele.id) !== -1) {
        //                 ele.selected = true;
        //                 totalPrice += ele.price;
        //             }
        //         });
        //     });
        //     packageCode = storePackage.base;
        //     experienceCode = storePackage.experience;
        // }
        return {
            showModal: true,
            resumeText: 'Resume',
            currency: (!this.props.geo.currencyCode) ? '$' : Util.currency(this.props.geo.currencyCode),
            currencyCode: (!this.props.geo.currencyCode) ? 'USD' : this.props.geo.currencyCode,
            conversionRate: (!this.props.geo.currencyConverter) ? 1 : this.props.geo.currencyConverter,
            selPackage: this.packageData[packageCode], // packageData.product.service[this.props.match.params.package],
            // selExperience: experienceCode === '' ? {} : this.packageData.service.experience[experienceCode],
            addonData: JSON.parse(JSON.stringify(this.addonData)),
            totalPrice, // this.props.packages.product[this.props.match.params.package][this.props.match.params.experience]
            pendingResume: 0,

        };
    }
    updateState = (props) => {
        // this.setState({currency: Util.currency(props.geo.currencyCode)});
        // console.log(props.packageData.service.product);
        if (props.packages.basic) {
            this.setState({
                resumeText: Util.getResumeTxt(props.geo.currencyCode),
                currency: Util.currency(props.geo.currencyCode),
                conversionRate: props.geo.currencyConverter,
                currencyCode: props.geo.currencyCode,
                // pendingResume: props.site.pendingResume,

            });
        }
        // if(!!Object.keys(props.packageData).length){
        //     this.setState(
        //             {
        //                 selPackage: props.packageData.service.product[this.props.match.params.package],
        //             }
        //         );
        // }
    }
    resetAddon() {
        this.setState({ addonData: JSON.parse(JSON.stringify(this.addonData)) });
    }
    calTotal(totalPrice, price, selected) {
        if (!selected) {
            totalPrice += price;
        } else {
            totalPrice -= price;
        }
        return totalPrice;
    }
    setSelected(data, selected) {
        let totalPrice = this.state.totalPrice;

        data.forEach((element) => {
            if (element.radio === true) {
                if (element.id === selected) {
                    totalPrice = this.calTotal(totalPrice, element.price, false);
                    element.selected = true;
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
    // setSelectedExperience(selected) {
    //     this.setState({ selExperience: selected === '' ? {} : this.packageData.packages.experience[selected] });
    // }
    setSelectedPackage(selected) {
        this.setState({ totalPrice: 0, selPackage: this.packageData[selected] });
        this.resetAddon();
    }
    moveNext() {
        const storePackage = Util.getDataFromSessionStorage('package');
        let template = {};
        if (storePackage) {
            template = storePackage.template;
        }
        const packageSelected = {
            base: this.state.selPackage.code,
            totalPrice: parseInt(this.packageData[this.state.selPackage.code].price, 10) + this.state.totalPrice,
            template,
            addon: []
        };
        // let addon = [];
        this.state.addonData.forEach((element) => {
            element.items.forEach((ele) => {
                if (ele.selected) {
                    packageSelected.addon.push(ele.id);
                }
            });
        });
        Util.setDataToSessionStorage('package', packageSelected);
        this.props.history.push(`/product/checkout/${this.productType}`);
        // this.router.navigate(['payment/service', this.props.match.params.package,0]);
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
                stepDesc: 'Customise CV',
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
        // if (!Object.keys(this.props.packages.product).length && !Object.keys(this.props.packageData).length && !Object.keys(this.props.addonData).length) {
        //     return (
        //         <div></div>
        //     );
        // }
        return (
            <div>
                <ScrollToTop />
                {/* <HeaderPayment /> */}
                <Helmet>
                    <title>WorkPapa | Select Package and Addon for you Order </title>
                </Helmet>
                <div className="top-spacer">
                    <div className="container">
                        <Steps stepData={this.stepData()} />
                        <div className="col-lg-8">
                            {/* {this.state.pendingResume && this.state.pendingResume < Globals.site.FAST_SERVICE_RESUME_LIMIT &&
                                (
                                    <div className="row">
                                        <div className="col-lg-12 " >
                                            <h4>2 day delivery (48 hours)</h4>
                                        </div>
                                    </div>
                                )
                            } */}
                            {/* <div className="row">
                                <div className="col-xs-6 " >
                                    <h3>Select Experience level</h3>
                                </div>
                                <div className="col-xs-6 " style={{ paddingTop: '15px' }}>
                                    <select className="form-control" value={this.state.selExperience.code} onChange={(e) => { this.setSelectedExperience(e.target.value); }} >
                                        <option value="" >Select Experience Level</option>
                                        {Object.keys(this.props.packageData.service.experience).map(dat =>
                                            <option key={dat} value={dat} >{this.props.packageData.service.experience[dat].name} ({this.props.packageData.service.experience[dat].description})</option>)}
                                    </select>
                                </div>
                            </div> */}
                            {/* {this.state.selExperience.code && */}
                            <div>
                                <div className="row">
                                    <div className="col-lg-12 " >
                                        <h3>SELECT SERVICE</h3>
                                        <Table striped bordered condensed>
                                            <tbody>
                                                {!!Object.keys(this.packageData).length && Object.keys(this.packageData).map(item =>
                                                    (
                                                        <tr key={item} onClick={() => { this.setSelectedPackage(item); }} >
                                                            <td style={{ cursor: 'pointer' }} className={this.state.selPackage.code === item ? 'bg-success' : ''}>
                                                                <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                                                    <p className="small">
                                                                        <input type="radio" name="service" disabled={false} readOnly checked={this.state.selPackage.code === item} value={this.packageData[item].code} />
                                                &nbsp;{this.packageData[item].name} {this.packageData[item].description ? ReactHtmlParser(`<small><i>(${this.packageData[item].description})</i></small>`) : ''} - {Util.currency(this.state.currency) + Util.round(this.packageData[item].price * this.state.conversionRate)}
                                                                    </p>
                                                                </div>
                                                                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 text-right">
                                                                    {this.state.selPackage.code === item ? Util.currency(this.state.currency) + Util.round(this.packageData[item].price * this.state.conversionRate) : ''}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </Table>
                                    </div>


                                    <div className="col-lg-12 " >
                                        {!!Object.keys(this.state.addonData).length &&
                                        (
                                            <div>
                                                <h3>RESUME REWRITING DETAILS</h3>
                                                {!!Object.keys(this.state.addonData).length && this.state.addonData.filter(dat => dat.packages.indexOf(this.state.selPackage.code) !== -1).map((dat, i) =>
                                                    (
                                                        <Table striped bordered condensed key={dat.title} >
                                                            <thead>
                                                                <tr>
                                                                    <td>
                                                                        <h4>
                                                                            {/* <i className={`${dat.icon} fa-lg`} /> */}
                                                                            <img rel="preload" src={`${Globals.publicUrl}/assets/images/svg/${dat.icon}`} className="img-responsive img-centered pull-left" alt="" width="30px" height="30px" />
                                                                            {ReactHtmlParser(dat.title)}
                                                                        </h4>
                                                                    </td>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {!!dat.type &&
                                                            <tr>
                                                                <td>
                                                                    <div>
                                                                        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                                                            <select className="form-control" onChange={(e) => { this.setSelected(dat.items, parseInt(e.target.value, 10), i); }} >
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
                                                                        <tr key={item.id}>
                                                                            <td>
                                                                                <div >
                                                                                    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                                                                        <p className="small">
                                                                                            {!!item.radio &&
                                                                                        <input type="radio" name={dat.name} disabled={item.selected} defaultChecked={item.selected} onClick={() => { this.setSelected(dat.items, item.id, i); }} value={item.id} />
                                                                                            }
                                                                                            {!item.radio &&
                                                                                        <input type="checkbox" name="cv" disabled={item.price === 0} defaultChecked={item.selected} onClick={() => { this.setSelected(dat.items, item.id, i); }} />
                                                                                            }
                                                                                    &nbsp;{item.label} {item.description ? ReactHtmlParser(`<small><i>(${item.description})</i></small>`) : ''} - {Util.currency(this.state.currency)}{Util.round((item.price) * this.state.conversionRate)}
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
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                            <h3>Total</h3>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 text-right">
                                            <h3>
                                                {Util.showPrice(parseInt(this.packageData[this.state.selPackage.code].price, 10) + this.state.totalPrice, this.state.conversionRate, this.state.currency, this.state.currencyCode)}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="col-lg-4 col-md-4 col-md-offset-4 col-sm-3 col-xs-12">
                                            <button style={{ width: '100%' }} className="btn btn-danger btn-lg" onClick={() => { this.moveNext(); }}>Next <i className="fa fa-arrow-right" aria-hidden="true" /></button> <br /><br />
                                        </div>
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
                                    {!!Object.keys(this.packageData).length && Object.keys(this.packageData).filter(item => this.state.selPackage.code === item).map(item =>
                                        (
                                            <li key={this.packageData[item].name}>
                                                <small>{this.packageData[item].name}</small>
                                            </li>
                                        ))}
                                    {!!Object.keys(this.addonData).length && this.addonData.filter(dat => dat.packages.indexOf(this.state.selPackage.code) !== -1).map(dat =>
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
            </div>
        );
    }
}

// PaymentServiceMenuPage.defaultProps = {
//     packageData: {}
// };
// function mapStateToProps(state, ownProps) {
//     return {
//       geo: state.location,
//       packages: state.packages
//     };
// }

export default ProductServiceMenuPage;
// export default withRouter(connect(mapStateToProps)(PaymentAddonPage));
