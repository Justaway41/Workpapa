import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import StarRatingComponent from 'react-star-rating-component';
// import { Table } from 'react-bootstrap';
import * as actions from '../../../actions';

import Util from '../../../helpers/util.class';
import ScrollToTop from '../../../components/scrolltotop/scrolltotop';

// import ProfileApi from '../../../api/profileApi';
// import OtherApi from '../../../api/otherApi';
// import Globals from '../../../helpers/constant';
// import Auth from '../../../helpers/auth.class';
import WriterApi from '../../../api/writerApi';

class ServiceListPage extends Component {
    constructor(props) {
        super(props);
        let packageData = {};
        if (Object.keys(props.geo).length > 0) {
            packageData = Util.getPackageData(props.geo).service.product;
        }
        this.state = {
            profile: {},
            result: { list: [] },
            packageData
        };
    }

    componentDidMount() {
        if (Object.keys(this.props.profile).length > 0) {
            this.getPendingService(this.props.profile.id_writer);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            profile: nextProps.profile
        });
        if (this.props.profile.id_writer !== nextProps.profile.id_writer) {
            this.getPendingService(nextProps.profile.id_writer);
        }
        if (this.props.geo !== nextProps.geo) {
            const packageData = Util.getPackageData(nextProps.geo);
            this.setState({
                packageData: packageData.service.product
            });
        }
    }

    handleStartWriting = (packageId) => {
        const request = {
            id_writer: this.state.profile.id_writer,
            id_package: packageId
        };
        this.props.actions.toggleLoader(1);
        WriterApi.startWriting(request)
            .then((response) => {
                if (response.status === 'Success') {
                    this.getPendingService(this.state.profile.id_writer);
                }
                this.props.actions.toggleLoader(-1);
            });
    };

    getPendingService = (writerId) => {
        this.props.actions.toggleLoader(1);
        WriterApi.getPendingService(writerId)
            .then((response) => {
                if (response.status === 'Success') {
                    this.setState({ result: response.data });
                }
                this.props.actions.toggleLoader(-1);
            });
    }

    render() {
        return (
            <div>
                <ScrollToTop />
                <Helmet>
                    <title>WorkPapa | Pending resume</title>
                </Helmet>
                <section id="about">
                    <div className="top-spacer" >
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <h2>Start Project</h2>
                                    <hr className="star-primary" />
                                </div>
                            </div>
                            {this.state.result.pending !== 0 &&
                                <div className="alert alert-warning text-center">Please complete your current work to start new work</div>
                            }
                            <div className="row">
                                <div className="col-md-7 well">
                                    {this.state.result.list.length > 0 &&

                                        this.state.result.list.map(dat =>
                                            (
                                                <div className="row" key={`${dat.id_package}-${dat.step1}`} >
                                                    <div className="col-md-12">
                                                        {Object.keys(this.state.packageData).length > 0 &&
                                                            <h4>{this.state.packageData[dat.product].name} <span className="pull-right">Service #: {dat.id_package}</span></h4>
                                                        }
                                                        <div>
                                                            <strong>Purchase Date:</strong> {dat.step1}
                                                            <span className="pull-right"><strong>Delivery Date:</strong> {dat.comp_est}</span>
                                                        </div>
                                                        <strong>Service</strong>
                                                        { dat.addon && JSON.parse(dat.addon).map(element => (
                                                            <div key={`${dat.id_package}-${element.id}-${element.label}`}>{element.label}</div>
                                                        ))}
                                                        {this.state.result.pending === 0 &&
                                                            <div>
                                                                <br />
                                                                <button
                                                                    className="btn btn-success"
                                                                    onClick={() => this.handleStartWriting(dat.id_package)}
                                                                >Start Project
                                                                </button>
                                                            </div>
                                                        }
                                                        <hr style={{ borderTop: '1px solid #fff' }} />
                                                    </div>
                                                    {/* <div className="col-md-4">
                                            </div> */}
                                                </div>
                                            ))

                                    }
                                    {this.state.result.list.length <= 0 &&
                                        <div className="alert alert-warning text-center">No data found</div>
                                    }
                                </div>

                                <div className="col-md-4 well pull-right">
                                    <h4>Helpful tips for you:</h4>
                                    <p className="small">
                                        To start any project, please visit<br />
                                        The “Opportunity” tab<br />
                                        And click “Start Project”<br />
                                    </p>
                                    <p className="small">
                                        To see any projects that you have already<br />
                                        Started please click on “Past Work”<br />
                                        To see all current and past work you have done.<br />
                                        There you can see what needs to be worked on, all questions, files and messages from the client for each project.
                                    </p>

                                </div>
                            </div>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServiceListPage));

// export default ServiceListPage;
