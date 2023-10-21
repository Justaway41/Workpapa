import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import ScrollToTop from '../../../components/scrolltotop/scrolltotop';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
// import PopUp from '../../components/popup/popup';
import ResumeTemplate from '../../../components/template/template';
import Util from '../../../helpers/util.class';
import packageData from '../../../data/packages.json';

// import { saveAs } from 'file-saver';
// import HtmlDocx from 'html-docx-js/dist/html-docx';

// https://github.com/Automattic/juice/issues/290
class CvWriterSamplePage extends Component {
    constructor() {
        super();
        this.state = {};
    }


    showModal = (showModal) => {
        this.setState(showModal);
    }
    handlePopupStatus = (showModal) => {
        this.setState(showModal);
    }
    handleMoveNext = (selectedTemplate) => {
        const storeTemplate = {
            id: selectedTemplate.id,
            label: selectedTemplate.label
        };
        const packageSelected = {
            base: 'RTS',
            totalPrice: packageData.product.service.RTS.price[0].amt,
            template: storeTemplate,
            addon: []
        };
        Util.setDataToSessionStorage('package', packageSelected);

        this.props.history.push('/payment/service/RTS');

        // this.router.navigate(['payment/service', this.props.match.params.package,0]);
    }
    render() {
        return (
            <div>
                <ScrollToTop />
                <Header {...this.props} />
                <Helmet>
                    <title>WorkPapa | Resume Samples</title>
                </Helmet>
                <section id="about">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2>CV Samples</h2>
                                <hr className="star-primary" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                {/* <h4>Select a design that suits you.<br/> We have over 25 CV templates that make it easy to start</h4> */}
                            </div>
                        </div>
                        <ResumeTemplate showButton={false} showDownloadLink />

                    </div>
                </section>

                <Footer />
            </div>
        );
    }
}


export default CvWriterSamplePage;
