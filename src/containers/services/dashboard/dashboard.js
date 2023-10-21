import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../../../actions';
import ScrollToTop from '../../../components/scrolltotop/scrolltotop';

// var Constant = require('../../helpers/constant');
// console.log(Constant.Globals.API);

class DashboardServicePage extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
    }

    componentDidMount() {

    }

    initialize = () => ({
    })

    render() {
        return (
            <div className="top-spacer" >
                <Helmet>
                    <title>WorkPapa | Dashboard</title>
                </Helmet>
                <ScrollToTop />

                <div className="container" style={{ marginBottom: '40px' }}>
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2>Select your services & products</h2>
                            <hr className="star-primary" />
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: '20px' }}>
                        <div className="col-sm-12 text-center">
                            <div className="col-md-4">
                                <Link to="/services/create" className="btn btn-success">Add a Service</Link>
                            </div>
                            <div className="col-md-4">
                                <Link to="/services/createoffice" className="btn btn-success">Add Space</Link>
                            </div>
                            <div className="col-md-4">
                                <Link to="/services/searchservice" className="btn btn-success">Search Service</Link>
                            </div>
                        </div>
                    </div>
                </div>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardServicePage));
// export default LoginPage;
