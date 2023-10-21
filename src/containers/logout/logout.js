import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Auth from '../../helpers/auth.class';
import * as actions from '../../actions';

class Logout extends Component {
    componentWillMount() {
        this.props.actions.toggleLoader(1);
        Auth.deauthenticateUser();
        // this.props.history.push('/login');
        window.location.href = '/login';
    }
    render() {
        return (
            <div />
        );
    }
}

function mapStateToProps(state) {
    return {
        loader: state.loader
    };
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));
// export default Logout;
