import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import { Modal } from 'react-bootstrap';
import Util from '../../helpers/util.class';

import ScrollToTop from '../../components/scrolltotop/scrolltotop';
import SalaryPricing from '../../components/pricing/salarypricing';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FeedBack from '../../components/feedback/feedback';
import PopUp from '../../components/popup/popup';
import homeData from '../../data/home.json';
import metaData from '../../data/metadata.json';

import {
    IntroTxt,
    GuaranteeTxt,
    PriceComp,
    Client,
    Writer,
    OrderCV,
    HowDoesItWork,
    WritingProcess
} from './homecommon';


class TestPage extends Component {
    constructor(props) {
        super(props);
        this.showModal = false;
        const mailinglist = Util.getDataFromLocalStorage('mailinglist', 'string');
        if (mailinglist) {
            this.showModal = false;
        }

        this.state = this.initialize();
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
        this.country = Util.validateCountry(this.props.match.params.country);
        this.priceComp = homeData.pricecomp[this.country];
        this.clients = homeData.clients[this.country];
        this.writers = homeData.writers[this.country];
        this.city = this.props.match.params.city;
        if (this.city && metaData.citypage[this.country][this.city]) {
            this.metaData = metaData.citypage[this.country][this.city];
        } else {
            this.metaData = metaData.homepage[this.country];
        }
        // if(!!this.props.match.params.country) {
        //     this.country = this.props.match.params.country;
        //     this.priceComp = homeData["pricecomp"][this.country];
        //     this.clients = homeData["clients"][this.country];
        //     this.writers = homeData["writers"][this.country];
        // }else{
        //     this.priceComp = homeData["pricecomp"]['us'];
        //     this.clients = homeData["clients"]['us'];
        //     this.writers = homeData["writers"]['us'];
        // }
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
            priceBasic: {
                FGR: 0,
                ECR: 0,
                MCR: 0,
                SRS: 0
            }
        };
    };
    handlePopupStatus = (showModal) => {
        // this.setState(showModal);
        this.setState(showModal);
    }
    handleCompPriceClick = () => {
        this.setState({ priceCompModal: true });
    }
    updateState = (props) => {
        if (props.geo.countryCode) {
            if (!this.country) {
                this.country = Util.validateCountry(props.geo.countryCode);
            }
            this.writers = homeData.writers[this.country];
            this.clients = homeData.clients[this.country];
            this.priceComp = homeData.pricecomp[this.country];
            // countryCode = 'ae';
            if (this.country === 'in' || this.country === 'sa' || this.country === 'ae') {
                this.setState({ bannerImg: require(`../../assets/img/home_${this.country}_banner.jpg`) });
            } else {
                this.setState({ bannerImg: require('../../assets/img/home_us_banner.jpg') });
            }
            // this.setState({resumeText: Util.getResumeTxt(countryCode)});
            this.setState({
                country: this.country,
                resumeText: Util.getResumeTxt(this.country),
                currency: Util.currency(props.geo.currencyCode),
                currencyCode: props.geo.currencyCode,
                clients: this.clients,
                writers: this.writers
            });

            if (props.packages.basic) {
                this.setState({
                    conversionRate: props.geo.currencyConverter,
                    // priceBasic: {
                    //     FGR: props.packages.product.RRS.FGR,
                    //     ECR: props.packages.product.RRS.ECR,
                    //     MCR: props.packages.product.RRS.MCR,
                    //     SRS: props.packages.product.RRS.SRS
                    // }
                });
            }
        }
    }

    closePopup = () => {
        this.setState({ showModal: false });
    }

    createImage = (image, classname) => <img src={require(`../../assets/img/${image}`)} className={classname} alt={image} key={image} />
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
        const stateData = {
            priceComp: this.priceComp,
            conversionRate: this.state.conversionRate,
            currency: this.state.currency,
            currencyCode: this.state.currencyCode
        };
        return (
            <div>
                <ScrollToTop />
                <Header country={this.state.country} profile={this.props.profile} {...this.props} />
                <DocumentMeta {...meta} />

                <header>
                    <div className="banner" style={{ background: `url(${this.state.bannerImg}) 50% center / cover no-repeat` }} >
                        <div className="container home">
                            <div className="row">
                                <div className="col-lg-12">
                                    <IntroTxt city={this.city} resumeText={this.state.resumeText} />
                                    <a href="/#rewrite" className="btn btn-lg btn-outline btn-profile btn-success" >GET INTERVIEWS</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <section >
                    <GuaranteeTxt resumeText={this.state.resumeText} />
                </section>
                <section className="success" >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <p style={{ fontSize: '3rem' }} className="text-center">Workpapa offers the lowest prices.</p>
                            </div>
                            <div className="col-lg-3 text-right">
                                <a className="btn btn-lg btn-profile btn-danger" style={{ fontSize: '2rem', margin: '0px' }} href="/#rewrite" >Pricing</a>
                            </div>
                            <div className="col-lg-3">
                                <a style={{ fontSize: '2rem', margin: '0px', color: '#fff' }} onClick={this.handleCompPriceClick} >View Competitor Pricing</a>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="rewrite">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2>{this.state.resumeText} Writing Prices</h2>
                                <hr className="star-primary" />
                                <p>Select A Package Based On Your Experience</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4 col-md-offset-4">
                                <SalaryPricing {...this.props} conversionRate={this.state.conversionRate} currency={this.state.currency} currencyCode={this.state.currencyCode} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h5>Just want to change your {this.state.resumeText} template? <Link to="/payment/template/RTS"> Click here</Link></h5>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <h3>30-Day Interview Guarantee</h3>
                                    <p>All our {this.state.resumeText} writing packages come with a 30-day interview guarantee — or get your money back!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
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
                    <HowDoesItWork resumeText={this.state.resumeText} />
                </section>
                <section id="portfolio">
                    <WritingProcess resumeText={this.state.resumeText} />
                </section>
                <section id="feedback" className="gray">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2>Free Confidential {this.state.resumeText} Feedback</h2>
                                <hr className="star-primary" />
                                <p className="small">Let’s have a chat—fill out the form to the below, and we’ll get in touch with you to have a short discussion about your {this.state.resumeText} for the job market.
                                <br />We’ll talk about your career goals, point out ways to improve your {this.state.resumeText}, and discuss any {this.state.resumeText} writing services you may need.
                                <br />The consultation is free and completely non-obligatory.
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5 text-center">
                                <img className="img-circle" src={require('../../assets/img/jonathan-home.jpg')} alt="russ_round_headshot" width="187" height="187" /><p /><h5>Jonathan Hedvat</h5><p>Recruiter</p>
                            </div>
                            <div className="col-md-7 ">
                                <FeedBack resumeText={this.state.resumeText} btnText="10% off your order today!" />
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
                <Modal show={this.state.showModal} onHide={this.closePopup} >
                    <Modal.Header closeButton>
                        <h1 className="text-center">Free Resume/CV Review</h1>
                    </Modal.Header>
                    <div className="text-center">
                        <div style={{ fontSize: '2.5rem', color: 'gray', fontStyle: 'italic' }}>
                        10% OFF YOUR ORDER +
                        </div>
                        <div style={{ fontSize: '2.5rem', color: 'gray', fontStyle: 'italic' }}>
                            Free Resume writing e-book
                        </div>
                    </div>
                    <Modal.Body className="text-center">
                        <FeedBack resumeText={this.state.resumeText} btnText="10% off your order today!" btnclass="btn-danger" doAction={this.closePopup} />
                    </Modal.Body>
                </Modal>

                {/* <Modal show={this.state.showModal} onHide={this.closePopup} >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.popupData.text}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <FeedBack trkId={this.state.popupData.id_trk} resumeText={this.state.resumeText} btnText={this.state.popupData.btntext} doAction={this.closePopup} />
                    </Modal.Body>
                </Modal> */}
                {/* <PopUp showModal={this.showModal}  title={this.popupData.text} contant={FeedBack} handlePopupStatus={this.handlePopupStatus}></PopUp> */}
                <PopUp name="priceCompModal" stateData={stateData} showModal={this.state.priceCompModal} title="CV Service Price Comparison" contant={PriceComp} handlePopupStatus={this.handlePopupStatus} />
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
export default withRouter(connect(mapStateToProps)(TestPage));
