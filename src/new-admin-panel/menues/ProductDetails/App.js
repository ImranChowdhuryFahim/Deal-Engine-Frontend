import React from "react";
import "./App.css";
import Colors from "./components/Colors";
import Chart from "./Chart";
import { withRouter } from "react-router";

class App extends React.Component {
  componentDidMount()
  {
    if(this.props.location.state!=null)
    {
      console.log(this.props.location.state.productLink)
    }
    
  }
  state = {
    products: [
      {
        _id: "1",
        title: "Apple iPhone 12 Pro Max 256GB (Pacific Blue)",
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

  // handleTab = (index) => {
  //   this.setState({ index: index });
  //   const images = this.myRef.current.children;
  //   for (let i = 0; i < images.length; i++) {
  //     images[i].className = images[i].className.replace("active", "");
  //   }
  //   images[index].className = "active";
  // };

  // componentDidMount() {
  //   const { index } = this.state;
  //   this.myRef.current.children[index].className = "active";
  // }

  render() {
    const { products, index } = this.state;
    return (
      <div className="app">
        {products.map((item) => (
          <div className="details" key={item._id}>
            <div className="big-img">
              <img src={item.src[index]} alt="" />
            </div>

            <div className="box">
              <div className="row">
                <h2>{item.title}</h2>
                <span>${item.price}</span>
              </div>
              <Colors colors={item.colors} />

              <p>{item.description}</p>
              <p>{item.content}</p>

              {/* <DetailsThumb
                images={item.src}
                tab={this.handleTab}
                myRef={this.myRef}
              /> */}
              <button className="cart">Add to cart</button>
            </div>
            <Chart />
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(App);
