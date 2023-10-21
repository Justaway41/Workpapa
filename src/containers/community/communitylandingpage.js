import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import Globals from '../../helpers/constant';

// import CommunityPlan from './component/communityplan';

class CommunityLandingPage extends Component {
    // constructor() {
    //     super();
    // }
    handlePopupStatus = (showModal) => {
        this.setState(showModal);
    }
    render() {
        return (
            <div className="wrapTheWholePage ">
                <header className="hero hidden-xs">
                    <div className="professionalHeadline container full_width " style={{ background: `url(${require('../../assets/img/home_us_banner.jpg')}) 50% center / cover no-repeat` }}>
                        <div className="intro-text text-center" >
                            <h1>Get professionally written documents without limits </h1>
                            <div className="skills"> Enjoy an unlimited number of emails, texts, letters, documents and forms </div>
                            <Link className="btn btn-lg btn-outline btn-profile btn-success" to="/textlibrary/signup-step1" >READ FREE FOR {Globals.community.TRIAL} DAYS <i className="fas fa-arrow-circle-right" /></Link>
                            <br /><small>Cancel anytime</small>
                        </div>
                    </div>
                </header>

                <section id="cummunity">
                    <div className="container">
                        <Tabs defaultActiveKey={1} id="tab-example">
                            <Tab eventKey={1} title="No commitments. Cancel online at any time">
                                <div className="col-xs-12 tab-container">
                                    <div className="col-xs-6">
                                    If you decide Workpapa Library isn't for you - no problem. No commitment. Cancel online anytime.
                                        <div className="text-center">
                                            <Link className="btn btn-lg btn-outline btn-success" to="/textlibrary/signup-step1" >READ FREE FOR {Globals.community.TRIAL} DAYS</Link>

                                        </div>
                                    </div>
                                    <div className="col-xs-6 text-center">
                                        <i className="fa fa-file-alt fa-10x" aria-hidden="true" />
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey={2} title="Watch anywhere">
                                <div className="col-xs-12 tab-container">
                                    <div className="col-xs-8">
                                        <h3>Read professionally written content at any time, anywhere - personalised for you.</h3>
                                    </div>
                                    <div className="col-xs-4 text-center">
                                        <Link className="btn btn-lg btn-outline btn-success" to="textlibrary/signup-step1" >JOIN FREE FOR {Globals.community.TRIAL} DAYS <i className="fas fa-arrow-circle-right" /></Link>
                                    </div>
                                </div>
                                <div className="col-xs-12">
                                    <div className="col-xs-4 text-center">
                                        <i className="fa fa-file-alt fa-10x" aria-hidden="true" />
                                        <h4>Read on your PC/MAC/Laptop</h4>
                                        <p>Watch instantly or download for later, Available on phone and tablet, wherever you go.</p>
                                    </div>
                                    <div className="col-xs-4 text-center">
                                        <i className="fa fa-file-alt fa-10x" aria-hidden="true" />
                                        <h4>Read instantly or download for later</h4>
                                        <p>Available on your phone and tablet wherever you go</p>
                                    </div>
                                    <div className="col-xs-4 text-center">
                                        <i className="fa fa-file-alt fa-10x" aria-hidden="true" />
                                        <h4>Use any computer</h4>
                                        <p>Read right on Workpapa.com.</p>
                                    </div>
                                </div>
                            </Tab>
                            {/* <Tab eventKey={3} title="Pick your price">
                                <div className="col-xs-10 col-xs-offset-1 text-center tab-container">
                                    <h3>Choose one plan and watch everything on Netflix.</h3>
                                    <div className="text-center">
                                        <Link className="btn btn-lg btn-outline btn-success" to="/textlibrary/select-plan" >JOIN FREE FOR A MONTH <i className="fas fa-arrow-circle-right" /></Link>
                                    </div>
                                    <div style={{ padding: '20px' }}>
                                        <CommunityPlan />
                                    </div>
                                </div>
                            </Tab> */}
                        </Tabs>
                    </div>
                </section>
            </div>
        );
    }
}

export default CommunityLandingPage;
