import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
// import Gallery from 'react-photo-gallery';
// import templateData from '../../data/resumedone.json';

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // index: 0,
            // direction: null
        };
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         lightboxIsOpen: nextProps.lightboxIsOpen,
    //         currentImage: nextProps.currentImage
    //     });
    // }

    // handleSelect = (selectedIndex, e) => {
    //     // alert(`selected=${selectedIndex}, direction=${e.direction}`);
    //     this.setState({
    //         index: selectedIndex,
    //         direction: e.direction
    //     });
    // }
    // getImage = function (img) {
    //     return require(`../../assets/img/${img}`);
    // };
    // createImage = (image, href) => <Thumbnail href={href} src={require(`../../assets/img/${image}`)} alt={image} key={image} />

    render() {
        // const { index, direction } = this.state;
        // console.log(this.props);
        return (
            <div>
                {/* <Carousel
                    activeIndex={index}
                    direction={direction}
                    onSelect={this.handleSelect}
                >
                    {Object.keys(this.props.data).length &&
                            <Carousel.Item >
                                <Grid>
                                    {this.props.data.map(dat =>
                                        (
                                            <Col xs={6} md={2} key={dat['title']}>
                                                <Row>
                                                    <Thumbnail href="/member/textlibrary/item/1" alt="171x180" src={require('../../assets/img/jonathan-home.jpg')} />
                                                </Row>
                                            </Col>
                                        ))}
                                </Grid>
                            </Carousel.Item>
                    }
                </Carousel> */}
                {Object.keys(this.props.data).length &&
                <Grid>
                    {this.props.data.map(dat =>
                        (
                            <Col xs={6} md={2} key={dat['title']}>
                                <Row>
                                    <Link to="/member/textlibrary/item/1">
                                        <img src={require(`../../assets/img/${dat['img']}`)} alt={dat['img']} key={dat['img']} />
                                    </Link>
                                    {/* <Thumbnail href="/member/textlibrary/item/1" alt="171x180" src={require(`../../assets/img/${dat['img']}`)} /> */}
                                </Row>
                            </Col>
                        ))}
                </Grid>
                }
            </div>
        );
    }
}

Slider.defaultProps = {
    data: {}
};
export default Slider;
