import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { saveAs } from 'file-saver';
import HtmlDocx from 'html-docx-js/dist/html-docx';
import * as JsPDF from 'jspdf';
import Util from '../../helpers/util.class';

class PreviewTemplatePage extends Component {
    constructor(props) {
        super(props);
        // this.state = this.initialize();
        this.templateBuilder = Util.getDataFromSessionStorage('templateData');
        // fetch('http://upload.workpapa.com/templates/templateletter.htm')
        //     .then(response =>
        //         response.text().then((text) => {
        //             console.log(JSON.parse(this.templateBuilder.questionaire));
        //             JSON.parse(this.templateBuilder.questionaire).forEach((element) => {
        //                 const match = new RegExp(element.key, 'g');
        //                 text = text.replace(match, element.answer);
        //             });
        //             this.setState({ template: text });
        //         }));
        const storePackage = Util.getDataFromSessionStorage('letterData');
        let template = '';
        storePackage.forEach((element) => {
            template += `<p>${element.label}</p>`;
        });

        JSON.parse(this.templateBuilder.questionaire).forEach((element) => {
            const match = new RegExp(element.key, 'g');
            template = template.replace(match, element.answer);
        });

        this.state = {
            template
        };
        // this.setState({ template });
    }

    downloadDocxResume = () => {
        const contentDocument = `<!DOCTYPE html><html><head></head><body>${this.state.template}</body></html>`;
        // console.log(contentDocument);
        const charSet = ' ';
        const content = charSet + contentDocument;
        const converted = HtmlDocx.asBlob(content);
        saveAs(converted, 'test111.docx');
    }

    downloadPdfResume = () => {
        const contentDocument = this.state.template;
        const pdf = new JsPDF();
        const source = contentDocument; // contentDocument;
        // console.log(source);
        const specialElementHandlers = {
        };

        const margins = {
            top: 15,
            left: 15,
            width: 170
        };

        pdf.fromHTML(
            source // HTML string or DOM elem ref.
            , margins.left // x coord
            , margins.top // y coord
            , {
                width: margins.width, // max width of content on PDF
                elementHandlers: specialElementHandlers
            },
            () => {
            // dispose: object with X, Y of the last line add to the PDF
            // this allow the insertion of new lines after html
                pdf.save('testpdf.pdf');
            }
        );
    }

    render() {
        return (
            <div className="top-spacer" >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 col-sm-offset-1">
                            <ul className="list-group">
                                <li className="list-group-item"><a onClick={() => this.downloadDocxResume()} >Download</a></li>
                                <li className="list-group-item"><a onClick={() => this.downloadPdfResume()} >Download PDF</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-7" style={{ border: '1px solid #CCC', padding: '30px', marginBottom: '20px' }}>
                            {ReactHtmlParser(this.state.template)}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default PreviewTemplatePage;
