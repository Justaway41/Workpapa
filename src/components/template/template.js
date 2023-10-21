import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import templateData from '../../data/resumetemplate.json';
import Globals from '../../helpers/constant';

class ResumeTemplate extends Component {
    constructor() {
        super();
        this.state = this.initialize();
        this.selectedTemplate = {};
    }
    initialize = () => ({
        templateData,
        workpapaTemplate: {
            id: 999,
            label: 'Let Workpapa choose',
            selected: false
        }
    })

    setSelected = (data, selected) => {
        const tempData = this.state.templateData;
        tempData.forEach((dat) => {
            dat.items.forEach((element) => {
                if (element.id === selected) {
                    element.selected = true;
                    this.selectedTemplate = element;
                } else {
                    element.selected = false;
                }
            });
        });
        // tempData[index].items = data;
        this.setState({ templateData: tempData });
        this.props.handleMoveNext(this.selectedTemplate);
    }
    setWorkpapaSelected = () => {
        this.selectedTemplate = this.state.workpapaTemplate;
        this.selectedTemplate.selected = true;
        this.setState({ workpapaTemplate: this.selectedTemplate });

        this.props.handleMoveNext(this.selectedTemplate);
    }
    downloadFile = (filename) => {
        window.open(`${Globals.resumeTemplateUrl}${filename}`);
    }
    render() {
        return (
            <div>
                {!!this.props.showButton &&
                <div>
                    <div className="row ">
                        <div className="col-lg-12 text-center">
                            <h3>Let Workpapa choose a template for me.</h3><p>I agree that once provided with this template, I will not be able to change it later</p>
                            <p className="text-center" >
                                <Button bsStyle={this.state.workpapaTemplate.selected ? 'danger' : 'primary'} onClick={() => { this.setWorkpapaSelected(); }}>{this.state.workpapaTemplate.selected ? 'Choosed' : 'Choose'}</Button>&nbsp;
                            </p>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-lg-12 text-center">
                            <h2>OR</h2>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2>Select a design that suits you.<br /> We have over 25 CV templates that make it easy to start</h2>
                            <hr className="star-primary" />
                        </div>
                    </div>
                </div>
                }
                <Grid>
                    {templateData.map((dat, i) =>
                        (
                            <Row key={dat.title}>
                                <h3>Template Type: {dat.title}</h3>
                                {dat.items.map(item =>
                                    (
                                        <Col xs={12} md={4} key={item.label}>
                                            <Thumbnail src={`/assets/images/cv-template/${item.thumb}`} alt="242x200">
                                                <h4 className="text-center">{item.label} </h4>
                                                {/* <p>Description</p> */}
                                                {!!this.props.showButton &&
                                                <p className="text-center" >
                                                    <Button bsStyle={item.selected ? 'danger' : 'primary'} onClick={() => { this.setSelected(dat.items, item.id, i); }}>{item.selected ? 'Choosed' : 'Choose'}</Button>&nbsp;
                                                </p>
                                                }
                                                {!!this.props.showDownloadLink &&
                                                <p className="text-center" >
                                                    <a className="pointer" onClick={() => this.downloadFile(item.filename)}>Download</a>
                                                </p>
                                                }
                                            </Thumbnail>
                                        </Col>
                                    ))}
                            </Row>
                        ))}
                </Grid>
            </div>
        );
    }
}

ResumeTemplate.defaultProps = {
    showButton: true,
    showDownloadLink: false
};
ResumeTemplate.propTypes = {
    showButton: PropTypes.bool.isRequired
};
// function mapStateToProps(state, ownProps) {
//     return {
//       packages: state.packages
//     };
// }

// export default withRouter(connect(mapStateToProps)(PaymentTemplatePage));
export default ResumeTemplate;
