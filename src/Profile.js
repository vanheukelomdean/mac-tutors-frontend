import React from 'react';
import './App.css';
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import Select from 'react-select';
import {Courses} from './data/Courses.js';

class AddClasses extends React.Component {
  constructor(props){
    super(props);
    this.state = {  checkedCourses:[], transcriptFeedback: { class: "", message: ""}, paymentFeedback: { class: "", message: ""} };
  }

  handleSubmit() { 
    this.setState({transcriptFeedback: { class: "", message: ""}, paymentFeedback: { class: "", message: ""}});
    if (this.state.transcript != null && this.state.paymentInfo != null){
      this.props.userRegistered({email: this.props.user.email, password: this.props.user.password, name: this.props.user.name, picture: this.props.user.picture, type: "tutor"})
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

  flipcheck (evt) {
    console.log(evt);
    if (evt) {
      this.state.checkedCourses = evt.map(option => option.value);
    }
  }

  render() {
    if (this.props.user.type === "student"){
      return(
        <div class="col" colspan="2">
          <h3 class="text-center">You must register as a tutor to add classes.</h3>
          <div class="alert alert-info">
            <h3>Become a tutor</h3>
            <p>Upload the following files to become a tutor (can be completed later)</p>
            <div class="form-group">
                <label for="transcript" class="control-label">Upload transcript (pdf):</label>
                <input type="file" class="form-control-file" id="transcript" accept=".pdf" onChange={this.getUpload.bind(this)}/>
                <div id="transcriptfeedback" class={this.state.transcriptFeedback.class}>{this.state.transcriptFeedback.message}</div>
            </div>
            <div class="form-group">
                <label for="payment-info" class="control-label">Upload void check or direct deposit form (pdf):</label>
                <input type="file" class="form-control-file" id="payment-info" accept=".pdf" onChange={this.getUpload.bind(this)}/>
                <div id="paymentfeedback" class={this.state.paymentFeedback.class}>{this.state.paymentFeedback.message}</div>
            </div>
          </div>
          <input type="button" value="Register" id="register" class="btn btn-primary" onClick={this.handleSubmit.bind(this)} />
        </div>
      )
    } else {
      return(
        <Col className="text-center"> 
          <h3>Select Courses You Would Like to Be a Tutor For:</h3>
          <Select
            closeMenuOnSelect={false}
            isMulti
            options={Courses}
            onChange={this.flipcheck.bind(this)}
          />
        </Col>
      )   
    }
  }
}

class Profile extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Image src={this.props.user.picture} rounded/>
          </Col>
          <Col>
            <Row>
              <h1>{this.props.user.name}</h1>
            </Row>
            <Row><br/></Row>
            <Row>
              <p><b>Email: </b> {this.props.user.email}</p>
            </Row>
            <Row>
              <p><b>Profile Type: </b> {this.props.user.type}</p>
            </Row>
          </Col>
        </Row>
        <Row>
          <AddClasses user={this.props.user} userRegistered={this.props.userRegistered}/>
        </Row>
      </Container>
      );
  }
}

export default Profile;