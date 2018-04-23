import React, { PureComponent } from 'react';
import { Link } from 'react-router';

export default class Shop extends PureComponent {
  render () {
    const { _id, name, picture } = this.props;
    return (
      <div className="col-md-4">
        <div className="thumbnail">
          <div className="thumbnail-frame">
            <img src={picture} alt="..." className="img-responsive thumbnail-pic" />
          </div>
          <div className="caption">
            <h5>{name}</h5>
            <div className="btn-group" role="group" aria-label="...">
              <button className="btn btn-success" role="button">Like</button>
              <button className="btn btn-danger" role="button">Dislike</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
