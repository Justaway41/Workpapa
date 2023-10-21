import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import CommunityPlan from './communityplan';
import ScrollToTop from '../../components/scrolltotop/scrolltotop';

class CommunityStep3Page extends Component {
    // constructor() {
    //     super();
    // }
    handlePopupStatus = (showModal) => {
        this.setState(showModal);
    }
    render() {
        return (
            <section id="cummunity">
                <ScrollToTop />
                <div className="row">
                    <div className="container">
                        <div className="col-lg-12 text-center" style={{ marginTop: '20px' }}>
                            <h4><i className="fa fa-lock fa-4x" /></h4>
                            <p className="small">STEP 3 OF 3 </p>
                            <h4>Set up your payment.</h4>
                            <p className="small">Cancel before 12/10/18 if you don’t want to be charged.</p>
                            <p className="small">As a reminder, we'll email you 3 days before.</p>
                            <p className="small"><strong>No commitments. Cancel online at any time.</strong></p>
                            <Link className="btn btn-lg btn-outline payment" style={{ fontSize: '24px' }} to="/textlibrary/signup-step4" >Credit or Debit Card &nbsp;&nbsp;&nbsp;<i className="fab fa-cc-visa fa-3" aria-hidden="true" /> <i className="fab fa-cc-mastercard fa-3" aria-hidden="true" /> &nbsp;&nbsp;&nbsp;<i className="fa fa-angle-right fa-3" aria-hidden="true" /></Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default CommunityStep3Page;
