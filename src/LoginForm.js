import React from 'react';
import './App.css';
import users from './data/users';

class LoginForm extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            email: "", emailFeedback: {class: "", message: ""},
            pwd: "", pwdFeedback: {class: "", message: ""}
        };
    }

    inputStateChange(event) {
        if (event.target.id=== "usr"){
            this.setState({
                email: event.target.value,
                emailFeedback: {class: "", message: ""}
            });
        } else if (event.target.id === "pwd"){
            this.setState({
                pwd: event.target.value,
                pwdfeedback: {class: "", message: ""}
            });
        }
    }

    clearState() {
        this.setState({
            emailFeedback: {class: "", message: ""},
            pwdFeedback: {class: "", message: ""}
        });
    }

    handleSubmit(){
        this.clearState();
        if (this.state.email.length==0){
            this.setState({
                emailFeedback: {class: "form-control is-invalid", message: "Please enter your email"}
            });
        } if (this.state.pwd.length == 0){
            this.setState({
                pwdFeedback: {class: "form-control is-invalid", message: "Please enter your password"}
            });
        } 
        var user = users.filter((x) => x.email === this.state.email);
        if (user.length == 0) {
            this.setState({
                emailFeedback: {class: "form-control is-invalid", message: "Incorrect email"}
            });
        } else if (user.length > 0 && this.state.pwd !== user[0].password) {
            this.setState({
                emailFeedback: {class: "form-control is-valid", message: "Email OK"},
                pwdFeedback: {class: "form-control is-invalid", message: "Incorrect password"}
            });
        } else {
            this.props.userRegistered(user[0]);
        }
        
    }

    render() {
      return (
        <div class="container">
          <br/>
          <h1 class="text-center">Earn money as a McMaster tutor or find a tutor for your class!</h1>
          <h2>Login to begin</h2>
          <form>
              <div class="form-group">
                  <label for="usr">Email:</label>
                  <input type="text" class="form-control" id="usr" value={this.state.email} onChange={this.inputStateChange.bind(this)}/>
                  <div id="usrfeedback" class={this.state.emailFeedback.class}>{this.state.emailFeedback.message}</div>
              </div>
              <div class="form-group">
                  <label for="pwd">Password:</label>
                  <input type="text" class="form-control" id="pwd" value={this.state.pwd} onChange={this.inputStateChange.bind(this)}/>
                  <div id="pwdfeedback" class={this.state.pwdFeedback.class}>{this.state.pwdFeedback.message}</div>
              </div>
              <input type="button" value="Login" id="login" class="btn btn-primary" onClick={this.handleSubmit.bind(this)}/>
              <input type="button" class="btn btn-link" value="Sign Up" id="signup" onClick={this.props.changeForm}/>
          </form>
          
        </div>
      );
    }
  } export default LoginForm;