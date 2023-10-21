import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
// import { PanelGroup, Panel } from 'react-bootstrap';
// import faqData from '../../data/faq.json';

class ResumeProcess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resumeText: props.resumeText
        };
    }
    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps);
    //     this.setState({
    //         resumeText: nextProps.resumeText
    //     });
    // }
    render() {
        return (
            <div className="row">
                <h3>RESUME WRITING PROCESS</h3>
                {/* <small className="text-center">What’s Included In Our Package?</small> */}
                <div className="col-md-4">
                    <div className="panel panel-default" id="steps">
                        <div className="portfolio-item">
                            <div className="portfolio-link">
                                <img src={require('../../assets/img/icons8-iPhone-50.png')} className="img-responsive img-centered" alt="" />
                                <h4 className="text-center">COLLECT INFORMATION</h4>
                                <div className="description text-center">
                                Upload your documents and complete our simple questionnaire so we can pick a suitable writer for you.
                                    {/* Schedule a one-on-one interview with your resume writer. Prior to the interview, we&apos;ll collect information on the types of jobs you&apos;d like to apply for. */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="panel panel-default" id="steps">
                        <div className="portfolio-item">
                            <div className="portfolio-link">
                                <img src={require('../../assets/img/icons8-Geography-Filled-50.png')} className="img-responsive img-centered" alt="" />
                                <h4 className="text-center">UNLIMITED REVISIONS</h4>
                                <div className="description text-center">
                                Within only 1 business day of the phone interview, we’ll send you the first draft of your written or rewritten {this.state.resumeText}. After that, you’ll have 10 business days to suggest revisions and tweaks to your writer. Once finished, we’ll send you the final draft in either a PDF or Word Doc.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="panel panel-default" id="steps">
                        <div className="portfolio-item">
                            <div className="portfolio-link">
                                <img src={require('../../assets/img/icons8-Prize-50.png')} className="img-responsive img-centered" alt="" />
                                <h4 className="text-center">30-DAY INTERVIEW GUARANTEE </h4>
                                <div className="description text-center">
                                Our {this.state.resumeText} writing service comes with a 30-day interview guarantee! If your new resume doesn’t get you any callbacks or interviews within 30 days of completion, we’ll revise it further or give your money back, no questions asked!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ResumeProcess.defaultProps = {
    resumeText: 'Resume'
};
export default ResumeProcess;
