import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import logo from '../../assets/img/workpapa_logo.png';

// import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
// import About from '../about';
// import Home from '../home/home';

class HeaderLoggedIn extends Component {
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
    //     // console.log(nextProps.profile);
    //     // if(this.props.profile !== nextProps.profile){
    //     //     console.log(nextProps.profile);
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
                    <Navbar.Collapse>

                        <ul className="nav navbar-nav navbar-right" >
                            <li className="page-scroll">
                                <Link to="/member/track">Status</Link>
                            </li>
                            <li className="page-scroll">
                                <a href="/member/logout">Logout</a>
                            </li>
                        </ul>
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

export default withRouter(connect(mapStateToProps)(HeaderLoggedIn));
