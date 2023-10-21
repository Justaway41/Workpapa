import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import ScrollToTop from '../../../components/scrolltotop/scrolltotop';
// import HeaderLoggedIn from '../../../components/header/headerloggedin';
// import Footer from '../../../components/footer/footer';
import Auth from '../../../helpers/auth.class';

class LogoutWriter extends Component {
    componentWillMount() {
        Auth.deauthenticateWriter();
        // this.props.history.push('/login');
        window.location.href = '/';
    }
    render() {
        return (
            <div>
                <ScrollToTop />
                <Helmet>
                    <title>WorkPapa | Logout</title>
                </Helmet>
            </div>
        );
    }
}

export default LogoutWriter;
