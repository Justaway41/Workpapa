import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import ScrollToTop from '../../components/scrolltotop/scrolltotop';
import CommunityPlan from './component/communityplan';
import Util from '../../helpers/util.class';

const defaultPlan = 'LST';
class CommunitySelectPlanPage extends Component {
    constructor() {
        super();
        const storePackage = Util.getDataFromSessionStorage('textLibrary');
        this.plan = storePackage && storePackage.plan ? storePackage.plan : defaultPlan;
    }
    handleSelectedPlan = (plan) => {
        this.plan = plan;
    }
    moveNext = () => {
        let storePackage = Util.getDataFromSessionStorage('textLibrary');
        if (!storePackage) storePackage = {};
        console.log(storePackage);
        storePackage['plan'] = this.plan;
        Util.setDataToSessionStorage('textLibrary', storePackage);
        this.props.history.push('/textlibrary/signup-step1');
    }
    render() {
        return (
            <section id="cummunity">
                <ScrollToTop />
                <div className="row">
                    <div className="container">
                        <div className="col-lg-12">
                            <div className="row text-center">
                                <p className="small">STEP 1 OF 3 </p>
                                <h4>Choose a plan that's right for you.</h4>
                                <p className="small">Downgrade or upgrade at any time</p>
                            </div>
                            <div className="row">
                                <div className="col-lg-8 col-xs-offset-2">
                                    <CommunityPlan plan={this.plan} selectedPlan={this.handleSelectedPlan} />
                                </div>
                            </div>
                            <div className="row text-center">
                                <button className="btn btn-lg btn-outline btn-success" onClick={() => this.moveNext()} >CONTINUE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default CommunitySelectPlanPage;
