import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import Img from 'react-image';
// import Img1 from '../../components/image/image';
import Util from '../../helpers/util.class';
import Globals from '../../helpers/constant';

export const GuaranteeTxt = props =>
    (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h2>Interviews Within 30 Days</h2>
                    <h3>100% Money Back Guarantee</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2 text-center">
                    <p>Our new {props.resumeText}s will get you interviews within 30 days. If we don’t deliver, you’ll get all your money back.</p>
                </div>
            </div>
        </div>
    );
export const IntroTxt = props =>
    (
        <div className="intro-text" style={{ width: '80%' }}>
            {!props.city &&
            <div>
                <h2>Our professional writers rewrite your {props.resumeText} fast.<br /> Guaranteed interviews within 30 days</h2>
                <div className="skills"> We offer the lowest prices starting at {Util.showPrice(20, props.geo.currencyConverter, Util.currency(props.geo.currencyCode), props.geo.currencyCode, 0)}</div>
            </div>
            }
            {!!props.city &&
            <div>
                <h1>New York {props.resumeText} Writing</h1>
                <div className="skills"> We know what employers seek. We are experts at targeting resumes and CV’s to match position requirements, allowing our clients to showcase value to employers. Let our resume and CV expertise help propel your career.</div>
            </div>
            }
        </div>
    );
export const PriceComp = props =>
    (
        <Table striped bordered condensed>
            <tbody>
                <tr><th><h4>Competitors</h4></th><th>{props.stateData.currencyCode}</th></tr>
                <tr className="alert alert-success"><td><h5>workpapa.com</h5></td><td>{Util.showPrice(20, props.stateData.conversionRate, props.stateData.currency, props.stateData.currencyCode, 0)}</td></tr>
                { Object.keys(props.stateData.priceComp).map(items =>
                    <tr key={props.stateData.priceComp[items].site}><td><h5>{props.stateData.priceComp[items].site}</h5></td><td>{Util.showPrice(props.stateData.priceComp[items].price, props.stateData.conversionRate, props.stateData.currency, props.stateData.currencyCode, 0)}</td></tr>)
                }
            </tbody>
        </Table>
    );
export const Client = props =>
    (
        <div className="container">
            {props.clients &&
        <div className="row">
            <div className="col-lg-12 text-center">
                <h2>Client Reviews</h2>
                <hr className="star-primary" />
            </div>

            {props.clients.map(items =>
                (
                    <div className="col-lg-4 text-center" key={items.clientname}>
                        <img rel="preload" src={`${Globals.publicUrl}/assets/images/${items.clientimg}`} className="img-circle clientimage" alt={items.clientimg} />
                        {/* <Img src={`/assets/images/${items.clientimg}`} className="img-circle clientimage" /> */}
                        <p className="small">{ReactHtmlParser(items.clientdesc)}</p>
                        <h3>{items.clientname}</h3>
                        <h4>{items.clientcomp}</h4>
                        <p>
                            {/* <img rel="preload" src={require(`${Globals.publicUrl}/assets/img/${items.clientcomplogo}`)} className="img-responsive img-centered" alt={items.clientcomplogo} key={items.clientcomplogo} /> */}
                        </p>
                    </div>
                ))}
        </div>
            }
        </div>
    );
export const Writer = props =>
    (
        <div className="container">
            {props.writers &&
        <div className="row">
            <div className="col-lg-12 text-center">
                <h2>Meet our writers</h2>
                <hr className="star-primary" />
            </div>

            {props.writers.map(items =>
                (
                    <div className="col-lg-4 text-center" key={items.name}>
                        {/* {this.createImage(items.img, 'img-circle clientimage')} */}
                        {/* <Img src={`/assets/images/${items.img}`} className="img-circle clientimage" /> */}
                        <img rel="preload" src={`${Globals.publicUrl}/assets/images/${items.img}`} className="img-circle clientimage" alt={items.img} key={items.img} />
                        <h3>{items.name}</h3>
                    </div>
                ))}
        </div>
            }
        </div>
    );

