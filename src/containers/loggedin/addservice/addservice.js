import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Table } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Util from "../../../helpers/util.class";
import Spinner from "../../../components/spinner/spinner";
import ScrollToTop from "../../../components/scrolltotop/scrolltotop";
import ResumeProcess from "../../../components/resumeprocess/resumeprocess";
import FAQ from "../../../components/faq/faq";

class AddServicePage extends Component {
  constructor(props) {
    super(props);
    this.setSelected = this.setSelected.bind(this);
    this.state = this.initialize();
  }
  componentDidMount() {
    if (this.props.geo.hasOwnProperty("countryCode")) {
      this.updateState(this.props);
    }
  }
  componentWillReceiveProps(nextProps) {
    // if (Object.keys(nextProps.geo).length) {
    //     this.setState({ geo: nextProps.geo, packages: nextProps.packages });
    // }
    this.updateState(nextProps);
  }
  initialize = () => ({
    showModal: true,
    resumeText: "Resume",
    packageData: [],
    currency: "$",
    currencyCode: "USD",
    conversionRate: 1,
    selPackage: [],
    selExperience: [],
    addonData: [],
    totalPrice: 0, // this.props.packages.product[this.props.match.params.package][this.props.match.params.experience]
  });

  updateState = (nextProps) => {
    if (Object.keys(nextProps.geo).length) {
      const packageCode = this.props.match.params.package;
      const experienceCode = this.props.match.params.experience;
      const addonData = Util.getAddonData(nextProps.geo);
      const packageData = Util.getPackageData(nextProps.geo);

      if (nextProps.profile.product) {
        const productPaid = nextProps.profile.product[3];
        const addonPaid = JSON.parse(productPaid.addon);
        if (addonPaid.length > 0) {
          const tempPaidAddon = {};
          tempPaidAddon.base = productPaid.product;
          tempPaidAddon.experience = productPaid.experience;
          tempPaidAddon.template = {};
          tempPaidAddon.addon = [];
          addonPaid
            .filter(
              (addon) => typeof addon.id === "number" && addon.price !== 0
            )
            .map((addon) => tempPaidAddon.addon.push(addon.id));
          // console.log(tempPaidAddon);

          // const addonData = nextProps.addonData;
          const tempAddonData = JSON.parse(JSON.stringify(addonData));
          // console.log(addonData);
          if (Object.keys(tempAddonData).length) {
            if (tempPaidAddon) {
              addonData.forEach((element, ind) => {
                element.items.forEach((ele) => {
                  if (tempPaidAddon.addon.indexOf(ele.id) !== -1) {
                    // console.log(ele.label, ' ', ele.id);
                    addonData.splice(ind, 1);
                    ele.selected = true;
                    // this.state.totalPrice += ele.price;
                  }
                });
              });
            }
            this.setState({
              addonData: JSON.parse(JSON.stringify(addonData)),
            });
          }
        }
      }

      this.setState({
        resumeText: Util.getResumeTxt(nextProps.geo.currencyCode),
        currency: Util.currency(nextProps.geo.currencyCode),
        conversionRate: nextProps.geo.currencyConverter,
        currencyCode: nextProps.geo.currencyCode,
        addonData: JSON.parse(JSON.stringify(addonData)),
        selPackage: packageData.service.product[packageCode],
        selExperience: packageData.service.experience[experienceCode],
        packageData,
      });
    }
  };
  resetAddon() {
    this.setState({
      addonData: JSON.parse(JSON.stringify(this.state.addonData)),
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
          : this.state.packageData.service.experience[selected],
    });
  }
  setSelectedPackage(selected) {
    this.setState({
      totalPrice: 0,
      selPackage: this.state.packageData.service.product[selected],
    });
    this.resetAddon();
  }
  moveNext() {
    // const storePackage = Util.getDataFromSessionStorage('package');
    const template = {};
    const packageSelected = {
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
    this.props.history.push("/member/checkout");
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
    if (
      !Object.keys(this.props.geo).length ||
      !Object.keys(this.props.packages).length ||
      !Object.keys(this.state.packageData).length
    ) {
      return <Spinner loader {...this.props} message="Loading...." />;
    }
    return (
      <div>
        <ScrollToTop />
        {/* <HeaderPayment /> */}
        <Helmet>
          <title>WorkPapa | Select Package and Addon for you Order </title>
        </Helmet>
        <section id="about">
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
                        this.state.packageData.service.experience
                      ).map((dat) => (
                        <option key={dat} value={dat}>
                          {this.state.packageData.service.experience[dat].name}{" "}
                          (
                          {
                            this.state.packageData.service.experience[dat]
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
                          {Object.keys(this.state.packageData.service.product)
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
                                          this.state.selPackage.code === item
                                        }
                                        onClick={() => {
                                          this.setSelectedPackage(item);
                                        }}
                                        value={
                                          this.state.packageData.service
                                            .product[item].code
                                        }
                                      />
                                      &nbsp;
                                      {
                                        this.state.packageData.service.product[
                                          item
                                        ].name
                                      }{" "}
                                      {this.state.packageData.service.product[
                                        item
                                      ].description
                                        ? ReactHtmlParser(
                                            `<small><i>(${
                                              this.state.packageData.service
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
                                    <h4>
                                      <i className={`${dat.icon} fa-lg`} />{" "}
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
                                                {item.label} -{" "}
                                                {Util.showPrice(
                                                  item.price,
                                                  this.state.conversionRate,
                                                  this.state.currency,
                                                  this.state.currencyCode
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
                            className="fas fa-arrow-circle-right"
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

                {!!Object.keys(this.state.addonData).length &&
                  this.state.addonData.map((dat) => (
                    <div key={dat.title}>
                      {dat.items.map((item) => (
                        <ul key={item.label}>
                          {!item.price ? (
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
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    geo: state.location,
    packages: state.packages,
  };
}
export default withRouter(connect(mapStateToProps)(AddServicePage));
// export default AddServicePage;
