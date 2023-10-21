import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
// import { Table } from 'react-bootstrap';
// import ReactHtmlParser from 'react-html-parser';
import Util from '../../helpers/util.class';

// import addonData from '../../data/addon.json';
// import packageData from '../../data/packages.json';

import ScrollToTop from '../../components/scrolltotop/scrolltotop';
import Steps from '../../components/steps/steps';
import ResumeProcess from '../../components/resumeprocess/resumeprocess';
import FAQ from '../../components/faq/faq';

class PaymentServicePackagePage extends Component {
    constructor(props) {
        super(props);
        this.setSelected = this.setSelected.bind(this);
        this.addonData = JSON.parse(JSON.stringify(this.props.addonData));
        this.state = this.initialize();
        this.discount = 10;
    }
    componentDidMount() {
        if (this.props.geo.hasOwnProperty('countryCode')) {
            this.updateState(this.props);
        }
    }
    componentWillReceiveProps(nextProps) {
        this.updateState(nextProps);
    }
    initialize = () => {
        // console.log(this.props);
        // const storePackage = Util.getDataFromSessionStorage('package');
        const packageCode = this.props.match.params.package;
        let experienceCode = '';
        if (this.props.match.params.experience) {
            experienceCode = this.props.match.params.experience;
        }
        const totalPrice = 0;
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
            selPackage: this.props.packageData.service.product[packageCode], // packageData.product.service[this.props.match.params.package],
            selExperience: experienceCode === '' ? {} : this.props.packageData.service.experience[experienceCode],
            addonData: JSON.parse(JSON.stringify(this.props.addonData)),
            totalPrice// this.props.packages.product[this.props.match.params.package][this.props.match.params.experience]
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
                addonData: JSON.parse(JSON.stringify(props.addonData)),
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
    // resetAddon() {
    //     this.setState({ addonData: JSON.parse(JSON.stringify(this.props.addonData)) });
    // }
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
    setSelectedExperience(selected) {
        this.setState({ selExperience: selected === '' ? {} : this.props.packageData.service.experience[selected] });
    }
    // setSelectedPackage(selected) {
    //     this.setState({ totalPrice: 0, selPackage: this.props.packageData.service.product[selected] });
    //     this.resetAddon();
    // }
    moveNext(selected) {
        // const storePackage = Util.getDataFromSessionStorage('package');
        // let template = {};
        // if (storePackage) {
        //     template = storePackage.template;
        // }
        const selPackage = this.props.packageData.service.product[selected];
        const packageSelected = {
            base: selPackage.code,
            experience: this.state.selExperience.code,
            totalPrice: this.props.packages.product[this.state.selPackage.code][this.state.selExperience.code] + this.state.totalPrice,
            template: {},
            discount: this.discount,
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
        this.props.history.push('/payment/checkout');
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
                            <div className="row" style={{ marginBottom: '20px' }}>
                                <div className="col-lg-12 " >
                                    We provide you with the professional and successful resume-writing services you need. WorkPapa.com gives every customer an opportunity to save more money with our valuable discount packages on all resume services.
                                    <br />
                                    You do not need to select each resume writing service separately. We offer you money-saving discount packages that combine our services. How does it work? See for yourself. Choosing a resume plus your cover letter in our combination package saves you { Util.currency(this.state.currency) + Util.round(this.discount * this.state.conversionRate)}.
                                    There are many discount packages for you to choose from. Just pick the one that applies the most to you. No matter what services you need, you will receive the same quality documents at affordable prices from WorkPapa.com.
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 " >
                                    <div className="col-lg-3 " >
                                        <h4>Select level:</h4>
                                    </div>
                                    <div className="col-lg-9 " >
                                        <select className="form-control" value={this.state.selExperience.code} onChange={(e) => { this.setSelectedExperience(e.target.value); }} >
                                            <option value="" >Select Experience Level</option>
                                            {Object.keys(this.props.packageData.service.experience).map(dat =>
                                                <option key={dat} value={dat} >{this.props.packageData.service.experience[dat].name} ({this.props.packageData.service.experience[dat].description})</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div style={{ padding: '5px' }}>&nbsp;</div>
                            </div>
                            {this.state.selExperience.code &&
                            <div>
                                <div className="row">
                                    <div className="col-lg-12 " >
                                        <h3>SELECT SERVICE</h3>
                                        {!!Object.keys(this.props.packageData.service.product).length && Object.keys(this.props.packageData.service.product).map(item =>
                                            (
                                                <div className="col-md-6" key={item} style={{ minHeight: '380px' }}>
                                                    <div className="panel panel-default" id="steps">
                                                        {/* <img src={require('../../assets/img/icons8-iPhone-50.png')} className="img-responsive img-centered" alt="" /> */}
                                                        <div className="panel-heading text-center">
                                                            <h4>{this.props.packageData.service.product[item].name}</h4>
                                                        </div>
                                                        <div className="panel-body">
                                                            {/* {this.props.packageData.service.product[item].description ? ReactHtmlParser(`<small><i>(${this.props.packageData.service.product[item].description})</i></small>`) : ''} */}
                                                            <small>
                                                            ATS-friendly Resume<br />
                                                            Keyword optimized LinkedIn® Profile<br />
                                                            24/7 Customer Support<br />
                                                            Unlimited Revisions<br />
                                                            Direct contact with your writer through our messaging system
                                                            </small>
                                                        </div>
                                                        <div className="panel-footer">
                                                            {/* { Util.currency(this.state.currency) + Util.round(this.props.packages.product[item][this.state.selExperience.code] * this.state.conversionRate)} */}
                                                            Original Price: <span style={{ textDecoration: 'line-through' }}>{Util.showPrice(this.props.packages.product[item][this.state.selExperience.code], this.state.conversionRate, this.state.currency, this.state.currencyCode)}</span>
                                                            <div className="text-danger">
                                                                Sale Price: {Util.showPrice(this.props.packages.product[item][this.state.selExperience.code] - (this.props.packages.product[item][this.state.selExperience.code] * (parseInt(this.discount, 10) / 100)), this.state.conversionRate, this.state.currency, this.state.currencyCode)}
                                                            </div>
                                                            <button style={{ width: '100%' }} className="btn btn-danger btn-lg" onClick={() => { this.moveNext(item); }}>ORDER NOW <i className="fa fa-arrow-right" aria-hidden="true" /></button> <br /><br />

                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            }

                            <ResumeProcess resumeText={this.state.resumeText} />

                        </div>
                        <div className="col-lg-4 col-md-4">
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

// PaymentServiceMenuPage.defaultProps = {
//     packageData: {}
// };
// function mapStateToProps(state, ownProps) {
//     return {
//       geo: state.location,
//       packages: state.packages
//     };
// }

export default PaymentServicePackagePage;
// export default withRouter(connect(mapStateToProps)(PaymentAddonPage));
