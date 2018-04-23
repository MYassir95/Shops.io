import React, { PureComponent } from 'react';

export default class About extends PureComponent {
  render () {
    return (
      <div className="inner cover">
        <h1 className="cover-heading">Javascript Everywhere</h1>
        <p className="lead">This website is made with Node.js and React.</p>
      </div>
    );
  }
}
