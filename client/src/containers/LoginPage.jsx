import React, { Component } from 'react';
import Auth from '../modules/Auth';
import { LoginForm } from '../components';
import { Link, hashHistory } from 'react-router';
import superagent from 'superagent';

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
        superagent
            .post('/auth/login')
            .send({email:this.state.user.email, password:this.state.user.password})
            .end((err, res) => {
                if(err) { 
                    this.setState({errorMessage: "Authentication Failed"});
                    window.alert("Your email/password is incorrect");
                    return;
                }
                Auth.authenticateUser(res.body.token, res.body.id);
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