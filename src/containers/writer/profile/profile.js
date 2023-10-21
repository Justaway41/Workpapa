import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import StarRatingComponent from 'react-star-rating-component';
// import { Table } from 'react-bootstrap';
import * as actions from '../../../actions';

// import Util from '../../../helpers/util.class';
import ScrollToTop from '../../../components/scrolltotop/scrolltotop';

// import ProfileApi from '../../../api/profileApi';
// import OtherApi from '../../../api/otherApi';
import Globals from '../../../helpers/constant';
import Auth from '../../../helpers/auth.class';
import WriterApi from '../../../api/writerApi';

class WriterProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: props.profile,
            feedback: {}
        };
    }

    componentDidMount() {
        const writerId = Auth.getWriter().id_writer;
        if (writerId) {
            WriterApi.getFeedback(writerId)
                .then((response) => {
                    if (response.status === 'Success') {
                        this.setState({ feedback: response.data });
                    }
                });
            // .catch((error) => {
            // // this.setState({msg: error, : false});
            //     console.log(error);
            // });
        }
        //     this.props.actions.toggleLoader(true);
        //     ProfileApi.getResumeTrack(userId)
        //         .then((response) => {
        //             if (response.status === 'Success') {
        //                 this.setState({ track: response.data });
        //             }
        //             return response;
        //         })
        //         .then(res => ProfileApi.getTrackMessage(userId, res.data.id_package))
        //         .then((dat) => {
        //             if (dat.status === 'Success') {
        //                 this.setState({ mail: dat.data });
        //             }
        //             this.props.actions.toggleLoader(false);
        //         });

        //     this.props.actions.toggleLoader(true);
        //     ProfileApi.getCompletedResume(userId)
        //         .then((response) => {
        //             if (response.status === 'Success') {
        //                 this.setState({ resumeCompleted: response.data });
        //             }
        //             this.props.actions.toggleLoader(false);
        //         });
        //     // .catch((error) => {
        //     // // this.setState({msg: error, loader: false});
        //     //     console.log(error);
        //     // });
        // }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.profile !== nextProps.profile) {
            this.setState({
                profile: nextProps.profile
            });
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
                    <div className="top-spacer" >
                        <div className="container">
                            {/* <div className="row">
                                <div className="col-lg-12 text-center">
                                    <h2>Track your resume progress</h2>
                                    <hr className="star-primary" />
                                </div>
                            </div> */}
                            {Object.keys(this.state.profile).length > 0 &&
                                <div className="row">
                                    <div className="col-md-7 well">
                                        <div className="row">
                                            <div className="col-md-7">
                                                {this.state.profile.profile_img !== null &&
                                                    <img src={`${Globals.profilePicUrl}/writer/${this.state.profile.profile_img}`} className="img-circle " width="60px" height="60px" alt={this.state.profile.profile_img} />
                                                }
                                                {this.state.profile.profile_img === null &&
                                                    <img src={`${Globals.publicUrl}/assets/images/profile-pic.png`} className="img-circle " width="60px" height="60px" alt={this.state.profile.profile_img} />
                                                }
                                                <strong>{`${this.state.profile.first_name} ${this.state.profile.last_name}`}</strong>
                                                <br />
                                                {this.state.profile.skills.map(item =>
                                                    (
                                                        <span key={item.name} className="badge badge-secondary">{item.name}</span>
                                                    ))}
                                            </div>
                                            <div className="col-md-5">
                                                <div><strong>Country:</strong> {this.state.profile.country}</div>
                                                <div><strong>Member Since:</strong> {this.state.profile.date_join}</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                {this.state.profile.about_me}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {Object.keys(this.state.feedback).length > 0 &&
                                <div className="row">
                                    <h3>Feedback</h3>
                                    <div className="col-md-7 well">
                                        {this.state.feedback.map(dat =>
                                            (
                                                <div className="row" key={dat.id_feedback} >
                                                    <div className="col-md-12">
                                                        <StarRatingComponent name={dat.id_feedback} value={parseInt(dat.rating, 10)} editing={false} />
                                                        <div style={{ display: 'inline-block', position: 'absolute' }}>{dat.rating}</div>  <br />
                                                        {dat.comment}
                                                        <hr style={{ borderTop: '1px solid #fff' }} />
                                                    </div>
                                                    {/* <div className="col-md-4">
                                            </div> */}
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loader: state.loader
    };
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WriterProfilePage));

// export default WriterProfilePage;
