import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap';
// import faqData from '../../data/faq.json';
// import PlanData from '../../../data/library/plans.json';

const PlanData = [];
class CommunityPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plan: props.plan
        };
    }
    componentWillReceiveProps(nextProp) {
        console.log(nextProp);
    }
    selectPlan = (plan) => {
        this.setState({ plan });
        this.props.selectedPlan(plan);
    }
    getSelectClass = plan => (this.state.plan === plan ? 'alert-danger' : 'alert-success');
    getSelectTextClass = plan => (this.state.plan === plan ? 'text-danger' : '');

    render() {
        return (
            <div className="plan">
                <Table striped responsive className="text-center">
                    <tbody>
                        {this.state.plan &&
                        <tr>
                            <td className="text-left">&nbsp;</td>
                            <td className={`heading alert ${this.getSelectClass('LBA')}`} onClick={() => this.selectPlan('LBA')}>Basic</td>
                            <td className={`heading alert ${this.getSelectClass('LST')}`} onClick={() => this.selectPlan('LST')}>Standard</td>
                            <td className={`heading alert ${this.getSelectClass('LPR')}`} onClick={() => this.selectPlan('LPR')}>Premium</td>
                        </tr>
                        }
                        {!this.state.plan &&
                            <tr>
                                <td className="text-left">&nbsp;</td>
                                <td>Basic</td>
                                <td>Standard</td>
                                <td>Premium</td>
                            </tr>
                        }
                        {PlanData.map(item => (
                            <tr key={item.id}>
                                <td className="text-left">{item.label}</td>
                                <td className={`alert ${this.getSelectTextClass('LBA')}`}>{item.basic}</td>
                                <td className={`alert ${this.getSelectTextClass('LST')}`}>{item.standard}</td>
                                <td className={`alert ${this.getSelectTextClass('LPR')}`}>{item.premium}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default CommunityPlan;
