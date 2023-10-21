import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ScrollToTop from '../../components/scrolltotop/scrolltotop';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import OtherApi from '../../api/otherApi';

class BlogPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            footerLink: []
        };
        this.getFooterLink();
    }
    createLink = (data) => {
        let link = `/${data.page_type}/${data.page_url}`;
        if (data.country) {
            link = `/${data.page_type}/${data.country}/${data.page_url}`;
        }
        return link;
    };

    getFooterLink() {
        OtherApi.getSeoLink()
            .then((result) => {
                if (result.status === 'Success') {
                    this.setState({
                        footerLink: result.data
                    });
                }
            });
    }
    // const BlogPage = () =>
    render() {
        return (
            <div>
                <ScrollToTop />
                <Header {...this.props} />
                <Helmet>
                    <title>WorkPapa | Blog</title>
                </Helmet>
                <section id="term">
                    <div >
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <h2>Blog</h2>
                                    <hr className="star-primary" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 ">
                                    <ul>
                                        {this.state.footerLink && this.state.footerLink.map(data =>
                                            (
                                                <li className="col-sm-4 "><Link to={this.createLink(data)}>{data.name}</Link></li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}
export default BlogPage;
