import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SignupForm extends Component {
  render () {
    const { user, handleChange, submit  } = this.props;
    console.log(this.props);
    return (
        <div className="row">
		    <div className="col-md-offset-2 col-md-8">
				<div className="panel panel-default">
					<div className="panel-heading">
						<h2 className="panel-title text-center">
							 Signup
						</h2>
					</div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group text-left">
                                <label htmlFor="name">Name</label>
                                <input
                                    name="email"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter the name"
                                    value={user.email}
                                    onChange={handleChange}
                                    />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="password">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter the password"
                                    rows="5"
                                    value={user.password}
                                    onChange={handleChange}
                                    />
                            </div>
                            <button type="button" className="btn btn-submit btn-block" onClick={submit}>Signup</button>
                            <h2>Already have an account ? <Link to="/login">Login</Link></h2>
                        </form>
                    </div>
			    </div>
		    </div>
	    </div>
    );
  }
}