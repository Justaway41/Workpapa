import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Table } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import Util from "../../helpers/util.class";

// import addonData from '../../data/addon.json';
// import packageData from '../../data/packages.json';

import ScrollToTop from "../../components/scrolltotop/scrolltotop";
// import Steps from '../../components/steps/steps';
import ResumeProcess from "../../components/resumeprocess/resumeprocess";
import FAQ from "../../components/faq/faq";

class PaymentServiceAddPage extends Component {
  constructor(props) {
    super(props);
    this.setSelected = this.setSelected.bind(this);
    this.addonData = JSON.parse(JSON.stringify(this.props.addonData));
    this.state = this.initialize();
    // this.packagePrice = this.props.packages;
    // let storePackage = Util.getDataFromSessionStorage('package');
    // if(!!storePackage){
    //     this.state.addonData.forEach(element => {
    //         element.items.forEach(ele => {
    //             if(storePackage.addon.indexOf(ele.id) !== -1){
    //                 ele.selected = true
    //                 this.state.totalPrice += ele.price;
    //             }
    //         });
    //     });
    // }
    // console.log(this.props.match.params)
  }
  componentDidMount() {
    if (this.props.geo.hasOwnProperty("countryCode")) {
      this.updateState(this.props);
    }
  }
  componentWillReceiveProps(nextProps) {
    this.updateState(nextProps);
  }
  initialize = () => {
    // console.log(this.props);
    const storePackage = Util.getDataFromSessionStorage("package");
    let packageCode = this.props.match.params.package;
    let experienceCode = "";
    if (this.props.match.params.experience) {
      experienceCode = this.props.match.params.experience;
    }
    let totalPrice = 0;
    if (storePackage) {
      this.props.addonData.forEach((element) => {
        element.items.forEach((ele) => {
          if (storePackage.addon.indexOf(ele.id) !== -1) {
            ele.selected = true;
            totalPrice += ele.price;
          }
        });
      });
      packageCode = storePackage.base;
      experienceCode = storePackage.experience;
    }
    return {
      showModal: true,
      resumeText: "Resume",
      currency: !this.props.geo.currencyCode
        ? "$"
        : Util.currency(this.props.geo.currencyCode),
      currencyCode: !this.props.geo.currencyCode
        ? "USD"
        : this.props.geo.currencyCode,
      conversionRate: !this.props.geo.currencyConverter
        ? 1
        : this.props.geo.currencyConverter,
      selPackage: this.props.packageData.service.product[packageCode], // packageData.product.service[this.props.match.params.package],
      selExperience:
        experienceCode === ""
          ? {}
          : this.props.packageData.service.experience[experienceCode],
      addonData: JSON.parse(JSON.stringify(this.props.addonData)),
      totalPrice, // this.props.packages.product[this.props.match.params.package][this.props.match.params.experience]
    };
  };
  updateState = (props) => {
    // this.setState({currency: Util.currency(props.geo.currencyCode)});
    // console.log(props.packageData.service.product);
    if (props.packages.basic) {
      this.setState({
        resumeText: Util.getResumeTxt(props.geo.currencyCode),
        currency: Util.currency(props.geo.currencyCode),
        conversionRate: props.geo.currencyConverter,
        currencyCode: props.geo.currencyCode,
        addonData: JSON.parse(JSON.stringify(props.addonData)),
      });
    }
    // if(!!Object.keys(props.packageData).length){
    //     this.setState(
    //             {
    //                 selPackage: props.packageData.service.product[this.props.match.params.package],
    //             }
    //         );
    // }
  };
  resetAddon() {
    this.setState({
      addonData: JSON.parse(JSON.stringify(this.props.addonData)),
    });
  }
  calTotal(totalPrice, price, selected) {
    if (!selected) {
      totalPrice += price;
    } else {
      totalPrice -= price;
    }
    return totalPrice;
  }
  setSelected(data, selected) {
    let totalPrice = this.state.totalPrice;

    data.forEach((element) => {
      if (element.radio === true) {
        if (element.id === selected) {
          totalPrice = this.calTotal(totalPrice, element.price, false);
          element.selected = true;
        } else if (element.selected === true) {
          totalPrice = this.calTotal(totalPrice, element.price, true);
          element.selected = false;
        }
      } else if (element.id === selected) {
        if (element.selected === true) {
          totalPrice = this.calTotal(totalPrice, element.price, true);
          element.selected = false;
        } else {
          totalPrice = this.calTotal(totalPrice, element.price, false);
          element.selected = true;
        }
      }
    });
    this.setState({ totalPrice });
  }
  setSelectedExperience(selected) {
    this.setState({
      selExperience:
        selected === ""
          ? {}
          : this.props.packageData.service.experience[selected],
    });
  }
  setSelectedPackage(selected) {
    this.setState({
      totalPrice: 0,
      selPackage: this.props.packageData.service.product[selected],
    });
    this.resetAddon();
  }
  moveNext() {
    const storePackage = Util.getDataFromSessionStorage("package");
    let template = {};
    if (storePackage) {
      template = storePackage.template;
    }
    const packageSelected = {
      base: this.state.selPackage.code,
      experience: this.state.selExperience.code,
      totalPrice: this.state.totalPrice,
      template,
      addon: [],
    };
    // let addon = [];
    this.state.addonData.forEach((element) => {
      element.items.forEach((ele) => {
        if (ele.selected) {
          packageSelected.addon.push(ele.id);
        }
      });
    });
    Util.setDataToSessionStorage("package", packageSelected);
    this.props.history.push("/payment/checkout");
    // this.router.navigate(['payment/service', this.props.match.params.package,0]);
  }
  stepData() {
    return [
      {
        stepTxt: "Step 1",
        stepDesc: "Select Package",
        status: "complete",
      },
      {
        stepTxt: "Step 2",
        stepDesc: "Customise CV",
        status: "complete",
      },
      {
        stepTxt: "Step 3",
        stepDesc: "Cover Letter & More",
        status: "active",
      },
      {
        stepTxt: "Step 4",
        stepDesc: "Billing",
        status: "disabled",
      },
      {
        stepTxt: "Step 5",
        stepDesc: "Confirmation",
        status: "disabled",
      },
    ];
  }
  render() {
    // if (!Object.keys(this.props.packages.product).length && !Object.keys(this.props.packageData).length && !Object.keys(this.props.addonData).length) {
    //     return (
    //         <div></div>
    //     );
    // }
    return (
      <div>
        <ScrollToTop />
        {/* <HeaderPayment /> */}
        <Helmet>
          <title>WorkPapa | Select Package and Addon for you Order </title>
        </Helmet>
        <section id="about">
          <div className="top-spacer">
            <div className="container">
              {/* <Steps stepData={this.stepData()} /> */}
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 ">
                    <div className="col-lg-3 ">
                      <h4>Selected level:</h4>
                    </div>
                    <div className="col-lg-9 ">
                      <select
                        className="form-control"
                        value={this.state.selExperience.code}
                        disabled
                        onChange={(e) => {
                          this.setSelectedExperience(e.target.value);
                        }}
                      >
                        <option value="">Select Experience Level</option>
                        {Object.keys(
                          this.props.packageData.service.experience
                        ).map((dat) => (
                          <option key={dat} value={dat}>
                            {
                              this.props.packageData.service.experience[dat]
                                .name
                            }{" "}
                            (
                            {
                              this.props.packageData.service.experience[dat]
                                .description
                            }
                            )
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div style={{ padding: "5px" }}>&nbsp;</div>
                </div>
                {this.state.selExperience.code && (
                  <div>
                    <div className="row">
                      <div className="col-lg-12 ">
                        <h3>SELECTED SERVICE</h3>
                        <Table striped bordered condensed>
                          <tbody>
                            {!!Object.keys(
                              this.props.packageData.service.product
                            ).length &&
                              Object.keys(
                                this.props.packageData.service.product
                              )
                                .filter(
                                  (item) => item === this.state.selPackage.code
                                )
                                .map((item) => (
                                  <tr key={item}>
                                    <td>
                                      <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                        <p className="small">
                                          <input
                                            type="radio"
                                            name="service"
                                            disabled={false}
                                            defaultChecked={
                                              this.state.selPackage.code ===
                                              item
                                            }
                                            onClick={() => {
                                              this.setSelectedPackage(item);
                                            }}
                                            value={
                                              this.props.packageData.service
                                                .product[item].code
                                            }
                                          />
                                          &nbsp;
                                          {
                                            this.props.packageData.service
                                              .product[item].name
                                          }{" "}
                                          {this.props.packageData.service
                                            .product[item].description
                                            ? ReactHtmlParser(
                                                `<small><i>(${
                                                  this.props.packageData.service
                                                    .product[item].description
                                                })</i></small>`
                                              )
                                            : ""}
                                          {/* - {Util.currency(this.state.currency) + Util.round(this.props.packages.product[item][this.state.selExperience.code] * this.state.conversionRate)} */}
                                        </p>
                                      </div>
                                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 text-right">
                                        {/* {this.state.selPackage.code === item ? Util.currency(this.state.currency) + Util.round(this.props.packages.product[item][this.state.selExperience.code] * this.state.conversionRate) : ''} */}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                          </tbody>
                        </Table>
                      </div>

                      <div className="col-lg-12 ">
                        <h3>RESUME REWRITING DETAILS</h3>
                        {!!Object.keys(this.state.addonData).length &&
                          this.state.addonData
                            .filter(
                              (dat) =>
                                dat.packages.indexOf(
                                  this.state.selPackage.code
                                ) !== -1
                            )
                            .map((dat, i) => (
                              <Table striped bordered condensed key={dat.title}>
                                <thead>
                                  <tr>
                                    <td>
                                      <h4>{ReactHtmlParser(dat.title)}</h4>
                                    </td>
                                  </tr>
                                </thead>
                                <tbody>
                                  {!!dat.type && (
                                    <tr>
                                      <td>
                                        <div>
                                          <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                            <select
                                              className="form-control"
                                              onChange={(e) => {
                                                this.setSelected(
                                                  dat.items,
                                                  parseInt(e.target.value, 10),
                                                  i
                                                );
                                              }}
                                            >
                                              {dat.items.map((item) => (
                                                <option
                                                  key={item.id}
                                                  value={item.id}
                                                  defaultValue={item.selected}
                                                >
                                                  {item.label} -{" "}
                                                  {Util.currency(
                                                    this.state.currency
                                                  )}
                                                  {Util.round(
                                                    item.price *
                                                      this.state.conversionRate
                                                  )}
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 text-right">
                                            {dat.items.map((item) =>
                                              item.selected
                                                ? !item.price
                                                  ? "Included"
                                                  : Util.currency(
                                                      this.state.currency
                                                    ) +
                                                    Util.round(
                                                      item.price *
                                                        this.state
                                                          .conversionRate
                                                    )
                                                : ""
                                            )}
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                  {!dat.type &&
                                    dat.items.map((item) => (
                                      <tr key={item.id}>
                                        <td>
                                          <div>
                                            <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                              <p className="small">
                                                {!!item.radio && (
                                                  <input
                                                    type="radio"
                                                    name={dat.name}
                                                    disabled={item.selected}
                                                    defaultChecked={
                                                      item.selected
                                                    }
                                                    onClick={() => {
                                                      this.setSelected(
                                                        dat.items,
                                                        item.id,
                                                        i
                                                      );
                                                    }}
                                                    value={item.id}
                                                  />
                                                )}
                                                {!item.radio && (
                                                  <input
                                                    type="checkbox"
                                                    name="cv"
                                                    disabled={item.price === 0}
                                                    defaultChecked={
                                                      item.selected
                                                    }
                                                    onClick={() => {
                                                      this.setSelected(
                                                        dat.items,
                                                        item.id,
                                                        i
                                                      );
                                                    }}
                                                  />
                                                )}
                                                &nbsp;{item.label}{" "}
                                                {item.description
                                                  ? ReactHtmlParser(
                                                      `<small><i>(${
                                                        item.description
                                                      })</i></small>`
                                                    )
                                                  : ""}{" "}
                                                -{" "}
                                                {Util.currency(
                                                  this.state.currency
                                                )}
                                                {Util.round(
                                                  item.price *
                                                    this.state.conversionRate
                                                )}
                                              </p>
                                            </div>

                                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 text-right">
                                              {item.selected
                                                ? !item.price
                                                  ? "Included"
                                                  : Util.currency(
                                                      this.state.currency
                                                    ) +
                                                    Util.round(
                                                      item.price *
                                                        this.state
                                                          .conversionRate
                                                    )
                                                : ""}
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </Table>
                            ))}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                          <h3>Total</h3>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 text-right">
                          <h3>
                            {/* {Util.currency(this.state.currency)}{Util.round(this.state.totalPrice*this.state.conversionRate)} */}
                            {Util.showPrice(
                              this.props.packages.product[
                                this.state.selPackage.code
                              ][this.state.selExperience.code] +
                                this.state.totalPrice,
                              this.state.conversionRate,
                              this.state.currency,
                              this.state.currencyCode
                            )}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="col-lg-4 col-md-4 col-md-offset-4 col-sm-3 col-xs-12">
                          <button
                            style={{ width: "100%" }}
                            className="btn btn-danger btn-lg"
                            onClick={() => {
                              this.moveNext();
                            }}
                          >
                            Next{" "}
                            <i
                              className="fa fa-arrow-right"
                              aria-hidden="true"
                            />
                          </button>{" "}
                          <br />
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <ResumeProcess resumeText={this.state.resumeText} />
              </div>
              <div className="col-lg-4 col-md-4">
                <h4> 500 Resumes already created</h4>
                <div className="card visible-md visible-lg" id="summary_card">
                  <h5>What&apos;s Included In Our Package?</h5>

                  {!!Object.keys(this.addonData).length &&
                    this.addonData.map((dat) => (
                      <div key={dat.title}>
                        {dat.items.map((item) => (
                          <ul key={item.label}>
                            {item.selected ? (
                              <li>
                                <small>{item.label}</small>{" "}
                              </li>
                            ) : (
                              ""
                            )}
                          </ul>
                        ))}
                      </div>
                    ))}
                </div>
                <div className="panel panel-default" id="steps">
                  <div className="portfolio-item">
                    <div className="portfolio-link">
                      <h4 className="text-center">Our Guarantee!</h4>

                      <ul style={{ listStyleType: "none" }}>
                        <li>No use of Templates</li>
                        <li>100% Satisfaction Guaranteed</li>
                        <li>Unlimited Revisions for 1 day</li>
                        <li>Ability to do in 1 day</li>
                        <li>24/7 Service</li>
                        <li>Highly Experienced CV Writers</li>
                        <li>Delivered in MS Office and PDF Format</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <h2 className="text-center">FAQ</h2>
                <FAQ />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default PaymentServiceAddPage;
