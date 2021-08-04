import React, { Component } from "react";
import myData from "./data.json";
import "./App.css";
import Card from "./Card";
import axios from "axios";
import {BASE_URL} from "../../../appConstants"
// import myData from "./data.json";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      data: null,
      keyword: "",
      
    };
  }

  handleclick(event) {
    if (event.key === "Enter") {
      this.setState({ loading: true });
      this.setState({ keyword: this.title.value });

      const websiteNameList = ["amazon-au","bigw","jbhifi","banggood","ebay"]
      const promiseList =[];
      const productList = [];
      for(let i of websiteNameList)
      {
        promiseList.push(axios.get(`${BASE_URL}/deal-search/aus?keyword=${this.title.value}&websiteName=${i}`))
      }

      Promise.all(promiseList).then((allProductLists)=>{
        

        allProductLists.map((list)=>{
          console.log(list)
          productList.push(...list.data.totalProductlist)
        })
        console.log(productList)
        this.setState({ data: productList });
        
        this.setState({ loading: false });
      }).catch((err)=>{
        this.setState({ loading: false });
        console.log(err)
      })

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
          ></input>{" "}
        </div>
        <div className="productCardContainer">
          {!this.state.loading && this.state.data != null ? (
            this.state.data
              .filter(
                (val) =>
                  val.price != null 
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
