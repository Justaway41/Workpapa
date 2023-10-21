import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';
// import Gallery from 'react-photo-gallery';
// import Lightbox from 'react-images';
import ImageLightbox from '../../components/imagelightbox/imagelightbox';

import ScrollToTop from '../../components/scrolltotop/scrolltotop';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import templateData from '../../data/resumedone.json';

class CvDonePage extends Component {
    constructor() {
        super();
        this.state = {
            currentImage: 0,
        };
        this.getGallaryArray();
    }

    // componentDidMount() {
    //     this.getGallaryArray();
    // }

    getGallaryArray = () => {
        const photos = [];
        templateData.forEach((data) => {
            data.items.forEach((item) => {
                item.src = require(`../../assets/img/cv-done/${item.thumb}`);
                item.width = 1;
                item.height = 1;
                photos.push(item);
            });
        });
        this.photos = photos;
    }

    openLightbox = (event, obj) => {
        this.setState({
            currentImage: obj.id - 1,
            lightboxIsOpen: true,
        });
    }
    closeLightbox = () => {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }
    gotoPrevious = () => {
        this.setState({
            currentImage: this.state.currentImage - 1
        });
    }
    gotoNext = () => {
        this.setState({
            currentImage: this.state.currentImage + 1
        });
    }

    render() {
        return (
            <div>
                <ScrollToTop />
                <Header {...this.props} />
                <Helmet>
                    <title>WorkPapa | Our Work</title>
                </Helmet>
                <section id="about">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2>Our Work</h2>
                                <hr className="star-primary" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h4>Some of the recent works we have done. All templates chosen by our customers. So if you do not see one you like, please feel free to ask for more.</h4>
                            </div>
                        </div>

                        <Grid>
                            {templateData.map(dat =>
                                (
                                    <Row key={dat.id}>
                                        <h3> {dat.title}</h3>
                                        {dat.items.map(item =>
                                            (
                                                <Col xs={12} md={3} key={item.id} style={{ minHeight: '350px', cursor: 'pointer' }} >
                                                    <Thumbnail style={{ minHeight: '290px' }} src={require(`../../assets/img/cv-done/${item.thumb}`)} alt="242x200" onClick={e => this.openLightbox(e, item)} />
                                                    <h4 className="text-center">{item.title} </h4>
                                                </Col>
                                            ))}
                                    </Row>
                                ))}
                        </Grid>
                        {/* <Gallery photos={this.photos} onClick={this.openLightbox} /> */}
                        <ImageLightbox images={this.photos} lightboxIsOpen={this.state.lightboxIsOpen} currentImage={this.state.currentImage} />
                        {/* <Lightbox
                            images={this.photos}
                            onClose={this.closeLightbox}
                            onClickPrev={this.gotoPrevious}
                            onClickNext={this.gotoNext}
                            currentImage={this.state.currentImage}
                            isOpen={this.state.lightboxIsOpen}
                        /> */}
                    </div>
                </section>

                <Footer />
            </div>
        );
    }
}


export default CvDonePage;