export const OrderCV = props =>
    (
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <p style={{ fontSize: '3rem' }}>We Make {props.resumeText}s That Get More Job Interviews </p>
                </div>
                <div className="col-lg-4">
                    <a href="/#rewrite" className="btn btn-lg btn-profile btn-danger" style={{ fontSize: '2rem', margin: '0px' }} >Order {props.resumeText} Package</a>
                </div>
            </div>
        </div>
    );

export const HowDoesItWork = props =>
    (
        <div className="container howitwork">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h2>How Does It Work?</h2>
                    <hr className="star-primary" />
                </div>
                {props.data.map(item =>
                    (
                        <div className="col-md-3 col-xs-12 text-center" key={item.description}>
                            <img rel="preload" src={`${Globals.publicUrl}/assets/images/svg/${item.icon}`} className="img-responsive img-centered" alt={item.icon} />
                            {/* <Img src={`/assets/images/svg/${item.icon}`} className="img-responsive img-centered" /> */}
                            <p className="small">{item.description}</p>
                        </div>
                    ))}
            </div>
        </div>
    );

export const WritingProcess = props =>
    (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h2>{props.resumeText} Writing Process</h2>
                    <hr className="star-primary" />
                    <p className="small">What’s Included In Our Package?</p>
                    <p className="small">Are you constantly applying for jobs and not getting interviews? but your {props.resumeText} do not seem to be getting the kind of results you expect? </p>
                    <p className="small">We know the latest methods to make the best eye catching {props.resumeText} to the current industry standards. Creating the ideal {props.resumeText} or Cover Letter has been our profession for a long period of time and we understand the intricacies and the details that can make or break a {props.resumeText}</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 portfolio-item">
                    <div className="portfolio-link">
                        {/* <img rel="preload" src={`${Globals.publicUrl}/assets/images/svg/personal-data-visualization-in-a-laptop-monitor.svg`} className="img-responsive img-centered" alt="" /> */}
                        <Img src={'/assets/images/svg/personal-data-visualization-in-a-laptop-monitor.svg'} className="img-responsive img-centered" />
                        <h4 className="text-center">Collect Information</h4>
                        <div className="description text-center">
                        Upload Files & complete questionnaire.
                        </div>

                    </div>
                </div>
                <div className="col-md-4 portfolio-item">
                    <div className="portfolio-link">
                        {/* <img rel="preload" src={require(`${Globals.publicUrl}/assets/images/svg/domain.svg`)} className="img-responsive img-centered" alt="" /> */}
                        <Img src={'/assets/images/svg/domain.svg'} className="img-responsive img-centered" />
                        <h4 className="text-center">Unlimited Revisions </h4>
                        <div className="description text-center">
                    You’ll have 10 working days of unlimited revisions with your {props.resumeText} writer.
                        </div>

                    </div>
                </div>
                <div className="col-md-4 portfolio-item">
                    <div className="portfolio-link">
                        {/* <img rel="preload" src={require(`${Globals.publicUrl}/assets/images/svg/guarantee.svg`)} className="img-responsive img-centered" alt="" /> */}
                        <Img src={'/assets/images/svg/guarantee.svg'} className="img-responsive img-centered" />
                        <h4 className="text-center">30 Day Interview Guarantee</h4>
                        <div className="description text-center">
                        Or get all your money back.
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
export const SelectExperience = props =>
    (
        <div id="rewrite" className="col-xs-12">
            <div className="col-md-2 portfolio-item">
                <div className="portfolio-link" style={{ padding: '20px 5px' }}>
                    <div className="portfolio-deatils">
                        <h4 className="text-center">Entry Level</h4>
                        {/* <img rel="preload" src={require(`${Globals.publicUrl}/assets/images/svg/cap.svg`)} className="img-responsive img-centered" alt="" /> */}
                        <Img src={'/assets/images/svg/guarantee.svg'} className="img-responsive img-centered" />
                        <div className="description text-center">
                            0 - 2 Years
                        </div>
                    </div>
                    {!!props.stateData.packages[props.stateData.package].FGR &&
                    <div className="text-center">
                        <span style={{ fontSize: '2.5rem' }} >{Util.showPrice(props.stateData.packages[props.stateData.package].FGR, props.stateData.conversionRate, props.stateData.currency, props.stateData.currencyCode, 0)}</span>
                    </div>
                    }
                    <div className="text-center">
                        <Link className="btn btn-xs btn-outline btn-success" to={`/payment/servicemenu/${props.stateData.package}/FGR`} >NEXT <i className="fas fa-arrow-circle-right" /></Link>
                    </div>
                </div>
            </div>
            <div className="col-md-2 portfolio-item">
                <div className="portfolio-link" style={{ padding: '20px 5px' }}>
                    <div className="portfolio-deatils">
                        <h4 className="text-center">Early</h4>
                        {/* <img rel="preload" src={require(`${Globals.publicUrl}/assets/img/svg/worker.svg`)} className="img-responsive img-centered" alt="" /> */}
                        <Img src={'/assets/images/svg/worker.svg'} className="img-responsive img-centered" />
                        <div className="description text-center">
                            2 - 5 Years
                        </div>
                    </div>
                    {!!props.stateData.packages[props.stateData.package].ECR &&
                    <div className="text-center">
                        <span style={{ fontSize: '2.5rem' }} >{Util.showPrice(props.stateData.packages[props.stateData.package].ECR, props.stateData.conversionRate, props.stateData.currency, props.stateData.currencyCode, 0)}</span>
                    </div>
                    }
                    <div className="text-center">
                        <Link className="btn btn-xs btn-outline btn-success" to={`/payment/servicemenu/${props.stateData.package}/ECR`} >NEXT <i className="fas fa-arrow-circle-right" /></Link>
                    </div>
                </div>
            </div>
            <div className="col-md-2 portfolio-item">
                <div className="portfolio-link" style={{ padding: '20px 5px' }}>
                    <div className="portfolio-deatils">
                        <h4 className="text-center">Junior</h4>
                        {/* <img rel="preload" src={require(`${Globals.publicUrl}/assets/img/svg/analyst.svg`)} className="img-responsive img-centered" alt="" /> */}
                        <Img src={'/assets/images/svg/analyst.svg'} className="img-responsive img-centered" />
                        <div className="description text-center">
                            5 - 10 Years
                        </div>
                    </div>
                    {!!props.stateData.packages[props.stateData.package].JCR &&
                    <div className="text-center">
                        <span style={{ fontSize: '2.5rem' }} >{Util.showPrice(props.stateData.packages[props.stateData.package].JCR, props.stateData.conversionRate, props.stateData.currency, props.stateData.currencyCode, 0)}</span>
                    </div>
                    }
                    <div className="text-center">
                        <Link to={`/payment/servicemenu/${props.stateData.package}/JCR`} className="btn btn-xs btn-outline btn-success">NEXT <i className="fas fa-arrow-circle-right" /></Link>
                    </div>
                </div>
            </div>

            <div className="col-md-2 portfolio-item">
                <div className="portfolio-link" style={{ padding: '20px 5px' }}>
                    <div className="portfolio-deatils">
                        <h4 className="text-center">Mid</h4>
                        {/* <img rel="preload" src={require(`${Globals.publicUrl}/assets/img/svg/manager.svg`)} className="img-responsive img-centered" alt="" /> */}
                        <Img src={'/assets/images/svg/manager.svg'} className="img-responsive img-centered" />
                        <div className="description text-center">
                            10 - 20 Years
                        </div>
                    </div>
                    {!!props.stateData.packages[props.stateData.package].MCR &&
                    <div className="text-center">
                        <span style={{ fontSize: '2.5rem' }} >{Util.showPrice(props.stateData.packages[props.stateData.package].MCR, props.stateData.conversionRate, props.stateData.currency, props.stateData.currencyCode, 0)}</span>
                    </div>
                    }
                    <div className="text-center">
                        <Link to={`/payment/servicemenu/${props.stateData.package}/MCR`} className="btn btn-xs btn-outline btn-success">NEXT <i className="fas fa-arrow-circle-right" /></Link>
                    </div>
                </div>
            </div>

            <div className="col-md-2 portfolio-item">
                <div className="portfolio-link" style={{ padding: '20px 5px' }}>
                    <div className="portfolio-deatils">
                        <h4 className="text-center">Senior</h4>
                        {/* <img rel="preload" src={require(`${Globals.publicUrl}/assets/img/svg/grandfather.svg`)} className="img-responsive img-centered" alt="" /> */}
                        <Img src={'/assets/images/svg/grandfather.svg'} className="img-responsive img-centered" />
                        <div className="description text-center">
                            20+ Years
                        </div>
                    </div>
                    {!!props.stateData.packages[props.stateData.package].SRS &&
                    <div className="text-center">
                        <span style={{ fontSize: '2.5rem' }} >{Util.showPrice(props.stateData.packages[props.stateData.package].SRS, props.stateData.conversionRate, props.stateData.currency, props.stateData.currencyCode, 0)}</span>
                    </div>
                    }
                    <div className="text-center">
                        <Link to={`/payment/servicemenu/${props.stateData.package}/SRS`} className="btn btn-xs btn-outline btn-success">NEXT <i className="fas fa-arrow-circle-right" /></Link>
                    </div>
                </div>
            </div>

            <div className="col-md-2 portfolio-item">
                <div className="portfolio-link" style={{ padding: '20px 5px' }}>
                    <div className="portfolio-deatils">
                        <h4 className="text-center">Executive/ c-suite</h4>
                        {/* <img rel="preload" src={require(`${Globals.publicUrl}/assets/img/svg/chief-executive-officer.svg`)} className="img-responsive img-centered" alt="" /> */}
                        <Img src={'/assets/images/svg/chief-executive-officer.svg'} className="img-responsive img-centered" />
                        <div className="description text-center">
                           CEO, CFO etc.
                        </div>
                    </div>
                    {!!props.stateData.packages[props.stateData.package].ECS &&
                    <div className="text-center">
                        <span style={{ fontSize: '2.5rem' }} >{Util.showPrice(props.stateData.packages[props.stateData.package].ECS, props.stateData.conversionRate, props.stateData.currency, props.stateData.currencyCode, 0)}</span>
                    </div>
                    }
                    <div className="text-center">
                        <Link to={`/payment/servicemenu/${props.stateData.package}/ECS`} className="btn btn-xs btn-outline btn-success">NEXT <i className="fas fa-arrow-circle-right" /></Link>
                    </div>
                </div>
            </div>

        </div>
    );
export const Packages = props =>
    (
        <div className="row">
            <div className="container flex-contaner">
                {Object.keys(props.packageData).length && Object.keys(props.packageData).map(item =>
                    (
                        <div className="col-md-3 portfolio-item" key={props.packageData[item].code}>
                            <div className="portfolio-link">
                                <div className="portfolio-deatils1">
                                    <h4 className="text-center"> {props.packageData[item].name} </h4>
                                    <Img src={props.packageData[item].img} className="img-responsive img-centered" />

                                    <div className="description text-center">
                                        {props.packageData[item].description}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <a onClick={() => props.moveNext(props.packageData[item].code)} className="btn btn-lg btn-outline btn-success">NEXT</a>
                                    {/* <Link to={`/product/servicemenu/${props.productType}/${props.packageData[item].code}`} className="btn btn-lg btn-outline btn-success">NEXT</Link> */}
                                </div>
                                {!!props.packageData[item].price &&
                                <div className="text-center">
                                    <span style={{ fontSize: '2.5rem' }} >{Util.showPrice(props.packageData[item].price, props.conversionRate, props.currency, props.currencyCode, 0)}</span>
                                </div>
                                }
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
