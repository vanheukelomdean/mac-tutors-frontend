import React from 'react';
import './App.css';
import requests from './data/requests.json';
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';

class GiveHelp extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Container>
        <Row>
              <Col>Profile Picture</Col>
              <Col>Name</Col>
              <Col>Email</Col>
              <Col>Course</Col>
              <Col>Date</Col>
              <Col>Response</Col>
          </Row>
              {requests.map( 
              ({id,name,picture,email,course,date}) => 
                <Row key={id}>
                  <Col><img src={picture} alt="{name}" /></Col>
                  <Col>{name}</Col>
                  <Col>{email}</Col>
                  <Col>{course.code} - {course.description}</Col>
                  <Col>{date}</Col>
                  <Col><Button></Button></Col>
                </Row>
              )}
      </Container>
      );
  }
}

export default GiveHelp;