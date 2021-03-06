import React, { Component } from "react";
import axios from 'axios'
import "./App.css";
import {BASE_URL} from "../../../appConstants"

class App extends Component {

  handleAdd(event)
  {
    
    axios
      .post(BASE_URL+"/create-product", {
        productName: this.product.value,
      })
      .then((res) => {
        if(res.status===200)
        {
          window.alert("Successfully created product");
        }
        else{
          window.alert("Couldn't create product");
        }
      }).catch((err)=>{
        console.log(err)
      })
  }

  render() {
    return (
      <div class="createprdcontainer">
        <input
          class="createProduct"
          placeholder="Enter Product Name"
          name="product"
          ref={(c) => (this.product = c)}
        ></input>
        <button class="addbutton" onClick={this.handleAdd.bind(this)}>ADD</button>
      </div>
    );
  }
}

export default App;
