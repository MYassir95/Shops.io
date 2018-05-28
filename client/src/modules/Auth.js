export default class Auth {

    //Authenticate a user. Save a token string and the user's id in Local Storage
    static authenticateUser(token, id) {
      localStorage.setItem('token', token);
      localStorage.setItem('id', id);
    }
  
    // Check if a user is authenticated - check if a token and user id are saved in Local Storage
    static isUserAuthenticated() {
      return localStorage.getItem('token') !== null && localStorage.getItem('id') !== null;
    }
  
    //Deauthenticate a user. Remove his token and id from Local Storage.
    static deauthenticateUser() {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
    }
  
    // Get a token value.
    static getToken() {
      return localStorage.getItem('token');
    }
  
}