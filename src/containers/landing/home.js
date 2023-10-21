import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import { Button, Modal } from 'react-bootstrap';
// import Lightbox from 'react-images';
// import Img from 'react-image';

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
import Globals from '../../helpers/constant';
// import OtherApi from '../../api/otherApi';

import {
    IntroTxt,
    // GuaranteeTxt,
    PriceComp,
    Client,
    Writer,
    OrderCV,
    HowDoesItWork,
    WritingProcess,
    SelectExperience
} from './homecommon';

class HomePage extends Component {
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
        // this.getFooterLink();
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
            resumeText: 'resume',
            bannerImg: '../../assets/img/home_us_banner.jpg',
            currency: '$',
            currencyCode: 'USD',
            conversionRate: 1,
            priceComp: this.priceComp,
            clients: this.clients,
            writers: this.writers,
            priceCompModal: false,
            // footerLink: [],
            // popupData: {},
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
                ICR: 0,
                CCV: 0,
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

    // getFooterLink() {
    //     OtherApi.getSeoLink()
    //         .then((result) => {
    //             if (result.status === 'Success') {
    //                 this.setState({
    //                     footerLink: result.data
    //                 });
    //             }
    //         });
    // }
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
                        ICR: props.packages.product.ICR.FGR,
                        CCV: props.packages.product.CCV.FGR,
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
            currencyCode: this.state.currencyCode,
            priceProduct: this.state.priceProduct
        };
        return (
            <div>
                <ScrollToTop />
                <div className="marian-homepage-navbar">
                    <Header country={this.state.country} profile={this.props.profile} {...this.props} />
                </div>
                <DocumentMeta {...meta} />

                <header>
                    <div className="banner" style={{ background: `url(${this.state.bannerImg}) 50% center / cover no-repeat`, backgroundColor: '#999999' }} >
                        <div className="container home">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <IntroTxt city={this.city} resumeText={this.state.resumeText} priceProduct={this.state.priceProduct} {...this.props} />
                                    {/* <a href="/#package" className="btn btn-lg btn-profile btn-success" >GET PRICING & INTERVIEWS</a> */}
                                </div>
                            </div>
                        </div>
                        <section id="rewrite">
                            <div className="container">

                                <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div className="col-md-10">
                                        <div className="portfolio-item">
                                            <div className="portfolio-link min-height-activated2" style={{ display: 'flex', justifyContent: 'center' }}>
                                                <div className="row">
                                                    {/* <h3 className="col-md-12 title text-center">Advantages</h3> */}
                                                    <div className="col-md-6" >
                                                        <div className=" text-left">
                                                            <h3 className="title text-center">Resume Writer Advantages</h3>
                                                            <ul style={{ color: '#000' }}>
                                                                <li>
                                                                    <span>Increases Job Interview chances dramatically</span>
                                                                </li>
                                                                <li>
                                                                    <span>On average you will get a job 2-3 months earlier</span>
                                                                </li>
                                                                <li>
                                                                    <span>More likely to get a higher paying job</span>
                                                                </li>
                                                                <li>
                                                                    <span>Get a higher salary to your bank account faster</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className=" text-left">
                                                            <h3 className="title text-center">Workpapa Advantages</h3>
                                                            <ul style={{ color: '#000' }}>
                                                                <li>
                                                                    <span>Writing within 24-48 hours (Quick turnaround)</span>
                                                                </li>
                                                                <li>
                                                                    <span>Ability to chat with writer during process</span>
                                                                </li>
                                                                <li>
                                                                    <span>Quality service provider with long track record</span>
                                                                </li>
                                                                <li>
                                                                    <span>Guaranteed interviews in 30 days</span>
                                                                </li>
                                                                <li>
                                                                    <span>Satisfaction guarantee or rewritten <br /> Unlimited rewrites</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="row" >
                                    <div className="col-lg-12 rewriteRow rewriteRowWhite">
                                        <h2>RESUME WRITING PRICING</h2>
                                        <svg className="bar" xmlns="https://www.w3.org/2000/svg" width="248" height="1" viewBox="0 0 248 1">
                                            <rect id="Rectangle_1996" data-name="Rectangle 1996" width="248" height="1" fill="#bcbcbc" />
                                        </svg>
                                        <p>Select a Package </p>
                                    </div>
                                </div> */}
                                <div className="row" id="package">
                                    <div className="col-md-4 portfolio-item">
                                        <div className="portfolio-link min-height-activated">
                                            <div style={{ minHeight: '150px' }}>
                                                <h3 className="title text-center"> Resume Rewriting </h3>
                                                <div className="subtitle text-center"> Have a resume, I need my existing resume <br /> re-written</div>
                                                <img rel="preload" src={`${Globals.publicUrl}/assets/images/resume.png`} className="img-responsive img-centered" alt="" />
                                                {/* <Img src={'/assets/images/svg/resume.svg'} className="img-responsive img-centered" /> */}
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
                                                <div className="item">
                                                    <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <g id="Group_30" data-name="Group 30" transform="translate(-360 -1228)">
                                                            <rect id="Rectangle_1984" data-name="Rectangle 1984" width="24" height="24" rx="5" transform="translate(360 1228)" fill="#17bc9c" />
                                                            <rect id="Rectangle_1985" data-name="Rectangle 1985" width="8" height="3" rx="1.5" transform="translate(366.818 1238.197) rotate(45)" fill="#fff" />
                                                            <rect id="Rectangle_1986" data-name="Rectangle 1986" width="12" height="3" rx="1.5" transform="translate(369.697 1242.682) rotate(-45)" fill="#fff" />
                                                        </g>
                                                    </svg> <span>Your current resume rewritten</span>
                                                </div>
                                                <div className="item">
                                                    <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <g id="Group_30" data-name="Group 30" transform="translate(-360 -1228)">
                                                            <rect id="Rectangle_1984" data-name="Rectangle 1984" width="24" height="24" rx="5" transform="translate(360 1228)" fill="#17bc9c" />
                                                            <rect id="Rectangle_1985" data-name="Rectangle 1985" width="8" height="3" rx="1.5" transform="translate(366.818 1238.197) rotate(45)" fill="#fff" />
                                                            <rect id="Rectangle_1986" data-name="Rectangle 1986" width="12" height="3" rx="1.5" transform="translate(369.697 1242.682) rotate(-45)" fill="#fff" />
                                                        </g>
                                                    </svg> <span>Professionally written - By expert writers <br /> that know your industry and market</span>
                                                </div>
                                                <div className="item">
                                                    <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <g id="Group_30" data-name="Group 30" transform="translate(-360 -1228)">
                                                            <rect id="Rectangle_1984" data-name="Rectangle 1984" width="24" height="24" rx="5" transform="translate(360 1228)" fill="#17bc9c" />
                                                            <rect id="Rectangle_1985" data-name="Rectangle 1985" width="8" height="3" rx="1.5" transform="translate(366.818 1238.197) rotate(45)" fill="#fff" />
                                                            <rect id="Rectangle_1986" data-name="Rectangle 1986" width="12" height="3" rx="1.5" transform="translate(369.697 1242.682) rotate(-45)" fill="#fff" />
                                                        </g>
                                                    </svg> <span>Formatted for your personality - Choose <br /> an attractive format from our library that <br /> will attract companies</span>
                                                </div>
                                                <div className="item">
                                                    <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <g id="Group_30" data-name="Group 30" transform="translate(-360 -1228)">
                                                            <rect id="Rectangle_1984" data-name="Rectangle 1984" width="24" height="24" rx="5" transform="translate(360 1228)" fill="#17bc9c" />
                                                            <rect id="Rectangle_1985" data-name="Rectangle 1985" width="8" height="3" rx="1.5" transform="translate(366.818 1238.197) rotate(45)" fill="#fff" />
                                                            <rect id="Rectangle_1986" data-name="Rectangle 1986" width="12" height="3" rx="1.5" transform="translate(369.697 1242.682) rotate(-45)" fill="#fff" />
                                                        </g>
                                                    </svg> <span>Keyword optimization - Your document will <br /> be optimized to pass through ATS <br /> (applicant tracking systems)</span>
                                                </div>
                                                <div className="item">
                                                    <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <g id="Group_30" data-name="Group 30" transform="translate(-360 -1228)">
                                                            <rect id="Rectangle_1984" data-name="Rectangle 1984" width="24" height="24" rx="5" transform="translate(360 1228)" fill="#17bc9c" />
                                                            <rect id="Rectangle_1985" data-name="Rectangle 1985" width="8" height="3" rx="1.5" transform="translate(366.818 1238.197) rotate(45)" fill="#fff" />
                                                            <rect id="Rectangle_1986" data-name="Rectangle 1986" width="12" height="3" rx="1.5" transform="translate(369.697 1242.682) rotate(-45)" fill="#fff" />
                                                        </g>
                                                    </svg> <span>Your current resume rewritten</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 portfolio-item">
                                        <div className="portfolio-link min-height-activated">
                                            <div style={{ minHeight: '150px' }}>
                                                <h3 className="title text-center">Resume Creation</h3>
                                                <div className="subtitle text-center"> don't have a CV, I need workpapa to write <br /> one for me</div>
                                                <img rel="preload" src={`${Globals.publicUrl}/assets/images/create-new-pencil-button.png`} className="img-responsive img-centered" alt="" />
                                                {/* <Img src={'/assets/images/svg/create-new-pencil-button.svg'} className="img-responsive img-centered" /> */}
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
                                                <div className="item">
                                                    <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <g id="Group_30" data-name="Group 30" transform="translate(-360 -1228)">
                                                            <rect id="Rectangle_1984" data-name="Rectangle 1984" width="24" height="24" rx="5" transform="translate(360 1228)" fill="#17bc9c" />
                                                            <rect id="Rectangle_1985" data-name="Rectangle 1985" width="8" height="3" rx="1.5" transform="translate(366.818 1238.197) rotate(45)" fill="#fff" />
                                                            <rect id="Rectangle_1986" data-name="Rectangle 1986" width="12" height="3" rx="1.5" transform="translate(369.697 1242.682) rotate(-45)" fill="#fff" />
                                                        </g>
                                                    </svg> <span>A brand new resume for you.</span>
                                                </div>
                                                <div className="item">
                                                    <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <g id="Group_30" data-name="Group 30" transform="translate(-360 -1228)">
                                                            <rect id="Rectangle_1984" data-name="Rectangle 1984" width="24" height="24" rx="5" transform="translate(360 1228)" fill="#17bc9c" />
                                                            <rect id="Rectangle_1985" data-name="Rectangle 1985" width="8" height="3" rx="1.5" transform="translate(366.818 1238.197) rotate(45)" fill="#fff" />
                                                            <rect id="Rectangle_1986" data-name="Rectangle 1986" width="12" height="3" rx="1.5" transform="translate(369.697 1242.682) rotate(-45)" fill="#fff" />
                                                        </g>
                                                    </svg> <span>Professionally written: Expert writers <br /> gather your needs and write a new <br /> document</span>
                                                </div>
                                                <div className="item">
                                                    <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <g id="Group_30" data-name="Group 30" transform="translate(-360 -1228)">
                                                            <rect id="Rectangle_1984" data-name="Rectangle 1984" width="24" height="24" rx="5" transform="translate(360 1228)" fill="#17bc9c" />
                                                            <rect id="Rectangle_1985" data-name="Rectangle 1985" width="8" height="3" rx="1.5" transform="translate(366.818 1238.197) rotate(45)" fill="#fff" />
                                                            <rect id="Rectangle_1986" data-name="Rectangle 1986" width="12" height="3" rx="1.5" transform="translate(369.697 1242.682) rotate(-45)" fill="#fff" />
                                                        </g>
                                                    </svg> <span>Formatted for your personality - Choose <br /> an attractive format from our library that <br /> will attract companies</span>
                                                </div>
                                                <div className="item">
                                                    <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <g id="Group_30" data-name="Group 30" transform="translate(-360 -1228)">
                                                            <rect id="Rectangle_1984" data-name="Rectangle 1984" width="24" height="24" rx="5" transform="translate(360 1228)" fill="#17bc9c" />
                                                            <rect id="Rectangle_1985" data-name="Rectangle 1985" width="8" height="3" rx="1.5" transform="translate(366.818 1238.197) rotate(45)" fill="#fff" />
                                                            <rect id="Rectangle_1986" data-name="Rectangle 1986" width="12" height="3" rx="1.5" transform="translate(369.697 1242.682) rotate(-45)" fill="#fff" />
                                                        </g>
                                                    </svg> <span>Keyword optimization - Your document will <br /> be optimized to pass through ATS <br /> (applicant tracking systems)</span>
                                                </div>
                                                <div className="item">
                                                    <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <g id="Group_30" data-name="Group 30" transform="translate(-360 -1228)">
                                                            <rect id="Rectangle_1984" data-name="Rectangle 1984" width="24" height="24" rx="5" transform="translate(360 1228)" fill="#17bc9c" />
                                                            <rect id="Rectangle_1985" data-name="Rectangle 1985" width="8" height="3" rx="1.5" transform="translate(366.818 1238.197) rotate(45)" fill="#fff" />
                                                            <rect id="Rectangle_1986" data-name="Rectangle 1986" width="12" height="3" rx="1.5" transform="translate(369.697 1242.682) rotate(-45)" fill="#fff" />
                                                        </g>
                                                    </svg> <span>Your current resume rewritten</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 portfolio-item">
                                        <div className="portfolio-link min-height-activated">
                                            <div style={{ minHeight: '150px' }}>
                                                <h3 className="title text-center">Career Change Evolution</h3>
                                                <div className="subtitle text-center">Have a resume/cv, I want to change <br /> my career direction</div>
                                                <img rel="preload" src={`${Globals.publicUrl}/assets/images/resume.png`} className="img-responsive img-centered" alt="" />
                                                {/* <Img src={`${Globals.publicUrl}/assets/images/svg/linkedin-logo.svg`} className="img-responsive img-centered" /> */}
                                            </div>
                                            <div className="text-center">
                                                <svg xmlns="https://www.w3.org/2000/svg" width="64" height="2" viewBox="0 0 64 2">
                                                    <rect id="Rectangle_1999" data-name="Rectangle 1999" width="64" height="2" fill="#17bc9c" />
                                                </svg>
                                            </div>
                                            {!!this.state.priceProduct.CCV &&
                                            <div className="text-center">
                                                <span className="uponNext" style={{ fontSize: '2.5rem' }} >{Util.showPrice(this.state.priceProduct.CCV, this.state.conversionRate, this.state.currency, this.state.currencyCode, 0)}+</span>
                                            </div>
                                            }
                                            <div className="text-center">
                                                <a className="btn btn-lg btn-outline btn-success" onClick={() => this.showExperiencePopup('CCV')}>NEXT
                                                </a>
                                            </div>
                                            <div className="description text-left">
                                                <div className="item">
                                                    <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <g id="Group_30" data-name="Group 30" transform="translate(-360 -1228)">
                                                            <rect id="Rectangle_1984" data-name="Rectangle 1984" width="24" height="24" rx="5" transform="translate(360 1228)" fill="#17bc9c" />
                                                            <rect id="Rectangle_1985" data-name="Rectangle 1985" width="8" height="3" rx="1.5" transform="translate(366.818 1238.197) rotate(45)" fill="#fff" />
                                                            <rect id="Rectangle_1986" data-name="Rectangle 1986" width="12" height="3" rx="1.5" transform="translate(369.697 1242.682) rotate(-45)" fill="#fff" />
                                                        </g>
                                                    </svg> <span>Professionally written - By expert writers <br /> that know your industry and market</span>
                                                </div>
                                                <div className="item">
                                                    <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <g id="Group_30" data-name="Group 30" transform="translate(-360 -1228)">
                                                            <rect id="Rectangle_1984" data-name="Rectangle 1984" width="24" height="24" rx="5" transform="translate(360 1228)" fill="#17bc9c" />
                                                            <rect id="Rectangle_1985" data-name="Rectangle 1985" width="8" height="3" rx="1.5" transform="translate(366.818 1238.197) rotate(45)" fill="#fff" />
                                                            <rect id="Rectangle_1986" data-name="Rectangle 1986" width="12" height="3" rx="1.5" transform="translate(369.697 1242.682) rotate(-45)" fill="#fff" />
                                                        </g>
                                                    </svg> <span>Formatted for your personality - Choose <br /> an attractive format from our library that <br /> will attract companies</span>
                                                </div>
                                                <div className="item">
                                                    <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <g id="Group_30" data-name="Group 30" transform="translate(-360 -1228)">
                                                            <rect id="Rectangle_1984" data-name="Rectangle 1984" width="24" height="24" rx="5" transform="translate(360 1228)" fill="#17bc9c" />
                                                            <rect id="Rectangle_1985" data-name="Rectangle 1985" width="8" height="3" rx="1.5" transform="translate(366.818 1238.197) rotate(45)" fill="#fff" />
                                                            <rect id="Rectangle_1986" data-name="Rectangle 1986" width="12" height="3" rx="1.5" transform="translate(369.697 1242.682) rotate(-45)" fill="#fff" />
                                                        </g>
                                                    </svg> <span>Keyword optimization - Your document will <br /> be optimized to pass through ATS <br /> (applicant tracking systems)</span>
                                                </div>
                                                <div className="item">
                                                    <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <g id="Group_30" data-name="Group 30" transform="translate(-360 -1228)">
                                                            <rect id="Rectangle_1984" data-name="Rectangle 1984" width="24" height="24" rx="5" transform="translate(360 1228)" fill="#17bc9c" />
                                                            <rect id="Rectangle_1985" data-name="Rectangle 1985" width="8" height="3" rx="1.5" transform="translate(366.818 1238.197) rotate(45)" fill="#fff" />
                                                            <rect id="Rectangle_1986" data-name="Rectangle 1986" width="12" height="3" rx="1.5" transform="translate(369.697 1242.682) rotate(-45)" fill="#fff" />
                                                        </g>
                                                    </svg> <span>Cover letter - Employers are 40% more <br /> likely to read a resume with a cover letter.</span>
                                                </div>
                                                <div className="item">
                                                    <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <g id="Group_30" data-name="Group 30" transform="translate(-360 -1228)">
                                                            <rect id="Rectangle_1984" data-name="Rectangle 1984" width="24" height="24" rx="5" transform="translate(360 1228)" fill="#17bc9c" />
                                                            <rect id="Rectangle_1985" data-name="Rectangle 1985" width="8" height="3" rx="1.5" transform="translate(366.818 1238.197) rotate(45)" fill="#fff" />
                                                            <rect id="Rectangle_1986" data-name="Rectangle 1986" width="12" height="3" rx="1.5" transform="translate(369.697 1242.682) rotate(-45)" fill="#fff" />
                                                        </g>
                                                    </svg> <span>30-day interview guarantee</span>
                                                </div>
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
                                <div className="container afterResume">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h3>30-Day Interview Guarantee</h3>
                                            <p>
                                                {this.state.resumeText} writing packages come with a 30-day interview guarantee—or your money back!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </header>
                <section className="gray">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <div className="marian-row">
                                    <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <g id="Group_30" data-name="Group 30" transform="translate(-360 -1228)">
                                            <rect id="Rectangle_1984" data-name="Rectangle 1984" width="24" height="24" rx="5" transform="translate(360 1228)" fill="#17bc9c" />
                                            <rect id="Rectangle_1985" data-name="Rectangle 1985" width="8" height="3" rx="1.5" transform="translate(366.818 1238.197) rotate(45)" fill="#fff" />
                                            <rect id="Rectangle_1986" data-name="Rectangle 1986" width="12" height="3" rx="1.5" transform="translate(369.697 1242.682) rotate(-45)" fill="#fff" />
                                        </g>
                                    </svg><p className="checkbox-p">Are you constantly applying for jobs, only to end up with no interviews and your time wasted?</p>
                                </div>
                                <div className="marian-row">
                                    <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <g id="Group_30" data-name="Group 30" transform="translate(-360 -1228)">
                                            <rect id="Rectangle_1984" data-name="Rectangle 1984" width="24" height="24" rx="5" transform="translate(360 1228)" fill="#17bc9c" />
                                            <rect id="Rectangle_1985" data-name="Rectangle 1985" width="8" height="3" rx="1.5" transform="translate(366.818 1238.197) rotate(45)" fill="#fff" />
                                            <rect id="Rectangle_1986" data-name="Rectangle 1986" width="12" height="3" rx="1.5" transform="translate(369.697 1242.682) rotate(-45)" fill="#fff" />
                                        </g>
                                    </svg><p className="checkbox-p">Is your resume not getting you the job opportunities you want?</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-6 text-center gray-item">
                                <img rel="preload" src={`${Globals.publicUrl}/assets/images/paragraph-pointer.png`} className="img-responsive img-centered" alt="" />
                                <p> If you answered <span>yes</span> to one or both of the above, <br /> then you’re in dire need of our resume experts! </p>
                            </div>
                            <div className="col-12 col-sm-6 text-center gray-item">
                                <img rel="preload" src={`${Globals.publicUrl}/assets/images/paragraph-pointer.png`} className="img-responsive img-centered" alt="" />
                                <p> For 15 years, creating breathtaking resumes <br /> and cover letters has been our specialty.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="portfolio">
                    <WritingProcess resumeText={this.state.resumeText} />
                </section>
                <section className="success success-container-fluid1" >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <div className="p-button text-center">
                                    <a
                                        style={
                                            {
                                                textDecoration: 'underline', color: '#fff'
                                            }
                                        }
                                        onClick={this.handleCompPriceClick}
                                    > View {this.state.resumeText} writing service competitors
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="rewrite" className="gray rewrite-additional-padding-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 rewriteRow">
                                <h2>DO I NEED MY {this.state.resumeText} REWRITTEN?</h2>
                                <svg className="bar" xmlns="https://www.w3.org/2000/svg" width="248" height="1" viewBox="0 0 248 1">
                                    <rect id="Rectangle_1996" data-name="Rectangle 1996" width="248" height="1" fill="#bcbcbc" />
                                </svg>
                                <p>Before you get your resume rewritten, here’s the top 5 reasons why people don’t get the jobs they want.</p>
                            </div>

                            <div className="row row-reasons">
                                <div className="col-lg-12">
                                    <h4>
                                        Top 5 Reasons Why Your {this.state.resumeText} Needs Rewriting
                                    </h4>
                                    <div className="item">
                                        <div className="circle">
                                            <svg xmlns="https://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                                                <circle id="Ellipse_10" data-name="Ellipse 10" cx="6" cy="6" r="6" fill="#16b697" />
                                            </svg>
                                        </div>
                                        <span>There’s no summary that shows your target job and the reasons why you should have that job.</span>
                                    </div>
                                    <div className="item">
                                        <div className="circle">
                                            <svg xmlns="https://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                                                <circle id="Ellipse_10" data-name="Ellipse 10" cx="6" cy="6" r="6" fill="#16b697" />
                                            </svg>
                                        </div>
                                        <span>The format/template looks boring, unappealing, and unprofessional.</span>
                                    </div>
                                    <div className="item">
                                        <div className="circle">
                                            <svg xmlns="https://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                                                <circle id="Ellipse_10" data-name="Ellipse 10" cx="6" cy="6" r="6" fill="#16b697" />
                                            </svg>
                                        </div>
                                        <span>Your resume is riddled with poor word choice and weak language.</span>
                                    </div>
                                    <div className="item">
                                        <div className="circle">
                                            <svg xmlns="https://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                                                <circle id="Ellipse_10" data-name="Ellipse 10" cx="6" cy="6" r="6" fill="#16b697" />
                                            </svg>
                                        </div>
                                        <span>The experiences you list don’t count and don’t show your real value.</span>
                                    </div>
                                    <div className="item">
                                        <div className="circle">
                                            <svg xmlns="https://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                                                <circle id="Ellipse_10" data-name="Ellipse 10" cx="6" cy="6" r="6" fill="#16b697" />
                                            </svg>
                                        </div>
                                        <span>Some of the experiences you list are impressive to you—but not your employer. </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section >
                    <GuaranteeTxt resumeText={this.state.resumeText} />
                </section> */}

                <section className="success success2" >
                    <OrderCV text={`Creating ${this.state.resumeText.toLowerCase()}s that get 40% more job interviews!`} />
                </section>
                <section >
                    <Writer writers={this.state.writers} />
                </section>
                <section className="success3" >
                    <OrderCV text={`Making ${this.state.resumeText}s That Get More Job Interviews `} />
                </section>
                <section>
                    <Client clients={this.state.clients} />
                </section>
                <section className="success" >
                    <HowDoesItWork resumeText={this.state.resumeText} />
                </section>
                <section className="productsServicesContainer-section gray-bg">
                    <div className="container productsServicesContainer">
                        <div className="row">
                            <div className="col-lg-12 productsServices">
                                <h2>PRODUCTS & SERVICES</h2>
                                <svg className="bar" xmlns="https://www.w3.org/2000/svg" width="248" height="1" viewBox="0 0 248 1">
                                    <rect id="Rectangle_1996" data-name="Rectangle 1996" width="248" height="1" fill="#bcbcbc" />
                                </svg>
                            </div>
                        </div>
                        <div className="row productsServicesItems-row">
                            <div className="col-sm-12">
                                {homeData.productLinks.map(dat =>
                                    (
                                        <div className="pBox" key={dat.name}>
                                            <p className="col-sm-3">
                                                {dat.external &&
                                                    <a href={dat.link}>{dat.name}</a>
                                                }
                                                {!dat.external &&
                                                    <Link to={dat.link}>{dat.name}</Link>
                                                }
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </section>
                <section id="feedback" className="gray gray-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 feedback-header">
                                <h2>Free Confidential {this.state.resumeText} Feedback</h2>
                                <svg className="bar" xmlns="https://www.w3.org/2000/svg" width="248" height="1" viewBox="0 0 248 1">
                                    <rect id="Rectangle_1996" data-name="Rectangle 1996" width="248" height="1" fill="#bcbcbc" />
                                </svg>
                                <p>
                                    Let’s have a chat—fill out the form below, and we’ll get in touch with you as soon as possible. We’ll have a short discussion about whether or not your {this.state.resumeText} has a chance in the current job market. We’ll discuss your career goals, how to improve your {this.state.resumeText}, and any {this.state.resumeText} writing services you may need. The best part? The consultation is completely free and is non-obligatory!
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 text-center feedback-card">
                                <div className="feedback-card-inside">
                                    <div className="image-circle"><img rel="preload" className="img-circle" src={require('../../assets/img/jonathan-home.jpg')} alt="russ_round_headshot" width="187" height="187" /></div><p /><h5>Jonathan Hedvat</h5><p>Job Board Owner for 20 years</p>
                                </div>
                            </div>
                            <div className="col-md-8 form-div">
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
export default withRouter(connect(mapStateToProps)(HomePage));
