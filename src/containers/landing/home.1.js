import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../../assets/css/theme/style.css';
import '../../assets/css/theme/blue/blue.css';

// import Globals from '../../helpers/constant';

const bannerImg = require('../../assets/img/home_us_banner.jpg');

class HomeNewPage extends Component {
    // constructor(props) {
    //     super(props);
    // }
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <header id="header" className="header header-fixed">
                    <div className="header-inner">
                        <nav className="navbar navbar-expand-lg p-0" id="singlepage-nav">
                            <div className="logo">
                                <a data-toggle="collapse" data-target=".navbar-collapse.show" className="navbar-brand link-menu scroll-to-target" href="#mainslider">
                                    <img id="logo-light" className="logo-light" src="img/logo-white.png" alt="logo-light" />
                                </a>
                            </div>
                            <button className="navbar-toggler p-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span id="icon-toggler">
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                </span>
                            </button>
                            <div className="collapse navbar-collapse nav-menu" id="navbarSupportedContent">
                                <ul className="nav-menu-inner ml-auto">
                                    <li><a data-toggle="collapse" data-target=".navbar-collapse.show" className="link-menu" href="#mainslider"><i className="fa fa-home" /> home</a></li>
                                    <li><a data-toggle="collapse" data-target=".navbar-collapse.show" className="link-menu" href="#about"><i className="fa fa-user" /> about</a></li>
                                    <li><a data-toggle="collapse" data-target=".navbar-collapse.show" className="link-menu" href="#services"><i className="fa fa-cog" /> services</a></li>
                                    <li><a data-toggle="collapse" data-target=".navbar-collapse.show" className="link-menu" href="#portfolio"><i className="fa fa-image" /> portfolio</a></li>
                                    <li><a data-toggle="collapse" data-target=".navbar-collapse.show" className="link-menu" href="#team"><i className="fa fa-user" /> team</a></li>
                                    <li><a data-toggle="collapse" data-target=".navbar-collapse.show" className="link-menu" href="#blog"><i className="fa fa-comments" /> blog</a></li>
                                    <li><a data-toggle="collapse" data-target=".navbar-collapse.show" className="link-menu" href="#contact"><i className="fa fa-envelope" /> contact</a></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </header>

