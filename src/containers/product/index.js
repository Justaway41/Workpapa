import React, { Component } from 'react';
import {
    Route,
    Switch,
    Redirect,
    withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import Util from '../../helpers/util.class';
import Header from '../../components/header/header';
import FooterPayment from '../../components/footer/footerpayment';
import ProductHomePage from './product';
import ProductServiceMenuPage from './servicemenu';
import ProductConfirmationPage from './confirmation';
// import PaymentServicePackagePage from './servicepackage';
import Spinner from '../../components/spinner/spinner';
// import PaymentTemplatePage from './selecttemplate';
import ProductCheckoutPage from './checkout';
// import ConfirmationServicePage from './confirmation';

const deepcopy = require('deepcopy');

class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geo: {},
            packages: {},
            addonData: {},
            packageData: {}
        };
        // this.geo = {};
        // this.packages = {};
    }
    componentWillMount() {
        const packages = this.checkPacakgeData(this.props);
        this.setState({ geo: this.props.geo, packages });
        if (Object.keys(this.props.geo).length) {
            this.updateAddon(this.props.geo, this.props.site);
        }
    }
    componentWillReceiveProps(nextProps) {
        const packages = this.checkPacakgeData(nextProps);

        if (Object.keys(nextProps.geo).length) {
            this.setState({ geo: nextProps.geo, packages });
            this.updateAddon(nextProps.geo, nextProps.site);
        }
    }
    checkPacakgeData(props) {
        let packages = props.packages;
        if (Object.keys(props.packages).length) {
            const storePackage = Util.getDataFromSessionStorage('package');
            if (storePackage) {
                packages = storePackage;
            }
        }
        return packages;
    }
    updateAddon(geo, site) {
        const addonData = deepcopy(Util.getAddonData(geo, site));
        const packageData = deepcopy(Util.getPackageData(geo));

        this.setState({ packageData, addonData });
    }

    render() {
        if (!Object.keys(this.state.geo).length || !Object.keys(this.state.packages).length) {
            return (
                <Spinner loader {...this.props} message="Loading...." />
                // <div className="loader center" />
            );
        }
        return (
            <div>
                <Header country={Util.validateCountry()} {...this.props} {...this.props} />
                <Switch>
                    <Route exact path="/product/:type" render={props => <ProductHomePage geo={this.state.geo} packages={this.state.packages} site={this.props.site} packageData={this.state.packageData} addonData={this.state.addonData} {...props} />} />
                    <Route exact path="/product/servicemenu/:type/:package" render={props => <ProductServiceMenuPage geo={this.state.geo} packages={this.state.packages} site={this.props.site} packageData={this.state.packageData} addonData={this.state.addonData} {...props} />} />
                    <Route exact path="/product/checkout/:type/:package?" render={props => <ProductCheckoutPage geo={this.props.geo} packages={this.state.packages} packageData={this.state.packageData} addonData={this.state.addonData} {...props} />} />
                    <Route exact path="/payment/confirmation" component={ProductConfirmationPage} />
                    {/* <Route exact path="/payment/servicepackage/:package/:experience?" render={props => <PaymentServicePackagePage geo={this.state.geo} packages={this.state.packages} packageData={this.state.packageData} addonData={this.state.addonData} {...props} />} />
                    <Route exact path="/payment/template/:package" component={PaymentTemplatePage} />
                    <Route exact path="/payment/checkout/:package?" render={props => <PaymentServicePage geo={this.props.geo} packages={this.state.packages} packageData={this.state.packageData} addonData={this.state.addonData} {...props} />} />
                    <Route exact path="/payment/confirmation/:package" component={ConfirmationServicePage} /> */}
                    <Route render={() => (<Redirect to="/404" />)} />
                </Switch>
                <FooterPayment />
            </div>
        );
    }
}

ProductPage.propTypes = {
    // location: React.Proptypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        geo: state.location,
        packages: state.packages,
        site: state.site
    };
}

export default withRouter(connect(mapStateToProps)(ProductPage));
