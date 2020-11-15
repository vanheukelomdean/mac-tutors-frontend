import React from 'react';
import './App.css';
import mcmasterPrograms from "./data/mcmasterPrograms";

class SignupForm extends React.Component {
    constructor(props){
        super(props);
        
        this.state = { 
            name: "", nameFeedback: {class: "", message: "", valid: false}, 
            pwd1: "", pwd1Feedback: {class: "", message: "", valid: false}, 
            pwd2: "", pwd2Feedback: {class: "", message: "", valid: false},
            email: "", emailFeedback: {class: "", message: "", valid: false},
            program: "",
            programFeedback: {class: "", message: "", valid: false},
            profilePicture: "no-profile.png",
            profilePictureFeedback: {class: "", message: "", valid: false},
            transcript: null,
            paymentInfo: null,
            overallFeedback: {class: "", message: ""}
        };


    }
    
    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    inputStateChange(event){
      if (event.target.id==="usr"){
        var usrFeedback = this.state.nameFeedback;
  
        if (event.target.value.length > 0){
            usrFeedback.class = "form-control is-valid";
            usrFeedback.message = "Name is OK";
            usrFeedback.valid = true;
        } else {
            usrFeedback.class = "form-control is-invalid";
            usrFeedback.message = "Please Enter Your Name";
            usrFeedback.valid = false;
        } 
  
        this.setState({
          name: event.target.value,
          nameFeedback: usrFeedback
        });
      }
  
      else if (event.target.id === "pwd"){
        var usrFeedback = this.state.pwd1Feedback;
  
        if (event.target.value.length > 8){
            usrFeedback.class = "form-control is-valid";
            usrFeedback.message = "Password is OK";
            usrFeedback.valid = true;
        } else {
            usrFeedback.class = "form-control is-invalid";
            usrFeedback.message = "Password must be atleast 8 characters";
            usrFeedback.valid = false;
        } 
        
        if (this.state.pwd2.length > 0){
            if (event.target.value !== this.state.pwd2){
                this.setState({pwd2Feedback: {message: "Passwords do not match!", class: "form-control is-invalid", valid: false}});
            }
            else {
                this.setState({pwd2Feedback: {message: "Passwords Match", class: "form-control is-valid", valid: true}});
            }
        }

        this.setState({
          pwd1: event.target.value,
          pwd1Feedback: usrFeedback
        });
      }
  
      else if (event.target.id === "confirm-pwd"){
        var usrFeedback = this.state.pwd2Feedback;
  
        if (event.target.value === this.state.pwd1){
            usrFeedback.class = "form-control is-valid";
            usrFeedback.message = "Passwords Match";
            usrFeedback.valid = true;
        } else {
            usrFeedback.class = "form-control is-invalid";
            usrFeedback.message = "Passwords do not match!";
            usrFeedback.valid = false;
        }
  
        this.setState({
          pwd2: event.target.value,
          pwd2Feedback: usrFeedback
        });
      }
  
      else if (event.target.id === "email"){
        var usrFeedback = this.state.emailFeedback;
        var validEmail = this.validateEmail(event.target.value);

        
        usrFeedback.class = (validEmail) ? "form-control is-valid" : "form-control is-invalid";
        usrFeedback.message = (validEmail) ? "Email is OK" : "Please enter a valid Email";
        usrFeedback.valid = validEmail;
  
        this.setState({
          email: event.target.value,
          emailFeedback: usrFeedback
        });
      }
    }

