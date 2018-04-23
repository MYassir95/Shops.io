import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import Shop from './Shop';

export default class ShopsListManager extends PureComponent {
  render () {
    const { shops, searchBar, setMaxDist, setSearchBar } = this.props;
    return (
      <div className = "container">
        <div className="row options">
            <input
              type="search" placeholder="Search by Name" className="form-control search-bar" onKeyUp={setSearchBar} />
            <select className="form-control selectpicker" title="Search Radius (in km)" data-style="btn-primary" onChange={setMaxDist}>
              <option>5</option>
              <option>10</option>
              <option>20</option>
            </select>
        </div>
        <div className="row container scrollable">
          <div className="row">
          {
      // A Game is only shown if its name contains the string from the searchBar
            shops
              .filter(shop => shop.name.toLowerCase().includes(searchBar))
              .map((shop, i) => {
                return (
                  <Shop  {...shop}
                    key={shop._id}
                    i={i}
                  />
                );
              })
          }
          </div>
          <hr />
        </div>
      </div>
    );
  }
}