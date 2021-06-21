import React from "react";
import "./Styles.css";

import { Line } from "react-chartjs-2";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Amazon",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      // backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "Ebay",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774",
    },
    {
      label: "Flipcart",
      data: [20, 25, 19, 51, 4, 96],
      fill: false,
      borderColor: "#FFFF00",
    },
  ],
};

export default function App() {
  return (
    <div className="App">
      <h2>Price VS Date</h2>
      <Line data={data} />
    </div>
  );
}
