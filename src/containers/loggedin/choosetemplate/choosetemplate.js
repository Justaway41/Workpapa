import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import ScrollToTop from '../../../components/scrolltotop/scrolltotop';
import ResumeTemplate from '../../../components/template/template';
import Steps from '../../../components/steps/steps';
// import packageData from '../../data/packages.json';
import templateData from '../../../data/resumetemplate.json';
// import Util from '../../helpers/util.class';
import ProfileApi from '../../../api/profileApi';
// import Auth from '../../../helpers/auth.class';
import Spinner from '../../../components/spinner/spinner';


class ChooseTemplatePage extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
        // this.templateFlow = false;
    }
    componentWillMount() {
        if (!this.state.userId) {
            // this.props.history.push('/payment/addon/'+this.props.match.params.package);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.profile !== nextProps.profile) {
            // console.log(nextProps);
            // this.props = nextProps;
            this.setState({ userId: nextProps.profile.id_user });
            // this.profile = nextProps.profile;
        }
    }
    initialize = () => {
        const userId = this.props.profile.id_user;
        return {
            templateData,
            userId,
            msg: '',
            error: '',
            loader: false
        };
    }
    handleMoveNext = (selectedTemplate) => {
        this.setState({ loader: true });
        const storeTemplate = {
            id: selectedTemplate.id,
            label: selectedTemplate.label
        };
        const packageSelected = {
            template: JSON.stringify(storeTemplate),
            id_user: this.state.userId
        };
        ProfileApi.updateTemplateConfirmation(JSON.stringify(packageSelected))
            .then((response) => {
                if (response.status === 'Success') {
                // this.setState(this.initialize());
                    this.setState({ loader: false, msg: 'Thanks for Updating template infomation. Soon our team will start working on you resume.' });
                    this.props.history.push('/member/questionaire');
                } else {
                    this.setState({ loader: false, error: response.msg });
                }
            });
        // .catch((error) => {
        //     console.log(error);
        // });
        // Util.setDataToSessionStorage('package', packageSelected);
        // if(!!this.state.templateFlow){
        //     this.props.history.push('/payment/service/'+this.props.match.params.package);
        // } else {
        //     this.props.history.push('/payment/addon/'+this.props.match.params.package);
        // }
        // this.router.navigate(['payment/service', this.props.match.params.package,0]);
    }
    stepData() {
        return [
            {
                stepTxt: 'Step 1',
                stepDesc: 'Payment Successful',
                status: 'complete'
            },
            {
                stepTxt: 'Step 2',
                stepDesc: 'Upload your CV/Resume',
                status: 'complete'
            },
            {
                stepTxt: 'Step 3',
                stepDesc: 'Choose your CV/resume Template',
                status: 'active'
            }
        ];
    }
    render() {
        return (
            <div>
                <ScrollToTop />
                <Spinner message="Processing..." loader={this.state.loader} />
                <Helmet>
                    <title>WorkPapa | Select Resume Template </title>
                </Helmet>
                <div className="container">
                    {!!this.props.match.params.payment &&
                            <Steps stepData={this.stepData()} />
                    }

                    {this.state.msg !== '' &&
                            <div className="alert alert-success" >{this.state.msg}</div>
                    }
                    {this.state.error !== '' &&
                            <div className="alert alert-danger" >{this.state.error}</div>
                    }
                    {this.state.msg === '' &&
                            <ResumeTemplate handleMoveNext={this.handleMoveNext} />
                    }
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
export default ChooseTemplatePage;
