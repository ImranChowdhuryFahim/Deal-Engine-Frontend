import React from "react";
import "./Styles.css";

import { Line } from "react-chartjs-2";



export default function App({ data }) {
  return (
    <div className="App">
      <h2>Price VS Date</h2>
      <Line data={data} />
    </div>
  );
}
