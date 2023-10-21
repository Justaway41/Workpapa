import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import logo from '../../assets/img/workpapa_logo.png';

// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
// import About from '../about';
// import Home from '../home/home';

class HeaderPayment extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
    }
    initialize = () => ({
        resumeText: 'Resume'
    });
    // updateState = (props) => {
    //     // if(!!props.location.countryCode){
    //     //     let countryCode = props.location.countryCode.toLowerCase();
    //     //     if(countryCode === 'sa' || countryCode === 'ae') {
    //     //         this.setState({resumeText: 'CV'});
    //     //     }
    //     // }
    // }
    // componentDidMount() {
    //     // this.updateState(this.props)
    // }
    // componentWillReceiveProps(nextProps) {
    //     // if(this.props.location !== nextProps.location){
    //     //     this.updateState(nextProps);
    //     // }
    // }

    render() {
        return (

            <div className="Header">
                <Navbar className="navbar-fixed-top navbar-custom" >
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link className="navbar-brand" to="/" >
                                <img src={logo} className="logo" alt="WorkPapa" />
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                </Navbar>

            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        location: state.location
    };
}

export default withRouter(connect(mapStateToProps)(HeaderPayment));
