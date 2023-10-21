import React, { Component } from 'react';
import {
    Route,
    Switch,
    Redirect,
    withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import ScrollToTop from '../../components/scrolltotop/scrolltotop';
// import Util from '../../helpers/util.class';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
// import Spinner from '../../components/spinner/spinner';
import BuildTemplatePage from './buildtemplate';
import BuildContactPage from './buildcontact';
import BuildExperiencePage from './buildexperience';
import ListExperiencePage from './listexperience';
import BuildEducationPage from './buildeducation';
import ListEducationPage from './listeducation';
import BuildSkillPage from './buildskill';
import BuildSummaryPage from './buildsummary';
import PreviewResumePage from './previewresume';

//  import SalaryData from '../../data/salary.json';

// const deepcopy = require('deepcopy');

class BuildResumePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geo: {},
            packages: {},
        };
        // this.geo = {};
        // this.packages = {};
    }
    componentWillMount() {

    }
    // componentWillReceiveProps(nextProps) {

    // }

    render() {
        // if (!Object.keys(this.state.geo).length || !Object.keys(this.state.packages).length) {
        //     return (
        //         <Spinner loader {...this.props} message="Loading...." />
        //     );
        // }
        return (
            <div>
                <ScrollToTop />
                <Header {...this.props} />
                <Switch>
                    <Route exact path="/build-resume/choose-template" render={props => <BuildTemplatePage geo={this.state.geo} packages={this.state.packages} {...props} />} />
                    <Route exact path="/build-resume/contact" render={props => <BuildContactPage geo={this.state.geo} packages={this.state.packages} {...props} />} />
                    <Route exact path="/build-resume/experience" render={props => <BuildExperiencePage geo={this.state.geo} packages={this.state.packages} {...props} />} />
                    <Route exact path="/build-resume/list-experience" render={props => <ListExperiencePage geo={this.state.geo} packages={this.state.packages} {...props} />} />
                    <Route exact path="/build-resume/education" render={props => <BuildEducationPage geo={this.state.geo} packages={this.state.packages} {...props} />} />
                    <Route exact path="/build-resume/list-education" render={props => <ListEducationPage geo={this.state.geo} packages={this.state.packages} {...props} />} />
                    <Route exact path="/build-resume/skills" render={props => <BuildSkillPage geo={this.state.geo} packages={this.state.packages} {...props} />} />
                    <Route exact path="/build-resume/summary" render={props => <BuildSummaryPage geo={this.state.geo} packages={this.state.packages} {...props} />} />
                    <Route exact path="/build-resume/preview" render={props => <PreviewResumePage geo={this.state.geo} packages={this.state.packages} {...props} />} />
                    {/* <Route exact path="/payment/addonstep1/:package/:experience" render={props => <PaymentAddonStep1Page geo={this.state.geo} packages={this.state.packages} packageData={this.state.packageData} addonData={this.state.addonData} {...props} />} />
                    <Route exact path="/payment/servicemenu/:package/:experience?" render={props => <PaymentServiceMenuPage geo={this.state.geo} packages={this.state.packages} packageData={this.state.packageData} addonData={this.state.addonData} {...props} />} />
                    <Route exact path="/payment/template/:package" component={PaymentTemplatePage} />
                    <Route exact path="/payment/checkout/:package?" render={props => <PaymentServicePage geo={this.props.geo} packages={this.state.packages} packageData={this.state.packageData} addonData={this.state.addonData} {...props} />} />
                    <Route exact path="/payment/confirmation/:package" component={ConfirmationServicePage} /> */}
                    <Route render={() => (<Redirect to="/404" />)} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

BuildResumePage.propTypes = {
    // location: React.Proptypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        geo: state.location,
        packages: state.packages
    };
}

export default withRouter(connect(mapStateToProps)(BuildResumePage));
