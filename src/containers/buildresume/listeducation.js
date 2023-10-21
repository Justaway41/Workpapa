import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Util from '../../helpers/util.class';

class ListEducationPage extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
        this.resumeBuild = Util.getDataFromSessionStorage('resumeBuild');
        this.state.education = this.resumeBuild.education;
    }

    initialize = () => ({
        msg: '',
        loader: false,
        education: []
    })

    removeEducation = (index) => {
        const education = this.state.education;
        education.splice(index, 1);
        this.setState({ education });
        const resumeBuildData = {
            template: this.resumeBuild.template,
            contact: this.resumeBuild.contact,
            experience: this.resumeBuild.experience,
            education: education || []
        };
        // resumeBuildData.experience.push(experienceData);
        Util.setDataToSessionStorage('resumeBuild', resumeBuildData);
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-9 col-lg-offset-2">
                    <h3>Your Education History</h3>
                    {this.state.education.map((education, i) => (
                        <div className="well" key={`${education.name}-${education.location}`}>
                            <div className="row">
                                <div className="col-xs-6">
                                    {education.name}, {education.location}
                                </div>
                                <div className="col-xs-3">
                                    {education.degree}
                                </div>
                                <div className="col-xs-2">
                                    {education.year}
                                </div>
                                <div className="col-xs-1">
                                    {/* <a href="/build-resume/experience"><i className="far fa-edit" /></a>&nbsp;&nbsp; */}
                                    <a onClick={() => this.removeEducation(i)} style={{ cursor: 'pointer' }}><i className="fas fa-trash-alt" /></a>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="well">
                        <div className="row text-center">
                            <Link to="/build-resume/education"><i className="fas fa-plus-square" /> Add Another Education</Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-xs-6">
                            <button className="btn btn-default btn-lg pull-left" onClick={this.props.history.goBack}>
                                <i className="fas fa-arrow-circle-left" /> Back
                            </button>
                        </div>
                        <div className="form-group col-xs-6">
                            <Link className="btn btn-danger btn-lg pull-right" to="/build-resume/skills">Next: Skills
                                <i className="fas fa-arrow-circle-right" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default ListEducationPage;
