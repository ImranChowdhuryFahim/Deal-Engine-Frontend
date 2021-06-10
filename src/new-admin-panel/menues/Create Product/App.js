import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div class="createprdcontainer">
        <input
          class="createProduct"
          placeholder="Enter Product Name"
          name="test"
        ></input>
        <button class="addbutton">ADD</button>
      </div>
    );
  }
}

export default App;
