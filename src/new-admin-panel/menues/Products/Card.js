import React, { Component } from "react";
import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ContactPhoneSharp } from "@material-ui/icons";
import { withRouter } from "react-router";
import { AutoComplete } from "antd";
import { BASE_URL } from "../../../appConstants";

class Card extends Component {
  state = {
    loading: false,
  };

  handleDelete() {
    axios
      .put(BASE_URL + "/delete-tracked-product", {
        productLink: this.props.productLink,
      })
      .then((result) => {
        this.props.handleDelete();
      })
      .catch(({ response }) => {
        window.alert(response.data.message);
      });
  }

  render() {
    return (
      <div className="cardContainer">
        <div>
          <a href={this.props.productLink}>
            <img
              className="ProductImage"
              src={this.props.productImage}
              alt="couldn' load"
            />
          </a>
        </div>

        <div className="ProductName">
          <h3>{this.props.productName}</h3>
        </div>

        <div className="ProductDescription">
          {this.props.productDescription}
        </div>

        <div className="WebsiteName">{this.props.websiteName}</div>
        {/* <p>Website Name: {this.props.websiteName}</p>
          <p>Product Tag: {this.props.productTag}</p> */}

        <div
          style={{
            height: "20px",
            width: "20px",
            backgroundColor: `${this.props.color}`,
            borderRadius: "50%",
            marginBottom: "50px",
            textAlign: "center",
            display: "flex",
            margin: "0 auto",
          }}
        ></div>
        <div style={{ display: "flex", flexDirection: "column" }}>
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
            onClick={this.handleDelete.bind(this)}
          >
            Edit
          </button>
          <button
            style={{
              marginRight: "20px",
              backgroundColor: "#af4c4f",
              border: "none",
              color: "white",
              padding: "6px 20px",
              fontSize: "14px",
              fontWeight: "bold",
              display: "flex",
              marginTop: '10px'
            }}
          >
           Delete
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Card);
