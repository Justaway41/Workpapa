import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import PropTypes from 'prop-types';
import ScrollToTop from '../../components/scrolltotop/scrolltotop';
import ResumeTemplate from '../../components/template/template';
import Steps from '../../components/steps/steps';
import packageData from '../../data/packages.json';
import templateData from '../../data/resumetemplate.json';
import Util from '../../helpers/util.class';

class PaymentTemplatePage extends Component {
    constructor() {
        super();
        this.state = this.initialize();
        // this.templateFlow = false;
    }
    componentDidMount() {
        if (this.props.match.params.package === 'RTS') {
            // this.templateFlow = true;
            this.setState({ templateFlow: true });
        }
    }
    initialize = () => ({
        templateData,
        templateFlow: false
    })

    handleMoveNext = (selectedTemplate) => {
        const storeTemplate = {
            id: selectedTemplate.id,
            label: selectedTemplate.label
        };
        const packageSelected = {
            base: this.props.match.params.package,
            experience: 'FGR',
            totalPrice:
                packageData.product.service[this.props.match.params.package].price['0'].amt,
            template: storeTemplate,
            addon: []
        };
        Util.setDataToSessionStorage('package', packageSelected);
        if (this.state.templateFlow) {
            this.props.history.push('/payment/checkout');
        } else {
            this.props.history.push(`/payment/addon/${this.props.match.params.package}`);
        }
    }
    stepData() {
        if (this.state.templateFlow) {
            return [
                {
                    stepTxt: 'Step 1',
                    stepDesc: 'Home',
                    status: 'complete'
                },
                {
                    stepTxt: 'Step 2',
                    stepDesc: 'Select Template',
                    status: 'active'
                },
                {
                    stepTxt: 'Step 3',
                    stepDesc: 'Billing',
                    status: 'disabled'
                },
                {
                    stepTxt: 'Step 4',
                    stepDesc: 'Confirmation',
                    status: 'disabled'
                }
            ];
        }
        return [
            {
                stepTxt: 'Step 1',
                stepDesc: 'Select Package',
                status: 'complete'
            },
            {
                stepTxt: 'Step 2',
                stepDesc: 'Select Template',
                status: 'active'
            },
            {
                stepTxt: 'Step 3',
                stepDesc: 'Customize',
                status: 'disabled'
            },
            {
                stepTxt: 'Step 4',
                stepDesc: 'Billing',
                status: 'disabled'
            },
            {
                stepTxt: 'Step 5',
                stepDesc: 'Confirmation',
                status: 'disabled'
            }
        ];
    }
    render() {
        return (
            <div>
                <ScrollToTop />
                <Helmet>
                    <title>WorkPapa | Select Resume Template </title>
                </Helmet>
                <div className="top-spacer">
                    <div className="container">
                        <Steps stepData={this.stepData()} />
                        {/* <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2>Select a design that suits you.<br /> We have over 25 CV templates that make it easy to start</h2>
                                <hr className="star-primary" />
                            </div>
                        </div> */}
                        {!this.state.templateFlow &&
                        <div className="row ">
                            <div className="col-lg-12 text-center">
                                <h5>
                                    OR I Would like to choose a different template later
                                    <Link to={`/payment/addon/${this.props.match.params.package}`} className="btn btn-danger">Skip For Now</Link>
                                </h5>
                            </div>
                        </div>
                        }
                        <ResumeTemplate handleMoveNext={this.handleMoveNext} />
                    </div>
                </div>
            </div>
        );
    }
}

// function mapStateToProps(state, ownProps) {
//     return {
//       packages: state.packages
//     };
// }

// export default withRouter(connect(mapStateToProps)(PaymentTemplatePage));
export default PaymentTemplatePage;
