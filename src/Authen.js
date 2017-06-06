import React, { Component } from 'react';
const firebase = require('firebase');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBr1-dqOMLn3-z2d4q_x1Jz6hcly_dfAQ0",
  authDomain: "login0-141bd.firebaseapp.com",
  databaseURL: "https://login0-141bd.firebaseio.com",
  projectId: "login0-141bd",
  storageBucket: "login0-141bd.appspot.com",
  messagingSenderId: "465739301603"
};
firebase.initializeApp(config);

export default class Authen extends Component {
  login(e) {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email + ', ' + password);

    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, password);

    promise.then(user => {
      console.log(user);
      var logout = document.getElementById('logout');
      logout.classList.remove('hide');

      var err = "Welcome back, " + user.email + '!';
      this.setState({
        err: err
      });
    });

    promise.catch(e => {
      var err = e.message;
      console.log(err);

      this.setState({
        err: err
      });
    });

  }

  signup() {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email + ', ' + password);

    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, password);

    promise
    .then(user => {
      var err = "Welcome " + user.email;
      firebase.database().ref('users/' + user.uid).set({
        email: user.email
      });
      console.log(user);
      this.setState({
        err: err
      });
    });

    promise.catch(e => {
      var err = e.message;
      console.log(err);
      this.setState({
        err: err
      });
    });

  }

  logout() {
    firebase.auth().signOut();
    var logout = document.getElementById('logout');
    logout.classList.add('hide');
    this.setState({err: ''})
  }

  constructor() {
    super();

    this.state = {
      err: ''
    }

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
  }
  render() {
    return(
      <div className="site-container">
        <h1>Login</h1>
        <h2>{this.state.err}</h2>
        <input type="email" ref="email" placeholder="email" /><br />
        <input type="password" ref="password" placeholder="password" /><br />
        <button onClick={this.login}>Login</button>
        <button onClick={this.signup}>Sign up</button>
        <button onClick={this.logout} id="logout" className="hide">Log out</button>
      </div>
    )
  }
}
