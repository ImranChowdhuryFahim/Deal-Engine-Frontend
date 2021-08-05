import React, { Component } from "react";
import "./TrackedProducts.css";
import Card from "./Card.js";
import axios from "axios";
import { BASE_URL } from "../../../appConstants";

class TrackedProducts extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      data: null,
      allProducts: null,
      tags: [],
      tags: ["select tag"],
      selectedTag: "select tag",
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios.get(`${BASE_URL}/get-all-tracked-products`).then((res) => {
      console.log(res.data);
      this.setState({ allProducts: res.data });
      this.setState({ data: res.data });
      this.setState({ loading: false });
    });
    axios
      .get(BASE_URL + "/get-all-created-products")
      .then((res) => {
        const newList = this.state.tags.concat(res.data);
        this.setState({ tags: newList });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleclick() {
    if (this.title.value) {
      const filterData = this.state.allProducts.filter((item) =>
        item.productName.toLowerCase().includes(this.title.value.toLowerCase())
      );
      this.setState({ data: filterData });
    } else {
      this.setState({ data: this.state.allProducts });
    }
  }
  handleChange(e) {
    this.setState({ selectedTag: e.target.value });
    if (e.target.value === "select tag") {
      this.setState({ data: this.state.allProducts });
    } else {
      const filterData = this.state.allProducts.filter(
        (item) => item.productTag.toLowerCase() === e.target.value.toLowerCase()
      );
      this.setState({ data: filterData });
    }
  }

  handleDelete() {
    this.setState({ loading: true });
    axios.get(`${BASE_URL}/get-all-tracked-products`).then((res) => {
      console.log(res.data);
      this.setState({ allProducts: res.data });
      this.setState({ data: res.data });
      this.setState({ loading: false });
    });
    axios
      .get(BASE_URL + "/get-all-created-products")
      .then((res) => {
        const newList = this.state.tags.concat(res.data);
        this.setState({ tags: newList });
      })
      .catch((err) => {
        console.log(err);
      });
    window.alert("successfully deleted the product");
  }

  render() {
    const tags = this.state.tags;
    return (
      <div>
        <div className="searchBarContainer">
          <input
            className="searchBar"
            placeholder="Search Product"
            type="text"
            height="500px"
            ref={(c) => (this.title = c)}
            name="title"
            onChange={this.handleclick.bind(this)}
          ></input>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h4 style={{ marginRight: "10px" }}>Filter By Tag</h4>
          <select
            onChange={this.handleChange.bind(this)}
            value={this.state.selectedTag}
            className="dropDown"
          >
            {tags.map((tag) => {
              return <option value={tag}> {tag} </option>;
            })}
          </select>
        </div>

        <div className="productCardContainer">
          {!this.state.loading && this.state.data != null ? (
            this.state.data
              .sort((a, b) => b.price - a.price)
              .map((prod, i) => {
                return (
                  <Card
                    key={i}
                    productLink={prod.productLink}
                    productName={prod.productName}
                    productPrice={"$" + prod.productPrice}
                    productImage={prod.productImage}
                    websiteName={prod.websiteName}
                    productTag={prod.productTag}
                    handleDelete={this.handleDelete.bind(this)}
                  ></Card>
                );
              })
          ) : this.state.loading ? (
            <div>loading....</div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

export default TrackedProducts;
