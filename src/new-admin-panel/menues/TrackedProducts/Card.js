import React, { Component } from "react";
import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ContactPhoneSharp } from "@material-ui/icons";
import { withRouter } from "react-router";
import { AutoComplete } from "antd";
// import { NavLink } from "react-router-dom";

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
        <div
            style={{
              height: "20px",
              width: "20px",
              backgroundColor: `${this.props.color}`,
              borderRadius: "50%",
              marginBottom:'50px',
              textAlign:'center',
              display: "flex",
              margin: '0 auto',
            }}
          ></div>
        <div style={{display: 'flex', flexDirection:'column'}}>

          <button
            style={{
              marginRight: "20px",
              backgroundColor: "#4CAF50",
              border: "none",
              color: "white",
              padding: "6px 20px",
              fontSize: "14px",
              fontWeight: "bold",
              display: "flex",
            }}
            onClick={(e) => {
              this.props.history.push("/admin/product_details", {
                productLink: this.props.productLink,
              });
            }}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Card);
