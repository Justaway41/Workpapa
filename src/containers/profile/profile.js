import React, { Component } from 'react';

import ScrollToTop from '../../components/scrolltotop/scrolltotop';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

import profileData from '../../data/profile.json';

// const getProfile = profileId => profileData.find(data => data.id === profileId);
class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: this.getProfile(this.props.match.params.id)
        };
    }

    getProfile = profileId => profileData.find(data => data.id === profileId);

    render() {
        if (!this.state.profile) {
            return null;
        }
        const {
            name, location, service, about
        } = this.state.profile;
        return (
            <div>
                <ScrollToTop />
                <Header {...this.props} />
                <section id="privacy">
                    <div className="top-spacer" >
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <h2>{name}</h2>
                                    <hr className="star-primary" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-8 col-sm-offset-3 ">
                                    <div className="col-sm-4"><strong>Location:</strong> {location}</div>
                                    <div className="col-sm-8 "><strong>Service:</strong>{service}</div>
                                    <div className="col-sm-12">
                                        <strong>About:</strong>
                                        <p className="small">{about}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}

export default ProfilePage;
