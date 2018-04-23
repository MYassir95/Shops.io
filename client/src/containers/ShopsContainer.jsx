import React, { Component } from 'react';
import { ShopsListManager } from '../components';

export default class ShopsContainer extends Component {
  constructor (props) {
    super(props);
    // The initial state
    this.state = { shops: [], selectedShop: {}, searchBar: '' };
    // Bind the functions to this (context) 
    //this.like = this.like.bind(this);
    //this.dislike = this.dislike.bind(this);
    this.setSearchBar = this.setSearchBar.bind(this);
    this.setMaxDist = this.setMaxDist.bind(this);
  }

  // Once the component mounted it fetches the data from the server
  componentDidMount () {
    this.getShops();
  }

  getShops (maxDist = 5) {
    navigator.geolocation.getCurrentPosition(location => {
      var url = new URL('http://localhost:8080/shops'), params = {lng: location.coords.longitude.toFixed(5),
                                                                  lat: location.coords.latitude.toFixed(5),
                                                                  maxDist: maxDist};
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      console.log(url);
      fetch(url)
      .then(response => response.json()) // The json response to object literal
      .then(data => this.setState({ shops: data }));
    }); 
  }
  
  setMaxDist (event) {
    console.log("change");
    this.getShops(event.target.value);
  }

  setSearchBar (event) { 
    // Super still filters super mario thanks to toLowerCase
    this.setState({ searchBar: event.target.value.toLowerCase() });
  }

  render () {
    const { shops, selectedShop, searchBar } = this.state;
    return (
      <div>
        <ShopsListManager
          shops={shops}
          searchBar={searchBar}
          setSearchBar={this.setSearchBar}
          setMaxDist={this.setMaxDist}
        />
      </div>
    );
  }
}
