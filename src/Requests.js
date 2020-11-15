import React from 'react';
import './App.css';
import studentRequests from './data/studentRequests';
import tutorRequests from './data/tutorRequests';
import { Alert, Button, Table, Container, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Response extends React.Component {
  constructor(props){
    super(props);
    this.state = { accept: null };
  }

  accept(){
    this.setState({accept: true});
  }

  decline(){
    this.setState({accept: false});
  }

  render() {
    if (this.state.accept == null){
      return (
        <td>
          <Button onClick={this.accept.bind(this)}>Accept</Button><br/><br/>
          <Button onClick={this.decline.bind(this)}>Decline</Button>
        </td>
      )
    } else if (this.state.accept){
      return <td><Alert variant="success"> Accepted</Alert></td>
    } else {
      return <td><Alert variant="danger"> Declined</Alert></td>
    }
  }
}

class StudentRequests extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    var relevantRequests = studentRequests.filter(req => req.tutor_email === this.props.user.email);
    if (this.props.user.type === "student") {
      return (
        <Col><br/>
            <h1>Requests from Students:</h1><br/>
            <b>You must become a tutor before you can receive requests from students.</b><br/>
            <Link to="/UserProfile"><input type="button" value="Profile" id="profile" class="btn btn-secondary"/></Link>
        </Col>
      );
    } else if (relevantRequests.length == 0) {
      return(
        <Col className="text-center">
          <h1>Requests from Students:</h1><br/>
          <b>You have no requests from students at this time.</b>
        </Col>
      );  
    } else {
      return (
      <Col>
        <h1>Requests from Students:</h1><br/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Date</th>
            <th>Response</th>
          </tr>
          </thead>
          <tbody>
            {relevantRequests.map( 
            ({id,name,picture,email,course,date}) => 
              <tr key={id}>
                <td><img src={picture} alt="{name}" /></td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{course.type} {course.code} - {course.description}</td>
                <td>{date}</td>
                <Response/>
              </tr>
            )}
          </tbody>
        </Table>
      </Col>
    )}
  }
}

class TutorRequests extends React.Component{
  constructor(props){
    super(props);
  }

  getResponse(state){
    if (state === "accept"){
      return <Alert variant="success"> Accepted</Alert>
    } else if (state === "decline") {
      return <Alert variant="danger"> Declined</Alert>
    } else if (state === "pending") {
      return <Alert variant="dark"> Pending</Alert>
    }
  }

  render() {
    var relevantRequests = tutorRequests.filter(req => req.student_email === this.props.user.email)
    if (relevantRequests.length == 0) {
      return (
        <Col><br/>
            <h1>Requests for Tutors:</h1><br/>
            <b>You currently have no active requests for tutors at this time.</b>
            <p>You can request tutors from the Find Help page.</p>
            <Link to="/FindHelp"><input type="button" value="Find Help" id="findhelp" class="btn btn-secondary"/></Link>
        </Col>
      );
    } else {
      return (
      <Col>
        <h1>Requests for Tutors:</h1><br/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Date</th>
            <th>Response</th>
          </tr>
          </thead>
          <tbody>
            {relevantRequests.map( 
            ({id,name,picture,email,course,date,state}) => 
              <tr key={id}>
                <td><img src={picture} alt="{name}" /></td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{course.type} {course.code} - {course.description}</td>
                <td>{date}</td>
                <td>{this.getResponse(state)}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Col>
      
      );
    }
    
  }
}

class Requests extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    return(
      <Container>
        <Row>
          <StudentRequests user={this.props.user}/>
        </Row>
        <Row>
          <TutorRequests user={this.props.user}/>
        </Row>
      </Container>
      
    );
  }
} export default Requests;