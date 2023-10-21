import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ScrollToTop from '../../components/scrolltotop/scrolltotop';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { WritingProcess } from './homecommon';
import MailingList from '../../components/mailinglist/mailinglist';

class CoverLetterPage extends Component {
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
                    <title>Workpapa | Cover letter to make your resume shine</title>
                </Helmet>

                <div className="wrapTheWholePage ">
                    <header className="hero hidden-xs">
                        <div className="professionalHeadline container full_width " style={{ paddingTop: '0px' }}>
                            <div className="intro-text" style={{ background: 'none', width: '100%' }}>
                                <h1>Cover letter to make your resume shine</h1>
                                <div className="skills"> An expertly written and keyword-optimized resume that sets you apart.</div>
                            </div>
                        </div>
                    </header>

                    <section id="portfolio">
                        <div className="container">
                            <div className="col-md-4 portfolio-item">
                                <div className="portfolio-link text-center">
                                    <h4 className="">Cover Letter writing</h4>
                                    <i className="far fa-file fa-5x" />
                                    <div className="description">
                                        Professional formatting, Option to talk with writer, Specialists in 60 industries
                                    </div>
                                    <div >
                                        <Link className="btn btn-lg btn-outline btn-success" to="/payment/servicemenu/CLS/ECR" >Get Started <i className="fas fa-arrow-circle-right" /></Link>
                                        {/* <a className="btn btn-lg btn-outline btn-success" >Get Started</a> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="col two_thirds">
                                    <div className="col full_col">
                                        <h3>Our ultimate goal is to help you land your dream job.</h3>
                                        <p className="small">
                                        The cover letter is a necessary component of the job search. The honest truth is that the cover letter is imperative to a successful job search. It shows effort, thought and can increase your chances of getting found in an Applicant Tracking System. Our cover letter writing service is designed to enhance your job prospects while developing an engaging interaction with a prospective employer.
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

                    <section id="portfolio">
                        <WritingProcess />
                    </section>
                    <MailingList showModal={this.state.showModal} handlePopupStatus={this.handlePopupStatus} />
                </div>
                <Footer />
            </div>
        );
    }
}
export default CoverLetterPage;
