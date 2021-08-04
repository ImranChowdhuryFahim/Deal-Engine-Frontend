import React, { Component } from "react";
import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Drop from "./DropDown";
import {BASE_URL} from "../../../appConstants"

class Card extends Component {
  state = {
    loading: false,
  };

  currentDate() {
    let d = new Date();
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return `${da}-${mo}-${ye}`;
  }

  handleTrack() {
    this.setState({ loading: true });
    axios
      .post(BASE_URL+"/track-product", {
        productName: this.props.productName,
        productLink: this.props.productLink,
        productPrice: this.props.productPrice.replaceAll("$",""),
        productImage: this.props.productImage,
        websiteName: this.props.websiteName,
        date: this.currentDate(),
      })
      .then((res) => {
        window.alert("successfully added to tracking")
      });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }
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
            className={"track"}
            onClick={this.handleTrack.bind(this)}
          >
            {this.state.loading && (
              <div style={{ marginRight: "5px" }}>
                <FontAwesomeIcon icon={faSpinner} spin={true}></FontAwesomeIcon>
              </div>
            )}
            {this.state.loading && <span>Please wait</span>}
            {!this.state.loading && <span>Track</span>}
          </button>{" "}
          <Drop />
        </div>
      </div>
    );
  }
}

export default Card;
