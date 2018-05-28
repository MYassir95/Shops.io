import React, { Component } from 'react';
import { ShopsListManager } from '../components';
import { hashHistory } from 'react-router';
import Auth from '../modules/Auth';

export default class ShopsContainer extends Component {
  constructor (props) {
    super(props);
    // The initial state
    this.state = { shops: [], maxDist:'', searchBar: '' };
    // Bind the functions to this (context) 
    this.setSearchBar = this.setSearchBar.bind(this);
    this.setMaxDist = this.setMaxDist.bind(this);
    this.likeShop = this.likeShop.bind(this);
    this.dislikeShop = this.dislikeShop.bind(this);
    this.removeShop = this.removeShop.bind(this);
  }

  // We make sure the user is logged in before he can access the main page
  componentWillMount() { 
    if(!Auth.isUserAuthenticated()) { 
       hashHistory.push('/login'); 
    } 
  }
  
  // Once the component mounted it fetches the data from the server
  componentDidMount () {
    switch(this.props.location.pathname) {
      case "/":
        this.getNearbyShops();
        break;
      case "/preferred":
        this.getPreferredShops();
    }
  }

  // Returns a list of the shops that are within a radius of maxDist or 1000km if maxDist is not specified
  getNearbyShops () {
    navigator.geolocation.getCurrentPosition(location => {
      var url = new URL('http://localhost:8080/nearbyShops');
      var params = {
        lng: location.coords.longitude.toFixed(5),
        lat: location.coords.latitude.toFixed(5),
        maxDist: this.state.maxDist || 1000,
        userId: localStorage.id
      };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      fetch(url)
      .then(response => response.json()) // The json response to object literal
      .then(data => this.setState({ shops: data }));
    }); 
  }
  
  // Fetches a user's preferred shops
  getPreferredShops () {
      var url = new URL('http://localhost:8080/preferredShops');
      var params = { userId: localStorage.id };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      fetch(url)
      .then(response => response.json()) // The json response to object literal
      .then(data => this.setState({ shops: data }));
  }
  
  setMaxDist (event) {
    this.setState({ maxDist: event.target.value });
    this.getNearbyShops();
  }

  setSearchBar (event) { 
    this.setState({ searchBar: event.target.value.toLowerCase() });
  }

  // Handles a user liking/disliking a shop
  interactWithShop(id, url) {
    fetch(url, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({"shopId": id, "userId": localStorage.id}),
      method: 'POST',
    }).then(response => {
      console.log(response.message);
    });
    this.getNearbyShops();
  }

  likeShop(id) {
    this.interactWithShop(id,new URL(`http://localhost:8080/like`));
  }

  dislikeShop(id) {
    this.interactWithShop(id,new URL(`http://localhost:8080/dislike`));
  }

  // Removes a shop from the preferred shops list
  removeShop(id) {
    fetch(`http://localhost:8080/remove`, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({"userId": localStorage.id, "shopId": id}),
      method: 'DELETE',
    }).then(response => {
      console.log(response.message);
    });
    this.getPreferredShops();
  }

  render () {
    const { shops, maxDist, searchBar } = this.state;
    return (
      <div>
        <ShopsListManager
          shops={shops}
          maxDist={maxDist}
          searchBar={searchBar}
          setSearchBar={this.setSearchBar}
          setMaxDist={this.setMaxDist}
          likeShop={this.likeShop}
          dislikeShop={this.dislikeShop}
          removeShop={this.removeShop}
        />
      </div>
    );
  }
}
