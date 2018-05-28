import React, { Component } from 'react';
import Auth from '../modules/Auth';
import { LoginForm } from '../components';
import { Link, hashHistory } from 'react-router';

export default class LoginPage extends Component {
    constructor(props, context) {
        super(props, context);

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

    //handles changes to the user object
    handleChange(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
    
        this.setState({
          user
        });
    }

    //handles user login
    submit(event) {
        event.preventDefault();
        fetch(`http://localhost:8080/auth/login`, {
            headers: new Headers({
              'Content-Type': 'application/json',
            }),
            body: JSON.stringify({"email": this.state.user.email, "password": this.state.user.password}),
            method: 'POST'
        })
        .then(response => response.json())
        .then(response => {
            if(response.message=='Invalid email/password') {
                this.setState({errorMessage: response.message});
                window.alert(response.message);
                return;
            }
            Auth.authenticateUser(response.token, response.id);
            hashHistory.push('/');
        });
    }

    render() {
        return (
          <LoginForm
            user={this.state.user}
            handleChange={this.handleChange}
            submit={this.submit}   
          />
        );
    }
}