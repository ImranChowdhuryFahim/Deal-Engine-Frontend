import React, { Component } from "react";
import myData from "./data.json";
import "./App.css";
import Card from "./Card";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      data: null,
    };
  }

  handleclick(event) {
    if (event.key === "Enter") {
      this.setState({ loading: true });
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
      <div >
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
