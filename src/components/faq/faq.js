import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { PanelGroup, Panel } from 'react-bootstrap';
import faqData from '../../data/faq.json';
// import otherApi from '../../api/otherApi';

class FAQ extends Component {
    constructor(props) {
        super(props);
        this.faqData = faqData;
        this.state = {
            pendingResume: props.site.pendingResume,
            daysToComplete: props.site.daysToComplete
        };
    }
    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps);
    //     if(this.props.site !== nextProps.site) {
    //         this.setState({
    //             pendingResume: nextProps.site.pendingResume,
    //             daysToComplete: nextProps.site.daysToComplete
    //         });
    //     }
    // }

    // componentDidMount() {
    //     this.updateState();
    // }
    // updateState = () => {
    //     otherApi.getPendingResume()
    //         .then((result) => {
    //             if (result.status === 'Success') {
    //                 this.setState({
    //                     pendingResume: result.data.pendingResume,
    //                     daysToComplete: result.data.daysToComplete
    //                 });
    //             }
    //         });
    // }
    parseDescription(description) {
        description = description.replace(/###PENDING_RESUME###/g, this.state.pendingResume);
        description = description.replace(/###DAYS_TO_COMPLETE###/g, this.state.daysToComplete);
        return description;
    }
    render() {
        const panelItem = item => <Panel key={item.id} header={item.title} eventKey={item.id}>{this.parseDescription(item.description)}</Panel>;

        const panelGroupInstance = (
            <PanelGroup defaultActiveKey="" accordion>
                {this.faqData.map(panelItem)}
            </PanelGroup>
        );
        return (
            <div>
                {panelGroupInstance}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        site: state.site
    };
}

export default withRouter(connect(mapStateToProps)(FAQ));
// export default FAQ;
