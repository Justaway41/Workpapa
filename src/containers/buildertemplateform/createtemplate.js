import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import Util from '../../helpers/util.class';
import TemplateData from '../../data/templates/salary-negotiation/data.json';

// console.log(TemplateData);
class CreateTemplatePage extends Component {
    constructor(props) {
        super(props);
        this.setSelected = this.setSelected.bind(this);
        // this.addonData = TemplateData;
        this.state = this.initialize();
    }

    initialize = () => ({
        resumeText: 'Resume',
        addonData: TemplateData,
    })

    calTotal(totalPrice, price, selected) {
        if (!selected) {
            totalPrice += price;
        } else {
            totalPrice -= price;
        }
        return totalPrice;
    }
    setSelected(data, selected, index) {
        // let totalPrice = this.state.totalPrice;

        data.forEach((element) => {
            if (element.radio === true) {
                if (element.id === selected) {
                    element.selected = true;
                } else if (element.selected === true) {
                    element.selected = false;
                }
            } else if (element.id === selected) {
                if (element.selected === true) {
                    element.selected = false;
                } else {
                    element.selected = true;
                }
            }
        });

        const addonData = this.state.addonData;
        addonData[index].items = data;
        this.setState({ addonData });
    }
    moveNext = () => {
        // const storePackage = Util.getDataFromSessionStorage('letterData');
        const packageSelected = [];
        const addonData = this.state.addonData;
        addonData.forEach((element) => {
            element.items.forEach((ele) => {
                if (ele.selected) {
                    packageSelected.push(ele);
                }
            });
        });
        // console.log(packageSelected);

        // this.setState({ addonData });
        // const packageSelected = {
        //     letterData: this.state.addonData
        // };

        Util.setDataToSessionStorage('letterData', packageSelected);
        this.props.history.push('/build-template/questionnaire');
    }


    render() {
        return (
            <div>
                <section id="root">
                    <div className="container">
                        <div className="col-lg-6">
                            {!!Object.keys(this.state.addonData).length && this.state.addonData.map((dat, i) =>
                                (
                                    <Table striped bordered condensed key={dat.title}>
                                        <thead>
                                            <tr><td><h3><i className={`${dat.icon} fa-lg`} /> {ReactHtmlParser(dat.title)}</h3></td></tr>
                                        </thead>
                                        <tbody>
                                            {!dat.type && dat.items.map(item =>
                                                (
                                                    <tr key={item.id}>
                                                        <td>

                                                            <p className="small">
                                                                {!!item.radio &&
                                                                        <input type="radio" name={dat.title} defaultChecked={item.selected} onClick={() => { this.setSelected(dat.items, item.id, i); }} value={item.id} />
                                                                }
                                                                {!item.radio &&
                                                                        <input type="checkbox" name="cv" defaultChecked={item.selected} onClick={() => { this.setSelected(dat.items, item.id, i); }} />
                                                                }
                                                                        &nbsp;{ReactHtmlParser(item.label)}
                                                            </p>

                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </Table>
                                ))}
                            <div>
                                <button
                                    className="btn btn-lg btn-outline btn-success"
                                    onClick={this.moveNext}
                                >Preview
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <h3>Preview</h3>
                            <div style={{ border: '1px solid #CCC', padding: '30px', marginBottom: '20px' }}>

                                {!!Object.keys(this.state.addonData).length && this.state.addonData.map(dat =>
                                    (
                                        dat.items.map(item =>
                                            (
                                                item.selected ? (
                                                    <p>{ReactHtmlParser(item.label)}</p>
                                                ) : ('')
                                            ))

                                    ))}
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        );
    }
}

export default CreateTemplatePage;
