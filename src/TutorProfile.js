import React from 'react';
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
import tutors from './data/tutors.json';
import './App.css';

class TutorProfile extends React.Component{
  constructor(props){
    super(props);
    this.state = tutors.filter(profile => profile.name == this.props.name)[0];
  }

  render() {
    return (
            <Container>
                <Row>
                    <Col className="col-md-8">
                        <h1>{this.state.name}</h1>
                        <h2>{this.state.program}</h2>
                        <p>{this.state.description}</p>
                    </Col>

                    <Col className="col-md-4">
                        <Row>
                            <img src={`./images/${this.state.image}`} className="avatar"/>
                        </Row>
                        <Row>
                            <Button className="hire-button"> Hire</Button>
                        </Row>
                    </Col>
                </Row>

                <hr/>

                <Row>
                    {this.state.courses.map(({name, code, grade}) => 
                        <Col>
                            <Card className="course-card">
                                <Card.Title className="course-name">{name}</Card.Title>
                                <Card.Subtitle className="course-code">{code}</Card.Subtitle>
                                <Card.Body className="course-grade"><p className="grade">{grade} </p></Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>

                <hr/>

                {this.state.reviews.map(({text, rating, student}) => 
                    <Row>
                        <Col clasName="col-md-8">
                            <Row>
                                <p>{text}</p>
                            </Row>
                            <Row>
                                <p>{rating}</p>
                            </Row>
                        </Col>
                        <Col clasName="col-md-4">
                            <Row>
                                <Image src={`./images/${student.image}`} className="avatar-sm"/>
                                <p> {student.name + ", " + student.program}</p>
                            </Row>
                        </Col>
                    </Row>
                )}
            </Container>
      );
  }
}

export default TutorProfile;