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
import CreateTemplatePage from './createtemplate';
import BuilderTemplateFormPage from './buildertemplateform';
import PreviewTemplatePage from './previewtemplate';

//  import SalaryData from '../../data/salary.json';

// const deepcopy = require('deepcopy');

class BuildTemplatePage extends Component {
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
                    <Route exact path="/build-template/create" render={props => <CreateTemplatePage geo={this.state.geo} packages={this.state.packages} {...props} />} />
                    <Route exact path="/build-template/questionnaire" render={props => <BuilderTemplateFormPage geo={this.state.geo} packages={this.state.packages} {...props} />} />
                    <Route exact path="/build-template/preview" render={props => <PreviewTemplatePage geo={this.state.geo} packages={this.state.packages} {...props} />} />
                    <Route render={() => (<Redirect to="/404" />)} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

BuildTemplatePage.propTypes = {
    // location: React.Proptypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        geo: state.location,
        packages: state.packages
    };
}

export default withRouter(connect(mapStateToProps)(BuildTemplatePage));
