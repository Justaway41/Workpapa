import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from '../../../components/slider/slider';
import libraryApi from '../../../api/libraryApi';

class LibraryDashboardPage extends Component {
    constructor() {
        super();
        this.state = {
            catData: {}
        };
    }

    componentDidMount() {
        // this.props.actions.toggleLoader(true);
        libraryApi.getLibHomeCategory()
            .then((response) => {
                if (response.status === 'Success') {
                    this.setState({ catData: response.data });
                }
                // this.props.actions.toggleLoader(false);
            });
        // .catch((error) => {
        // // this.setState({msg: error, loader: false});
        //     console.log(error);
        // });
    }

    // handlePopupStatus = (showModal) => {
    //     this.setState(showModal);
    // }
    render() {
        return (
            <section id="cummunity">
                <div className="row">
                    <div className="container-fluid">
                        <div className="col-lg-12 text-center" style={{ marginTop: '20px' }}>
                            <h3>Dummy Text</h3>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                        </div>
                        {Object.keys(this.state.catData).length && this.state.catData.map(dat =>
                            (
                                <div className="col-lg-12" key={dat['name']}>
                                    <div className="container">
                                        <h4>{dat['name']} <small className="pull-right"><Link to="#">explore all</Link></small></h4>
                                    </div>
                                    <Slider data={dat['document']} />
                                </div>
                            ))}
                        {/* <div className="col-lg-12" >
                            <h4>Category 1 <small className="pull-right"><Link to="#">explore all</Link></small></h4>
                            <Slider />
                        </div>
                        <div className="col-lg-12" >
                            <h4>Category 2 <small className="pull-right"><Link to="#">explore all</Link></small></h4>
                            <Slider />
                        </div>
                        <div className="col-lg-12" >
                            <h4>Category 3 <small className="pull-right"><Link to="#">explore all</Link></small></h4>
                            <Slider />
                        </div> */}
                    </div>
                </div>
            </section>
        );
    }
}

export default LibraryDashboardPage;
