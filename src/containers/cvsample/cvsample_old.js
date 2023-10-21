import React, { Component } from 'react';
//import { Button } from 'react-bootstrap';

import ScrollToTop from '../../components/scrolltotop/scrolltotop';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import PopUp from '../../components/popup/popup';
import { Helmet } from 'react-helmet'


class CvSamplePage extends Component {
    constructor(){
        super();
        this.state = this.initialize();
    }
    initialize = () => {
        return {
            sampleCv1: false,
            sampleCv2: false,
            sampleCv3: false,
            sampleCv4: false,
            sampleCv5: false,
            sampleCv6: false
        }
    }
    showModal = (showModal) => {
        this.setState(showModal);
    }
    handlePopupStatus =  (showModal) => {
        this.setState(showModal);
    }
    render() {
        const sampleCv1 = props => <img src={require('../../assets/img/cv-sample/sample1.jpg')} alt="Sample CV" title="Sample CV"  style={{'border':'1px solid gray'}} />;
        const sampleCv2 = props => <img src={require('../../assets/img/cv-sample/sample2.jpg')} alt="Sample CV" title="Sample CV"  style={{'border':'1px solid gray'}} />;
        const sampleCv3 = props => <img src={require('../../assets/img/cv-sample/sample3.jpg')} alt="Sample CV" title="Sample CV"  style={{'border':'1px solid gray'}} />;
        const sampleCv4 = props => <img src={require('../../assets/img/cv-sample/sample4.jpg')} alt="Sample CV" title="Sample CV"  style={{'border':'1px solid gray'}} />;
        const sampleCv5 = props => <img src={require('../../assets/img/cv-sample/sample5.jpg')} alt="Sample CV" title="Sample CV"  style={{'border':'1px solid gray'}} />;
        const sampleCv6 = props => <img src={require('../../assets/img/cv-sample/sample6.jpg')} alt="Sample CV" title="Sample CV"  style={{'border':'1px solid gray'}} />;
        return (
            <div>
                <ScrollToTop />
                <Header />
                <Helmet>
                    <title>WorkPapa | Resume Sample</title>
                </Helmet>
                <section id="about">
                <div className="top-spacer" > 
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2>CV Samples</h2>
                                <hr className="star-primary" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 ">
                                 <div className="col-md-3 col-xs-12 ">
                                    <a onClick={() => {this.showModal({sampleCv1: true})}}>
                                        <img src={require('../../assets/img/cv-sample/sample1.jpg')} alt="Sample CV" title="Sample CV" className="img-thumnail" style={{'border':'1px solid gray'}} height="250px" />
                                    </a>
                                </div>
                                <div className="col-md-3 col-xs-12 ">
                                    <a onClick={() => {this.showModal({sampleCv2: true})}}>
                                        <img src={require('../../assets/img/cv-sample/sample2.jpg')} alt="Sample CV" title="Sample CV" className="img-thumnail" style={{'border':'1px solid gray'}} height="250px" />
                                    </a>
                                </div>
                                <div className="col-md-3 col-xs-12 ">
                                    <a onClick={() => {this.showModal({sampleCv3: true})}}>
                                        <img src={require('../../assets/img/cv-sample/sample3.jpg')} alt="Sample CV" title="Sample CV" className="img-thumnail" style={{'border':'1px solid gray'}} height="250px" />
                                    </a>
                                </div>
                                <div className="col-md-3 col-xs-12 ">
                                    <a onClick={() => {this.showModal({sampleCv4: true})}}>
                                        <img src={require('../../assets/img/cv-sample/sample4.jpg')} alt="Sample CV" title="Sample CV" className="img-thumnail" style={{'border':'1px solid gray'}} height="250px" />
                                    </a>
                                </div>
                                
                            </div>
                        </div>
                        <br /><br />
                        <div className="row">
                            <div className="col-sm-12 ">
                                 
                                <div className="col-md-3 col-xs-12 ">
                                    <a onClick={() => {this.showModal({sampleCv5: true})}}>
                                        <img src={require('../../assets/img/cv-sample/sample5.jpg')} alt="Sample CV" title="Sample CV" className="img-thumnail" style={{'border':'1px solid gray'}} height="250px" />
                                    </a>
                                </div>
                                <div className="col-md-3 col-xs-12 ">
                                    <a onClick={() => {this.showModal({sampleCv6: true})}}>
                                        <img src={require('../../assets/img/cv-sample/sample6.jpg')} alt="Sample CV" title="Sample CV" className="img-thumnail" style={{'border':'1px solid gray'}} height="250px" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <br /><br />
                    </div>
                </div>
                </section>

                
                {!!this.state.sampleCv1 &&
                    <PopUp size="large" name="sampleCv1" handlePopupStatus={this.handlePopupStatus} showModal={this.state.sampleCv1} contant={sampleCv1}></PopUp>
                }
                {!!this.state.sampleCv2 &&
                    <PopUp size="large" name="sampleCv2" handlePopupStatus={this.handlePopupStatus} showModal={this.state.sampleCv2} contant={sampleCv2}></PopUp>
                }
                {!!this.state.sampleCv3 &&
                    <PopUp size="large" name="sampleCv3" handlePopupStatus={this.handlePopupStatus} showModal={this.state.sampleCv3} contant={sampleCv3}></PopUp>
                }
                {!!this.state.sampleCv4 &&
                    <PopUp size="large" name="sampleCv4" handlePopupStatus={this.handlePopupStatus} showModal={this.state.sampleCv4} contant={sampleCv4}></PopUp>
                }
                {!!this.state.sampleCv5 &&
                    <PopUp size="large" name="sampleCv5" handlePopupStatus={this.handlePopupStatus} showModal={this.state.sampleCv5} contant={sampleCv5}></PopUp>
                }
                {!!this.state.sampleCv6 &&
                    <PopUp size="large" name="sampleCv6" handlePopupStatus={this.handlePopupStatus} showModal={this.state.sampleCv6} contant={sampleCv6}></PopUp>
                }
                <Footer />
            </div>
        )
    }
}


export default CvSamplePage;