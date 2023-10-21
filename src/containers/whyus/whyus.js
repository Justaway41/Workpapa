import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ScrollToTop from '../../components/scrolltotop/scrolltotop';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

const WhyUsPage = () =>
    (
        <div>
            <ScrollToTop />
            <Header {...this.props} />
            <Helmet>
                <title>WorkPapa | Why WorkPapa</title>
            </Helmet>
            <section id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2>Why Workpapa</h2>
                            <hr className="star-primary" />
                            <p>Because we're committed to your success!</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="col-sm-5 col-sm-offset-1 ">
                                <p className="small">
                                    Preparing You to Get Hired Workpapa was born of the desire to cater to individuals who want to make a great impression and ultimately, land their dream job.
                                </p>
                                <p className="small">
                                    We have been supporting job seekers for over 10 years. As a matter of fact, our statistics show that 70% of our members surveyed get jobs after using Workpapa.
                                </p>
                                <p className="small">
                                    Why are we better than all the resume builder sites that have sprung up in the past few years? Because we're much more than a resume builder. We are a company (based in the U.S.) that truly cares about job seekers. Because of that, we've invested thousands of hours to create the best tools and guidance for our members - from resumes to letters, to interviews, to job acceptance. Workpapa is the whole package.
                                </p>
                                <div className="text-center">
                                    <Link className="btn btn-lg btn-warning" to="/payment/servicemenu/RRS/ECR" >Get Started <i className="fas fa-arrow-circle-right" /></Link>
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <img src={require('../../assets/img/why-workpapa-happy-people.jpg')} className="img-responsive img-centered" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="col-sm-5 col-sm-offset-1 ">
                                <img src={require('../../assets/img/why-workpapa-helpdesk.jpg')} className="img-responsive img-centered" alt="" />
                            </div>
                            <div className="col-sm-5">
                                <p className="small">
                                    Of course, we know you can find free information all over the Internet. So, why use us? Well, for starters, we've gone the extra mile to consult actual Hiring Managers from different industries to get the story on what they are looking for in resumes, letters and interviews. We've put all that first-hand knowledge into our tools and tips.
                                </p>
                                <p className="small">
                                    Weve also invested in our people - when you talk with our Customer Care Specialists, you are talking to Certified Professional Resume Writers. They can do more than just provide technical support - they can help you solve a gap in your employment history, address a career change, and even write a professional resume or letter for you.
                                </p>
                                <p className="small">
                                    Think about how much faster, easier and better your job search will be when you understand what companies are thinking and it's no longer about 'just needing a resume'. You can really put your talent and skills to work in the right setting for you and the employer and Boom! - your career becomes more than just a job. The end result? A better life - both personally and professionally. Isn't that what we ALL want?
                                </p>
                                <div className="text-center">
                                    <Link className="btn btn-lg btn-warning" to="/payment/servicemenu/RRS/ECR" >Get Started <i className="fas fa-arrow-circle-right" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="col-sm-10 col-sm-offset-1 text-center">
                                <h3>Hear What Our Customers Are Saying</h3>
                                <p className="small">
                                I am very happy with my CV, I could not have written it better myself. Delighted with the excellent service from Workpapa. Both my CV and cover letter were brilliantly revamped! Great value for money and also very quick turnaround with the express service if you are in a rush. Service was excellent and on time.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
export default WhyUsPage;

