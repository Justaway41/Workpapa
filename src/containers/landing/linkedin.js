import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ScrollToTop from '../../components/scrolltotop/scrolltotop';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
// import { WritingProcess } from './homecommon';
import MailingList from '../../components/mailinglist/mailinglist';

class LinkedInPage extends Component {
    constructor() {
        super();
        this.state = {
            showModal: true
        };
    }
    handlePopupStatus = (showModal) => {
        this.setState(showModal);
    }
    render() {
        return (
            <div>
                <ScrollToTop />
                <Header {...this.props} />
                <Helmet>
                    <title>WorkPapa | Get your LinkedIn profile optimised by a professional </title>
                </Helmet>

                <div className="wrapTheWholePage ">
                    <header className="hero hidden-xs">
                        <div className="professionalHeadline container full_width " style={{ paddingTop: '0px' }}>
                            <div className="intro-text" style={{ background: 'none', width: '100%' }}>
                                <h1>Get your LinkedIn profile optimised by a professional </h1>
                                <div className="skills"> An expertly written and keyword-optimized resume that sets you apart.</div>
                            </div>
                        </div>
                    </header>

                    <section id="portfolio">
                        <div className="container">
                            <div className="col-md-4 portfolio-item">
                                <div className="portfolio-link text-center">
                                    <h4>LinkedIn Rewrite</h4>
                                    <i className="fab fa-linkedin fa-5x" />
                                    <div className="description">
                                Professional formatting, Option to talk with writer, Specialists in 60 industries
                                    </div>
                                    <div>
                                        <Link className="btn btn-lg btn-outline btn-success" to="/payment/servicemenu/LPS/ECR" >Get Started <i className="fas fa-arrow-circle-right" /></Link>
                                        {/* <a className="btn btn-lg btn-outline btn-success" >Get Started</a> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="col two_thirds">
                                    <div className="col full_col">
                                        <h3>Our ultimate goal is to help you land your dream job.</h3>
                                        <p className="small">
                                    LinkedIn is a social media tool that is still very new for many job seekers and social media users. The profile writing is one of the most common concerns of the LinkedIn user. It provides its users with significant benefits that can be utilized to improve your online resume and workforce presence. While it is a great tool to connect with other professionals and learn more about your industry, many users still have questions about how to create Linkedin profile and set up resume in Linkedin. We offer LinkedIn profile optimization services to make your social account more professional.
                                        </p>
                                        <div className="clearfix" />
                                        <h4>Workpapa will improve your entire LinkedIn profile</h4>
                                        <p className="small">
                                            <strong>Includes:</strong><br />
                                        1. Content draft preparation in only one day (if requested).<br />
                                        2. Direct contact with an expert through a call or email.<br />
                                        3. An ability to choose your profile writer<br />
                                        4. Unlimited revisions for 4 days<br />
                                        5. Money back guarantee<br />
                                        </p>

                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-md-12">
                            <h4>LinkedIn Profile Writing Strategy</h4>
                            <p className="small">
                                The profile writing is one of the most common concerns of the LinkedIn user. One of the first things that others will see when accessing your profile is your headline, name and picture. The headline is very important; it is a statement of up to 140 characters which gives you an opportunity to send the reader a very clear message of what you specialize in. When you are writing your work history, avoid copying and pasting your resume. Use the same information to describe your work responsibilities as stated on your resume, with a storytelling approach. Another great feature to take advantage of on your LinkedIn profile is the project section. In your career both academic and professional, you are assigned to projects, and we all have ones that we feel especially proud of. This section opens up a great opportunity for you to provide more information on these projects, these include professional, educational, volunteer and personal endeavors. You can go into full detail, letting people know what you’ve done and what you’ve achieved.
                            </p>
                        </div> */}
                        </div>
                    </section>
                    <MailingList showModal={this.state.showModal} handlePopupStatus={this.handlePopupStatus} />

                </div>
                <Footer />
            </div>
        );
    }
}

export default LinkedInPage;
