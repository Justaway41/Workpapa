import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ScrollToTop from '../../components/scrolltotop/scrolltotop';

// import CommunityPlan from './communityplan';

class CommunityStep1Page extends Component {
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
                            <p className="small">STEP 2 OF 3 </p>
                            <h4>Sign up to start your free month.</h4>
                            <p className="small">Use your email and create a password to watch Netflix on any device at any time.</p>
                            <Link className="btn btn-lg btn-outline btn-success" to="/textlibrary/signup-step2" >CONTINIUE</Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default CommunityStep1Page;
