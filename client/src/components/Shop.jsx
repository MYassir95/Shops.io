import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router';

class Shop extends PureComponent {
  render () {
    const { _id, name, picture, likeShop, dislikeShop, removeShop } = this.props;
    return (
      <div className="col-md-4">
        <div className="thumbnail">
          <div className="thumbnail-frame">
            <img src={picture} alt="..." className="img-responsive thumbnail-pic" />
          </div>
          <div className="caption">
            <h5>{name}</h5>
            <div className="btn-group" role="group" aria-label="...">
              {this.props.location.pathname==="/" && <button className="btn btn-success" role="button" onClick={() => likeShop(_id)}>Like</button>}
              {this.props.location.pathname==="/" && <button className="btn btn-danger" role="button" onClick={() => dislikeShop(_id)}>Dislike</button>}
              {this.props.location.pathname==="/preferred" && <button className="btn btn-danger" role="button" onClick={() => removeShop(_id)}>Remove</button>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Shop);