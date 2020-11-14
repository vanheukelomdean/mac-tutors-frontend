import React from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import './App.css';

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = { page: "signup" };
    this.changeForm = this.changeForm.bind(this);
    this.userRegistered = this.userRegistered.bind(this);
    this.getComponent.bind(this);
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
      return <h1>This is Home!</h1>
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