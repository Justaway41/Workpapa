import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import templateData from '../../data/resumetemplate.json';
import ScrollToTop from '../../components/scrolltotop/scrolltotop';
import Spinner from '../../components/spinner/spinner';
import Util from '../../helpers/util.class';
import Globals from '../../helpers/constant';

class BuildTemplatePage extends Component {
    constructor() {
        super();
        this.state = this.initialize();
        // this.selectedTemplate = {};
    }
    initialize = () => ({
        templateData
    })

    setSelected = (data, selected) => {
        const tempData = this.state.templateData;
        let selectedTemplate = {};
        tempData.forEach((dat) => {
            dat.items.forEach((element) => {
                if (element.id === selected) {
                    element.selected = true;
                    selectedTemplate = element;
                } else {
                    element.selected = false;
                }
            });
        });
        // console.log(selectedTemplate);
        const resumeBuildData = {
            template: selectedTemplate
        };
        Util.setDataToSessionStorage('resumeBuild', resumeBuildData);
        // tempData[index].items = data;
        // this.setState({ templateData: tempData });
        // this.props.handleMoveNext(this.selectedTemplate);
        this.props.history.push('/build-resume/contact');
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
                    {!!this.props.showButton &&
                <div>
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2>What do you want your resume to look like?</h2>
                            <p>Scroll to view all styles and click to select a specific style.</p>
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
                                                <Thumbnail src={`${Globals.publicUrl}/assets/images/cv-template/${item.thumb}`} alt="242x200">
                                                    <h4 className="text-center">{item.label} </h4>
                                                    {/* <p>Description</p> */}
                                                    {!!this.props.showButton &&
                                                <p className="text-center" >
                                                    <Button bsStyle={item.selected ? 'danger' : 'primary'} onClick={() => { this.setSelected(dat.items, item.id, i); }}>{item.selected ? 'Choosed' : 'Choose'}</Button>&nbsp;
                                                </p>
                                                    }
                                                </Thumbnail>
                                            </Col>
                                        ))}
                                </Row>
                            ))}
                    </Grid>
                </div>
            </div>
        );
    }
}

BuildTemplatePage.defaultProps = {
    showButton: true
};
BuildTemplatePage.propTypes = {
    showButton: PropTypes.bool.isRequired
};
// function mapStateToProps(state, ownProps) {
//     return {
//       packages: state.packages
//     };
// }

// export default withRouter(connect(mapStateToProps)(PaymentTemplatePage));
export default BuildTemplatePage;
