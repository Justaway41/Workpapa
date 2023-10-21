import React from 'react';
import { Helmet } from 'react-helmet';
import ScrollToTop from '../../components/scrolltotop/scrolltotop';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FAQ from '../../components/faq/faq';

const FAQPage = () =>
    (
        <div>
            <ScrollToTop />
            <Header {...this.props} />
            <Helmet>
                <title>WorkPapa | FAQ</title>
            </Helmet>
            <section id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2>Frequently Asked Questions</h2>
                            <hr className="star-primary" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-10 col-sm-offset-1 ">
                            <FAQ />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );

export default FAQPage;
