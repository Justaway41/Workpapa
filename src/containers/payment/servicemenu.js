import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Table } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import Util from "../../helpers/util.class";

// import addonData from '../../data/addon.json';
// import packageData from '../../data/packages.json';

import ScrollToTop from "../../components/scrolltotop/scrolltotop";
import Steps from "../../components/steps/steps";
import ResumeProcess from "../../components/resumeprocess/resumeprocess";
import FAQ from "../../components/faq/faq";
import Globals from "../../helpers/constant";

class PaymentServiceMenuPage extends Component {
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
    this.addonData = JSON.parse(JSON.stringify(nextProps.addonData));
    this.updateState(nextProps);
  }
  initialize = () => {
    // console.log(this.props);
    const packageCode = this.props.match.params.package;
    let experienceCode = "";
    if (this.props.match.params.experience) {
      experienceCode = this.props.match.params.experience;
    }
    const totalPrice = 0;
    // const storePackage = Util.getDataFromSessionStorage('package');
    // if (storePackage) {
    //     this.props.addonData.forEach((element) => {
    //         element.items.forEach((ele) => {
    //             if (storePackage.addon.indexOf(ele.id) !== -1) {
    //                 ele.selected = true;
    //                 totalPrice += ele.price;
    //             }
    //         });
    //     });
    //     packageCode = storePackage.base;
    //     experienceCode = storePackage.experience;
    // }
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
      pendingResume: 0,
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
        pendingResume: props.site.pendingResume,
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
      totalPrice:
        parseInt(
          this.props.packages.product[this.state.selPackage.code][
            this.state.selExperience.code
          ],
          10
        ) + this.state.totalPrice,
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
        status: "active",
      },
      {
        stepTxt: "Step 3",
        stepDesc: "Billing",
        status: "disabled",
      },
      {
        stepTxt: "Step 4",
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
        <div className="top-spacer">
          <div className="container">
            <Steps stepData={this.stepData()} />
            <div className="col-lg-8">
              {this.state.pendingResume &&
                this.state.pendingResume <
                  Globals.site.FAST_SERVICE_RESUME_LIMIT && (
                  <div className="row">
                    <div className="col-lg-12 ">
                      <h4>Fast 24 - 48 hour delivery</h4>
                    </div>
                  </div>
                )}
              <div className="row">
                <div className="col-xs-6 ">
                  <h3>Select Experience level</h3>
                </div>
                <div className="col-xs-6 " style={{ paddingTop: "15px" }}>
                  <select
                    className="form-control"
                    value={this.state.selExperience.code}
                    onChange={(e) => {
                      this.setSelectedExperience(e.target.value);
                    }}
                  >
                    <option value="">Select Experience Level</option>
                    {Object.keys(this.props.packageData.service.experience).map(
                      (dat) => (
                        <option key={dat} value={dat}>
                          {this.props.packageData.service.experience[dat].name}{" "}
                          (
                          {
                            this.props.packageData.service.experience[dat]
                              .description
                          }
                          )
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              {this.state.selExperience.code && (
                <div>
                  <div className="row">
                    <div className="col-lg-12 ">
                      <h3>SELECT THE SERVICE YOU WANT</h3>
                      <Table striped bordered condensed>
                        <tbody>
                          {!!Object.keys(this.props.packageData.service.product)
                            .length &&
                            Object.keys(
                              this.props.packageData.service.product
                            ).map((item) => (
                              <tr
                                key={item}
                                onClick={() => {
                                  this.setSelectedPackage(item);
                                }}
                              >
                                <td
                                  style={{ cursor: "pointer" }}
                                  className={
                                    this.state.selPackage.code === item
                                      ? "bg-success"
                                      : ""
                                  }
                                >
                                  <div className="col-lg-10 col-md-10 col-sm-10 col-xs-12">
                                    <p className="small">
                                      <input
                                        type="radio"
                                        name="service"
                                        disabled={false}
                                        readOnly
                                        checked={
                                          this.state.selPackage.code === item
                                        }
                                        value={
                                          this.props.packageData.service
                                            .product[item].code
                                        }
                                      />
                                      &nbsp;
                                      {
                                        this.props.packageData.service.product[
                                          item
                                        ].name
                                      }{" "}
                                      {this.props.packageData.service.product[
                                        item
                                      ].description
                                        ? ReactHtmlParser(
                                            `<small><i>(${
                                              this.props.packageData.service
                                                .product[item].description
                                            })</i></small>`
                                          )
                                        : ""}{" "}
                                      -{" "}
                                      {Util.showPrice(
                                        this.props.packages.product[item][
                                          this.state.selExperience.code
                                        ],
                                        this.state.conversionRate,
                                        this.state.currency,
                                        this.state.currencyCode
                                      )}
                                      {this.props.packageData.service.product[
                                        item
                                      ].code === "RPC" && (
                                        <span className="text-danger">
                                          {" "}
                                          <strong>(Most Popular)</strong>
                                        </span>
                                      )}
                                    </p>
                                  </div>
                                  <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 text-right">
                                    {this.state.selPackage.code === item
                                      ? Util.showPrice(
                                          this.props.packages.product[item][
                                            this.state.selExperience.code
                                          ],
                                          this.state.conversionRate,
                                          this.state.currency,
                                          this.state.currencyCode
                                        )
                                      : ""}
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </div>

                    <div className="col-lg-12 ">
                      <h3>YOUR RESUME REWRITING DETAILS</h3>
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
                                    <h4>
                                      {/* <i className={`${dat.icon} fa-lg`} /> */}
                                      <img
                                        rel="preload"
                                        src={`${
                                          Globals.publicUrl
                                        }/assets/images/svg/${dat.icon}`}
                                        className="img-responsive img-centered pull-left"
                                        alt=""
                                        width="30px"
                                        height="30px"
                                      />
                                      {ReactHtmlParser(dat.title)}
                                    </h4>
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
                                                {Util.showPrice(
                                                  item.price,
                                                  this.state.conversionRate,
                                                  this.state.currency,
                                                  this.state.currencyCode
                                                )}{" "}
                                                - {item.label}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 text-right">
                                          {dat.items.map((item) =>
                                            item.selected
                                              ? !item.price
                                                ? "Included"
                                                : Util.showPrice(
                                                    item.price,
                                                    this.state.conversionRate,
                                                    this.state.currency,
                                                    this.state.currencyCode
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
                                                  defaultChecked={item.selected}
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
                                                  defaultChecked={item.selected}
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
                                              {Util.showPrice(
                                                item.price,
                                                this.state.conversionRate,
                                                this.state.currency,
                                                this.state.currencyCode
                                              )}
                                            </p>
                                          </div>

                                          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 text-right">
                                            {item.selected
                                              ? !item.price
                                                ? "Included"
                                                : Util.showPrice(
                                                    item.price,
                                                    this.state.conversionRate,
                                                    this.state.currency,
                                                    this.state.currencyCode
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
                            parseInt(
                              this.props.packages.product[
                                this.state.selPackage.code
                              ][this.state.selExperience.code],
                              10
                            ) + this.state.totalPrice,
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
                          <i className="fa fa-arrow-right" aria-hidden="true" />
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
              <div className="panel panel-default" id="steps">
                <div className="portfolio-item">
                  <div className="portfolio-link">
                    <h5 className="text-center">
                      What&apos;s Included In Our Package?
                    </h5>

                    <ul style={{ listStyleType: "none" }}>
                      {!!Object.keys(this.props.packageData.service.product)
                        .length &&
                        Object.keys(this.props.packageData.service.product)
                          .filter(
                            (item) =>
                              this.state.selPackage.code === item &&
                              this.state.selPackage.code !== "RRS"
                          )
                          .map((item) => (
                            <li
                              key={
                                this.props.packageData.service.product[item]
                                  .name
                              }
                            >
                              <small>
                                {
                                  this.props.packageData.service.product[item]
                                    .name
                                }
                              </small>
                            </li>
                          ))}
                      {!!Object.keys(this.addonData).length &&
                        this.addonData
                          .filter(
                            (dat) =>
                              dat.packages.indexOf(
                                this.state.selPackage.code
                              ) !== -1
                          )
                          .map((dat) =>
                            dat.items.map((item) =>
                              item.selected ? (
                                <li>
                                  <small>{item.label}</small>{" "}
                                </li>
                              ) : (
                                ""
                              )
                            )
                          )}
                      <li>
                        <small>A writer who knows your local job market</small>
                      </li>
                      <li>
                        <small>
                          Keywords that optimize your summary and get you hired
                        </small>
                      </li>
                      <li>
                        <small>
                          A rewriting of your job experience that shows your
                          true value
                        </small>
                      </li>
                      <li>
                        <small>
                          An addition of numerical proof to your job experiences
                          that make you look better to employers
                        </small>
                      </li>
                      <li>
                        <small>
                          A reshuffling of your tasks within each job role to
                          showcase your most important skills
                        </small>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="panel panel-default" id="steps">
                <div className="portfolio-item">
                  <div className="portfolio-link">
                    <h4 className="text-center">Our Guarantee!</h4>

                    <ul style={{ listStyleType: "none" }}>
                      <li>Original writing that’s customized to your needs</li>
                      <li>100% Satisfaction Guaranteed</li>
                      <li>Unlimited revisions for 10 whole days </li>
                      <li>Excellent 24/7 service</li>
                      <li>
                        Highly experienced resume/CV writers who know your local
                        market and industry
                      </li>
                      <li>Delivered to you in either a PDF or Word Doc</li>
                    </ul>
                  </div>
                </div>
              </div>
              <h2 className="text-center">FAQ</h2>
              <FAQ />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// PaymentServiceMenuPage.defaultProps = {
//     packageData: {}
// };
// function mapStateToProps(state, ownProps) {
//     return {
//       geo: state.location,
//       packages: state.packages
//     };
// }

export default PaymentServiceMenuPage;
// export default withRouter(connect(mapStateToProps)(PaymentAddonPage));
