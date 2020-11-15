import React from 'react';
import {Link} from 'react-router-dom';
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import tutors from './data/tutors';
import './App.css';

class TutorProfile extends React.Component{
  constructor(props){
    super(props);
    var name = this.props.location.query.search.replace(/\+/g, ' ');
    this.state = tutors.filter(profile => profile.name.toLowerCase() == name)[0];
  }

  render() {
    return (
        <Container>
            <Row>
                <Col className="col-md-8">
                    <h1>{this.state.name}</h1>
                    <h2>{this.state.program}</h2> 
                    <p>{this.state.description}</p>
                    <Link to={{ pathname: "hire",
                                query:{search: this.state.name.replace(/\s+/g, '+').toLowerCase()}}}> 
                        <Button className="hire-button"> Hire</Button>
                    </Link>
                </Col>
                <Col className="col-md-4">
                    <Row>
                        <img src={`./images/${this.state.image}`} className={`avatar-card avatar-${this.state.level}`} />
                    </Row>
                    <Row>
                        <StarRatings rating={this.state.rating}
                                        starRatedColor="gold"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="30px"
                                        starSpacing="5px" />
                    </Row>
                </Col>
            </Row>

            <hr/>

            <Row>
                {this.state.courses.map(({name, code, grade}) => 
                    <Col>
                        <Card className="course-card">
                            <Card.Title>
                                <p className="course-name">
                                    {name} 
                                </p>
                            </Card.Title>
                            <Card.Subtitle>
                                <p className="course-code">
                                    {code}
                                </p>
                                </Card.Subtitle>
                            <Card.Body>
                                <p className="course-grade">
                                    {grade} 
                                </p>
                            </Card.Body>
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
                            <StarRatings rating={this.state.rating}
                                        starRatedColor="gold"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="20px"
                                        starSpacing="3px" />
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
