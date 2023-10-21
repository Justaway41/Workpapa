import * as axios from 'axios';
import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
// import { saveAs } from 'file-saver';
// import HtmlDocx from 'html-docx-js/dist/html-docx';
// import * as jsPDF from 'jspdf';
import Util from '../../helpers/util.class';
// import HTMLPDF from '../../helpers/htmlpdf.class';


class PreviewResumePage extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
        this.resumeBuild = Util.getDataFromSessionStorage('resumeBuild');
        // http://upload.workpapa.com/templates/resume_files/resume.htm
        const templateHtml = 'http://upload.workpapa.com/templates/resume_files/resume.htm';
        fetch(templateHtml)
            .then(response =>
                // response.json();
                response.text().then((text) => {
                    // this.setState({ template: text });
                    // console.log(text);
                    text = text.replace(/###FIRSTNAME###/g, this.resumeBuild.contact.firstname);
                    text = text.replace(/###LASTNAME###/g, this.resumeBuild.contact.lastname);
                    text = text.replace(/###EMAIL###/g, this.resumeBuild.contact.email);
                    text = text.replace(/###ADDRESS###/g, this.resumeBuild.contact.address);
                    text = text.replace(/###CITY###/g, this.resumeBuild.contact.city);
                    text = text.replace(/###STATE###/g, this.resumeBuild.contact.state);
                    text = text.replace(/###ZIP###/g, this.resumeBuild.contact.zip);
                    text = text.replace(/###PHONE###/g, this.resumeBuild.contact.phone);

                    text = text.replace(/###SUMMARY###/g, this.resumeBuild.summary);
                    text = text.replace(/###SKILLS###/g, this.resumeBuild.skills);
                    return text;
                }))
            .then((textData) => {
                // handle json data processing here
                // console.log(textData);
                fetch('http://upload.workpapa.com/templates/template.json')
                    .then((response) => {
                    // console.log(response.json());
                        response.json().then((data) => {
                        // this.setState({ template: text });
                            // console.log(text.EXPERIENCE);
                            const text = data.template2;
                            let finalExperience = '';
                            this.resumeBuild.experience.forEach((ele) => {
                                let experience = `<div>${text.EXPERIENCE}</div>`;
                                experience = experience.replace(/###EXP_JOBTITLE###/g, ele.jobtitle);
                                experience = experience.replace(/###EXP_EMPLOYER###/g, ele.employer);
                                experience = experience.replace(/###EXP_START###/g, ele.startyear);
                                experience = experience.replace(/###EXP_END###/g, ele.endyear);
                                experience = experience.replace(/###EXP_RESPONSIBILITIES###/g, ele.responsibilities);
                                finalExperience += experience;
                            });
                            textData = textData.replace(/###EXPERIENCE###/g, finalExperience);

                            let finalEducation = '';
                            this.resumeBuild.education.forEach((ele) => {
                                let education = `<div>${text.EDUCATION}</div>`;
                                education = education.replace(/###EDU_DEGREE###/g, ele.degree);
                                education = education.replace(/###EDU_FIELD###/g, ele.field);
                                education = education.replace(/###EDU_NAME###/g, ele.name);
                                education = education.replace(/###EDU_YEAR###/g, ele.year);
                                finalEducation += education;
                            });
                            textData = textData.replace(/###EDUCATION###/g, finalEducation);
                            this.setState({ template: textData });
                        });
                    });
            });
    }

    downloadResume = (type) => {
        this.setState({
            loading: true
        });
        this.resumeBuild = Util.getDataFromSessionStorage('resumeBuild');

        axios.post(`https://workpapa.com/resumes?fileType=${type}`, this.resumeBuild)
            .then((response) => {
                const element = document.createElement('a');

                let mimeType;
                switch (type) {
                case 'docx':
                    mimeType = 'vnd.openxmlformats-officedocument.wordprocessingml.document';
                    break;
                case 'pdf':
                    mimeType = 'application/pdf';
                    break;
                default:
                    console.error(`${type} does not exist`);
                    break;
                }
                element.setAttribute('href', `data:${mimeType};base64,${response.data}`);
                element.setAttribute('download', `${this.resumeBuild.contact.firstname}${this.resumeBuild.contact.lastname}Resume.${type}`);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
                this.setState({
                    loading: false
                });
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data);
                }
                this.setState({
                    loading: false
                });
            });
    }

    initialize = () => ({
        template: '',
        msg: '',
        loader: false,
        loading: false
    })


    render() {
        let downloadButton = (
            <ul className="list-group">
                <li className="list-group-item " ><a style={{ width: '100%' }} className="btn btn-primary btn-success" onClick={() => this.downloadResume('docx')} >Download Docx</a></li>
                <li className="list-group-item"><a style={{ width: '100%' }} className="btn btn-primary btn-success" onClick={() => this.downloadResume('pdf')} >Download PDF</a></li>
            </ul>
        );
        if (this.state.loading) {
            downloadButton = (
                <li className="list-group-item " ><a style={{ width: '100%' }} className="btn btn-danger" >Downloading...</a></li>
            );
        }
        return (
            <div className="top-spacer" >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 col-sm-offset-1">
                            {downloadButton}
                        </div>
                        <div className="col-lg-9" >
                            {ReactHtmlParser(this.state.template)}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default PreviewResumePage;
