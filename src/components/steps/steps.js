import React from 'react';
// import { Link } from 'react-router-dom'

const Steps = props =>
    (
        <div>
            <div className="row bs-wizard" style={{ borderBottom: '0' }}>
                {props.stepData.map(ele =>
                    (
                        <div key={ele.stepTxt} className={`col-xs-2 bs-wizard-step ${ele.status}`} >
                            <div className="text-center bs-wizard-stepnum">{ele.stepTxt}</div>
                            <div className="progress"><div className="progress-bar" /></div>
                            <div className="bs-wizard-dot" />
                            {ele.status === 'active' &&
                                    <div className="bs-wizard-info text-center "><strong>{ele.stepDesc}</strong></div>
                            }
                            {ele.status !== 'active' &&
                                    <div className="bs-wizard-info text-center ">{ele.stepDesc}</div>
                            }
                        </div>
                    ))}
            </div>
        </div>
    );
/*
Steps.defaultProps = {
    stepData: [
        {
            stepTxt: 'Step 1',
            stepDesc: 'Home',
            status: 'complete'
        },
        {
            stepTxt: 'Step 2',
            stepDesc: 'Customize',
            status: 'active'
        },
        {
            stepTxt: 'Step 3',
            stepDesc: 'Billing',
            status: 'disabled'
        },
    ]
} */
export default Steps;
