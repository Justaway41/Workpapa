import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import ScrollToTop from '../../../components/scrolltotop/scrolltotop';
// import HeaderLoggedIn from '../../../components/header/headerloggedin';
// import Footer from '../../../components/footer/footer';

class DashBoardPage extends Component {
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        if (this.props.geo !== nextProps.geo) {
            // this.setState({converstionRate: nextProps.geo.currencyConverter, currency: Util.currency(nextProps.geo.currencyCode), resumeText: Util.getResumeTxt(nextProps.geo.countryCode)});
        }
    }
    render() {
        return (
            <div>
                <ScrollToTop />

                <Helmet>
                    <title>WorkPapa | Track Resume Status</title>
                </Helmet>
                <section id="about">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2>DashBoard</h2>
                                <hr className="star-primary" />
                            </div>
                        </div>
                        <div className="row" />
                    </div>
                </section>

            </div>
        );
    }
}

export default DashBoardPage;
