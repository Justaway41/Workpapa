import React from 'react';
import { Link } from 'react-router-dom';

// import { hotjar } from 'react-hotjar';
// const createLink = (data) => {
//     let link = `/${data.page_type}/${data.page_url}`;
//     if (data.country) {
//         link = `/${data.page_type}/${data.country}/${data.page_url}`;
//     }
//     return link;
// };

const Footer = props =>
    (
        <div className="Footer gray-bg">
            <footer>
                <div className="footer-below">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <Link to="/country/ae">CV Writing Services Dubai</Link>
                                <Link to="/country/ae">CV Writing Services Abu Dhabi</Link>
                                <Link to="/country/ca">Resume Writing Services Toronto</Link>
                                <Link to="/country/sg">Singapore Resume Writing Services</Link>
                                <Link to="/country/ae">Muscat CV Writing Services</Link>
                                <Link to="/country/ae">Riyadh CV Writing Services</Link>
                                <Link to="/country/ae">Jeddah CV Writing Services</Link>
                            </div>
                            <div className="col-lg-4">
                                <Link to="/service/linkedin">LinkedIn Service</Link>
                                <Link to="/service/cover-letter">Cover Letter Service</Link>
                                <Link to="/service/resume-rewrite">Resume Rewriting Service</Link>
                                <Link to="/build-template/create">Salary Negotiation Service</Link>
                            </div>
                            <div className="col-lg-4">
                                <Link to="/term">Terms &amp; Conditions</Link>
                                <Link to="/privacy">Privacy Policy</Link>
                                <Link to="/cv-sample">Template</Link>
                                <Link to="/about">About Us</Link>
                                <Link to="/faq">FAQ</Link>
                                <a href="https://www.workpapa.com/sitemap/sitemap.php" rel="noopener noreferrer" target="_blank">Sitemap</a>
                                <Link to="/contact" className="btn btn-success">Contact Us</Link>
                                <Link to="/feedback" className="btn btn-success">Give us your feedback</Link>
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-lg-12">
                                {props && props.links.map(data =>
                                    (
                                        <span key={data.page_url}>
                                            <Link to={createLink(data)}>{data.name}</Link>&nbsp;|&nbsp;
                                        </span>
                                    ))
                                }
                            </div>
                        </div> */}
                        <div className="row text-center">
                            <div className="col-lg-12">
                                    Copyright &copy; WorkPapa {props.copyright}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );

Footer.defaultProps = {
    copyright: new Date().getFullYear(),
    links: []
};
export default Footer;
