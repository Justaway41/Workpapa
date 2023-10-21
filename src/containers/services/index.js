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
// import WriterApi from '../../api/writerApi';

import Header from '../../components/header/header';
import HeaderService from './header/headerservice';
import ServiceRegisterPage from './serviceregister/service-register';
import CreateServicePage from './createservice/create-service';
import DashboardServicePage from './dashboard/dashboard';
import CreateOfficeSpacePage from './createofficespace/create-officespace';
import ListOfficeSpacePage from './listofficespace/list-office-space';
import ListServicePage from './listservice/list-service';
import SearchServicePage from './searchservice/search-service';
import DetailServicePage from './detailservice/detail-service';
import DetailOfficePage from './detailoffice/detail-office';

// import LogoutWriter from './logout/logout';

import Footer from '../../components/footer/footer';

const LogoutPages = [
    'searchservice',
    'detail',
    'office',
];
class ServiceIndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
        };
    }
    componentWillMount() {
        console.log(this.props);
        if (Auth.isWriterAuthenticated()) {
            const token = Auth.getWriterToken();
            this.props.actions.loadWriterProfile(token);
            if (this.props.match.params.path) {
                this.props.history.push(`/service/${this.props.match.params.path}`);
            }
        } else if (!!this.props.match.params.token && this.props.match.params.token.length > 20) {
            // this.props.actions.toggleLoader(1);
            // WriterApi.getProfile(this.props.match.params.token)
            //     .then((response) => {
            //         if (response.status === 'Success') {
            //             this.props.actions.toggleLoader(-1);
            //             Auth.authenticateWriter(this.props.match.params.token);
            //             this.props.actions.updateWriterProfile(response.data);
            //             Auth.setWriter(response.data);
            //             if (this.props.match.params.path) {
            //                 this.props.history.push(`/seller/${this.props.match.params.path}`);
            //             } else {
            //                 this.props.history.push('/seller/profile');
            //             }
            //         } else {
            //             window.location.href = '/login';
            //         }
            //     });
        } else {
            const pathBreak = this.props.location.pathname.split('/');
            // console.log(LogoutPages.includes(pathBreak[pathBreak.length - 1]));
            // console.log(LogoutPages.includes(pathBreak[pathBreak.length - 1]), this.props.location.pathname);
            // if (this.props.match.path) {

            // }
            if (!LogoutPages.includes(pathBreak[pathBreak.length - 1])) {
                window.location.href = '/login';
            }
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
                {(Object.keys(this.state.profile).length === 0) &&
                    <Header profile={this.state.profile} />
                }
                {(Object.keys(this.state.profile).length > 0) &&
                    <HeaderService profile={this.state.profile} />
                }
                <Switch>
                    <Route path="/services/register" render={props => <ServiceRegisterPage profile={this.state.profile} {...props} />} />
                    <Route path="/services/dashboard" render={props => <DashboardServicePage profile={this.state.profile} {...props} />} />
                    <Route path="/services/create" render={props => <CreateServicePage profile={this.state.profile} {...props} />} />
                    <Route path="/services/createoffice" render={props => <CreateOfficeSpacePage profile={this.state.profile} {...props} />} />
                    <Route path="/services/listoffice" render={props => <ListOfficeSpacePage profile={this.state.profile} {...props} />} />
                    <Route path="/services/listservice" render={props => <ListServicePage profile={this.state.profile} {...props} />} />
                    <Route path="/services/searchservice" render={props => <SearchServicePage profile={this.state.profile} {...props} />} />
                    <Route path="/services/detail/:serviceId" render={props => <DetailServicePage profile={this.state.profile} {...props} />} />
                    <Route path="/services/office/:serviceId" render={props => <DetailOfficePage profile={this.state.profile} {...props} />} />
                    {/* <Route exact path="/seller/logout" component={LogoutWriter} /> */}
                    <Route render={() => (<Redirect to="/404" />)} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

ServiceIndexPage.propTypes = {
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServiceIndexPage));
