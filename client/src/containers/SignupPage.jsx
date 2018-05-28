import React, { Component } from 'react';
import Auth from '../modules/Auth';
import { SignupForm } from '../components';
import { Link, hashHistory } from 'react-router';
import superagent from 'superagent';

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
        superagent
            .post('/auth/signup')
            .send({email:this.state.user.email, password:this.state.user.password})
            .end((err, res) => {
                if(res.status===409) {
                    this.setState({errorMessage: "Email already exists"});
                    window.alert("A user with this email already exists");
                    return;
                }
                Auth.authenticateUser(res.body.token, res.body.id);
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