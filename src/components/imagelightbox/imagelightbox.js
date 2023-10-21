import React, { Component } from 'react';
// import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';
// import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
// import templateData from '../../data/resumedone.json';

class ImageLightbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImage: 0,
        };
        // this.getGallaryArray();
        this.state = {
            lightboxIsOpen: props.lightboxIsOpen,
            currentImage: props.currentImage
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            lightboxIsOpen: nextProps.lightboxIsOpen,
            currentImage: nextProps.currentImage
        });
    }

    // getGallaryArray = () => {
    //     const photos = [];
    //     templateData.forEach((data) => {
    //         data.items.forEach((item) => {
    //             item.src = require(`../../assets/img/cv-done/${item.thumb}`);
    //             item.width = 1;
    //             item.height = 1;
    //             photos.push(item);
    //         });
    //     });
    //     this.photos = photos;
    // }

    // openLightbox = (event, obj) => {
    //     this.setState({
    //         currentImage: obj.id - 1,
    //         lightboxIsOpen: true,
    //     });
    // }
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
                {/* <Gallery photos={this.photos} onClick={this.openLightbox} /> */}
                <Lightbox
                    images={this.props.images}
                    onClose={this.closeLightbox}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    currentImage={this.state.currentImage}
                    isOpen={this.state.lightboxIsOpen}
                />
            </div>
        );
    }
}


export default ImageLightbox;
