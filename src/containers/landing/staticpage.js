import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import { Button, Modal } from 'react-bootstrap';
// import Lightbox from 'react-images';
// import Img from 'react-image';
import ReactHtmlParser from 'react-html-parser';

import Util from '../../helpers/util.class';

import ScrollToTop from '../../components/scrolltotop/scrolltotop';
// import ImageLightbox from '../../components/imagelightbox/imagelightbox';
// import SalaryPricing from '../../components/pricing/salarypricing';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FeedBack from '../../components/feedback/feedback';
import PopUp from '../../components/popup/popup';
import homeData from '../../data/home.json';
// import metaData from '../../data/metadata.json';
// import templateData from '../../data/resumedone.json';
import Globals from '../../helpers/constant';
import OtherApi from '../../api/otherApi';

import {
    // IntroTxt,
    // GuaranteeTxt,
    PriceComp,
    Client,
    Writer,
    OrderCV,
    HowDoesItWork,
    WritingProcess,
    SelectExperience
} from './homecommon';

class StaticPage extends Component {
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
        OtherApi.getMetaData(this.pageUrl)
            .then((result) => {
                console.log(result);
                if (result.status === 'Success') {
                    this.setState({
                        metaData: result.data
                    });
                }
            });
    }
    componentWillReceiveProps(nextProps) {
        // if(this.props.geo !== nextProps.geo){
        this.updateState(nextProps);
        // }
    }
    initialize = () => {
        console.log(this.props.match.params.country);
        if (this.props.match.params.country) {
            this.country = Util.validateCountry(this.props.match.params.country);
        } else {
            this.country = Util.validateCountry('ae');
        }
        this.pageUrl = this.props.match.params.url;
        this.priceComp = homeData.pricecomp[this.country];
        this.clients = homeData.clients[this.country];
        this.writers = homeData.writers[this.country];
        this.city = this.props.match.params.city;
        // if (this.city && metaData.citypage[this.country][this.city]) {
        //     this.metaData = metaData.citypage[this.country][this.city];
        // } else {
        //     this.metaData = metaData.homepage[this.country];
        // }

        return {
            countryCode: 'US',
            country: this.country,
            resumeText: 'resume',
            bannerImg: '',
            currency: '$',
            currencyCode: 'USD',
            conversionRate: 1,
            priceComp: this.priceComp,
            clients: this.clients,
            writers: this.writers,
            priceCompModal: false,
            metaData: {
                meta_title: '',
                meta_description: '',
                meta_keyword: '',
                page_h1: '',
                page_p: ''
            },
            showModal: this.showModal,
            // priceBasic: {
            //     FGR: 0,
            //     ECR: 0,
            //     MCR: 0,
            //     SRS: 0
            // },
            priceProduct: {
                RRS: 0,
                RCS: 0,
                LPS: 0,
                CLS: 0,
                RTS: 0
            },
            experiencePoupData: {
                package: 'RRS',
                conversionRate: 1,
                currency: '$',
                currencyCode: 'USD',
                packages: {}
            }
        };
    };

    // getGallaryArray = () => {
    //     const photos = [];
    //     templateData.forEach((data) => {
    //         data.items.forEach((item) => {
    //             item.src = require(`../../assets/img/cv-done/${item.thumb}`);
    //             item.width = 1;
    //             item.height = 1;
    //             photos.push(item);
    //         });
    //     });
    //     this.photos = photos;
    // }

    // openLightbox = (event, obj) => {
    //     this.setState({
    //         currentImage: obj.id - 1,
    //         lightboxIsOpen: true,
    //     });
    // }

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
            // countryCode = 'ae';
            if (this.country === 'in' || this.country === 'sa' || this.country === 'ae') {
                this.setState({ bannerImg: require(`../../assets/img/home_${this.country}_banner.jpg`) });
            } else {
                this.setState({ bannerImg: require('../../assets/img/home_us_banner.jpg') });
            }
            // this.setState({resumeText: Util.getResumeTxt(countryCode)});
            this.setState({
                currency: Util.currency(props.geo.currencyCode),
                currencyCode: props.geo.currencyCode,
            });

            if (props.packages.basic) {
                this.setState({
                    conversionRate: props.geo.currencyConverter,
                    // priceBasic: {
                    //     FGR: props.packages.product.RRS.FGR,
                    //     ECR: props.packages.product.RRS.ECR,
                    //     JCR: props.packages.product.RRS.JCR,
                    //     MCR: props.packages.product.RRS.MCR,
                    //     SRS: props.packages.product.RRS.SRS
                    // },
                    priceProduct: {
                        RRS: props.packages.product.RRS.FGR,
                        RCS: props.packages.product.RCS.FGR,
                        LPS: props.packages.product.LPS.FGR,
                        CLS: props.packages.product.CLS.FGR,
                        RTS: props.packages.product.RTS.FGR
                    },
                    experiencePoupData: {
                        package: 'RRS',
                        conversionRate: props.geo.currencyConverter,
                        currency: Util.currency(props.geo.currencyCode),
                        currencyCode: props.geo.currencyCode,
                        packages: props.packages.product
                    }
                });
            }
        }
    }

    closePopup = () => {
        this.setState({ showModal: false });
    }
    // createImage = (image, classname) => <img rel="preload" src={require(`../../assets/img/${image}`)} className={classname} alt={image} key={image} />
    render() {
        const meta = {
            title: this.state.metaData.meta_title,
            description: this.state.metaData.meta_description,
            meta: {
                name: {
                    keywords: this.state.metaData.meta_keyword
                }
            }
        };
        const stateData = {
            priceComp: this.priceComp,
            conversionRate: this.state.conversionRate,
            currency: this.state.currency,
            currencyCode: this.state.currencyCode,
            priceProduct: this.state.priceProduct
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
                                    {this.state.metaData.page_h1 &&
                                    <div className="intro-text" style={{ width: '80%' }}>
                                        <div>
                                            <h2>{ReactHtmlParser(this.state.metaData.page_h1)}</h2>
                                            {!this.state.city &&
                                            <div>
                                                <h2>Professional writers rewrite your {this.state.resumeText} FAST!<br /> Get an interview within 30 days, GUARANTEED!</h2>
                                                <div className="skills"> Offering the best deals, starting at only {Util.showPrice(this.state.priceProduct.RRS, this.state.conversionRate, Util.currency(this.state.currencyCode), this.state.currencyCode, 0)}!</div>
                                            </div>
                                            }
                                            {!!this.state.city &&
                                            <div>
                                                <h1>New York {this.state.resumeText} Writing</h1>
                                                <div className="skills"> We know what employers seek. We are experts at targeting resumes and CV’s to match position requirements, allowing our clients to showcase value to employers. Let our resume and CV expertise help propel your career.</div>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                    }
                                    <a href="#rewrite" className="btn btn-lg btn-outline btn-profile btn-success" >GET PRICING & INTERVIEWS</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                {this.state.metaData.page_p &&
                <section className="gray">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                {ReactHtmlParser(this.state.metaData.page_p)}
                            </div>
                        </div>
                    </div>
                </section>
                }
                <section id="portfolio">
                    <WritingProcess resumeText={this.state.resumeText} />
                </section>
                <section id="rewrite">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2>Resume Writing Prices</h2>
                                <hr className="star-primary" />
                                {/* <p>Select a Package based on your Years of Experience</p> */}
                                <p>Select a Package </p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4 portfolio-item">
                                <div className="portfolio-link min-height-activated">
                                    <div style={{ minHeight: '150px' }}>
                                        <h3 className="title text-center"> Resume Rewriting </h3>
                                        <div className="subtitle text-center"> have a resume, I need my existing resume re-writte</div>
                                        <img rel="preload" src={`${Globals.publicUrl}/assets/images/resume.png`} className="img-responsive img-centered" alt="" />
                                    </div>
                                    <div className="text-center">
                                        <svg xmlns="https://www.w3.org/2000/svg" width="64" height="2" viewBox="0 0 64 2">
                                            <rect id="Rectangle_1999" data-name="Rectangle 1999" width="64" height="2" fill="#17bc9c" />
                                        </svg>
                                    </div>
                                    {!!this.state.priceProduct.RRS &&
                                    <div className="text-center">
                                        <span className="uponNext" style={{ fontSize: '2.5rem' }} >{Util.showPrice(this.state.priceProduct.RRS, this.state.conversionRate, this.state.currency, this.state.currencyCode, 0)}+</span>
                                    </div>
                                    }
                                    <div className="text-center">
                                        <a className="btn btn-lg btn-outline btn-success" onClick={() => this.showExperiencePopup('RRS')}>NEXT
                                        </a>
                                        {/* <Link className="btn btn-lg btn-outline btn-success" to="/payment/servicemenu/RRS/FGR" >NEXT <i className="fas fa-arrow-circle-right" /></Link> */}
                                    </div>
                                    <div className="description text-left">
                                        <br /><br />
                                        - Your current resume rewritten
                                        <br /><br />
                                        - Professionally written - By expert writers that know your industry and market
                                        <br /><br />
                                        - Formatted for your personality - Choose an attractive format from our library that will attract companies
                                        <br /><br />
                                        - Keyword optimization - Your document will be optimized to pass through ATS (applicant tracking systems)
                                        <br /><br />
                                        - 30-day interview guarantee
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 portfolio-item min-height-activated">
                                <div className="portfolio-link">
                                    <div style={{ minHeight: '150px' }}>
                                        <h3 className="title text-center">Resume Creation</h3>
                                        <div className="subtitle text-center"> don't have a CV, I need workpapa to write one for me</div>
                                        <img rel="preload" src={`${Globals.publicUrl}/assets/images/create-new-pencil-button.png`} className="img-responsive img-centered" alt="" />
                                    </div>
                                    <div className="text-center">
                                        <svg xmlns="https://www.w3.org/2000/svg" width="64" height="2" viewBox="0 0 64 2">
                                            <rect id="Rectangle_1999" data-name="Rectangle 1999" width="64" height="2" fill="#17bc9c" />
                                        </svg>
                                    </div>
                                    {!!this.state.priceProduct.RCS &&
                                    <div className="text-center">
                                        <span className="uponNext" style={{ fontSize: '2.5rem' }} >{Util.showPrice(this.state.priceProduct.RCS, this.state.conversionRate, this.state.currency, this.state.currencyCode, 0)}+</span>
                                    </div>
                                    }
                                    <div className="text-center">
                                        <a className="btn btn-lg btn-outline btn-success" onClick={() => this.showExperiencePopup('RCS')}>NEXT
                                        </a>
                                        {/* <Link className="btn btn-lg btn-outline btn-success" to="/payment/servicemenu/RCS/FGR" >NEXT <i className="fas fa-arrow-circle-right" /></Link> */}
                                    </div>
                                    <div className="description text-left">
                                        <br /><br />
                                        - A brand new resume for you.
                                        <br /><br />
                                        - Professionally written: Expert writers gather your needs and write a new document
                                        <br /><br />
                                        - Format for your resume:Choose an attractive format from our library that will attract companies
                                        <br /><br />
                                        - Keyword optimization - Your document will be optimized to pass through ATS (applicant tracking systems)
                                        <br /><br />
                                        - 30-day interview guarantee
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 portfolio-item min-height-activated">
                                <div className="portfolio-link">
                                    <div style={{ minHeight: '150px' }}>
                                        <h3 className="title text-center">LinkedIn Profile</h3>
                                        <div className="subtitle text-center">Rewrite my linkedin profile</div>
                                        <img rel="preload" src={`${Globals.publicUrl}/assets/images/resume.png`} className="img-responsive img-centered" alt="" />
                                    </div>
                                    <div className="text-center">
                                        <svg xmlns="https://www.w3.org/2000/svg" width="64" height="2" viewBox="0 0 64 2">
                                            <rect id="Rectangle_1999" data-name="Rectangle 1999" width="64" height="2" fill="#17bc9c" />
                                        </svg>
                                    </div>
                                    {!!this.state.priceProduct.LPS &&
                                    <div className="text-center">
                                        <span className="uponNext" style={{ fontSize: '2.5rem' }} >{Util.showPrice(this.state.priceProduct.LPS, this.state.conversionRate, this.state.currency, this.state.currencyCode, 0)}+</span>
                                    </div>
                                    }
                                    <div className="text-center">
                                        <a className="btn btn-lg btn-outline btn-success" onClick={() => this.showExperiencePopup('LPS')}>NEXT
                                        </a>
                                        {/* <Link to="/payment/servicemenu/LPS/FGR" className="btn btn-lg btn-outline btn-success">NEXT <i className="fas fa-arrow-circle-right" /></Link> */}
                                    </div>
                                    <div className="description text-left">
                                        <br /><br />
                                        - We will use your current resume and create a linkedin profile for you.
                                        <br /><br />
                                        - Almost all recruiters and employers use Linkedin;
                                        <br /><br />
                                        - We will provide you a document that you can use to populate your existing or new account.
                                        <br /><br />
                                        - Keyword friendly: keywords that trigger your profile to get hired.
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-md-12 text-center">
                                <h5>Don't have {this.state.resumeText}? <Link to="/payment/servicemenu/RCS/ECR"> Click here</Link></h5>
                                <h5>Just want to change your {this.state.resumeText} template? <Link to="/payment/template/RTS"> Click here</Link></h5>
                            </div>
                        </div> */}
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <h3>30-Day Interview Guarantee</h3>
                                    <p>
                                        {this.state.resumeText} writing packages come with a 30-day interview guarantee—or your money back!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="success" >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <p style={{ fontSize: '2.5rem' }} className="text-center">
                                    <a
                                        style={
                                            {
                                                textDecoration: 'underline', color: '#fff'
                                            }
                                        }
                                        onClick={this.handleCompPriceClick}
                                    > View {this.state.resumeText} writing service competitors
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="rewrite" className="gray">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2>Do I need my {this.state.resumeText} rewritten?</h2>
                                <hr className="star-primary" />
                            </div>

                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <h5>
                                    Before you get your resume rewritten, here’s the top 5 reasons why people don’t get the jobs they want.
                                    </h5>
                                </div>
                                <div className="col-lg-8 col-lg-offset-3">
                                    <h4>
                                        Top 5 Reasons Why Your {this.state.resumeText} Needs Rewriting
                                    </h4>
                                    <ul>
                                        <li>There’s no summary that shows your target job and the reasons why you should have that job.</li>
                                        <li>The format/template looks boring, unappealing, and unprofessional.</li>
                                        <li>Your resume is riddled with poor word choice and weak language.</li>
                                        <li>The experiences you list don’t count and don’t show your real value.</li>
                                        <li>Some of the experiences you list are impressive to you—but not your employer. </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section >
                    <GuaranteeTxt resumeText={this.state.resumeText} />
                </section> */}

                <section className="success" >
                    <OrderCV text={`Create ${this.state.resumeText.toLowerCase()} that get 40% more job interviews!`} />
                </section>
                <section >
                    <Writer writers={this.state.writers} />
                </section>
                <section className="success" >
                    <OrderCV text={`Making ${this.state.resumeText}s That Get More Job Interviews `} />
                </section>
                <section>
                    <Client clients={this.state.clients} />
                </section>
                <section className="success" >
                    <HowDoesItWork resumeText={this.state.resumeText} />
                </section>
                <section id="feedback" className="gray">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2>Free Confidential {this.state.resumeText} Feedback</h2>
                                <hr className="star-primary" />
                                <p className="small">
                                    Let’s have a chat—fill out the form below, and we’ll get in touch with you as soon as possible. We’ll have a short discussion about whether or not your {this.state.resumeText} has a chance in the current job market. We’ll discuss your career goals, how to improve your {this.state.resumeText}, and any {this.state.resumeText} writing services you may need. The best part? The consultation is completely free and is non-obligatory!
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5 text-center">
                                <img rel="preload" className="img-circle" src={require('../../assets/img/jonathan-home.jpg')} alt="russ_round_headshot" width="187" height="187" /><p /><h5>Jonathan Hedvat</h5><p>Recruiter</p>
                            </div>
                            <div className="col-md-7 ">
                                <FeedBack resumeText={this.state.resumeText} btnText="10% off your order today!" supText1="Workpapa has the lowest prices on writing services" supText2={`We'll request your ${this.state.resumeText} later via Email`} />
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
                <Modal show={this.state.showModal} onHide={this.closePopup} >
                    <Modal.Header closeButton>
                        <h2 className="text-center">Get a free resume & CV review today!</h2>
                    </Modal.Header>
                    <div className="text-center">
                        <div style={{ fontSize: '2.5rem', color: 'gray', fontStyle: 'italic' }}>
                        You’ll get 10% off your order plus
                        </div>
                        <div style={{ fontSize: '2.5rem', color: 'gray', fontStyle: 'italic' }}>
                        our free resume writing e-book!
                        </div>
                    </div>
                    <Modal.Body className="text-center">
                        <FeedBack resumeText={this.state.resumeText} btnText="Get 10% off my order!" supText1="We offer high-quality writing services for the best deal!" supText2={`We'll request your ${this.state.resumeText} later via Email`} btnclass="btn-danger" doAction={this.closePopup} />
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
export default withRouter(connect(mapStateToProps)(StaticPage));
