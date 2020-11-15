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
      var usr = this.props.user;
      usr.type = "tutor";
      this.props.userRegistered(usr);
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
    if (evt && evt.length==0){
      this.setState({checkedCourses : []});
    }
  }

  addCourses(){
    this.props.addCourses(this.state.checkedCourses);
  }

  render() {
    if (this.props.user.type === "student"){
      return(
        <div class="col" colSpan="2">
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
        <Container>
          <Select
            closeMenuOnSelect={false}
            isMulti
            options={Courses}
            onChange={this.flipcheck.bind(this)}
          />
          <Button onClick={this.addCourses.bind(this)}>Add</Button>
        </Container>
          
      )   
    }
  }
}

class Profile extends React.Component{
  constructor(props){
    super(props);
  }

  logout(){
    this.props.userRegistered(null);
  }

  deleteCourse(event){
    this.props.deleteCourse(event.target.id);
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
              <p><b>Program: </b> {this.props.user.program}</p>
            </Row>
            <Row>
              <p><b>Profile Type: </b> {this.props.user.type}</p>
            </Row>
            <Button onClick={this.logout.bind(this)}>Logout</Button>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h3 class="text-center">Courses you are a tutor for:</h3>
            <Row>
              {(this.props.user.courses.length==0) ? "No Courses Added." : this.props.user.courses.map((course) =>
              <Card style={{ width: '14rem' }}>
                <Card.Body>
                  <Card.Text>
                    <span class="bg-light">{course}</span>
                  </Card.Text>
                  <Button id={course} onClick={this.deleteCourse.bind(this)}>Delete</Button>
                </Card.Body>               
              </Card> 
            )}
            </Row><br/>
            <h3>Add courses you would like to tutor:</h3><br/>
            <AddClasses deleteCourse={this.props.deleteCourse} addCourses={this.props.addCourses} user={this.props.user} userRegistered={this.props.userRegistered}/><br/>
          </Col>
          
        </Row>
      </Container>
      );
  }
}

export default Profile;
