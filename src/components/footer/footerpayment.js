import React from 'react';
import { Link } from 'react-router-dom';

const FooterPayment = props =>
    (
        <div className="Footer">
            <footer className="text-center">
                <div className="footer-below">
                    <div className="container">

                        <div className="row">
                            <div className="col-lg-12">
                                <Link to="/term">Terms &amp; Conditions</Link> &nbsp;|&nbsp;
                                <Link to="/privacy">Privacy Policy</Link><br />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                    Copyright &copy; WorkPapa {props.copyright}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
FooterPayment.defaultProps = {
    copyright: new Date().getFullYear()
};
export default FooterPayment;
