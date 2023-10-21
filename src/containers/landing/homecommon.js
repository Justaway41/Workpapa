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
                <h2>Professional writers rewrite your {props.resumeText} in 24 - 48 hours!<br /> Get an interview within 30 days, GUARANTEED!</h2>
                {/* <div className="skills"> Offering the best deals, starting at only {Util.showPrice(props.priceProduct.RRS, props.geo.currencyConverter, Util.currency(props.geo.currencyCode), props.geo.currencyCode, 0)}!</div> */}
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
                <tr className="alert alert-success"><td><h5>workpapa.com</h5></td><td>{Util.showPrice(props.stateData.priceProduct.RRS, props.stateData.conversionRate, props.stateData.currency, props.stateData.currencyCode, 0)}</td></tr>
                { Object.keys(props.stateData.priceComp).map(items =>
                    <tr key={props.stateData.priceComp[items].site}><td><h5>{props.stateData.priceComp[items].site}</h5></td><td>{Util.showPrice(props.stateData.priceComp[items].price, props.stateData.conversionRate, props.stateData.currency, props.stateData.currencyCode, 0)}</td></tr>)
                }
            </tbody>
        </Table>
    );
export const Client = props =>
    (
        <div className="container client-container">
            {props.clients &&
        <div className="row">
            <div className="client-container-header">
                <h2>Client Reviews</h2>
                <svg className="bar" xmlns="https://www.w3.org/2000/svg" width="248" height="1" viewBox="0 0 248 1">
                    <rect id="Rectangle_1996" data-name="Rectangle 1996" width="248" height="1" fill="#bcbcbc" />
                </svg>
            </div>
            <div className="col-lg-12 text-center client-container-iframe">
                <iframe title="Workpapa.com success story" height="436px" src="https://www.youtube.com/embed/H7jclCNg3tM" />
            </div>
            <div className="col-sm-12 text-center">
                {props.clients.map(items =>
                    (
                        <div className="col-lg-4 text-center client-item" key={items.clientname}>
                            <div className="client-item-inside">
                                {/* <img rel="preload" src={require(`${Globals.publicUrl}/assets/img/${items.clientimg}`)} className="img-circle clientimage" alt={items.clientimg} key={items.clientimg} /> */}
                                <div className="clientImage-div">
                                    <Img src={`/assets/images/${items.clientimg}`} className="img-circle clientimage" />
                                </div>
                                <p className="small">{ReactHtmlParser(items.clientdesc)}</p>
                                <h3>{items.clientname}</h3>
                                <h4>{items.clientcomp}</h4>
                                <p>
                                    <Img src={`/assets/images/${items.clientcomplogo}`} className="img-responsive img-centered" />

                                    {/* <img rel="preload" src={require(`${Globals.publicUrl}/assets/img/${items.clientcomplogo}`)} className="img-responsive img-centered" alt={items.clientcomplogo} key={items.clientcomplogo} /> */}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
            }
        </div>
    );
export const Writer = props =>
    (
        <div className="container writer-container">
            {props.writers &&
        <div className="row">
            <div className="col-lg-12 writer-container-header">
                <h2>Meet Our Career Consultants</h2>
                <svg className="bar" xmlns="https://www.w3.org/2000/svg" width="248" height="1" viewBox="0 0 248 1">
                    <rect id="Rectangle_1996" data-name="Rectangle 1996" width="248" height="1" fill="#bcbcbc" />
                </svg>
            </div>

            {props.writers.map(items =>
                (
                    <div className="col-lg-3 text-center writer-item" key={items.name}>
                        <div className="writer-item-inside text-center">
                            {/* {this.createImage(items.img, 'img-circle clientimage')} */}
                            <div className="clientImage-div">
                                <Img src={`/assets/images/${items.img}`} className="img-circle clientimage" />
                            </div>
                            {/* <img rel="preload" src={require( Globals.publicUrl+'/assets/images/'+items.img )} className="img-circle clientimage" alt={items.img} key={items.img} /> */}
                            <h3>{items.name}</h3>
                            <p>{items.about}</p>
                        </div>
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
                    <p style={{ fontSize: '3rem' }}>{props.text}</p>
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
                <div className="col-lg-12 howitwork-header">
                    <h2>How Does It Work?</h2>
                    <svg className="bar" xmlns="https://www.w3.org/2000/svg" width="248" height="1" viewBox="0 0 248 1">
                        <rect id="Rectangle_1996" data-name="Rectangle 1996" width="248" height="1" fill="#bcbcbc" />
                    </svg>
                </div>
                <div className="col-md-3 col-xs-12 text-center howitwork-item">
                    <div className="howitwork-inside">
                        <Img src={'/assets/images/svg/select.svg'} className="img-responsive img-centered" />
                        <p className="small">First, you select your career level and complete your order on our site. </p>
                    </div>
                </div>
                <div className="col-md-3 col-xs-12 text-center howitwork-item">
                    <div className="howitwork-inside">
                        <Img src={'/assets/images/svg/survey.svg'} className="img-responsive img-centered" />
                        <p className="small">Then, you complete our simple questionnaire and upload your current documents.</p>
                    </div>
                </div>
                <div className="col-md-3 col-xs-12 text-center howitwork-item">
                    <div className="howitwork-inside">
                        <Img src={'/assets/images/svg/meeting.svg'} className="img-responsive img-centered" />
                        <p className="small">After that, you login to our site and discuss your project and concerns with your writer using our status portal.</p>
                    </div>
                </div>
                <div className="col-md-3 col-xs-12 text-center howitwork-item">
                    <div className="howitwork-inside">
                        <Img src={'/assets/images/svg/receive.svg'} className="img-responsive img-centered" />
                        <p className="small">Then, your writer will complete your {props.resumeText} and give it back to you in PDF or Word Doc form.</p>
                    </div>
                </div>
            </div>
        </div>
    );

export const WritingProcess = props =>
    (
        <div className="container">
            {/* <div className="row">
                <div className="col-lg-12 text-center">
                    <h2>Resume Writing Process</h2>
                    <hr className="star-primary" />
                    <p className="small">What’s Included In Our Package?</p>
                    <p className="small">Are you constantly applying for jobs and not getting interviews? but your {props.resumeText} do not seem to be getting the kind of results you expect? </p>
                    <p className="small">We know the latest methods to make the best eye catching {props.resumeText} to the current industry standards. Creating the ideal {props.resumeText} or Cover Letter has been our profession for a long period of time and we understand the intricacies and the details that can make or break a {props.resumeText}</p>
                </div>
            </div> */}
            {console.log(props.resumeText)}
            <div className="row">
                <div className="col-md-4 portfolio-item">
                    <div className="portfolio-link" style={{ minHeight: '150px' }}>
                        <Img src={'/assets/images/svg/domain.svg'} className="img-responsive img-centered" />
                        <h4 className="text-center">Unlimited Revisions </h4>
                        {/* <div className="description text-center">
                        If you’re not happy with your {props.resumeText} the first time, you have 10 business days to suggest revisions to your writer until you’re satisfied!
                        </div> */}

                    </div>
                </div>
                <div className="col-md-4 portfolio-item">
                    <div className="portfolio-link" style={{ minHeight: '150px' }}>
                        <Img src={'/assets/images/svg/personal-data-visualization-in-a-laptop-monitor.svg'} className="img-responsive img-centered" />
                        <h4 className="text-center">24 Hour Service</h4>
                        {/* <div className="description text-center">
                        Have your first draft ready within 24 hours
                        </div> */}

                    </div>
                </div>
                <div className="col-md-4 portfolio-item">
                    <div className="portfolio-link" style={{ minHeight: '150px' }}>
                        <Img src={'/assets/images/svg/guarantee.svg'} className="img-responsive img-centered" />
                        <h4 className="text-center">30-Day Interview Guarantee</h4>
                        {/* <div className="description text-center">
                        If we somehow can’t get your resume right no matter what, you’ll get all your money back, no questions asked!
                        </div> */}

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
                        <img rel="preload" src={`${Globals.publicUrl}/assets/images/svg/cap.svg`} className="img-responsive img-centered" alt="" />
                        {/* <Img src={'/assets/images/svg/guarantee.svg'} className="img-responsive img-centered" /> */}
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
                        <img rel="preload" src={`${Globals.publicUrl}/assets/images/svg/worker.svg`} className="img-responsive img-centered" alt="" />
                        {/* <Img src={'/assets/images/svg/worker.svg'} className="img-responsive img-centered" /> */}
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
                        <img rel="preload" src={`${Globals.publicUrl}/assets/images/svg/analyst.svg`} className="img-responsive img-centered" alt="" />
                        {/* <Img src={'/assets/images/svg/analyst.svg'} className="img-responsive img-centered" /> */}
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
                        <img rel="preload" src={`${Globals.publicUrl}/assets/images/svg/manager.svg`} className="img-responsive img-centered" alt="" />
                        {/* <Img src={'/assets/images/svg/manager.svg'} className="img-responsive img-centered" /> */}
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
                        <img rel="preload" src={`${Globals.publicUrl}/assets/images/svg/grandfather.svg`} className="img-responsive img-centered" alt="" />
                        {/* <Img src={'/assets/images/svg/grandfather.svg'} className="img-responsive img-centered" /> */}
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
                        <img rel="preload" src={`${Globals.publicUrl}/assets/images/svg/chief-executive-officer.svg`} className="img-responsive img-centered" alt="" />
                        {/* <Img src={'/assets/images/svg/chief-executive-officer.svg'} className="img-responsive img-centered" /> */}
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
