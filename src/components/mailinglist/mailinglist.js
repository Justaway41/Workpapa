import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import FeedBack from '../../components/feedback/feedback';


class MailingList extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = this.initialize();
    // }
    // componentWillReceiveProps(nextProps) {
    //     if (this.props.showModal !== nextProps.showModal) {
    //         this.setState({ showModal: nextProps.showModal });
    //     }
    // }
    // initialize = () => ({
    //     showModal: this.props.showModal
    // })
    close = () => {
        // this.setState({ showModal: false });
        const state = {};
        state[this.props.name] = false;
        this.props.handlePopupStatus(state);
    }
    // doAction = () => {
    //     this.close();
    // }
    // open = () => {
    //     this.setState({ showModal: true });
    // }

    render() {
        return (
            <div>
                <Modal show={this.props.showModal} onHide={this.close} >
                    <Modal.Header closeButton>
                        <h1 className="text-center">Free {this.props.resumeText} Review</h1>
                    </Modal.Header>
                    <div className="text-center">
                        <div style={{ fontSize: '2.5rem', color: 'gray', fontStyle: 'italic' }}>
                        10% OFF YOUR ORDER +
                        </div>
                        <div style={{ fontSize: '2.5rem', color: 'gray', fontStyle: 'italic' }}>
                            Free {this.props.resumeText} writing e-book
                        </div>
                    </div>
                    <Modal.Body className="text-center">
                        <FeedBack resumeText={this.props.resumeText} btnText="10% off your order today!" btnclass="btn-danger" doAction={this.close} />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

MailingList.defaultProps = {
    resumeText: 'CV',
    name: 'showModal'
};

export default MailingList;
