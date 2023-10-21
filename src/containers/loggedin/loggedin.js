import React, { Component } from 'react';
import {
    Route,
    Switch,
    Redirect,
    withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Auth from '../../helpers/auth.class';
import * as actions from '../../actions';
import ProfileApi from '../../api/profileApi';

import DashBoardPage from './dashboard/dashboard';
import TrackResumePage from './trackresume/trackresume';
import Logout from './logout/logout';
// import NotFound from '../notfound/notfound';
import UploadResumePage from './uploadresume/uploadresume';
import UpdateProfilePage from './updateprofile/updateprofile';
import ChooseTemplatePage from './choosetemplate/choosetemplate';
import AddServicePage from './addservice/addservice';
import AddonCheckoutPage from './checkout/checkout';
import QuestionairePage from './questionaire/questionaire';
import LibraryDashboardPage from './doclibrary/librarydashboard';
import LibraryDocumentDetailPage from './doclibrary/librarydocumentdetail';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Spinner from '../../components/spinner/spinner';

class LoggedIn extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     geo: {}
        // };
        this.state = {
            profile: {},
        };
    }
    componentWillMount() {
        if (Auth.isUserAuthenticated()) {
            // this.profile = Auth.getUser();
            const token = Auth.getToken();
            this.props.actions.loadProfile(token);
            if (this.props.match.params.path) {
                this.props.history.push(`/member/${this.props.match.params.path}`);
            }
        } else if (!!this.props.match.params.token && this.props.match.params.token.length > 20) {
            this.props.actions.toggleLoader(1);
            ProfileApi.getProfile(this.props.match.params.token)
                .then((response) => {
                    if (response.status === 'Success') {
                        this.props.actions.toggleLoader(-1);
                        Auth.authenticateUser(this.props.match.params.token);
                        // this.props.actions.loadProfile(this.props.match.params.token);
                        this.props.actions.updateProfile(response.data);
                        Auth.setUser(response.data);
                        // this.profile = Auth.getUser();
                        if (this.props.match.params.path) {
                            this.props.history.push(`/member/${this.props.match.params.path}`);
                        } else {
                            this.props.history.push('/member/dashbord');
                        }
                    } else {
                        window.location.href = '/login';
                    }
                });
        } else {
            // this.props.history.push('/login');
            window.location.href = '/login';
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.profile !== nextProps.profile) {
            this.setState({ profile: nextProps.profile });
        }
    }
    render() {
        return (
            <div>
                <Header profile={this.state.profile} {...this.props} />
                <Switch>
                    <Route path="/member/access/:token/:path" render={props => <Spinner loader {...props} />} />
                    <Route path="/member/addservice/:package/:experience" render={props => <AddServicePage geo={this.props.geo} profile={this.state.profile} {...props} />} />
                    <Route path="/member/choosetemplate/:payment?" render={props => <ChooseTemplatePage profile={this.state.profile} {...props} />} />
                    <Route exact path="/member/checkout/:package?" render={props => <AddonCheckoutPage geo={this.props.geo} {...props} />} />
                    <Route exact path="/member/dashbord" component={DashBoardPage} />
                    <Route path="/member/track" render={props => <TrackResumePage profile={this.state.profile} {...props} />} />
                    <Route path="/member/uploadresume" render={props => <UploadResumePage profile={this.state.profile} {...props} />} />
                    <Route path="/member/updateprofile" render={props => <UpdateProfilePage profile={this.state.profile} {...props} />} />
                    <Route path="/member/questionaire" render={props => <QuestionairePage profile={this.state.profile} {...props} />} />
                    <Route path="/member/textlibrary/item/:libId" render={props => <LibraryDocumentDetailPage {...props} />} />
                    <Route path="/member/textlibrary" render={props => <LibraryDashboardPage {...props} />} />
                    <Route exact path="/member/logout" component={Logout} />
                    {/* <Route path="/member/access/:token?/:path?" component={LoggedIn} /> */}
                    <Route render={() => (<Redirect to="/404" />)} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

LoggedIn.propTypes = {
    // location: React.Proptypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        geo: state.location,
        profile: state.profile,
        packages: state.packages
    };
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoggedIn));
