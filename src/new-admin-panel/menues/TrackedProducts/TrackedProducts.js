import React, { Component } from 'react'
import './TrackedProducts.css'
import Card from "./Card.js";
import axios from "axios";


class TrackedProducts extends Component{
    constructor() {
        super();
        this.state = {
          loading: false,
          data: null,
          
        };
      }

    componentDidMount()
    {
        this.setState({ loading: true });
      axios
        .get(
          `http://127.0.0.1:8000/get-all-tracked-products`
        )
        .then((res) => {
            console.log(res.data)
          this.setState({ data: res.data });
          this.setState({ loading: false });
        });
    }

    handleclick(event) {
        if (event.key === "Enter") {
        //   this.setState({ loading: true });
        //   this.setState({ keyword: this.title.value });
        //   axios
        //     .get(
        //       `http://127.0.0.1:8000/deal-search/aus?keyword=${this.title.value}`
        //     )
        //     .then((res) => {
        //       this.setState({ data: res.data.totalProductlist });
        //       this.setState({ loading: false });
        //     });
        }
      }
    render()
    {
        return(
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
        )
    }
}

export default TrackedProducts