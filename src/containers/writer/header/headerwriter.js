import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import logo from '../../../assets/img/workpapa_logo.png';

// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
// import About from '../about';
// import Home from '../home/home';

class HeaderWriter extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
    }
    initialize = () => ({
        resumeText: 'Resume'
    });

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
                    <Navbar.Collapse>
                        <div className="col-xs-8 pull-right text-right" style={{ color: '#ffffff' }}>Hello, {this.props.profile.first_name}</div>
                        <div className="col-xs-8 pull-right">
                            <ul className="nav navbar-nav navbar-right" >
                                <li className="page-scroll" >
                                    <Link to="/seller/search" style={{ padding: '5px 15px' }}>Opportunity</Link>
                                </li>
                                <li className="page-scroll">
                                    <Link to="/seller/myservice" style={{ padding: '5px 15px' }}>Past Work</Link>
                                </li>
                                <li className="page-scroll">
                                    <Link to="/seller/profile" style={{ padding: '5px 15px' }}>Profile</Link>
                                </li>
                                <li className="page-scroll">
                                    <Link to="/seller/template" style={{ padding: '5px 15px' }}>Template</Link>
                                </li>
                                <li className="page-scroll">
                                    <a href="/member/logout" style={{ padding: '5px 15px' }}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </Navbar.Collapse>
                </Navbar>

            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        geo: state.location
    };
}

export default withRouter(connect(mapStateToProps)(HeaderWriter));
