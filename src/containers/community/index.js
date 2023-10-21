import React, { Component } from 'react';
import {
    Route,
    Switch,
    Redirect,
    withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Spinner from '../../components/spinner/spinner';
import CommunityLandingPage from './communitylandingpage';
// import CommunitySelectPlanPage from './__communityselectplan';
// import CommunityStep1Page from './___communitystep1';
import CommunityStep2Page from './communitystep2';
// import CommunityStep3Page from './communitystep3';
import CommunityStep4Page from './communitystep4';
import CommunityConfirmation from './communityconfirmation';
// import CommunityDashboard from './member/communitydashboard';
// import MarketPlaceItemDetail from './member/marketplaceitemdetail';

class MarketPlacePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geo: {},
            packages: {}
        };
    }
    componentWillMount() {
        this.setState({ geo: this.props.geo, packages: this.props.packages.library });
    }
    componentWillReceiveProps(nextProps) {
        if (Object.keys(nextProps.geo).length) {
            this.setState({ geo: nextProps.geo, packages: nextProps.packages.library });
        }
    }

    render() {
        if (!Object.keys(this.props.geo).length || !Object.keys(this.props.packages).length) {
            return (
                <Spinner loader {...this.props} message="Loading...." />
                // <div className="loader center" />
            );
        }
        return (
            <div>
                <Header {...this.props} />
                <Switch>
                    <Route exact path="/textlibrary" render={props => <CommunityLandingPage {...props} />} />
                    <Route exact path="/textlibrary/signup-step1" render={props => <CommunityStep2Page {...props} />} />
                    <Route exact path="/textlibrary/payment" render={props => <CommunityStep4Page geo={this.state.geo} packages={this.state.packages} {...props} />} />
                    <Route exact path="/textlibrary/confirmation" render={props => <CommunityConfirmation {...props} />} />
                    {/* <Route exact path="/member/textlibrary" render={props => <CommunityDashboard {...props} />} />
                    <Route exact path="/member/textlibrary/item/:libId" render={props => <MarketPlaceItemDetail {...props} />} /> */}
                    <Route render={() => (<Redirect to="/404" />)} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

MarketPlacePage.propTypes = {
    // location: React.Proptypes.string.isRequired
};

function mapStateToProps(state) {
    console.log(state);
    return {
        geo: state.location,
        packages: state.packages
    };
}

export default withRouter(connect(mapStateToProps)(MarketPlacePage));
