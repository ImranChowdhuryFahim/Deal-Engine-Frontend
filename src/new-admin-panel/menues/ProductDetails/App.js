import React from "react";
import "./App.css";
import Chart from "./Chart";
import { withRouter } from "react-router";
import Card from '../TrackedProducts/Card'
import myData from "./data.json";

class App extends React.Component {

  componentDidMount() {
    if (this.props.location.state != null) {
      console.log(this.props.location.state.productLink);
    }
  }
  state = {
    loading: false,
      data: myData,
      keyword: "",
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
  };

  myRef = React.createRef();

  
  
  

  render() {
    const { products, index } = this.state;
    let color =[ "rgba(75,192,192,1)", "#742774", "#FFFF00","#FFFF99","#FF9900"]
    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Amazon",
          data: [33, 53, 85, 41, 44, 65],
          fill: false,
          backgroundColor: "rgba(75,192,192,0.2)",
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
        
        {
          label: "Jbhifi",
          data: [20, 25, 29, 21, 43, 36],
          fill: false,
          borderColor: "#FF9900",
        },
      ],
    };
    return (
      <div className="app">
        {products.map((item) => (
          <div className="details" key={item._id}>
            <div className="box">
              <div className="row">
                <h2>{item.title}</h2>
              </div>

            </div>
            <Chart data={data} />
          </div>
        ))}
                <div className="productCardContainer">
          {!this.state.loading && this.state.data != null ? (
            this.state.data
              .filter(
                (val) =>
                  val.price != null &&
                  val.title
                    .toLowerCase()
                    .includes(this.state.keyword.toLowerCase())
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
                    color = {color[i%4]}
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
