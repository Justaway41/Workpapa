import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ScrollToTop from '../../components/scrolltotop/scrolltotop';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { WritingProcess } from './homecommon';
import MailingList from '../../components/mailinglist/mailinglist';
// import SalaryPricing from '../../components/pricing/salarypricing';
import Util from '../../helpers/util.class';

class ResumeRewritePage extends Component {
    constructor() {
        super();
        this.state = {
            showModal: true
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.geo.countryCode !== this.props.country) {
            this.country = Util.validateCountry(nextProps.geo.countryCode);
        }
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
                    <title>Workpapa | Resume Editing For More Concise Resume</title>
                </Helmet>

                <div className="wrapTheWholePage ">
                    <header className="hero hidden-xs">
                        <div className="professionalHeadline container full_width " style={{ paddingTop: '0px' }}>
                            <div className="intro-text" style={{ background: 'none', width: '100%' }}>
                                <h1>Resume Editing For More Concise Resume</h1>
                                <div className="skills"> An expertly written and keyword-optimized resume that sets you apart.</div>
                            </div>
                        </div>
                    </header>

                    <section id="portfolio">
                        <div className="container">
                            <div className="col-md-4 portfolio-item">
                                <div className="portfolio-link text-center">
                                    <h4>Resume Rewrite</h4>
                                    <i className="far fa-file fa-5x" />
                                    <div className="description">
                                    Resume, cover letter, and LinkedIn profile, created by an executive writer.
                                    </div>
                                    <div>
                                        <Link className="btn btn-lg btn-outline btn-success" to="/payment/servicemenu/RRS/ECR" >Get Started <i className="fas fa-arrow-circle-right" /></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="col two_thirds">
                                    <div className="col full_col">
                                        <h3>Our ultimate goal is to help you land your dream job.</h3>
                                        <p className="small">
                                        Let our resume editors help you make your resume the best it has been yet. We can make your presentation stand out with our editing services! Our writers know how to take an existing piece, identify what information needs to be added and how to organize your document for easy reading. Your new resume will be customized for your targeted industry or employer. We can also help make industry transitions easier.
                                        </p>
                                    </div>
                                </div>
                            </div>

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

function mapStateToProps(state) {
    return {
        geo: state.location,
    };
}
export default withRouter(connect(mapStateToProps)(ResumeRewritePage));

// export default ResumeRewritePage;
