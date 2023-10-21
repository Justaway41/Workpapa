import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from '../../../components/slider/slider';
import libraryApi from '../../../api/libraryApi';

class MarketPlaceItemDetail extends Component {
    constructor() {
        super();
        this.state = {
            libData: {},
            relatedDoc: {}
        };
    }

    componentDidMount() {
        // this.props.actions.toggleLoader(true);
        const libId = 1;
        libraryApi.getDocumentDetails(libId)
            .then((response) => {
                if (response.status === 'Success') {
                    this.setState({ libData: response.data });
                    return libraryApi.getDocumentForCategory(response.data.id_cat);
                }
                return libraryApi.getDocumentForCategory(1);
                // this.props.actions.toggleLoader(false);
            }).then((res) => {
                this.setState({ relatedDoc: res.data });
            });
        // .catch((error) => {
        // // this.setState({msg: error, loader: false});
        //     console.log(error);
        // });
    }

    downloadDocument = () => {
        window.location.href = 'http://releases.ubuntu.com/12.04.5/ubuntu-12.04.5-alternate-amd64.iso';
    }
    render() {
        return (
            <section id="cummunity">
                <div className="row">
                    <div className="container-fluid">
                        {Object.keys(this.state.libData).length &&
                            <div className="col-lg-12 text-center" style={{ marginTop: '20px' }}>
                                <div className="col-md-4 col-xs-12" >
                                    <img alt="sample" style={{ width: '100%' }} src={require('../../../assets/img/jonathan-home.jpg')} />
                                    <h3>{this.state.libData['title']}</h3>
                                </div>
                                <div className="col-md-8 col-xs-12" >
                                    <p className="text-left">
                                        {this.state.libData['description']}
                                    </p>
                                    <div>
                                        <Link className="btn btn-lg btn-outline btn-profile btn-success" to="#" >Preview<i className="fas fa-arrow-circle-right" /></Link>
                                        <button className="btn btn-lg btn-outline btn-profile btn-success" href="#" onClick={this.downloadDocument} >Download<i className="fas fa-arrow-circle-right" /></button>
                                        <Link className="btn btn-lg btn-outline btn-profile btn-success" to="#" >Share <i className="fas fa-arrow-circle-right" /></Link>
                                        <Link className="btn btn-lg btn-outline btn-profile btn-success" to="#" >Save <i className="fas fa-arrow-circle-right" /></Link>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="col-lg-12" >
                            <h4>Related documents</h4>
                            <Slider data={this.state.relatedDoc} />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default MarketPlaceItemDetail;