                <section className="mainslider" id="mainslider">
                    <header>
                        <div className="banner" style={{ background: `url(${bannerImg}) 50% center / cover no-repeat`, marginTop: '55px' }} >
                            <div className="container home">
                                <div className="row">
                                    <div className="col-lg-12 text-center">
                                        <div className="intro-text" style={{ width: '80%' }}>
                                            <div>
                                                <h2>Our professional writers rewrite your FAST!
                                                    <br />Get an interview within 30 days, GUARANTEED!
                                                </h2>
                                                <div className="skills" />
                                            </div>
                                        </div>
                                        <a href="/#rewrite" className="custom-button slider-button scroll-to-target" >GET PRICING & INTERVIEWS</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </section>
                { /*
                <section className="mainslider" id="mainslider">
                    <div
                        id="rev_slider_wrapper"
                        className="rev_slider_wrapper fullwidthbanner-container"
                        style={{
                            margin: '0px auto', backgroundColor: 'transparent', padding: '0px', marginTop: '0px', marginBottom: '0px'
                        }}
                    >
                        <div id="rev_slider" className="rev_slider fullwidthabanner" data-version="5.0.7">
                            <ul>
                                <li data-index="rs-235" data-transition="fade" data-slotamount="default" data-easein="default" data-easeout="default" data-masterspeed="1500" data-rotate="0" data-saveperformance="off" data-title="Intro" data-description="">
                                    <img src="http://via.placeholder.com/1920x1080" alt="" data-bgposition="center center" data-bgfit="cover" data-bgrepeat="no-repeat" data-bgparallax="5" className="rev-slidebg" data-no-retina />
                                    <div className="tp-caption tp-resizeme rs-parallaxlevel-1" id="slide-235-layer-1" data-x="['right','right','center','center']" data-hoffset="['-254','-453','70','60']" data-y="['middle','middle','middle','bottom']" data-voffset="['50','50','211','25']" data-width="none" data-height="none" data-whitespace="nowrap" data-transform_idle="o:1;" data-transform_in="x:right;s:1500;e:Power3.easeOut;" data-transform_out="opacity:0;s:1500;e:Power4.easeIn;s:1500;e:Power4.easeIn;" data-start="2500" data-responsive_offset="on" style={{ zIndex: '5' }}>
                                        <img src="img/revolution-slider/product/macbookpro.png" alt="" width="1000" height="600" data-ww="['1000px','1000px','500px','350px']" data-hh="['600px','600px','300px','210px']" data-no-retina />
                                    </div>

                                    <div
                                        className="tp-parallax-wrap"
                                        style={{
                                            position: 'absolute', visibility: 'visible', left: '27px', top: '151px', zIndex: '11'
                                        }}
                                    >
                                        <div className="tp-loop-wrap" style={{ position: 'absolute' }}>
                                            <div
                                                className="tp-mask-wrap"
                                                style={{
                                                    position: 'absolute', overflow: 'visible', height: 'auto', width: 'auto'
                                                }}
                                            >
                                                <div
                                                    className="tp-caption NotGeneric-Title  tp-resizeme rs-parallaxlevel-0"
                                                    id="slide-235-layer-7"
                                                    data-x="['left','left','left','left']"
                                                    data-hoffset="['30','30','200','80']"
                                                    data-y="['middle','middle','top','top']"
                                                    data-voffset="['-110','-110','137','130']"
                                                    data-fontsize="['90','90','75','75']"
                                                    data-lineheight="['90','90','75','70']"
                                                    data-width="none"
                                                    data-height="none"
                                                    data-whitespace="nowrap"
                                                    data-transform_idle="o:1;"
                                                    data-transform_in="x:-50px;opacity:0;s:1000;e:Power2.easeOut;"
                                                    data-transform_out="opacity:0;s:1500;e:Power4.easeIn;s:1500;e:Power4.easeIn;"
                                                    data-start="1000"
                                                    data-splitin="none"
                                                    data-splitout="none"
                                                    data-responsive_offset="on"
                                                    style={{
                                                        zIndex: '11', whiteSpace: 'nowrap', visibility: 'inherit', transition: 'none 0s ease 0s', lineHeight: '79px', borderWidth: '0px', margin: '0px', padding: '9px 0px', letterSpacing: '0px', fontWeight: '800', fontSize: '79px', minHeight: '0px', minWidth: '0px', maxHeight: 'none', maxWidth: 'none', opacity: '1', transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)', transformOrigin: '50% 50% 0px'
                                                    }}
                                                >WE ARE<br /> SALIMO
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="tp-parallax-wrap"
                                        style={{
                                            position: 'absolute', visibility: 'visible', left: '27px', top: '515px', zIndex: '14'
                                        }}
                                    >
                                        <div className="tp-loop-wrap" style={{ position: 'absolute' }} >
                                            <div
                                                className="tp-mask-wrap"
                                                style={{
                                                    position: 'absolute', overflow: 'visible', height: 'auto', width: 'auto'
                                                }}
                                            >
                                                <div
                                                    className="tp-caption"
                                                    data-x="['left','left','left','left']"
                                                    data-hoffset="['30','30','200','80']"
                                                    data-y="['middle','middle','top','top']"
                                                    data-voffset="['238','238','456','420']"
                                                    data-width="none"
                                                    data-height="none"
                                                    data-whitespace="nowrap"
                                                    data-transform_idle="o:1;"
                                                    data-transform_in="x:-50px;opacity:0;s:1000;e:Power2.easeOut;"
                                                    data-transform_out="opacity:0;s:1500;e:Power4.easeIn;s:1500;e:Power4.easeIn;"
                                                    data-start="1750"
                                                    data-splitin="none"
                                                    data-splitout="none"
                                                    data-responsive_offset="on"
                                                    data-responsive="off"
                                                    style={{
                                                        zIndex: '14', whiteSpace: 'nowrap', letterSpacing: '1px', visibility: 'inherit', transition: 'none 0s ease 0s', lineHeight: '22px', borderWidth: '0px', margin: '0px', padding: '0px', fontWeight: '400', fontSize: '14px', minHeight: '0px', minWidth: '0px', maxHeight: 'none', maxWidth: 'none', opacity: '1', transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)', transformOrigin: '50% 50% 0px'
                                                    }}
                                                >
                                                    <a href="#about" className="custom-button slider-button scroll-to-target">
                                                        <span data-hover="learn more about us">learn more about us</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div className="tp-static-layers" />
                            <div className="tp-bannertimer tp-bottom" style={{ visibility: 'hidden !important' }} />
                        </div>
                    </div>
                </section>
                */ }


