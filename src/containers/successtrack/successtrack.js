import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { withRouter } from 'react-router-dom';
// import * as actions from '../../actions';

class SuccessTrackPage extends Component {
    componentDidMount() {
        // this.props.actions.toggleLoader(true);
        this.props.history.push('/');
        // this.props.actions.toggleLoader(false);
        // window.location.href = '/login';
    }
    render() {
        return (
            <div>
                <script type="text/javascript">
                    var google_conversion_id = 854039393;
                    var google_conversion_label = { 'nL0XCOefkIMBEOG2npcD' };
                    var google_remarketing_only = false;
                </script>
                <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js" />
                <noscript>
                    <div style={{ display: 'inline' }}>
                        <img height="1" width="1" style={{ borderStyle: 'none' }} alt="" src="//www.googleadservices.com/pagead/conversion/854039393/?label=nL0XCOefkIMBEOG2npcD&amp;guid=ON&amp;script=0" />
                    </div>
                </noscript>
            </div>
        );
    }
}

// function mapStateToProps(state) {
//     return {
//         loader: state.loader
//     };
// }
// function mapDispatchToProps(dispatch) {
//     return { actions: bindActionCreators(actions, dispatch) };
// }
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SuccessTrackPage));
export default SuccessTrackPage;
