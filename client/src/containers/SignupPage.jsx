import React, { Component } from 'react';
import Auth from '../modules/Auth';
import { SignupForm } from '../components';
import { Link, hashHistory } from 'react-router';

export default class SignupPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: '',
            user: {
                email: '',
                password: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        if(Auth.isUserAuthenticated()) {
            hashHistory.push('/');
        }
    }

    //handles changes to the user object
    handleChange(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
    
        this.setState({
          user
        });
    }

    //handles user signup
    submit(event) {
        event.preventDefault();
        fetch(`http://localhost:8080/auth/signup`, {
            headers: new Headers({
              'Content-Type': 'application/json',
            }),
            body: JSON.stringify({"email": this.state.user.email, "password": this.state.user.password}),
            method: 'POST'
        })
        .then(response => response.json())
        .then(response => {
            if(response.message=='Email is already taken') {
                this.setState({errorMessage: response.message});
                window.alert('A user with this email already exists');
                return;
            }
            Auth.authenticateUser(response.token, response.id);
            hashHistory.push('/');
        });
    }

    render() {
        return (
          <SignupForm
            user={this.state.user}
            handleChange={this.handleChange}
            submit={this.submit}   
          />
        );
    }
}