                <section id="rewrite" className="team">
                    <div className="container">
                        <div className="text-center top-text">
                            <h1><span>Our</span> Services</h1>
                            <h4>Select a Package</h4>
                        </div>
                        <div className="divider text-center">
                            <span className="outer-line" />
                            <span className="fa fa-users" aria-hidden="true" />
                            <span className="outer-line" />
                        </div>
                        <div className="row team-members magnific-popup-gallery">
                            <div className="col-lg-3 col-md-6 col-sm-12">
                                <div className="team-member">
                                    {/* <a title="Maryana Mori // Manager" href="http://via.placeholder.com/480x600" data-gal="magnific-pop-up[team]" className="team-member-img-wrap">
                                        <img rel="preload" src={`${Globals.publicUrl}/assets/images/svg/resume.svg`} width="50px" className="img-responsive img-centered" alt="" />
                                    </a> */}
                                    <div className="team-member-caption social-icons">
                                        <h4>Resume Rewriting</h4>
                                        <p>Have a resume, I need my existing resume re-writte</p>
                                    </div>
                                    <div className="team-member-desc" style={{ textAlign: 'left' }}>
                                        <ul>
                                            <li>
                                           Your current resume rewritten
                                            </li>
                                            <li>
                                           Professionally written - By expert writers that know your industry and market
                                            </li>
                                            <li>Formatted for your personality - Choose an attractive format from our library that will attract companies</li>
                                            <li>Keyword optimization - Your document will be optimized to pass through ATS (applicant tracking systems)</li>
                                            <li>30-day interview guarantee</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12">
                                <div className="team-member">
                                    {/* <a title="Marco Verratti // Co Founder" href="http://via.placeholder.com/480x600" data-gal="magnific-pop-up[team]" className="team-member-img-wrap">
                                        <img src="http://via.placeholder.com/480x600" alt="team member" />
                                    </a> */}
                                    <div className="team-member-caption">
                                        <h4>Resume Creation</h4>
                                        <p>Don't have a CV, I need workpapa to write one for me</p>
                                    </div>
                                    <div className="team-member-desc" style={{ textAlign: 'left' }}>
                                        <ul>
                                            <li>A brand new resume for you.</li>
                                            <li>Professionally written: Expert writers gather your needs and write a new document</li>
                                            <li>Format for your resume:Choose an attractive format from our library that will attract companies</li>
                                            <li>Keyword optimization - Your document will be optimized to pass through ATS (applicant tracking systems)</li>
                                            <li>30-day interview guarantee</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12">
                                <div className="team-member">
                                    {/* <a title="Emilia Bella // Sales Manager" href="http://via.placeholder.com/480x600" data-gal="magnific-pop-up[team]" className="team-member-img-wrap">
                                        <img src="http://via.placeholder.com/480x600" alt="" />
                                    </a> */}
                                    <div className="team-member-caption social-icons">
                                        <h4>Interview + Job Coaching & Resume Rewriting</h4>
                                        <p>Interview + Job Coaching & Resume Rewriting</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12">
                                <div className="team-member">
                                    {/* <a title="Antonio Conte // Director" href="http://via.placeholder.com/480x600" data-gal="magnific-pop-up[team]" className="team-member-img-wrap">
                                        <img src="http://via.placeholder.com/480x600" alt="team member" />
                                    </a> */}
                                    <div className="team-member-caption social-icons">
                                        <h4>Linkedin Package</h4>
                                        <p>Resume Writing & LinkedIn Profile Rewriting</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="about" className="about">
                    <div className="container">
                        <div className="text-center top-text">
                            <h1><span>About</span> Us</h1>
                            <h4>Who We Are</h4>
                        </div>
                        <div className="divider text-center">
                            <span className="outer-line" />
                            <span className="fa fa-user" aria-hidden="true" />
                            <span className="outer-line" />
                        </div>
                        <div className="row about-content">
                            <div className="col-sm-12 col-md-12 col-lg-6 about-left-side">
                                <h3 className="title-about">WE ARE <strong>WORKPAPA</strong></h3>
                                <hr />
                                <p>We are a leading company sit amet, consectetur adipisicing elit. Minus obcaecati pariatur officiis molestias eveniet harum laudantium obcaecati pariatur officiis molestias eveniet harum laudantium sed optio iste. </p>
                                <div className="tab-content">
                                    <div id="menu1" className="tab-pane fade in active">
                                        <p>
                                            Are you constantly applying for jobs, only to end up with no interviews and your time wasted? Is your resume not getting you the job opportunities you want?
                                        </p>
                                        <p>
                                            If you answered yes to one or both of the above, then you’re in dire need of our resume experts! We know the latest methods to making eye-catching resumes that fit your current industry standards.
                                        </p>
                                        <p>
                                            For 15 years, creating breathtaking resumes and cover letters has been our specialty. We understand every detail that goes into an amazing resume and what makes or breaks it.
                                        </p>
                                    </div>
                                </div>
                                <a className="custom-button scroll-to-target" href="#portfolio">Our Portfolio</a>
                            </div>
                            <div className="col-md-12 col-lg-6 about-right">
                                <div className="about-right-side">
                                    <img className="img-fluid" src="http://via.placeholder.com/1024x681" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="projectmanager" id="projectmanager">
                    <div className="section-overlay">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 col-lg-5">
                                    <img className="img-fluid projectmanagerpicture" src="http://via.placeholder.com/424x424" alt="project manager" />
                                </div>
                                <div className="col-md-12 col-lg-6 offset-lg-1">
                                    <h1>Project Manager</h1>
                                    <h3>Miss Katherina Hale</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus obcaecati pariatur officiis molestias eveniet harum laudantium sed optio iste. Iste, alias, non libero recusandae fugiat praesentium delectus inventore accusamus veniam!
                                    </p>
                                    <blockquote>
                                        " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia "
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="services" className="services">
                    <div className="container">
                        <div className="text-center top-text">
                            <h1><span>Our</span> Services</h1>
                            <h4>What We Doing</h4>
                        </div>
                        <div className="divider text-center">
                            <span className="outer-line" />
                            <span className="fa fa-cogs" aria-hidden="true" />
                            <span className="outer-line" />
                        </div>
                        <div className="row services-box">
                            <div className="col-lg-4 col-md-12 col-sm-12 services-box-item">
                                <span className="services-box-item-cover fa fa-leaf" data-headline="Creative Solutions" />
                                <div className="services-box-item-content fa fa-leaf">
                                    <h2>Creative Solutions</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-12 col-sm-12 services-box-item">
                                <span className="services-box-item-cover fa fa-anchor" data-headline="Featured Services" />
                                <div className="services-box-item-content fa fa-anchor">
                                    <h2>Featured Services</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-12 col-sm-12 services-box-item">
                                <span className="services-box-item-cover fa fa-comments-o" data-headline="Custom Design" />
                                <div className="services-box-item-content fa fa-comments-o">
                                    <h2>Custom Design</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-12 col-sm-12 services-box-item">
                                <span className="services-box-item-cover fa fa-support" data-headline="Technical Support" />
                                <div className="services-box-item-content fa fa-support">
                                    <h2>Technical Support</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-12 col-sm-12 services-box-item">
                                <span className="services-box-item-cover fa fa-cogs" data-headline="Responsive Design" />
                                <div className="services-box-item-content fa fa-cogs">
                                    <h2>Responsive Design</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-12 col-sm-12 services-box-item">
                                <span className="services-box-item-cover fa fa-file-pdf-o" data-headline="Well Documented" />
                                <div className="services-box-item-content fa fa-file-pdf-o">
                                    <h2>Well Documented</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="testimonials">
                    <div className="section-overlay">
                        <div className="container">
                            <div className="text-center top-text">
                                <h1><span>Happy</span> Customers</h1>
                                <h4>Testimonials</h4>
                            </div>
                            <div id="quote-carousel" className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators mx-auto">
                                    <li data-target="#quote-carousel" data-slide-to="0" className="active" />
                                    <li data-target="#quote-carousel" data-slide-to="1" />
                                    <li data-target="#quote-carousel" data-slide-to="2" />
                                </ol>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <blockquote>
                                            <img className="img-circle img-fluid" src="http://via.placeholder.com/112x112" alt="client" />
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiu nt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptat</p>
                                            <h5>Miss Elina Pool</h5>
                                            <h6>Web Developer - Adobe</h6>
                                        </blockquote>
                                    </div>
                                    <div className="carousel-item">
                                        <blockquote>
                                            <img className="img-circle img-fluid" src="http://via.placeholder.com/112x112" alt="client" />
                                            <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu</p>
                                            <h5>Mr. Antoine Varane</h5>
                                            <h6>Sales Manager - Twitter</h6>
                                        </blockquote>
                                    </div>
                                    <div className="carousel-item">
                                        <blockquote>
                                            <img className="img-circle img-fluid" src="http://via.placeholder.com/112x112" alt="client" />
                                            <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit ess</p>
                                            <h5>Miss Lucy Walker</h5>
                                            <h6>Project Manager - Envato</h6>
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="team" className="team">
                    <div className="container">
                        <div className="text-center top-text">
                            <h1><span>Our</span> Team</h1>
                            <h4>Keep in touch</h4>
                        </div>
                        <div className="divider text-center">
                            <span className="outer-line" />
                            <span className="fa fa-users" aria-hidden="true" />
                            <span className="outer-line" />
                        </div>
                        <div className="row team-members magnific-popup-gallery">
                            <div className="col-lg-3 col-md-6 col-sm-12">
                                <div className="team-member">
                                    <a title="Maryana Mori // Manager" href="http://via.placeholder.com/480x600" data-gal="magnific-pop-up[team]" className="team-member-img-wrap">
                                        <img src="http://via.placeholder.com/480x600" alt="team member" />
                                    </a>
                                    <div className="team-member-caption social-icons">
                                        <h4>Maryana Mori</h4>
                                        <p>Manager</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12">
                                <div className="team-member">
                                    <a title="Marco Verratti // Co Founder" href="http://via.placeholder.com/480x600" data-gal="magnific-pop-up[team]" className="team-member-img-wrap">
                                        <img src="http://via.placeholder.com/480x600" alt="team member" />
                                    </a>
                                    <div className="team-member-caption social-icons">
                                        <h4>Marco Verratti</h4>
                                        <p>Co Founder</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12">
                                <div className="team-member">
                                    <a title="Emilia Bella // Sales Manager" href="http://via.placeholder.com/480x600" data-gal="magnific-pop-up[team]" className="team-member-img-wrap">
                                        <img src="http://via.placeholder.com/480x600" alt="" />
                                    </a>
                                    <div className="team-member-caption social-icons">
                                        <h4>Emilia Bella</h4>
                                        <p>Sales Manager</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12">
                                <div className="team-member">
                                    <a title="Antonio Conte // Director" href="http://via.placeholder.com/480x600" data-gal="magnific-pop-up[team]" className="team-member-img-wrap">
                                        <img src="http://via.placeholder.com/480x600" alt="team member" />
                                    </a>
                                    <div className="team-member-caption social-icons">
                                        <h4>Antonio Conte</h4>
                                        <p>Director</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="contactform">
                    <div className="section-overlay">
                        <div className="container">
                            <div className="text-center top-text">
                                <h1><span>Send Us</span> an email</h1>
                                <h4>We are very responsive to messages</h4>
                            </div>
                            <div className="form-container">
                                <form className="formcontact" method="post" action="php/process-form.php">
                                    <div className="row form-inputs">
                                        <div className="col-md-6 form-group custom-form-group">
                                            <span className="input custom-input">
                                                <input placeholder="First Name" className="input-field custom-input-field" id="firstname" name="firstname" type="text" required data-error="NEW ERROR MESSAGE" />
                                                <label className="input-label custom-input-label" >
                                                    <i className="fa fa-user icon icon-field" />
                                                </label>
                                            </span>
                                        </div>
                                        <div className="col-md-6 form-group custom-form-group">
                                            <span className="input custom-input">
                                                <input placeholder="Last Name" className="input-field custom-input-field" id="lastname" name="lastname" type="text" required />
                                                <label className="input-label custom-input-label" >
                                                    <i className="fa fa-user-o icon icon-field" />
                                                </label>
                                            </span>
                                        </div>
                                        <div className="form-group custom-form-group col-md-12">
                                            <textarea placeholder="Message" id="message" name="message" cols="45" rows="7" required />
                                        </div>
                                        <div className="col-md-6 form-group custom-form-group">
                                            <span className="input custom-input">
                                                <input placeholder="Email" className="input-field custom-input-field" id="email" name="email" type="text" required />
                                                <label className="input-label custom-input-label" >
                                                    <i className="fa fa-envelope icon icon-field" />
                                                </label>
                                            </span>
                                        </div>
                                        <div className="col-md-6 submit-form">
                                            <button id="form-submit" name="submit" type="submit" className="custom-button" title="Send">Send Message</button>
                                        </div>
                                        <div className="col-sm-12 text-center output_message_holder d-none">
                                            <p className="output_message" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="footer text-center">
                    <div className="container">
                        <p>
                            &copy; Copyright 2017 Salimo & Designed with <span className="heart">&#10084;</span>
                        </p>
                    </div>
                </footer>
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
export default withRouter(connect(mapStateToProps)(HomeNewPage));
