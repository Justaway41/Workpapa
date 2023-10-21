import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';


class GridList extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialize();
    }
    // initialize = () => ({

    // })

    // componentWillReceiveProps(nextProps) {
    //     // if(this.props.showModal !== nextProps.showModal){
    //     //     this.setState({ showModal: nextProps.showModal });
    //     // }
    // }
    render() {
        // const Contant = this.props.contant;
        return (
            <div>
                <Grid>
                    {this.props.contant.map(dat =>
                        (
                            <Row>
                                <h3>{dat.title}</h3>
                                {dat.items.map(item =>
                                    (
                                        <Col xs={this.props.colxs} md={this.props.colmd}>
                                            <Thumbnail src={require(`../../assets/img/cv-template/${item.thumb}`)} alt={item.label}>
                                                <h4>{item.label} </h4>
                                                {/* <p>Description</p> */}
                                                <p>
                                                    <Button bsStyle="primary">Button</Button>&nbsp;
                                                    <Button bsStyle="default">Button</Button>
                                                </p>
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

GridList.defaultProps = {
    colmd: 4,
    colxs: 6
};

export default GridList;
