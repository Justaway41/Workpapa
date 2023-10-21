import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
// import { hotjar } from 'react-hotjar';
import * as actions from './actions';
import Auth from './helpers/auth.class';
import Spinner from './components/spinner/spinner';
import Routes from './Routes';
// import Globals from './helpers/constant';
import './App.css';

// ReactGA.initialize(Globals.keys.analytics);


class App extends Component {
    componentWillMount() {
        this.requiredData();
    }
    componentDidMount() {
        // this.initializeReactGA();
        // hotjar.initialize(940287, 6);
    }
    requiredData = async () => {
        // this.props.actions.toggleLoader(1);
        await this.props.actions.loadLocation();
        if (this.props.geo) {
            // console.log(this.props.geo);
            await this.props.actions.loadPackages(this.props.geo);
        }
        await this.props.actions.pendingResume();
        if (Auth.isUserAuthenticated()) {
            const token = Auth.getToken();
            await this.props.actions.loadProfile(token);
        }
        // this.props.actions.toggleLoader(-1);
    }
    initializeReactGA() {
        ReactGA.pageview(window.location.hash);
    }
    render() {
    // if (!Object.keys(this.props.geo).length && !Object.keys(this.props.packages).length) {
    //   return (
    //     <div className="loader center"></div>
    //   );
    // }
    // const location = this.props.location;
    // console.log(location);
        return (
            <div>
                <Spinner loader={this.props.loader} />
                <Routes />
            </div>
        );
    }
}

App.propTypes = {
    // location: React.Proptypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        geo: state.location,
        packages: state.packages,
        loader: state.loader
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
