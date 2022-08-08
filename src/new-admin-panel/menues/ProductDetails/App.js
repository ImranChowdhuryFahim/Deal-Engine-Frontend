import React from "react";
import "./App.css";
import Chart from "./Chart";
import { withRouter } from "react-router";
import Card from "./Card";
import myData from "./data.json";
import axios from "axios";
import { BASE_URL } from "../../../appConstants";
import { date } from "yup";

const colorMap = {
  "amazon-au": "red",
  jbhifi: "green",
  ebay: "blue",
  bigw: "orange",
  bangood: "purple",
};

class App extends React.Component {
  componentDidMount() {
    axios
      .get(BASE_URL + "/get-all-created-products")
      .then((res) => {
        const newList = this.state.tags.concat(res.data);
        this.setState({ tags: newList });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  state = {
    loading: false,
    data: null,
    keyword: "",
    chartData: null,
    products: [
      {
        _id: "1",
        title: "Apple iPhone 12 Pro Max",
        src: [
          "https://cdn.shopify.com/s/files/1/0024/9803/5810/products/481797-Product-0-I-637382712841613388_ff93a2ed-f60e-4ff7-af0d-c62b47bf8607_300x300.jpg?v=1612750122",
        ],
        description:
          "The ultimate iPhone 6.7-inch Super Retina XDR display Ceramic Shield, tougher than any smartphone glass 5G for superfast downloads and high-quality streaming",
        content:
          "Glass front (Gorilla Glass), glass back (Gorilla Glass), aluminum frame SIM	Single SIM (Nano-SIM and/or eSIM) or Dual SIM (Nano-SIM, dual stand-by) - for China IP68 dust/water resistant (up to 6m for 30 mins",
        price: 2019,
        colors: ["red", "black", "crimson", "teal"],
        count: 1,
      },
    ],
    index: 0,
    selectedTag: "select tag to filter",
    tags: ["select tag to filter"],
  };

  myRef = React.createRef();

  dateFormat(date) {
    const d = new Date(date);
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return `${da}-${mo}-${ye}`;
  }

  async handleChange(e) {
    this.setState({ selectedTag: e.target.value });

    if (e.target.value === "select tag to filter") return;

    const result = await axios.get(
      BASE_URL + `/get-chart-data/${e.target.value}`
    );
    this.setState({ data: result.data.trackedProducts });
    const productMap = {};
    for (let i of result.data.trackedProducts) {
      productMap[i.productLink] = i;
    }
    const chartDataMap = {};
    const dates = new Set();
    for (let i of result.data.productPriceHistory) {
      dates.add(this.dateFormat(i.createdAt));

      if (!chartDataMap[i.productLink]) {
        chartDataMap[i.productLink] = {
          label: productMap[i.productLink].websiteName,
          fill: false,
          borderColor: colorMap[productMap[i.productLink].websiteName],
          data: [i.productPrice],
        };
      } else {
        chartDataMap[i.productLink].data.push(i.productPrice);
      }
    }
    const finalChartData = {
      labels: Array.from(dates),
      datasets: [],
    };

    for (let i of Object.keys(chartDataMap)) {
      finalChartData.datasets.push(chartDataMap[i]);
    }

    console.log(finalChartData);
    this.setState({ chartData: finalChartData });
  }

  render() {
    const { products, index, tags } = this.state;
    let color = [
      "rgba(75,192,192,1)",
      "#742774",
      "#FFFF00",
      "#FFFF99",
      "#FF9900",
    ];
    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Amazon",
          data: [33, 53, 85, 41, 44, 65],
          fill: false,
          borderColor: "red",
        },
        {
          label: "Ebay",
          data: [33, 25, 35, 51, 54, 76],
          fill: false,
          borderColor: "green",
        },
        {
          label: "Flipcart",
          data: [20, 25, 19, 51, 4, 96],
          fill: false,
          borderColor: "blue",
        },

        {
          label: "Jbhifi",
          data: [20, 25, 29, 21, 43, 36],
          fill: false,
          borderColor: "orange",
        },
      ],
    };
    return (
      <div className="app">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <select
            onChange={this.handleChange.bind(this)}
            value={this.state.selectedTag}
            className="dropDown"
            id="dropdown"
          >
            {tags.map((tag) => {
              return <option value={tag}> {tag} </option>;
            })}
          </select>
        </div>
        {!this.state.loading &&
        this.state.data !== null &&
        this.state.chartData !== null ? (
          <div className="details" key={this.state.selectedTag}>
            <div className="box">
              <div className="row">
                <h2>{this.state.selectedTag}</h2>
              </div>
            </div>
            <Chart data={this.state.chartData} />
          </div>
        ) : (
          <></>
        )}
        <div className="productCardContainer">
          {!this.state.loading &&
          this.state.data !== null &&
          this.state.chartData !== null ? (
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
                    color={color[i % 4]}
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

export default withRouter(App);
