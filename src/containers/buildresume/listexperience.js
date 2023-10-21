import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import Util from '../../helpers/util.class';


class ListExperiencePage extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
        this.resumeBuild = Util.getDataFromSessionStorage('resumeBuild');
        this.state.experience = this.resumeBuild.experience;
    }

    componentDidMount() {
    }

    initialize = () => ({
        msg: '',
        loader: false,
        experience: []
    })

    removeExperience = (index) => {
        const experience = this.state.experience;
        experience.splice(index, 1);
        this.setState({ experience });
        const resumeBuildData = {
            template: this.resumeBuild.template,
            contact: this.resumeBuild.contact,
            experience: experience || []
        };
        // resumeBuildData.experience.push(experienceData);
        Util.setDataToSessionStorage('resumeBuild', resumeBuildData);
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-9 col-lg-offset-2">
                    <h3>Your Work History</h3>
                    {this.state.experience.map((experience, i) => (
                        <div className="well" key={`${experience.jobtitle}-${experience.employer}-${experience.endyear}`}>
                            <div className="row">
                                <div className="col-xs-6">
                                    {experience.jobtitle}, {experience.employer}
                                </div>
                                <div className="col-xs-3">
                                    {experience.city}, {experience.state}
                                </div>
                                <div className="col-xs-2">
                                    {experience.startyear} - {experience.endyear}
                                </div>
                                <div className="col-xs-1">
                                    {/* <a href="/build-resume/experience"><i className="far fa-edit" /></a>&nbsp;&nbsp; */}
                                    <a onClick={() => this.removeExperience(i)} style={{ cursor: 'pointer' }}><i className="fas fa-trash-alt" /></a>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12">
                                    {ReactHtmlParser(experience.responsibilities)}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="well">
                        <div className="row text-center">
                            <Link to="/build-resume/experience"><i className="fas fa-plus-square" /> Add Another Position</Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-xs-6">
                            <button className="btn btn-default btn-lg pull-left" onClick={this.props.history.goBack}>
                                <i className="fas fa-arrow-circle-left" /> Back
                            </button>
                        </div>
                        <div className="form-group col-xs-6">
                            <Link className="btn btn-danger btn-lg pull-right" to="/build-resume/education">Next: Education
                                <i className="fas fa-arrow-circle-right" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default ListExperiencePage;
