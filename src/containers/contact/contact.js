import React from 'react';
import { Helmet } from 'react-helmet';

import ScrollToTop from '../../components/scrolltotop/scrolltotop';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Contact from '../../components/contact/contact';

const ContactPage = () =>
    (
        <div>
            <ScrollToTop />
            <Header {...this.props} />
            <Helmet>
                <title>WorkPapa | Contact Us</title>
            </Helmet>
            <section id="contact">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2>Contact Us</h2>
                            <hr className="star-primary" />
                            <p className="small">If you can&apos;t find what you&apos;re looking for regarding our resume writing service or our resume writers, reach out to us! You can email WorkPapa at <strong>support@workpapa.com</strong>, or by using the form below. We&apos;re here to answer any questions you may have about the workpapa experience.</p>
                        </div>
                    </div>
                    <Contact btnTxt="Email WorkPapa Support" />
                </div>
            </section>
            <Footer />
        </div>
    );

export default ContactPage;
