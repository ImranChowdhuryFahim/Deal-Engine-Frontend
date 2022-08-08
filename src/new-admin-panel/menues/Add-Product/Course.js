import React, { Component } from "react";
import "./Course.css";
import { BASE_URL } from "../../../appConstants";
import axios from "axios";

class Course extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      loading: false,
      title: "",
      description: "",
      brand: "",
      thumbnail: null,
      urlContent: [{ price: "", url: "" }],
      id: 0,
      file: null,
    };
  }
  handleProductTitle(event) {
    this.setState({ title: event.target.value });
  }
  handleProductDescription(event) {
    this.setState({ description: event.target.value });
  }
  handleProductBrand(event) {
    this.setState({ brand: event.target.value });
  }
  handleProductThumbnail(event) {
    this.setState({ file: event.target.files[0] });
    console.log(event.target.files[0].name);
    this.setState({ fileName: event.target.files[0].name });
  }

  handleAddUrl(event) {
    let newUrlContent = this.state.urlContent;
    newUrlContent.push({ type: "url" });
    this.setState({ CourseContent: newUrlContent });
  }
  handleUrl(event) {
    let id;
    id = event.target.getAttribute("data-id");
    let newUrlContent = this.state.urlContent;
    newUrlContent[id]["url"] = event.target.value;

    this.setState({ urlContent: newUrlContent });
  }
  handlePrice(event) {
    let id;

    id = event.target.getAttribute("data-id");
    let newUrlContent = this.state.urlContent;
    newUrlContent[id]["price"] = event.target.value;
    this.setState({ urlContent: newUrlContent });
  }

  async handleAddProduct() {
    let urlList = [];

    if (this.state.urlContent[0].url === "") {
      alert("Please add Urls");
      return;
    }

    for (let i = 0; i < this.state.urlContent.length; i++) {
      urlList.push(this.state.urlContent[i].url);
    }

    if (this.state.productBrand === "") {
      alert("Please add Brand");
      return;
    }

    if (this.state.productTitle === "") {
      alert("Please add Title");
      return;
    }

    if (this.state.file === null) {
      alert("Please add thumbnail");
      return;
    }

    const data = new FormData();
    data.append("file", this.state.file);
    const downloadLink = await axios.post(BASE_URL + "/api/upload", data);

    const new_product = {
      productTitle: this.state.title,
      productBrand: this.state.brand,
      productDescription: this.state.description,
      productThumbnail: downloadLink.data,
      productUrls: this.state.urlContent,
      urlList: urlList,
      productCreatedBy: "Imran Chowdhury",
    };

    await axios
      .post(BASE_URL + "/add-product", new_product)
      .then((res) => {
        if (res.status == 500) {
          alert(res.data.message);
        } else {
          alert("Product added");
          this.inputRef.current.value = "";
          this.setState({
            loading: false,
            title: "",
            description: "",
            brand: "",
            thumbnail: null,
            file: null,
            urlContent: [{ price: "", url: "" }],
            id: 0,
          });
        }
      })
      .catch(({ response }) => {
        alert(response.data.message);
      });
  }
  handleDeleteUrl(event) {
    let id;
    id = event.target.getAttribute("data-id");
    let newUrlContent = this.state.urlContent;
    newUrlContent.splice(id, 1);
    this.setState({ urlContent: newUrlContent });
  }

  render() {
    let id = this.state.id;
    let lec = 0;
    return (
      <div className={"create-course"}>
        <div>
          <h1 className={"heading_name"}>Product Title</h1>
          <input
            value={this.state.title}
            type="text"
            placeholder="e.g. Iphone 12 pro max"
            onChange={this.handleProductTitle.bind(this)}
          ></input>
        </div>
        <div>
          <h1 className={"heading_name"}>Product Description</h1>
          <textarea
            value={this.state.description}
            placeholder="Short Description"
            onChange={this.handleProductDescription.bind(this)}
          ></textarea>
        </div>
        <div>
          <h1 className={"heading_name"}>Brand Name</h1>
          <input
            value={this.state.brand}
            type="text"
            placeholder="Apple"
            onChange={this.handleProductBrand.bind(this)}
          ></input>
        </div>
        <div>
          <h1 className={"heading_name"}>Product Thumbnail</h1>
          <input
            accept="image/*"
            ref={this.inputRef}
            type="file"
            onChange={this.handleProductThumbnail.bind(this)}
          ></input>
        </div>
        <div>
          <h1 className={"heading_name"}>Product Urls</h1>
          <div className={"course-curriculumn"}>
            <div className={"unit-section"}>
              <span style={{ fontWeight: "bold" }}>URLs</span>

              <div>
                {this.state.urlContent.map((content, i) => {
                  lec++;
                  return (
                    <div key={i} className={"sections"}>
                      <div style={{ paddingBottom: "5px" }}>URL {lec}</div>
                      <div style={{ padding: "5px", fontSize: "14px" }}>
                        <div>
                          URL{" "}
                          <input
                            value={this.state.urlContent[i].url}
                            data-id={i}
                            onChange={this.handleUrl.bind(this)}
                            placeholder={
                              "e.g. https://www.bigw.com.au/product/apple-iphone-13-pro-128gb-alpine-green/p/206139"
                            }
                            style={{
                              marginBottom: "5px",
                              padding: "5px",
                              width: "95%",
                            }}
                          ></input>
                        </div>
                        <div>
                          Price{" "}
                          <input
                            value={this.state.urlContent[0].price}
                            data-id={i}
                            onChange={this.handlePrice.bind(this)}
                            placeholder={"$100"}
                            style={{ padding: "5px", width: "95%" }}
                          ></input>
                        </div>
                      </div>
                      <button
                        data-id={i}
                        onClick={this.handleDeleteUrl.bind(this)}
                        style={{ marginTop: "5px", padding: "5px" }}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
              <button
                type="submit"
                onClick={this.handleAddUrl.bind(this)}
                style={{
                  padding: "5px",
                  margin: "5px",
                  marginLeft: "10px",
                }}
              >
                Add URL
              </button>
            </div>
          </div>
        </div>
        <input
          className={"create-course-button"}
          type="submit"
          value="Add Product"
          onClick={this.handleAddProduct.bind(this)}
        ></input>
      </div>
    );
  }
}

export default Course;
