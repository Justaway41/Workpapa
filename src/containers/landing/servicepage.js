import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import { Button, Modal } from 'react-bootstrap';
// import Lightbox from 'react-images';
// import Img from 'react-image';
import ReactHtmlParser from 'react-html-parser';

import Util from '../../helpers/util.class';

import ScrollToTop from '../../components/scrolltotop/scrolltotop';
// import ImageLightbox from '../../components/imagelightbox/imagelightbox';
// import SalaryPricing from '../../components/pricing/salarypricing';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FeedBack from '../../components/feedback/feedback';
import profileData from '../../data/profile.json';
// import metaData from '../../data/metadata.json';
// import templateData from '../../data/resumedone.json';
import OtherApi from '../../api/otherApi';

// import {
//     PriceComp,
// } from './homecommon';

class ServicePage extends Component {
    constructor(props) {
        super(props);
        this.showModal = true;
        const mailinglist = Util.getDataFromLocalStorage('mailinglist', 'string');
        if (mailinglist) {
            this.showModal = false;
        }
        // this.templateData = templateData;
        this.state = this.initialize();
        // this.getGallaryArray();
    }
    componentDidMount() {
        this.updateState(this.props);
        OtherApi.getMetaData(this.pageUrl)
            .then((result) => {
                if (result.status === 'Success') {
                    this.setState({
                        metaData: result.data
                    });
                }
            });
    }
    componentWillReceiveProps(nextProps) {
        // if(this.props.geo !== nextProps.geo){
        this.updateState(nextProps);
        // }
    }
    initialize = () => {
        if (this.props.match.params.country) {
            this.country = Util.validateCountry(this.props.match.params.country);
        } else {
            this.country = Util.validateCountry('ae');
        }
        this.pageUrl = this.props.match.params.url;
        this.city = this.props.match.params.city;

        return {
            countryCode: 'US',
            country: this.country,
            resumeText: 'resume',
            bannerImg: '',
            metaData: {
                meta_title: '',
                meta_description: '',
                meta_keyword: '',
                page_h1: '',
                page_p: ''
            },
            showModal: this.showModal,
        };
    };

    handlePopupStatus = (showModal) => {
        // this.setState(showModal);
        this.setState(showModal);
    }

    updateState = (props) => {
        if (props.geo.countryCode) {
            if (!this.props.match.params.country) {
                this.country = Util.validateCountry(props.geo.countryCode);
                this.setState({
                    country: this.country,
                    resumeText: Util.getResumeTxt(this.country),
                });
            }
            // countryCode = 'ae';
            if (this.country === 'in' || this.country === 'sa' || this.country === 'ae') {
                this.setState({ bannerImg: require(`../../assets/img/home_${this.country}_banner.jpg`) });
            } else {
                this.setState({ bannerImg: require('../../assets/img/home_us_banner.jpg') });
            }
            // this.setState({resumeText: Util.getResumeTxt(countryCode)});
        }
    }

    closePopup = () => {
        this.setState({ showModal: false });
    }
    // createImage = (image, classname) => <img rel="preload" src={require(`../../assets/img/${image}`)} className={classname} alt={image} key={image} />
    render() {
        const meta = {
            title: this.state.metaData.meta_title,
            description: this.state.metaData.meta_description,
            meta: {
                name: {
                    keywords: this.state.metaData.meta_keyword
                }
            }
        };

        return (
            <div>
                <ScrollToTop />
                <Header country={this.state.country} profile={this.props.profile} {...this.props} />
                <DocumentMeta {...meta} />

                <header>
                    <div className="banner" style={{ background: `url(${this.state.bannerImg}) 50% center / cover no-repeat` }} >
                        <div className="container home">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    {this.state.metaData.page_h1 &&
                                    <div className="intro-text" style={{ width: '80%' }}>
                                        <div>
                                            <h2>{ReactHtmlParser(this.state.metaData.page_h1)}</h2>
                                            <div>
                                                <h2>Our professional writers rewrite your FAST!<br /> Get an interview within 30 days, GUARANTEED!</h2>
                                                <div className="skills"> We offer the best deals, starting now</div>
                                            </div>
                                        </div>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <section>
                    <div className="container">
                        <h2>Top Profiles</h2>
                        <table className="table table-striped">
                            <thead><tr><th>Name</th><th>Location</th><th>Service</th></tr></thead>
                            <tbody>
                                {profileData && profileData.map(data =>
                                    (
                                        <tr key={data.id}>
                                            <td><Link to={`/servicepage/profile/${data.id}`}>{data.name}</Link></td>
                                            <td>{data.location}</td>
                                            <td>{data.service}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </section>
                <Footer />
                <Modal show={this.state.showModal} onHide={this.closePopup} >
                    <Modal.Header closeButton>
                        <h2 className="text-center">Get a free resume & CV review today!</h2>
                    </Modal.Header>
                    <div className="text-center">
                        <div style={{ fontSize: '2.5rem', color: 'gray', fontStyle: 'italic' }}>
                        You’ll get 10% off your order plus
                        </div>
                        <div style={{ fontSize: '2.5rem', color: 'gray', fontStyle: 'italic' }}>
                        our free resume writing e-book!
                        </div>
                    </div>
                    <Modal.Body className="text-center">
                        <FeedBack resumeText={this.state.resumeText} btnText="Get 10% off my order!" supText1="We offer high-quality writing services for the best deal!" supText2={`We'll request your ${this.state.resumeText} later via Email`} btnclass="btn-danger" doAction={this.closePopup} />
                    </Modal.Body>
                    <Modal.Footer>
                        No Thanks | <Button onClick={this.closePopup}>Close X</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        geo: state.location,
        packages: state.packages,
        profile: state.profile
    };
}
export default withRouter(connect(mapStateToProps)(ServicePage));
