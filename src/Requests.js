import React from 'react';
import './App.css';
import requests from './data/requests.json';
import { Alert, Button, Table, Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Requests extends React.Component{
  constructor(props){
    super(props);
    this.state = { accept: null };
    this.getResponse.bind(this);
  }

  getResponse(){
    if (this.state.accept == null){
      return (
        <td>
          <Button onClick={this.accept.bind(this)}>Accept</Button><br/><br/>
          <Button onClick={this.decline.bind(this)}>Decline</Button>
        </td>
      )
    } else if (this.state.accept){
      return <Alert variant="success"> Accepted</Alert>
    } else {
      return <Alert variant="danger"> Declined</Alert>
    }
  }

  accept(){
    this.setState({accept: true});
  }

  decline(){
    this.setState({accept: false});
  }

  render() {
    if (this.props.user.type === "student") {
      return (
        <div class="text-center"><br/>
            <h1>You must become a tutor before you can view this page.</h1>
            <Link to="/Home"><input type="button" value="Home" id="home" class="btn btn-secondary"/></Link>
        </div>
      );
    } else {
      return (
      <Container>
        <h1>Requests:</h1><br/>
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
            {requests.map( 
            ({id,name,picture,email,course,date}) => 
              <tr key={id}>
                <td><img src={picture} alt="{name}" /></td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{course.type} {course.code} - {course.description}</td>
                <td>{date}</td>
                {this.getResponse()}
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
      
      );
    }
    
  }
}

export default Requests;