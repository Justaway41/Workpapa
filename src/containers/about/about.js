import React from 'react';
import { Helmet } from 'react-helmet';

import ScrollToTop from '../../components/scrolltotop/scrolltotop';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

const AboutPage = () =>
    (
        <div>
            <ScrollToTop />
            <Header {...this.props} />
            <Helmet>
                <title>WorkPapa | About Us</title>
            </Helmet>
            <section id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2>About Workpapa</h2>
                            <hr className="star-primary" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-10 col-sm-offset-1 ">
                            <p className="small">
                                    Workpapa is all about giving you the tools you need to land the job you want. Our team comes from the creativejobscentral.com site where we learned that transparency between jobseekers and employers is the way to learn how to get to where you want to be.
                            </p>
                            <br /><br />
                            <p className="small">
                                    We offer services to jobseekers that lets them know when their resume was read and helps them get their resume fixed at all levels of their career.
                            </p>
                            <br /><br />
                            <p className="small">
                                    Getting People Jobs Since 2002<br />
                                    Since 2005, <strong>we’ve helped millions of people</strong> in America, Canada, Australia and UK (and beyond!) discover their career path, build stronger resumes, interview with confidence, and boost their chances of finding the right job in less time
                            </p>
                            <br /><br />
                            <p className="small">
                                    The idea for Workpapa came about when our CEO, Jonathan Hedvat, was surveying jobseekers and asking them what they were missing from their job search. When the idea for work papa came alive, we put out a video on Facebook and the magic started.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
export default AboutPage;

