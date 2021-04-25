import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    return (
      <div>
        <div className="searchBarContainer">
          <input
            className="searchBar"
            placeholder="Search Product"
            type="text"
            height="500px"
          ></input>
        </div>
      </div>
    );
  }
}

export default SearchBar;
