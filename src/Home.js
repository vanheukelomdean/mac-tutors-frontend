import React from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import './App.css';

class HomePage extends React.Component {
  constructor(props){
    super(props);

  }

  render(){
    return(
      <div class="container">
        <div class="row">
          <div class="col">
                <img src="learn.png" alt="Learn Icon"/>
                <h1>Learn.</h1>
                <b>Reach McMaster students who have been in your shoes and are willing to help.</b>
          </div>
          <div class="col">
            <img src="teach.png" alt="Teach Icon"/>
            <h1>Teach.</h1>
            <b>Earn money and help fellow students achieve their academic goals.</b>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <h3 class="text-center">MacTutors is an online platform where McMaster students can easily become a tutor or find tutors willing to help.</h3>
            <p class="text-center">Get started today by logging in or creating a free account.</p><br/>
            <input type="button" value="Login" id="login" class="btn btn-secondary" onClick={this.props.login}/><br/><br/>
            <input type="button" value="Sign Up" id="signup" class="btn btn-secondary" onClick={this.props.signup}/>
          </div>
        </div>
      </div>
    )
  }
}

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = { page: "home" };
    this.changeForm = this.changeForm.bind(this);
    this.setSignup = this.setSignup.bind(this);
    this.setLogin = this.setLogin.bind(this);
    this.userRegistered = this.userRegistered.bind(this);
    this.getComponent.bind(this);
  }

  setSignup(){
    this.setState({
      page: "signup"
    });
  }

  setLogin(){
    this.setState({
      page: "login"
    });
  }

  userRegistered(){
    this.setState({
      page: "home"
    });
  }

  changeForm(){
    if (this.state.page==="login"){
      this.setState({
        page: "signup"
      });
    } else if (this.state.page==="signup"){
      this.setState({
        page: "login"
      });
    }
    
  }

  getComponent(){
    if (this.state.page==="home"){
      return <HomePage signup={this.setSignup} login={this.setLogin}/>
    } else if (this.state.page==="signup"){
      return <SignupForm changeForm={this.changeForm} userRegistered={this.userRegistered}/>
    } else if (this.state.page==="login"){
      return <LoginForm changeForm={this.changeForm} userRegistered={this.userRegistered}/>
    }
  }

  render() {
    return (
      <div>
        {this.getComponent()}
      </div>
    )
  }
}

export default Home;