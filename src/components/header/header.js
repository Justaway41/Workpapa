import React, { Component } from 'react';
// import {connect} from 'react-redux';
// import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { Navbar, NavItem } from 'react-bootstrap';
import Util from '../../helpers/util.class';
import logo from '../../assets/img/workpapa_logo.png';
// import { Navbar } from 'react-bootstrap';
// import About from '../about';
// import Home from '../home/home';
import OtherApi from '../../api/otherApi';

class Header extends Component {
    constructor(props) {
        super(props);
        this.country = this.props.country;
        this.state = this.initialize();
    }
    initialize = () => ({
        resumeText: Util.getResumeTxt(this.country),
        search: ''
    });
    // updateState = (props) => {
    //     // if(!!props.geo.countryCode){
    //     //     if(!this.country){
    //     //         this.country = props.geo.countryCode.toLowerCase();
    //     //     }
    //     //     this.setState({resumeText: Util.getResumeTxt(this.country)});
    //     // }
    // }
    // componentDidMount() {
    //     // this.updateState(this.props)
    // }
    // componentWillReceiveProps(nextProps) {
    //     // if(this.props.geo !== nextProps.geo){
    //     //     this.updateState(nextProps);
    //     // }
    // }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }
    handleRequest = (e) => {
        e.preventDefault();
        console.log('>>>>>>>>>', this.state);
        // this.props.actions.toggleLoader(1);
        const request = {
            search: this.state.search,
        };
        OtherApi.saveSearch(request)
            .then((res) => {
                if (res.status === 'Success') {
                    // this.props.actions.toggleLoader(-1);
                    this.props.history.push('/payment/servicemenu/RRS/FGR');
                }
            });
    }
    // createLink = (data) => {
    //     let link = `/${data.page_type}/${data.page_url}`;
    //     if (data.country) {
    //         link = `/${data.page_type}/${data.country}/${data.page_url}`;
    //     }
    //     return link;
    // };
    render() {
        return (

            <div className="Header">
                {/* navbar-fixed-top  */}
                <Navbar className="navbar-static-top navbar-custom" >
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link className="navbar-brand" to="/" >
                                <img src={logo} className="logo" alt="WorkPapa" />
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    {this.props.profile && Object.keys(this.props.profile).length > 0 ? (
                        <Navbar.Collapse>
                            <ul className="nav navbar-nav navbar-right" >
                                <li className="page-scroll">
                                    <Link to="/member/track">Status</Link>
                                </li>
                                <li className="page-scroll">
                                    <a href="/logout">Logout</a>
                                </li>
                            </ul>
                        </Navbar.Collapse>
                    ) : (
                        <Navbar.Collapse>
                            {/* <Nav pullRight> */}
                            {/* <NavDropdown eventKey={6} title="Our Services" id="basic-nav-dropdown">
                                        <MenuItem eventKey={6.1}><Link to="/payment/servicemenu/RRS/MCR">{this.state.resumeText} Rewriting</Link></MenuItem>
                                        <MenuItem eventKey={6.2}><Link to="/payment/servicemenu/RCS/MCR">{this.state.resumeText} Creation</Link></MenuItem>
                                        <MenuItem eventKey={6.3}><Link to="/payment/servicemenu/LPS/MCR">Linked In</Link></MenuItem>
                                        <MenuItem eventKey={6.4}><Link to="/payment/servicemenu/CLS/MCR">Cover Letter</Link></MenuItem>
                                        <MenuItem eventKey={6.5}><Link to="/payment/servicemenu/RPC/MCR">{this.state.resumeText} Rewriting+Cover Letter</Link></MenuItem>
                                        <MenuItem eventKey={6.6}><Link to="/payment/servicemenu/FRS/MCR">Full Package</Link></MenuItem>
                                    </NavDropdown> */}
                            {this.props.hasOwnProperty('match') && this.props.match.hasOwnProperty('url') && this.props.match.url === '/ppc' ? (
                                <ul className="nav navbar-nav navbar-right" >
                                    <li className="page-scroll">
                                        <a href="/#package">Pricing</a>
                                    </li>
                                </ul>
                            ) : (
                                <ul className="nav navbar-nav navbar-right" >
                                    <li className="page-scroll page-scroll-link">
                                        <a href="/#package">Pricing</a>
                                    </li>
                                    <li className="page-scroll page-scroll-link">
                                        <Link to="/our-work">Recent Work</Link>
                                    </li>
                                    <li className="page-scroll page-scroll-link">
                                        <Link to="/blog">blog</Link>
                                    </li>
                                    <li className="page-scroll page-scroll-link">
                                        <Link to="/login">Login</Link>
                                    </li>
                                    <li className="page-scroll page-scroll-link">
                                        <Link to="/register">Get work</Link>
                                    </li>
                                    <li className="page-scroll">
                                        <form name="form" style={{ marginTop: '10px', marginRight: '10px' }} onSubmit={env => this.handleRequest(env)} >
                                            <div className="row control-group">
                                                <div className="form-group col-xs-12 form-controls">
                                                    <svg xmlns="https://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
                                                        <path id="Shape" d="M7.772,6.914H7.32L7.16,6.76a3.722,3.722,0,1,0-.4.4l.154.16v.452l2.859,2.853.852-.852Zm-3.431,0A2.573,2.573,0,1,1,6.914,4.341,2.569,2.569,0,0,1,4.341,6.914Z" transform="translate(-0.625 -0.625)" fill="#dbdbdb" />
                                                    </svg>
                                                    <input type="text" className="form-control" placeholder="Search" name="search" value={this.state.search} onChange={this.handleUserInput} />
                                                </div>
                                                {/* <FormErrors formErrors={this.state.formErrors} errorField={{name: 'name'}} /> */}
                                            </div>
                                        </form>
                                    </li>
                                    <li className="page-scroll">
                                        <NavItem eventKey={5} href="/#feedback" className="marian-freefeedback btn btn-xs">Free {this.state.resumeText} Feedback</NavItem>
                                    </li>
                                </ul>
                            )}
                            {/* </Nav> */}
                        </Navbar.Collapse>
                    )}
                </Navbar>
            </div>
        );
    }
}

Header.defaultProps = {
    country: 'us'
};

export default Header;
// function mapStateToProps(state, ownProps) {
//     return {
//       geo: state.location
//     };
// }

// export default withRouter(connect(mapStateToProps)(Header));
