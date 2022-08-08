import React, { Component } from "react";
import "./Products.css";
import Card from "./Card.js";
import axios from "axios";
import { BASE_URL } from "../../../appConstants";
import myData from "./data.json";

class TrackedProducts extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      data: null,
      allProducts: null,
      tags: [],
      tags: ["select tag to filter"],
      selectedTag: "select tag to filter",
    };
  }

  componentDidMount() {
    // this.setState({data: myData})
    //this.setState({ loading: true });
    // axios.get(`${BASE_URL}/get-all-tracked-products`).then((res) => {
    //   let new_all = []

    //   new_all.push(res.data)
    //   new_all.push(res.data)
    //   new_all.push(res.data)
    //   new_all.push(res.data)
    //   new_all.push(res.data)

    //   this.setState({ allProducts: new_all });
    //   this.setState({ data: new_all });
    //   this.setState({ loading: false });
    //   console.log(this.state.data);
    // });
    axios
      .get(BASE_URL + "/get-all-products")
      .then((res) => {
        this.setState({ data: res.data, allProducts:res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleclick() {
    if (this.title.value) {
      const filterData = this.state.allProducts.filter((item) =>
        item.productTitle.toLowerCase().includes(this.title.value.toLowerCase())
      );
      this.setState({ data: filterData });
    } else {
      this.setState({ data: this.state.allProducts });
    }
  }
  handleChange(e) {
    this.setState({ selectedTag: e.target.value });
    if (e.target.value === "select tag to filter") {
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

        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
      
          <select
            onChange={this.handleChange.bind(this)}
            value={this.state.selectedTag}
            className="dropDown"
            id="dropdown"
          >
            {tags.map((tag) => {
              return <option value={tag}> {tag} </option>;
            })}
          </select>
        </div> */}

        <div className="productCardContainer">
          {!this.state.loading && this.state.data != null ? (
            this.state.data
              // .sort((a, b) => b.price - a.price)
              .map((prod, i) => {
                console.log(prod)
                return (
                  <Card
                    key={i}
                    productLink={prod.href}
                    productName={prod.productTitle}
                    productPrice={"$" + prod.productPrice}
                    productDescription = {prod.productDescription}
                    productImage={prod.productThumbnail}
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
