import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import Auth from '../modules/Auth';

export default class Layout extends PureComponent {
  active (path) {
    // Returns active when the path is equal to the current location
    if (this.props.location.pathname === path) {
      return 'active';
    }
  }
  render () {
    return (
      <div className="view">
        <nav className="navbar navbar-inverse">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <ul className="nav masthead-nav">
                { Auth.isUserAuthenticated() && <li className={this.active('/')}><Link to="/">Nearby Shops</Link></li> }
                { Auth.isUserAuthenticated() && <li className={this.active('/preferred')}><Link to="/preferred">My Preferred Shops</Link></li> }
              </ul>
              <Link className="navbar-brand" to="/">
                <img src="https://i.imgur.com/GTOjp8U.png" className="header-logo" />
              </Link>
              { Auth.isUserAuthenticated() && <Link to="/logout"><button type="button" className="btn btn-logout">Logout</button></Link> }
            </div>
          </div>
        </nav>
        {this.props.children}
        <footer className="text-center">
          <p>© 2018 Yassir Mahmoud El Massaoudi</p>
        </footer>
      </div>
    );
  }
}
