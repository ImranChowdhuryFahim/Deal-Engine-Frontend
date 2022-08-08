import React, { Component } from "react";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlusSquare,
  faList,
  faAddressBook,
  faTachometerAlt,
  faBookReader,
  faChalkboardTeacher,
  faNewspaper,
  faBlog,
  faCalendar,
  faUserTag,
  faBookmark,
  faMailBulk,
  faBullhorn,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

class Sidebar extends Component {
  render() {
    const activeStyle = {
      color: "white",
      backgroundColor: "black",
      borderLeft: "5px solid steelblue",
      zIndex: "-1",
      height: "100%",
      width: "80%",
    };
    return (
      <div className="admin-sidebar">
        <div className="admin-logo">Admin Panel</div>

        <div className="functionalities">
          <ul className="admin-menues">
            <li>
              {" "}
              <NavLink to="/admin/search_product" activeStyle={activeStyle}>
                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon> Search
                Products
              </NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink to="/admin/products" activeStyle={activeStyle}>
                <FontAwesomeIcon icon={faList}></FontAwesomeIcon>{" "}
                 Products{" "}
              </NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink to="/admin/product_details" activeStyle={activeStyle}>
                <FontAwesomeIcon icon={faAddressBook}></FontAwesomeIcon> Product
                Details{" "}
              </NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink to="/admin/createproduct" activeStyle={activeStyle}>
                <FontAwesomeIcon icon={faPlusSquare}></FontAwesomeIcon> Create
                Product{" "}
              </NavLink>{" "}
            </li>
            <li>
              {' '}
              <NavLink to="/admin/dashboard" activeStyle={activeStyle}>
                <FontAwesomeIcon icon={faTachometerAlt}></FontAwesomeIcon>{' '}
                Dashboard
              </NavLink>{' '}
            </li>
            <li>
              {' '}
              <NavLink to="/admin/add-product" activeStyle={activeStyle}>
                <FontAwesomeIcon icon={faPlusSquare}></FontAwesomeIcon>{' '}
                Add Product{' '}
              </NavLink>{' '}
            </li>

  
            <li>
              {' '}
              <NavLink to="/admin/access-role" activeStyle={activeStyle}>
                <FontAwesomeIcon icon={faUserTag}></FontAwesomeIcon> Access Role{' '}
              </NavLink>{' '}
            </li>
            <li>
              {' '}
              <NavLink to="/admin/mailbox" activeStyle={activeStyle}>
                <FontAwesomeIcon icon={faMailBulk}></FontAwesomeIcon> MailBox{' '}
              </NavLink>{' '}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
