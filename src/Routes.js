import React from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import Logout from './containers/logout/logout';
import PaymentPage from './containers/payment/payment';

import AsyncComponent from './helpers/asynccomponent';

const ProfilePage = AsyncComponent(() => import('./containers/profile/profile').then(module => module.default));
const HomePage = AsyncComponent(() => import('./containers/landing/home').then(module => module.default));
const HomeNewPage = AsyncComponent(() => import('./containers/landing/home.1').then(module => module.default));
const StaticPage = AsyncComponent(() => import('./containers/landing/staticpage').then(module => module.default));
const ServicePage = AsyncComponent(() => import('./containers/landing/servicepage').then(module => module.default));
const ProductPage = AsyncComponent(() => import('./containers/product').then(module => module.default));
const AboutPage = AsyncComponent(() => import('./containers/about/about').then(module => module.default));
const LoginPage = AsyncComponent(() => import('./containers/login/login').then(module => module.default));
const NotFound = AsyncComponent(() => import('./containers/notfound/notfound').then(module => module.default));
const TermPage = AsyncComponent(() => import('./containers/term/term').then(module => module.default));
const WhyUsPage = AsyncComponent(() => import('./containers/whyus/whyus').then(module => module.default));
const LoggedIn = AsyncComponent(() => import('./containers/loggedin/loggedin').then(module => module.default));
const LoggedInWriter = AsyncComponent(() => import('./containers/writer/loggedinwriter').then(module => module.default));
const BuildResumePage = AsyncComponent(() => import('./containers/buildresume').then(module => module.default));
const SuccessTrackPage = AsyncComponent(() => import('./containers/successtrack/successtrack').then(module => module.default));
const BuildTemplatePage = AsyncComponent(() => import('./containers/buildertemplateform').then(module => module.default));
const MarketPlacePage = AsyncComponent(() => import('./containers/community').then(module => module.default));
const FAQPage = AsyncComponent(() => import('./containers/faq/faq').then(module => module.default));
const RegisterPage = AsyncComponent(() => import('./containers/register/register').then(module => module.default));
// const PaymentPage = AsyncComponent(() => import('./containers/payment/payment').then(module => module.default));
const ContactPage = AsyncComponent(() => import('./containers/contact/contact').then(module => module.default));
const PrivacyPage = AsyncComponent(() => import('./containers/privacy/privacy').then(module => module.default));
const CoverLetterPage = AsyncComponent(() => import('./containers/landing/coverletter').then(module => module.default));
const ResumeRewritePage = AsyncComponent(() => import('./containers/landing/resumerewrite').then(module => module.default));
const LinkedInPage = AsyncComponent(() => import('./containers/landing/linkedin').then(module => module.default));
const CvSamplePage = AsyncComponent(() => import('./containers/cvsample/cvsample').then(module => module.default));
const CvDonePage = AsyncComponent(() => import('./containers/cvdone/cvdone').then(module => module.default));
const ServiceIndexPage = AsyncComponent(() => import('./containers/services/index').then(module => module.default));
const BlogPage = AsyncComponent(() => import('./containers/blog/blog').then(module => module.default));

const Routes = () => (
    <Switch>
        {/* <Route exact path="/" render={(props)=><HomePage geo={this.state.geo} packages={this.state.packages} packageData={packageData} {...props}/>} />  */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/test" component={HomeNewPage} />
        <Route exact path="/ppc" component={HomePage} />
        <Route path="/product" component={ProductPage} />
        <Route path="/build-resume" component={BuildResumePage} />
        <Route path="/textlibrary" component={MarketPlacePage} />
        <Route path="/build-template" component={BuildTemplatePage} />
        {/* <Route path="/payment" component={PaymentPage} /> */}
        <Route path="/payment" render={props => <PaymentPage {...props} />} />
        <Route path="/cv-sample" component={CvSamplePage} />
        <Route path="/our-work" component={CvDonePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/why-us" component={WhyUsPage} />
        <Route path="/term" component={TermPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/feedback" component={ContactPage} />
        <Route path="/login/:type?" component={LoginPage} />
        {/* <Route exact path="/login/:type?" render={() => <LoginPage {...this.props} />} /> */}
        {/* <Route path="/login" component={LoginPage} /> */}
        <Route path="/register" component={RegisterPage} />
        <Route path="/faq" component={FAQPage} />
        <Route path="/logout" component={Logout} />
        <Route path="/success/:page" component={SuccessTrackPage} />
        <Route path="/service/linkedin" component={LinkedInPage} />
        <Route path="/service/resume-rewrite" component={ResumeRewritePage} />
        <Route path="/service/cover-letter" component={CoverLetterPage} />
        <Route path="/member/access/:token?/:path?" component={LoggedIn} />
        <Route path="/member/textlibrary" component={MarketPlacePage} />
        <Route path="/member" component={LoggedIn} />
        <Route path="/seller" component={LoggedInWriter} />
        <Route path="/services" component={ServiceIndexPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/404" component={NotFound} />
        {/* {["/", "/ae", "/sa", "/sg", "/ca", "/us"].map(path =>
              <Route path={path} component={HomePage} />
          )}     */}
        <Route exact path="/country/:country" component={HomePage} />
        <Route exact path="/servicepage/profile/:id" component={ProfilePage} />
        <Route exact path="/servicepage/:country/:url" component={ServicePage} />
        <Route exact path="/page/:country/:url" component={StaticPage} />
        <Route path="/page/:url" component={StaticPage} />
        {/* <Route component={NotFound} />  */}
        <Route render={() => (<Redirect to="/404" />)} />

    </Switch>
);
export default Routes;
