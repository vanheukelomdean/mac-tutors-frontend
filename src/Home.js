import React from 'react';
import './App.css';

class Home extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div class="container">
        <br/>
        <h1 class="text-center">Earn money as a McMaster tutor or find a tutor for your class!</h1>
        <h2>Login to begin</h2>
        <form>
            <div class="form-group">
                <label for="usr">Name:</label>
                <input type="text" class="form-control" id="usr"/>
                <div id="usrfeedback" class="invalid-feedback"> </div>
            </div>
            <div class="form-group">
                <label for="pwd">Password:</label>
                <input type="text" class="form-control" id="pwd"/>
                <div id="pwdfeedback" class="invalid-feedback"> </div>
            </div>

            <input type="button" value="Login" id="login" class="btn btn-primary"/>
        </form>
        <a class="text-center" href="signup.html">Sign Up</a>
      </div>
      );
  }
}

export default Home;