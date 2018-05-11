import Auth from '../modules/Auth'
import React, { Component } from 'react';
import { hashHistory } from 'react-router';

const RequireAuth = (Component) => { 
    return class App extends Component { 
        componentWillMount() { 
            if(!Auth.isUserAuthenticated()) { 
               hashHistory.push('/login'); 
            } 
        } 
        render() { 
           return <Component {...this.props} /> 
        }
    }
} 

export { RequireAuth }