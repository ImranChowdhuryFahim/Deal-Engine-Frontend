import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
  render() {
    return (
      <div className="cardContainer">
        <div className="ProductImage">
          <a href={this.props.productLink}>
            <img
              src={this.props.productImage}
              alt="couldn' load"
              
            />
          </a>
        </div>
        <div className="ProductDetails">
          <h5>{this.props.productName}</h5>
          <p>Price: {this.props.productPrice}</p>
          <p>Website Name: {this.props.websiteName}</p>
        </div>
      </div>
    );
  }
}

export default Card;
