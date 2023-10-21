import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import { Button, Modal } from 'react-bootstrap';

import Util from '../../helpers/util.class';

import ScrollToTop from '../../components/scrolltotop/scrolltotop';
// import Header from '../../components/header/header';
// import Footer from '../../components/footer/footer';
import FeedBack from '../../components/feedback/feedback';
// import PopUp from '../../components/popup/popup';
import homeData from '../../data/home.json';
import packageData from '../../data/product/packages.json';
import howItWork from '../../data/product/howitwork.json';
import homeHero from '../../data/product/homehero.json';
import homePopup from '../../data/product/homepopup.json';
import bannerImg from '../../assets/img/home_us_banner.jpg';
import addonData from '../../data/product/addon.json';

import {
    Client,
    Writer,
    OrderCV,
    HowDoesItWork,
    // WritingProcess,
    Packages
} from './homecommon';

class ProductHomePage extends Component {
    constructor(props) {
        super(props);
        this.productType = this.props.match.params.type;
        this.showModal = true;
        const mailinglist = Util.getDataFromLocalStorage('mailinglist', 'string');
        if (mailinglist) {
            this.showModal = false;
        }
        this.state = this.initialize();
        this.homePopup = homePopup[this.productType];
    }
    componentDidMount() {
        this.updateState(this.props);
    }
    componentWillReceiveProps(nextProps) {
        // if(this.props.geo !== nextProps.geo){
        this.updateState(nextProps);
        // }
    }
    initialize = () => {
        // console.log(this.props.match.params.country);
        this.country = Util.validateCountry(this.props.match.params.country);
        this.priceComp = homeData.pricecomp[this.country];
        this.clients = homeData.clients[this.country];
        this.writers = homeData.writers[this.country];
        this.city = this.props.match.params.city;
        this.metaData = Util.getMetaData('homepage', this.productType);

        return {
            countryCode: 'US',
            country: this.country,
            resumeText: 'Resume',
            bannerImg: '',
            currency: '$',
            currencyCode: 'USD',
            conversionRate: 1,
            priceComp: this.priceComp,
            clients: this.clients,
            writers: this.writers,
            priceCompModal: false,
            showModal: this.showModal,
            priceProduct: {
                RRS: 0,
                RCS: 0,
                LPS: 0,
                CLS: 0,
                RTS: 0
            }
        };
    };

    handleExperiencePopup = (showExperienceModal) => {
        this.setState(showExperienceModal);
    }
    showExperiencePopup = (selectedPackage) => {
        const experiencePoupData = this.state.experiencePoupData;
        experiencePoupData.package = selectedPackage;
        this.setState({ experiencePoupData });
    }
    handlePopupStatus = (showModal) => {
        this.setState(showModal);
    }
    // handleCompPriceClick = () => {
    //     this.setState({ priceCompModal: true });
    // }
    updateState = (props) => {
        if (props.geo.countryCode) {
            if (!this.props.match.params.country) {
                // this.country = Util.validateCountry(props.geo.countryCode);
                // this.setState({
                //     country: this.country,
                // });
            }
            // this.setState({ bannerImg: require('../../assets/img/home_us_banner.jpg') });
            this.setState({
                currency: Util.currency(props.geo.currencyCode),
                currencyCode: props.geo.currencyCode,
            });

            if (props.packages.basic) {
                this.setState({
                    conversionRate: props.geo.currencyConverter
                });
            }
        }
    }

    closePopup = () => {
        this.setState({ showModal: false });
    }

    moveNext = (packageCode) => {
        if (!addonData[this.productType]) {
            const packageSelected = {
                base: packageCode,
                totalPrice: parseInt(packageData.packages[this.productType][packageCode].price, 10),
                template: {},
                addon: []
            };
            Util.setDataToSessionStorage('package', packageSelected);
            this.props.history.push(`/product/checkout/${this.productType}`);
            // this.router.navigate(['payment/service', this.props.match.params.package,0]);
        } else {
            this.props.history.push(`/product/servicemenu/${this.productType}/${packageCode}`);
        }
    }

