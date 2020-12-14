import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import axios from "axios";
import ImageResulsts from "./ImageResulsts";

export default class Search extends Component {
  state = {
    searchText: "",
    amount: 12,
    apiUrl: "https://pixabay.com/api",
    apiKey: "19501583-8610fa1aed773d7b6f50a1092",
    images: [],
  };

  onTextChange = (e) => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === "") {
        this.setState({ images: [] });
      } else {
        axios
          .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`
          )
          .then((res) => this.setState({ images: res.data.hits }))
          .catch((er) => console.log(er));
      }
    });
  };

  onAmountChange = (e, index, value) => this.setState({ amount: value });

  render() {
    console.log(this.state.images);
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search For Images"
          fullWidth={true}
        />
        <br />
        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={10} primaryText="10">
            Ten
          </MenuItem>
          <MenuItem value={20} primaryText="20">
            Twenty
          </MenuItem>
          <MenuItem value={30} primaryText="30">
            Thirty
          </MenuItem>
          <MenuItem value={40} primaryText="40">
            Fourty
          </MenuItem>
          <MenuItem value={50} primaryText="50">
            Fifty
          </MenuItem>
        </SelectField>
        <br />
        {this.state.images.length > 0 ? (
          <ImageResulsts images={this.state.images} />
        ) : null}
      </div>
    );
  }
}
