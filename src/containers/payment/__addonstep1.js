import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Table } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import Util from '../../helpers/util.class';

// import addonData from '../../data/addon.json';
import packageData from '../../data/packages.json';

import ScrollToTop from '../../components/scrolltotop/scrolltotop';
import Steps from '../../components/steps/steps';
import ResumeProcess from '../../components/resumeprocess/resumeprocess';
import FAQ from '../../components/faq/faq';

class PaymentAddonStep1Page extends Component {
    constructor(props) {
        super(props);
        this.setSelected = this.setSelected.bind(this);
        // this.addonData = {};//JSON.parse(JSON.stringify(addonData));
        this.addonData = JSON.parse(JSON.stringify(props.addonData));
        this.state = this.initialize();

        // console.log(this.props.match.params)
    }

    componentDidMount() {
        if (this.props.geo.hasOwnProperty('countryCode')) {
            this.updateState(this.props);
        }
    }
    componentWillReceiveProps(nextProps) {
        // if(this.props.geo !== nextProps.geo){
        this.updateState(nextProps);
        // }
    }

    initialize = () => {
        const storePackage = Util.getDataFromSessionStorage('package');
        let totalPrice = 0;
        if (Object.keys(this.props.addonData).length) {
            if (storePackage) {
                this.props.addonData.filter(items => items.step !== 2).forEach((element) => {
                    element.items.forEach((ele) => {
                        if (storePackage.addon.indexOf(ele.id) !== -1) {
                            ele.selected = true;
                            totalPrice += ele.price;
                        }
                    });
                });
            }
            // this.setState(
            //     {
            //         addonData: JSON.parse(JSON.stringify(props.addonData))
            //     }
            // );
        }
        return {
            showModal: true,
            resumeText: 'Resume',
            currency: (!this.props.geo.currencyCode) ? '$' : Util.currency(this.props.geo.currencyCode),
            currencyCode: (!this.props.geo.currencyCode) ? 'USD' : this.props.geo.currencyCode,
            conversionRate: (!this.props.geo.currencyConverter) ? 1 : this.props.geo.currencyConverter,
            selPackage: packageData.product.service[this.props.match.params.package],
            addonData: this.props.addonData,
            totalPrice: totalPrice + this.props.packages.product[this.props.match.params.package][this.props.match.params.experience]// packageData.product.service[this.props.match.params.package].price[0].amt
        };
    }
    updateState = (props) => {
        // this.setState({currency: Util.currency(props.geo.currencyCode)});

        if (props.packages.basic) {
            this.setState({
                resumeText: Util.getResumeTxt(props.geo.currencyCode),
                currency: Util.currency(props.geo.currencyCode),
                conversionRate: props.geo.currencyConverter,
                currencyCode: props.geo.currencyCode,
                // addonData: JSON.parse(JSON.stringify(props.addonData))
                // totalPrice: packageData.product.service[this.props.match.params.package].price[0].amt
            });

            // console.log(this.state.addonData)
        }
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
        // console.log(data);
        // let addonData = this.state.addonData;
        // addonData[index].items = data;
        // this.setState({addonData: addonData});
        this.setState({ totalPrice });
    }
    moveNext() {
        const storePackage = Util.getDataFromSessionStorage('package');
        let template = {};
        if (storePackage) {
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
        const addon = [];
        this.state.addonData.filter(item => item.step === 2).forEach((element) => {
            element.items.forEach((ele) => {
                const ind = storePackage.addon.indexOf(ele.id);
                if (ind !== -1) {
                    storePackage.addon.splice(ind, 1);
                }
                if (ele.selected) {
                    addon.push(ele.id);
                }
            });
        });
        // console.log(addon);
        // var arr = storePackage.addon.concat(addon);
        packageSelected.addon = storePackage.addon.concat(addon).filter((elem, index, self) => index === self.indexOf(elem));
        Util.setDataToSessionStorage('package', packageSelected);
        if (this.props.profile && this.props.profile.id_profile) {
            this.props.history.push(`/payment/checkout/${JSON.stringify(packageSelected)}`);
        } else {
            this.props.history.push('/payment/checkout');
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
                stepDesc: 'Customise CV',
                status: 'complete'
            },
            {
                stepTxt: 'Step 3',
                stepDesc: 'Cover Letter & More',
                status: 'active'
            },
            {
                stepTxt: 'Step 4',
                stepDesc: 'Billing',
                status: 'disabled'
            },
            {
                stepTxt: 'Step 5',
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
                <Helmet>
                    <title>WorkPapa | Select Addon for you Order </title>
                </Helmet>
                <div className="top-spacer">
                    <div className="container">
                        <Steps stepData={this.stepData()} />
                        <div className="col-lg-8">

                            <div className="row">
                                <div className="col-lg-12 ">

                                    {!!Object.keys(this.state.addonData).length && this.state.addonData.filter(items => items.step === 2).map((dat, i) =>
                                        (
                                            <Table striped bordered condensed key={dat.title}>
                                                <thead><tr><td><h3><i className={`${dat.icon} fa-lg`} /> {ReactHtmlParser(dat.title)}</h3></td></tr></thead>
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
                                                                    <div>
                                                                        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                                                            <p className="small">
                                                                                {!!item.radio &&
                                                                    <input type="radio" name={dat.name} disabled={item.selected} defaultChecked={item.selected} onClick={() => { this.setSelected(dat.items, item.id, i); }} value={item.id} />
                                                                                }
                                                                                {!item.radio &&
                                                                    <input type="checkbox" name="cv" disabled={item.price === 0} defaultChecked={item.selected} onClick={() => { this.setSelected(dat.items, item.id, i); }} />
                                                                                }
                                                                    &nbsp;{item.label} {item.description ? ReactHtmlParser(`<small><i>(${item.description})</i></small>`) : ''} - {Util.currency(this.state.currency)}{Util.round(item.price * this.state.conversionRate)}
                                                                            </p>
                                                                        </div>


                                                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 text-right">

                                                                            {item.price ? (!item.selected ? '' : Util.currency(this.state.currency) + (Util.round(item.price * this.state.conversionRate))) : 'Included'}
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
                            <div className="row">
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

                                {!!Object.keys(this.addonData).length && this.addonData.map(dat =>
                                    (
                                        <div key={dat.title} >
                                            {dat.items.map(item =>
                                                (
                                                    <ul key={item.label}>
                                                        {item.selected ? (
                                                            <li><small>{item.label}</small> </li>
                                                        ) : ('')}
                                                    </ul>
                                                ))}

                                        </div>
                                    ))}

                            </div>


                            <div className="panel panel-default" id="steps">
                                <div className="portfolio-item">
                                    <div className="portfolio-link">
                                        <h4 className="text-center">Our Guarantee!</h4>

                                        <ul style={{ listStyleType: 'none' }}>
                                            <li>No use of Templates</li>
                                            <li>100% Satisfaction Guaranteed</li>
                                            <li>Unlimited Revisions for 1 day</li>
                                            <li>Ability to do in 1 day</li>
                                            <li>24/7 Service</li>
                                            <li>Highly Experienced CV Writers</li>
                                            <li>Delivered in MS Office and PDF Format</li>
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

function mapStateToProps(state) {
    return {
        profile: state.profile,
    };
}

export default withRouter(connect(mapStateToProps)(PaymentAddonStep1Page));
