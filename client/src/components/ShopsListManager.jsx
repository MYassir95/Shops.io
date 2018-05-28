import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router';
import Shop from './Shop';

class ShopsListManager extends PureComponent {
  render () {
    const { shops, maxDist, searchBar, setMaxDist, setSearchBar, likeShop, dislikeShop, removeShop } = this.props;
    return (
      <div className = "container">
        <div className="row options">
            <input
              type="search" placeholder="Search by Name" className="form-control search-bar" onKeyUp={setSearchBar} />
            { this.props.location.pathname==='/' &&
            <select className="form-control selectpicker" data-style="btn-primary" onChange={setMaxDist}>
              <option value="1000">Search Radius (in km)</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="75">75</option>
              <option value="100">100</option>
            </select> }
        </div>
        <div className="row container scrollable">
          <div className="row">
          {
            shops
              .filter(shop => shop.name.toLowerCase().includes(searchBar))
              .map((shop, i) => {
                return (
                  <Shop  {...shop}
                    key={shop._id}
                    i={i}
                    likeShop={likeShop}
                    dislikeShop={dislikeShop}
                    removeShop={removeShop}
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

export default withRouter(ShopsListManager);