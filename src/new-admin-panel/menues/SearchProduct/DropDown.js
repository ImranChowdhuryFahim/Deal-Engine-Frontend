import React, { Component } from "react";
import "./DropDown";
class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      times: [
        "Iphone 12 Pro max",
        "Iphone 12 Pro",
        "Iphone 12",
        "Iphone 12 Mini",
      ],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log(e.target.value);
  }

  render() {
    const { times } = this.state;
    return (
      <select onChange={this.handleChange} className="dropDown">
        {times.map((time) => {
          return <option value={time}> {time} </option>;
        })}
      </select>
    );
  }
}

export default DropDown;
