import React, { Component } from "react";
import myData from "./data.json";
import "./App.css";
import Card from "./Card";
import axios from "axios";
// import myData from "./data.json";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      data: myData,
      keyword: "",
      
    };
  }

  handleclick(event) {
    if (event.key === "Enter") {
      this.setState({ loading: true });
      this.setState({ keyword: this.title.value });
      axios
        .get(
          `http://127.0.0.1:8000/deal-search/aus?keyword=${this.title.value}`
        )
        .then((res) => {
          this.setState({ data: res.data.totalProductlist });
          this.setState({ loading: false });
        });
    }
  }

  render() {
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
            onKeyDown={this.handleclick.bind(this)}
          ></input>
        </div>
        <div className="productCardContainer">
          {!this.state.loading && this.state.data != null ? (
            this.state.data
              .filter(
                (val) =>
                  val.price != null &&
                  val.title
                    .toLowerCase()
                    .includes(this.state.keyword.toLowerCase())
              )
              .sort((a, b) => b.price - a.price)
              .map((prod, i) => {
                return (
                  <Card
                    key={i}
                    productLink={prod.href}
                    productName={prod.title}
                    productPrice={"$" + prod.price}
                    productImage={prod.image}
                    websiteName={prod.websiteName}
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

export default App;
