import React, { Component } from "react";
import Navbar from "./navbar/Navbar";
import {
  BrowserRouter,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";
import {
  faBars,
  faTachometerAlt,
  faChalkboardTeacher,
  faNewspaper,
  faBlog,
  faCalendar,
  faUserTag,
  faBookmark,
  faMailBulk,
  faBullhorn,
  faTimes,
  faSearch,
  faList,
  faAddressBook,
} from "@fortawesome/free-solid-svg-icons";
import routes from "./Routes";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      user: null,
      loading: false,
      redirect: false,
    };
  }

  componentDidMount() {
    // let localData = JSON.parse(localStorage.getItem("login"));
    // if (localData && localData.login && localData.adminauth) {
    //   axios({
    //     method: "GET",
    //     url: `https://beresearcherbd.herokuapp.com/api/student/getdetails`,
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       auth: localData.token,
    //     },
    //   }).then((result) => {
    //     this.setState({ user: result.data });
    //     this.setState({ loading: false });
    //   });
    // } else {
    //   this.setState({ redirect: true });
    //   this.setState({ loading: false });
    // }
  }
  handleClick() {
    this.setState({ clicked: !this.state.clicked });
  }
  render() {
    const activeStyle = {
      color: "white",
      backgroundColor: "black",
      borderLeft: "5px solid steelblue",
      zIndex: "-1",
      height: "100%",
      width: "80%",
    };
    const loaderCss = css`
      height: 100vh;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    `;
    if (this.state.redirect) {
      return <Redirect to="/newhome"></Redirect>;
    }
    return (
      <div>
        {this.state.loading ? (
          <div>
            <BeatLoader
              css={loaderCss}
              loading
              size={"30"}
              color={"blue"}
            ></BeatLoader>
          </div>
        ) : (
          <>
            <div style={{ position: "fixed", width: "100%" }}>
              <Navbar user={this.state.user}></Navbar>
            </div>

            <BrowserRouter>
              <div style={{ display: "flex" }}>
                <div style={{ zIndex: "1000" }}>
                  <Sidebar />
                </div>
                <div className="admin-mainwindow">
                  <div
                    className="admin-menu-icon"
                    onClick={this.handleClick.bind(this)}
                  >
                    <FontAwesomeIcon
                      icon={this.state.clicked ? faTimes : faBars}
                      style={{ position: "fixed", top: 21, left: 20 }}
                    ></FontAwesomeIcon>
                  </div>

                  <div
                    className={
                      this.state.clicked
                        ? "functionalities1"
                        : "functionalities1 active"
                    }
                  >
                    <ul
                      className="admin-menues"
                      onClick={this.handleClick.bind(this)}
                    >
                      <li>
                        {" "}
                        <NavLink
                          to="/admin/search_product"
                          activeStyle={activeStyle}
                        >
                          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>{" "}
                          Search Products
                        </NavLink>{" "}
                      </li>
                      <li>
                        {" "}
                        <NavLink to="/admin/tracked_products" activeStyle={activeStyle}>
                          <FontAwesomeIcon
                            icon={faList}
                          ></FontAwesomeIcon>{" "}
                          Tracked Products{" "}
                        </NavLink>{" "}
                      </li>
                      <li>
                        {" "}
                        <NavLink to="/admin/product_details" activeStyle={activeStyle}>
                          <FontAwesomeIcon
                            icon={faAddressBook}
                          ></FontAwesomeIcon>{" "}
                          Product Details{" "}
                        </NavLink>{" "}
                      </li>
                      <li>
                        {" "}
                        <NavLink to="/admin/mailbox" activeStyle={activeStyle}>
                          <FontAwesomeIcon icon={faMailBulk}></FontAwesomeIcon>{" "}
                          MailBox{" "}
                        </NavLink>{" "}
                      </li>
                    </ul>
                  </div>
                  <div className={"loaded_component"}>
                    <Switch>
                      {routes.map((route, index) => (
                        <Route
                          key={index}
                          path={route.path}
                          exact={route.exact}
                          children={<route.body />}
                        />
                      ))}
                    </Switch>
                  </div>
                </div>
              </div>
            </BrowserRouter>
          </>
        )}
      </div>
    );
  }
}

export default App;
