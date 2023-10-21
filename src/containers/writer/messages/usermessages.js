import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import * as actions from '../../../actions';
import WriterApi from '../../../api/writerApi';
import FormErrors from '../../../components/formerror/formerror';
import Globals from '../../../helpers/constant';

class UserMessages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // profile: {},
            messages: [],
            message: '',
            formErrors: { message: '' },
            messageValid: false,
            msg: '',
            error: '',
            loader: false
        };
    }

    componentDidMount() {
        this.getUserMessages(this.props.packageId, this.props.userId);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.userId !== nextProps.userId) {
            this.getUserMessages(this.props.packageId, nextProps.userId);
        }
    }
    validateField(fieldName, value) {
        const fieldValidationErrors = this.state.formErrors;
        let messageValid = this.state.messageValid;

        switch (fieldName) {
        case 'message':
            messageValid = value.length > 10;
            fieldValidationErrors.message = messageValid ? '' : ' should be atleast 20 character';
            break;
        default:
            break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            messageValid
        }, this.validateForm);
    }
    validateForm() {
        this.setState({ formValid: this.state.messageValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(
            { [name]: value },
            () => { this.validateField(name, value); }
        );
    }
    handleRequest = (e) => {
        e.preventDefault();
        this.props.actions.toggleLoader(1);
        this.setState({ loader: true });
        const request = {
            id_package: this.props.packageId,
            id_user: this.props.userId,
            message: this.state.message
        };
        WriterApi.sendUserMessage(request)
            .then((response) => {
                if (response.status === 'Success') {
                    // this.setState({service: response.data});
                    this.setState({
                        error: '', message: '', loader: false, msg: 'Message has sent successfully'
                    });
                } else {
                    this.setState({ msg: '', loader: false, error: response.msg });
                }
                this.props.actions.toggleLoader(-1);
            })
            .then(() => this.getUserMessages(this.props.packageId, this.props.userId));
        // .then((dat) => {
        //     if (dat.status === 'Success') {
        //         this.setState({ mail: dat.data });
        //     }
        //     this.props.actions.toggleLoader(false);
        // });
        // .catch((error) => {
        //     // this.setState({msg: error, loader: false});
        //     console.log(error);
        // });
        return false;
    }

    getUserMessages = (writerId, userId) => {
        this.props.actions.toggleLoader(1);
        WriterApi.getUserMessages(writerId, userId)
            .then((dat) => {
                if (dat.status === 'Success') {
                    this.setState({ messages: dat.data });
                }
                this.props.actions.toggleLoader(-1);
            });
    }
    render() {
        return (
            <div>
                {this.state.messages.length > 0 &&
                <Table striped bordered condensed className="text-left">
                    <tbody>
                        <tr>
                            <td colSpan="2"><h5>Conversation</h5></td>
                        </tr>
                        {
                            this.state.messages.map(item =>
                                (
                                    <tr key={item.id_msg}>
                                        <td className="col-md-2"><strong>{(item.from_user !== this.props.userId) ? 'You' : 'User Reply'}</strong></td>
                                        <td className="col-md-10">{ReactHtmlParser(item.message)}</td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </Table>
                }
                <form name="form" onSubmit={this.handleRequest} >

                    <div className="row control-group">
                        <div className={`form-group col-xs-12 floating-label-form-group controls ${this.errorClass(this.state.formErrors.message)}`} >
                            <label>Message</label>
                            <textarea rows="3" className="form-control" placeholder="Write your queries" name="message" value={this.state.message} onChange={this.handleUserInput} />
                        </div>
                        <FormErrors formErrors={this.state.formErrors} errorField={{ name: 'message' }} />
                    </div>
                    <br />
                    {this.state.msg !== '' &&
                        <div className="alert alert-success" >{this.state.msg}</div>
                    }
                    {this.state.error !== '' &&
                        <div className="alert alert-danger" >{this.state.error}</div>
                    }
                    <div className="row">
                        <div className="form-group col-xs-12">
                            <button className="btn btn-success btn-lg" disabled={!this.state.formValid || this.state.loader}>Submit
                                <i className="icon icon-arrow" />
                            </button>
                            {this.state.loader &&
                            <img alt="loader" src={Globals.loader.smallbutton} />
                            }
                        </div>
                    </div>
                </form>
            </div>

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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserMessages));

// export default UserMessages;
