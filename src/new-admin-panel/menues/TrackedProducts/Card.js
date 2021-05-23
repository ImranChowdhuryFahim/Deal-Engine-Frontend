import React, { Component } from "react";
import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ContactPhoneSharp } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

class Card extends Component {
  state = {
    loading: false,
  };


  render() {
    return (
      <div className="cardContainer">
        <div className="ProductImage">
          <a href={this.props.productLink}>
            <img src={this.props.productImage} alt="couldn' load" />
          </a>
        </div>
        <div className="ProductDetails">
          <h5>{this.props.productName}</h5>
          <p>Price: {this.props.productPrice}</p>
          <p>Website Name: {this.props.websiteName}</p>
        </div>
        <div>

          <NavLink to="/admin/product_details" style={{
              marginRight: "20px",
              backgroundColor: "#4CAF50",
              border: "none",
              color: "white",
              padding: "6px 20px",
              fontSize: "14px",
              fontWeight: "bold",
              display: "flex",
              textDecoration: 'none',
            }}>
               View Details{" "}
              </NavLink>{" "}
        </div>
      </div>
    );
  }
}

export default Card;
