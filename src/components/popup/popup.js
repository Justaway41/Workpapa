import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';


class PopUp extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.showModal !== nextProps.showModal) {
            this.setState({ showModal: nextProps.showModal });
        }
    }
    initialize = () => ({
        showModal: this.props.showModal
    })
    close = () => {
        this.setState({ showModal: false });
        const state = {};
        state[this.props.name] = false;
        this.props.handlePopupStatus(state);
    }
    doAction = () => {
        this.close();
    }
    open = () => {
        this.setState({ showModal: true });
        const state = {};
        state[this.props.name] = true;
        this.props.handlePopupStatus(state);
    }

    render() {
        const Contant = this.props.contant;
        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.close} bsSize={this.props.size}>
                    {!!this.props.title &&
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                    }
                    <Modal.Body className="text-center" style={{ overflow: 'auto' }}>
                        <p>{this.props.subtitle}</p>
                        <Contant doAction={this.doAction} stateData={this.props.stateData} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

PopUp.defaultProps = {
    name: 'model',
    title: ' ',
    subtitle: '',
    showModal: false
};

export default PopUp;
