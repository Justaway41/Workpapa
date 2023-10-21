import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import { Button, Modal } from 'react-bootstrap';
// import Lightbox from 'react-images';

import Util from '../../helpers/util.class';

import ScrollToTop from '../../components/scrolltotop/scrolltotop';
// import ImageLightbox from '../../components/imagelightbox/imagelightbox';
// import SalaryPricing from '../../components/pricing/salarypricing';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FeedBack from '../../components/feedback/feedback';
import PopUp from '../../components/popup/popup';
import homeData from '../../data/home.json';
import metaData from '../../data/metadata.json';
// import templateData from '../../data/resumedone.json';

import {
    GuaranteeTxt,
    PriceComp,
    Client,
    Writer,
    OrderCV,
    HowDoesItWork,
    WritingProcess,
    SelectExperience
} from './homecommon';

class DatingPage extends Component {
    constructor(props) {
        super(props);
        this.showModal = true;
        const mailinglist = Util.getDataFromLocalStorage('mailinglist', 'string');
        if (mailinglist) {
            this.showModal = false;
        }
        // this.templateData = templateData;
        this.state = this.initialize();
        // this.getGallaryArray();
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
        if (this.city && metaData.citypage[this.country][this.city]) {
            this.metaData = metaData.citypage[this.country][this.city];
        } else {
            this.metaData = metaData.homepage[this.country];
        }

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
            // popupData: {},
            showModal: this.showModal,
            priceBasic: {
                FGR: 0,
                ECR: 0,
                MCR: 0,
                SRS: 0
            },
        };
    };

    handleExperiencePopup = (showExperienceModal) => {
        // this.setState(showModal);
        this.setState(showExperienceModal);
    }
    showExperiencePopup = (selectedPackage) => {
        const experiencePoupData = this.state.experiencePoupData;
        experiencePoupData.package = selectedPackage;
        this.setState({ showExperienceModal: true, experiencePoupData });
    }
    handlePopupStatus = (showModal) => {
        // this.setState(showModal);
        this.setState(showModal);
    }
    handleCompPriceClick = () => {
        this.setState({ priceCompModal: true });
    }
    updateState = (props) => {
        if (props.geo.countryCode) {
            if (!this.props.match.params.country) {
                this.country = Util.validateCountry(props.geo.countryCode);
                this.writers = homeData.writers[this.country];
                this.clients = homeData.clients[this.country];
                this.priceComp = homeData.pricecomp[this.country];
                this.setState({
                    country: this.country,
                    resumeText: Util.getResumeTxt(this.country),
                    clients: this.clients,
                    writers: this.writers
                });
            }
            this.setState({ bannerImg: require('../../assets/img/dating-hero.jpg') });
            // this.setState({resumeText: Util.getResumeTxt(countryCode)});
            this.setState({
                currency: Util.currency(props.geo.currencyCode),
                currencyCode: props.geo.currencyCode,
            });

            if (props.packages.basic) {
                this.setState({
                    conversionRate: props.geo.currencyConverter,
                    priceBasic: {
                        FGR: props.packages.product.RRS.FGR,
                        ECR: props.packages.product.RRS.ECR,
                        JCR: props.packages.product.RRS.JCR,
                        MCR: props.packages.product.RRS.MCR,
                        SRS: props.packages.product.RRS.SRS
                    },
                });
            }
        }
    }

    closePopup = () => {
        this.setState({ showModal: false });
    }
    createImage = (image, classname) => <img rel="preload" src={require(`../../assets/img/${image}`)} className={classname} alt={image} key={image} />
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
                                <div className="col-lg-12 text-center">
                                    <div className="intro-text" style={{ width: '80%' }}>
                                        <div>
                                            <h2>Attract The Right Woman</h2>
                                            <div className="skills"> We'll Tailor Your Profile to Show the Best Version of Yourself</div>
                                        </div>
                                    </div>
                                    <a href="/#rewrite" className="btn btn-lg btn-outline btn-profile btn-success" >GET PRICING & INTERVIEWS</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <section id="rewrite">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2>Dating Profile Creation Pricing</h2>
                                <hr className="star-primary" />
                                <p>Select a Package </p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-3 portfolio-item">
                                <div className="portfolio-link">
                                    <div className="portfolio-deatils">
                                        <h4 className="text-center">Messaging Package</h4>
                                        <img src={require('../../assets/img/icons8-Graduation-Cap-50.png')} className="img-responsive img-centered" alt="" />
                                        <div className="description text-center">
                                            Description
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <Link className="btn btn-lg btn-outline btn-success" to="/payment/servicemenu/RRS/FGR" >NEXT <i className="fas fa-arrow-circle-right" /></Link>
                                    </div>
                                    {!!this.state.priceBasic.FGR &&
                                    <div className="text-center">
                                        <span style={{ fontSize: '2.5rem' }} >{Util.showPrice(this.state.priceBasic.FGR, this.state.conversionRate, this.state.currency, this.state.currencyCode, 0)}</span>
                                    </div>
                                    }
                                </div>
                            </div>
                            <div className="col-md-3 portfolio-item">
                                <div className="portfolio-link">
                                    <div className="portfolio-deatils">
                                        <h4 className="text-center">My Profile</h4>
                                        <img src={require('../../assets/img/icons8-Businessman-50.png')} className="img-responsive img-centered" alt="" />
                                        <div className="description text-center">
                                        Description
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <Link className="btn btn-lg btn-outline btn-success" to="/payment/servicemenu/RRS/ECR" >NEXT <i className="fas fa-arrow-circle-right" /></Link>
                                    </div>
                                    {!!this.state.priceBasic.ECR &&
                                    <div className="text-center">
                                        <span style={{ fontSize: '2.5rem' }} >{Util.showPrice(this.state.priceBasic.ECR, this.state.conversionRate, this.state.currency, this.state.currencyCode, 0)}</span>
                                    </div>
                                    }
                                </div>
                            </div>
                            <div className="col-md-3 portfolio-item">
                                <div className="portfolio-link">
                                    <div className="portfolio-deatils">
                                        <h4 className="text-center">My Profile Plus</h4>
                                        <img src={require('../../assets/img/icons8-Manager-50.png')} className="img-responsive img-centered" alt="" />
                                        <div className="description text-center">
                                        Description
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <Link to="/payment/servicemenu/RRS/JCR" className="btn btn-lg btn-outline btn-success">NEXT <i className="fas fa-arrow-circle-right" /></Link>
                                    </div>
                                    {!!this.state.priceBasic.JCR &&
                                    <div className="text-center">
                                        <span style={{ fontSize: '2.5rem' }} >{Util.showPrice(this.state.priceBasic.JCR, this.state.conversionRate, this.state.currency, this.state.currencyCode, 0)}</span>
                                    </div>
                                    }
                                </div>
                            </div>

                            <div className="col-md-3 portfolio-item">
                                <div className="portfolio-link">
                                    <div className="portfolio-deatils">
                                        <h4 className="text-center">VIP</h4>
                                        <img src={require('../../assets/img/icons8-Manager-50.png')} className="img-responsive img-centered" alt="" />
                                        <div className="description text-center">
                                        Description
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <Link to="/payment/servicemenu/RRS/MCR" className="btn btn-lg btn-outline btn-success">NEXT <i className="fas fa-arrow-circle-right" /></Link>
                                    </div>
                                    {!!this.state.priceBasic.MCR &&
                                    <div className="text-center">
                                        <span style={{ fontSize: '2.5rem' }} >{Util.showPrice(this.state.priceBasic.MCR, this.state.conversionRate, this.state.currency, this.state.currencyCode, 0)}</span>
                                    </div>
                                    }
                                </div>
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
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9">
                                <p style={{ fontSize: '3rem' }} >Workpapa offers the lowest prices.</p>
                            </div>
                            <div className="col-lg-3" style={{ marginTop: '6px' }} >
                                <a
                                    style={
                                        {
                                            textDecoration: 'underline', fontSize: '2rem', margin: '0px', color: '#fff'
                                        }
                                    }
                                    onClick={this.handleCompPriceClick}
                                >
                                    View Competitor Pricing
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section >
                    <GuaranteeTxt resumeText={this.state.resumeText} />
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
                                <img rel="preload" className="img-circle" src={require('../../assets/img/jonathan-home.jpg')} alt="russ_round_headshot" width="187" height="187" /><p /><h5>Jonathan Hedvat</h5><p>Recruiter</p>
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
                        <h2 className="text-center">Free Resume/CV Review</h2>
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
                        <FeedBack resumeText={this.state.resumeText} btnText="Get Best Pricing 10% off your order today!" btnclass="btn-danger" doAction={this.closePopup} />
                    </Modal.Body>
                    <Modal.Footer>
                        No Thanks | <Button onClick={this.closePopup}>Close X</Button>
                    </Modal.Footer>
                </Modal>
                <PopUp name="showExperienceModal" showModal={this.state.showExperienceModal} size="lg" stateData={this.state.experiencePoupData} title="Select a Package based on your Years of Experience" contant={SelectExperience} handlePopupStatus={this.handleExperiencePopup} />
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
export default withRouter(connect(mapStateToProps)(DatingPage));
