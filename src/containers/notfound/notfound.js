import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

const NotFoundPage = props => (
    <div>
        <Header {...props} />
        <Helmet>
            <title>WorkPapa | 404</title>
        </Helmet>
        <section id="about">
            <div className="top-spacer" >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2>404. That’s an error.</h2>
                            <hr className="star-primary" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-10 col-sm-offset-1 ">
                            <p className="small text-center">
                                    The requested URL was not found on this server.<br /> That&apos;s all we know.
                            </p>
                            <br /><br />

                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </div>
);

export default NotFoundPage;