    getUpload(event){
        if (event.target.id === "profile-pic"){
            if (event.target.files.length > 0){
                this.setState({ 
                    profilePicture: URL.createObjectURL(event.target.files[0]),
                    profilePictureFeedback: {class: "", message: "", valid: true}
                });
            } else {
                this.setState({ 
                    profilePicture: "no-profile.png",
                    profilePictureFeedback: {class: "", message: "", valid: false}
                });
            }
        } else if (event.target.id === "transcript"){
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
  
    handleSubmit(){

        if (this.state.nameFeedback.valid&&this.state.pwd1Feedback.valid&&this.state.pwd2Feedback.valid&&this.state.emailFeedback.valid&&this.state.programFeedback.valid&&this.state.profilePictureFeedback.valid){
            this.props.userRegistered({email: this.state.email, password: this.state.password, name: this.state.name, picture: this.state.profilePicture, program: this.state.program, type: (this.state.transcript != null && this.state.paymentInfo != null) ? "tutor" : "student"});
        } else {
            if (this.state.name.length===0){
                this.setState({nameFeedback: {class:"form-control is-invalid", message: "Enter name"}});
            } if (this.state.pwd1.length===0){
                this.setState({pwd1Feedback: {class:"form-control is-invalid", message: "Enter a password"}});
            } if (this.state.pwd2.length===0){
                this.setState({pwd2Feedback: {class:"form-control is-invalid", message: "Confirm password"}});
            } if (this.state.email.length===0){
                this.setState({emailFeedback: {class:"form-control is-invalid",message: "Enter a valid email"}});
            } if (!this.state.profilePictureFeedback.valid){
                this.setState({profilePictureFeedback: {class:"form-control is-invalid", message: "Upload a profile picture"}});
            } if (!this.state.programFeedback.valid){
                this.setState({programFeedback: {class:"form-control is-invalid", message: "Choose a program"}});
            }
            this.setState({overallFeedback: {class:"form-control is-invalid", message: "Please fix errors with the form"}});
            setTimeout(function() {
                this.setState({overallFeedback: {class:"", message: ""}});
            }.bind(this), 2500);
        }
    }

    handleProgramInput(event){
        this.setState({
            program: event.target.value,
            programFeedback: {class:"", message: "", valid: true}
        });
    }

    resetProgram(event){
        this.setState({
            program: "",
            programFeedback: {class: "", message: "", valid: false}
        });
    }

    render() {
      return (
          <div class="container">
            <br/>
            <h1 class="text-center">Sign Up</h1>
            <form>
                <div class="form-group required">
                    <label for="usr" class="control-label">Name:</label>
                    <input type="text" class="form-control" id="usr" value={this.state.name} onChange={this.inputStateChange.bind(this)}/>
                    <div id="usrfeedback" class={this.state.nameFeedback.class}>{this.state.nameFeedback.message}</div>
                </div>
                <div class="form-group required">
                    <label for="pwd" class="control-label">Password:</label>
                    <input type="password" class="form-control" id="pwd" value={this.state.pwd1} onChange={this.inputStateChange.bind(this)}/>
                    <div id="usrfeedback" class={this.state.pwd1Feedback.class}>{this.state.pwd1Feedback.message}</div>
                </div>
                <div class="form-group required">
                    <label for="confirm-pwd" class="control-label">Confirm Password:</label>
                    <input type="password" class="form-control" id="confirm-pwd" value={this.state.pwd2} onChange={this.inputStateChange.bind(this)}/>
                    <div id="pwdfeedback" class={this.state.pwd2Feedback.class}>{this.state.pwd2Feedback.message}</div>
                </div>
                <div class="form-group required">
                    <label for="email" class="control-label">Email:</label>
                    <input type="text" class="form-control" id="email" value={this.state.email} onChange={this.inputStateChange.bind(this)}/>
                    <div id="emailfeedback" class={this.state.emailFeedback.class}>{this.state.emailFeedback.message}</div>
                </div>
                <div class="form-group required">
                    <label for="program" class="control-label">Program:</label><br/>
                    <input list="programs" id="programList" class="program-input" onChange={this.handleProgramInput.bind(this)} value={this.state.program}/>
                    <datalist id="programs">
                        {mcmasterPrograms.map( 
                            (data) => 
                                <option value={data}/>
                            )}
                    </datalist>
                    <input type="button" value="Clear" id="clearProgram" class="btn btn-secondary" disabled={!this.state.programFeedback.valid} onClick={this.resetProgram.bind(this)}/>
                    <div id="programfeedback" class={this.state.programFeedback.class}>{this.state.programFeedback.message}</div>
                </div>
                <div class="form-group required">
                    <label for="profilePicture" class="control-label">Profile Picture (jpeg, jpg, png):</label><br/>
                    <img src={this.state.profilePicture} alt="Profile Picture" class="image"/><br/>
                    <input type="file" class="form-control-file" id="profile-pic" accept=".jpeg,.png,.jpg" onChange={this.getUpload.bind(this)}/><br/>
                    <div id="picturefeedback" class={this.state.profilePictureFeedback.class}>{this.state.profilePictureFeedback.message}</div>
                </div>
                
                <div class="alert alert-info">
                    <h3>Becoming a tutor</h3>
                    <p>Upload the following files to become a tutor (can be completed later)</p>
                    <div class="form-group">
                        <label for="transcript" class="control-label">Upload transcript (pdf):</label>
                        <input type="file" class="form-control-file" id="transcript" accept=".pdf" onChange={this.getUpload.bind(this)}/>
                        <div id="transcriptfeedback" class="invalid-feedback"> </div>
                    </div>
                    <div class="form-group">
                        <label for="payment-info" class="control-label">Upload void check or direct deposit form (pdf):</label>
                        <input type="file" class="form-control-file" id="payment-info" accept=".pdf" onChange={this.getUpload.bind(this)}/>
                        <div id="paymentfeedback" class="invalid-feedback"> </div>
                    </div>
                </div>
                <input type="button" value="Sign up" id="signup" class="btn btn-primary" onClick={this.handleSubmit.bind(this)} />
                <input type="button" class="link btn-link" value="Login" id="login" onClick={this.props.changeForm}/>
                <div id="submitfeedback" class={this.state.overallFeedback.class}>{this.state.overallFeedback.message}</div>
            </form>
        </div>
      );
    }
} export default SignupForm;
  