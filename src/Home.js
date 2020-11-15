import React from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import './App.css';
import {Link} from 'react-router-dom';

class WelcomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = { transcript : null, paymentInfo : null };
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

class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = { transcriptFeedback: { class: "", message: ""}, paymentFeedback: { class: "", message: ""} };
    this.infoMessage.bind(this);
  }

  handleSubmit() { 
    this.setState({transcriptFeedback: { class: "", message: ""}, paymentFeedback: { class: "", message: ""}});
    if (this.state.transcript != null && this.state.paymentInfo != null){
      var usr = this.props.user;
      usr.type = "tutor";
      this.props.userRegistered(usr)
    } if (this.state.transcript == null) {
      this.setState({transcriptFeedback: {class:"form-control is-invalid", message:"Upload a transcript"}})
    } if (this.state.paymentInfo == null) {
      this.setState({paymentFeedback: {class:"form-control is-invalid", message:"Upload payment info"}})
    }
  }

  getUpload(event){
    if (event.target.id === "transcript"){
        if (event.target.files.length > 0){
            this.setState({ transcript: URL.createObjectURL(event.target.files[0]) });
        } else {
            this.setState({ transcript: null});
        }
    } else if (event.target.id === "payment-info"){
        if (event.target.files.length > 0){
            this.setState({ paymentInfo: URL.createObjectURL(event.target.files[0]) });
        } else {
            this.setState({ paymentInfo: null });
        }
    }
}

  infoMessage(){
    if (this.props.user.type === "student"){
      return (
      <div class="row">
        <div class="col">
          <h3 class="text-center">You must register as a tutor to give help.</h3>
          <div class="alert alert-info">
            <h3>Becoming a tutor</h3>
            <p>Upload the following files to become a tutor (can be completed later)</p>
            <div class="form-group">
                <label class="control-label">Upload transcript (pdf):</label>
                <input type="file" class="form-control-file" id="transcript" accept=".pdf" onChange={this.getUpload.bind(this)}/>
                <div id="transcriptfeedback" class={this.state.transcriptFeedback.class}>{this.state.transcriptFeedback.message}</div>
            </div>
            <div class="form-group">
                <label class="control-label">Upload void check or direct deposit form (pdf):</label>
                <input type="file" class="form-control-file" id="payment-info" accept=".pdf" onChange={this.getUpload.bind(this)}/>
                <div id="paymentfeedback" class={this.state.paymentFeedback.class}>{this.state.paymentFeedback.message}</div>
            </div>
          </div>
          <input type="button" value="Register" id="register" class="btn btn-primary" onClick={this.handleSubmit.bind(this)} />
        </div>
      </div>
    )}
  }

  render() {
    return(
      <div><br/>
      <h1 class="text-center">Welcome, {this.props.user.name}! You are a {this.props.user.type}.</h1>
      <div class="container">
      <div class="row">
        <div class="col">
              <img src="learn.png" alt="Learn Icon"/>
              <h1>Learn.</h1>
              <b>Find Tutors for you courses at McMaster.</b><br/>
              
        </div>
        <div class="col">
          <img src="teach.png" alt="Teach Icon"/>
          <h1>Teach.</h1>
          <b>Help students with their courses at McMaster.</b><br/>
          <p>{this.props.user.type==="tutor" ? "Add couses you would like to be a tutor for on your profile page." : ""}</p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <Link to="/FindHelp"><input type="button" value="Find Help" id="gethelp" class="btn btn-secondary"/></Link>
        </div>
        <div class="col">
          <Link to="/UserProfile"><input type="button" value="Profile" id="givehelp" class="btn btn-secondary"/></Link>
        </div>
      </div>
      {this.infoMessage()}
      </div>
    </div>
    )
  }


}

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = { page: "welcome" };
    this.changeForm = this.changeForm.bind(this);
    this.setSignup = this.setSignup.bind(this);
    this.setLogin = this.setLogin.bind(this);
    this.userRegistered = this.userRegistered.bind(this);
    this.findHelp = this.findHelp.bind(this);
    this.giveHelp = this.giveHelp.bind(this);
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

  userRegistered(usr){
    this.props.userRegistered(usr);
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

  findHelp() {
    this.props.findHelp();
  }

  giveHelp() {
    this.props.giveHelp();
  }

  getComponent(){
    if (this.props.user != null){
      return <HomePage user={this.props.user} userRegistered={this.userRegistered} findHelp={this.findHelp} giveHelp={this.giveHelp}/>
    } else if (this.state.page==="welcome"){
      return <WelcomePage signup={this.setSignup} login={this.setLogin}/>
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