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
import WriterApi from '../../api/writerApi';

// import DashBoardPage from './dashboard/dashboard';
import WriterProfilePage from './profile/profile';
import ServiceListPage from './servicelist/servicelist';
import MyServicePage from './myservice/myservice';
import CvWriterSamplePage from './cvsample/cvsample';
import LogoutWriter from './logout/logout';

import HeaderWriter from './header/headerwriter';
// import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
// import Spinner from '../../components/spinner/spinner';

class LoggedInWriter extends Component {
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
        if (Auth.isWriterAuthenticated()) {
            // this.profile = Auth.getUser();
            const token = Auth.getWriterToken();
            this.props.actions.loadWriterProfile(token);
            if (this.props.match.params.path) {
                this.props.history.push(`/seller/${this.props.match.params.path}`);
            }
        } else if (!!this.props.match.params.token && this.props.match.params.token.length > 20) {
            this.props.actions.toggleLoader(1);
            WriterApi.getProfile(this.props.match.params.token)
                .then((response) => {
                    if (response.status === 'Success') {
                        this.props.actions.toggleLoader(-1);
                        Auth.authenticateWriter(this.props.match.params.token);
                        // this.props.actions.loadProfile(this.props.match.params.token);
                        this.props.actions.updateWriterProfile(response.data);
                        Auth.setWriter(response.data);
                        // this.profile = Auth.getUser();
                        if (this.props.match.params.path) {
                            this.props.history.push(`/seller/${this.props.match.params.path}`);
                        } else {
                            this.props.history.push('/seller/profile');
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
                <HeaderWriter profile={this.state.profile} />
                <Switch>
                    {/* <Route path="/member/access/:token/:path" render={props => <Spinner loader {...props} />} />
                    <Route path="/member/addservice/:package/:experience" render={props => <AddServicePage geo={this.props.geo} profile={this.state.profile} {...props} />} />
                    <Route path="/member/choosetemplate/:payment?" render={props => <ChooseTemplatePage profile={this.state.profile} {...props} />} />
                    <Route exact path="/member/checkout/:package?" render={props => <AddonCheckoutPage geo={this.props.geo} {...props} />} /> */}
                    {/* <Route exact path="/writer/profile" component={DashBoardPage} /> */}
                    <Route path="/seller/profile" render={props => <WriterProfilePage profile={this.state.profile} {...props} />} />
                    <Route path="/seller/search" render={props => <ServiceListPage profile={this.state.profile} geo={this.props.geo} {...props} />} />
                    <Route path="/seller/myservice" render={props => <MyServicePage profile={this.state.profile} geo={this.props.geo} {...props} />} />
                    <Route path="/seller/template" render={props => <CvWriterSamplePage profile={this.state.profile} geo={this.props.geo} {...props} />} />
                    {/* <Route path="/member/uploadresume" render={props => <UploadResumePage profile={this.state.profile} {...props} />} />
                    <Route path="/member/updateprofile" render={props => <UpdateProfilePage profile={this.state.profile} {...props} />} />
                    <Route path="/member/questionaire" render={props => <QuestionairePage profile={this.state.profile} {...props} />} />
                    <Route path="/member/textlibrary/item/:libId" render={props => <LibraryDocumentDetailPage {...props} />} />
                    <Route path="/member/textlibrary" render={props => <LibraryDashboardPage {...props} />} /> */}
                    <Route exact path="/seller/logout" component={LogoutWriter} />
                    <Route render={() => (<Redirect to="/404" />)} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

LoggedInWriter.propTypes = {
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoggedInWriter));
