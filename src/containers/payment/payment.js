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
import PaymentAddonPage from './addon';
// import PaymentAddonStep1Page from './addonstep1';
import PaymentServiceMenuPage from './servicemenu';
import PaymentServicePackagePage from './servicepackage';
import Spinner from '../../components/spinner/spinner';
// import PaymentServiceAddPage from './serviceadd';
import PaymentTemplatePage from './selecttemplate';
import PaymentServicePage from './service';
import ConfirmationServicePage from './confirmation';
import SalaryData from '../../data/salary.json';
// import ConfirmTemplatePage from './confirmtemplate';
// import addonData from '../../data/addon.json';
// import packageData from '../../data/packages.json';
const deepcopy = require('deepcopy');

class PaymentPage extends Component {
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
            this.updateAddon(this.props.geo, this.props.site, packages);
        }
    }
    componentWillReceiveProps(nextProps) {
        const packages = this.checkPacakgeData(nextProps);
        const storePackage = Util.getDataFromSessionStorage('package');
        if (storePackage && storePackage.hasOwnProperty('salary')) {
            packages.product['RRS']['ECR'] = SalaryData[storePackage.salary].price;
        }
        if (Object.keys(nextProps.geo).length) {
            this.setState({ geo: nextProps.geo, packages });
            this.updateAddon(nextProps.geo, nextProps.site, packages);
        }
    }
    checkPacakgeData(props) {
        const packages = props.packages;
        if (Object.keys(props.packages).length) {
            const storePackage = Util.getDataFromSessionStorage('package');
            if (storePackage && storePackage.hasOwnProperty('salary')) {
                packages.product['RRS']['ECR'] = SalaryData[storePackage.salary].price;
            }
        }
        return packages;
    }
    updateAddon(geo, site, packages) {
        const addonData = deepcopy(Util.getAddonData(geo, site));
        const packageData = deepcopy(Util.getPackageData(geo));
        addonData.forEach((element) => {
            element.items.forEach((ele) => {
                ele.price = packages['addon'][ele.id];
            });
        });
        // const countryCode = geo.countryCode;
        // const resumeText = Util.getResumeTxt(countryCode);
        // const displayCountry = geo.countryName;
        // addonData.forEach((element) => {
        //     element.title = element.title.replace(/##RESUMETEXT##/g, resumeText);
        //     element.items.forEach((ele) => {
        //         ele.label = ele.label.replace(/##RESUMETEXT##/g, resumeText);
        //         ele.label = ele.label.replace(/##COUNTRY##/g, displayCountry);
        //         ele.description = ele.description ? ele.description.replace(/##RESUMETEXT##/g, resumeText) : '';
        //     });
        // });

        // Object.keys(packageData.service.product).forEach((element) => {
        //     packageData.service.product[element].name = packageData.service.product[element].name.replace(/##RESUMETEXT##/g, resumeText);
        //     packageData.service.product[element].description = packageData.service.product[element].description.replace(/##RESUMETEXT##/g, resumeText);
        // });
        // console.log(addonData);
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
                <Header {...this.props} />
                <Switch>
                    <Route exact path="/payment/addon/:package/:experience" render={props => <PaymentAddonPage geo={this.state.geo} packages={this.state.packages} site={this.props.site} packageData={this.state.packageData} addonData={this.state.addonData} {...props} />} />
                    {/* <Route exact path="/payment/addonstep1/:package/:experience" render={props => <PaymentAddonStep1Page geo={this.state.geo} packages={this.state.packages} packageData={this.state.packageData} addonData={this.state.addonData} {...props} />} /> */}
                    <Route exact path="/payment/servicemenu/:package/:experience?" render={props => <PaymentServiceMenuPage geo={this.state.geo} packages={this.state.packages} site={this.props.site} packageData={this.state.packageData} addonData={this.state.addonData} {...props} />} />
                    <Route exact path="/payment/servicepackage/:package/:experience?" render={props => <PaymentServicePackagePage geo={this.state.geo} packages={this.state.packages} packageData={this.state.packageData} addonData={this.state.addonData} {...props} />} />
                    <Route exact path="/payment/template/:package" component={PaymentTemplatePage} />
                    {/* <Route exact path="/payment/package/:package?" component={PaymentPackagePage}/>  */}props
                    {/* <Route exact path="/payment/service/:package" render={(props)=><PaymentServicePage geo={this.state.geo} packages={this.state.packages} addonData={addonData} {...props}/>} />            */}
                    <Route exact path="/payment/checkout/:package?" render={props => <PaymentServicePage geo={this.props.geo} packages={this.state.packages} packageData={this.state.packageData} site={this.props.site} addonData={this.state.addonData} {...props} />} />
                    <Route exact path="/payment/confirmation/:package" component={ConfirmationServicePage} />
                    {/* <Route exact path="/payment/confirmtemplate/:package" component={ConfirmTemplatePage} /> */}
                    <Route render={() => (<Redirect to="/404" />)} />
                </Switch>
                <FooterPayment />
            </div>
        );
    }
}

PaymentPage.propTypes = {
    // location: React.Proptypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        geo: state.location,
        packages: state.packages,
        site: state.site
    };
}

export default withRouter(connect(mapStateToProps)(PaymentPage));