    // createImage = (image, classname) => <img rel="preload" src={require(`../../assets/img/${image}`)} className={classname} alt={image} key={image} />
    render() {
        const meta = {
            title: this.metaData.title,
            description: this.metaData.description,
            meta: {
                name: {
                    keywords: this.metaData.keywords
                }
            }
        };
        // const stateData = {
        //     priceComp: this.priceComp,
        //     conversionRate: this.state.conversionRate,
        //     currency: this.state.currency,
        //     currencyCode: this.state.currencyCode
        // };
        return (
            <div>
                <ScrollToTop />
                <DocumentMeta {...meta} />

                <header>
                    <div className="banner" style={{ background: `url(${bannerImg}) 50% center / cover no-repeat` }} >
                        <div className="container home">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <div className="intro-text" style={{ width: '80%' }}>
                                        <h2>{homeHero[this.productType].title}</h2>
                                        <div className="skills"> {homeHero[this.productType].description}</div>
                                    </div>
                                    <a href={`/product/${this.productType}#rewrite`} className="btn btn-lg btn-outline btn-profile btn-success" >{homeHero[this.productType].button}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <section id="rewrite">
                    <Packages packageData={packageData.packages[this.productType]} productType={this.productType} conversionRate={this.state.conversionRate} currency={this.state.currency} currencyCode={this.state.currencyCode} moveNext={this.moveNext} />
                </section>

                <section className="success" >
                    <OrderCV resumeText={this.state.resumeText} />
                </section>
                <section >
                    <Writer writers={this.state.writers} />
                </section>
                <section className="success" >
                    <OrderCV resumeText={this.state.resumeText} />
                </section>
                <section>
                    <Client clients={this.state.clients} />
                </section>
                <section className="success" >
                    <HowDoesItWork resumeText={this.state.resumeText} data={howItWork['product']} />
                </section>
                {/* <section id="portfolio">
                    <WritingProcess resumeText={this.state.resumeText} />
                </section> */}
                <section id="feedback" className="gray">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2>Free confidential feedback</h2>
                                <hr className="star-primary" />
                                <p className="small">Let’s have a chat—fill out the form to the below, and we’ll get in touch with you to have a short discussion about your writing needs and goals
                                    <br />We’ll talk about your career goals, point out ways to create or improve your document, and discuss any services you may need.
                                    <br />The consultation is free and completely non-obligatory.
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5 text-center">
                                <img rel="preload" className="img-circle" src={require('../../assets/img/jonathan-home.jpg')} alt="russ_round_headshot" width="187" height="187" /><p /><h5>Jonathan Hedvat</h5>
                            </div>
                            <div className="col-md-7 ">
                                <FeedBack resumeText={this.state.resumeText} btnText="10% off your order today!" supText1="Workpapa has the lowest prices on writing services" supText2={`We'll request your ${this.state.resumeText} later via Email`} />
                            </div>
                        </div>
                    </div>
                </section>
                {/* <Footer /> */}
                <Modal show={this.state.showModal} onHide={this.closePopup} >
                    <Modal.Header closeButton>
                        <h2 className="text-center">{this.homePopup.title}</h2>
                    </Modal.Header>
                    <div className="text-center">
                        <div style={{ fontSize: '2.5rem', color: 'gray', fontStyle: 'italic' }}>
                            {this.homePopup.bodyText1}
                        </div>
                        <div style={{ fontSize: '2.5rem', color: 'gray', fontStyle: 'italic' }}>
                            {this.homePopup.bodyText2}
                        </div>
                    </div>
                    <Modal.Body className="text-center">
                        <FeedBack resumeText={this.state.resumeText} btnText={this.homePopup.button} supText1={this.homePopup.supText1} supText2={this.homePopup.supText2} btnclass="btn-danger" doAction={this.closePopup} />
                    </Modal.Body>
                    <Modal.Footer>
                        No Thanks | <Button onClick={this.closePopup}>Close X</Button>
                    </Modal.Footer>
                </Modal>
                {/* <PopUp name="showExperienceModal" showModal={this.state.showExperienceModal} size="lg" stateData={this.state.experiencePoupData} title="Select a Package based on your Years of Experience" contant={SelectExperience} handlePopupStatus={this.handleExperiencePopup} />
                <PopUp name="priceCompModal" stateData={stateData} showModal={this.state.priceCompModal} title="CV Service Price Comparison" contant={PriceComp} handlePopupStatus={this.handlePopupStatus} /> */}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        geo: state.location,
        packages: state.packages,
        profile: state.profile
    };
}
export default withRouter(connect(mapStateToProps)(ProductHomePage));
