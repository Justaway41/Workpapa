/* eslint-disable */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import ScrollToTop from '../../components/scrolltotop/scrolltotop';

import Auth from '../../helpers/auth.class';

class CommunityConfirmation extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
    }

    componentWillMount() {
        if (!this.state.userId) {
            console.log(`user not found ${this.state.userId}`);
            this.props.history.push(`/payment/addon/${this.props.match.params.package}`);
        }
    }

    initialize = () => {
        const currentUser = Auth.getUser();
        let userId;
        if (!currentUser) {
            userId = '';
        } else {
            userId = currentUser.id_user;
        }
        return {
            loader: false,
            msg: '',
            error: '',
            userId,
        };
    }

    render() {
        return (
            <div>
                <ScrollToTop />
                <Helmet>
                    <title>WorkPapa | Confirmation</title>
                </Helmet>
                <div className="top-spacer">
                    <div className="container block " id="purchase_form">
                        <div className="row">
                            <div className="col-lg-12 ">
                                <div className="text-center">
                                    <h2>Congratulations for signing up with Workpapa</h2>
                                    <hr className="star-primary" />
                                    <Link className="btn btn-lg btn-outline btn-profile btn-success" to="/member/textlibrary" >CONTINUE <i className="fas fa-arrow-circle-right" /></Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Google Code for payment page Conversion Page --> */}
                <script type="text/javascript">
                    {/* <![CDATA[ */}
                var google_conversion_id = 854039393;
                var google_conversion_language = "en";
                var google_conversion_format = "3";
                var google_conversion_color = "ffffff";
                var google_conversion_label = "bxyDCOjVmnEQ4baelwM";
                var google_remarketing_only = false;
                    {/* ]]> */}
                </script>
                <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js" />
                <noscript>
                    <div style={{ display: 'inline' }}>
                        <img height="1" width="1" style={{ borderStyle: 'none' }} alt="" src="//www.googleadservices.com/pagead/conversion/854039393/?label=bxyDCOjVmnEQ4baelwM&amp;guid=ON&amp;script=0" />
                    </div>
                </noscript>
            </div>
        );
    }
}

export default CommunityConfirmation;
