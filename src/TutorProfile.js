import React from 'react';
import {Link} from 'react-router-dom';
import { Container, Row, Col, Button, Image, Card, Form} from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import tutors from './data/tutors';
import './App.css';

class TutorProfile extends React.Component{
  constructor(props){
    super(props);
    var name = this.props.location.query.search.replace(/\+/g, ' ');
    this.state = tutors.filter(profile => profile.name.toLowerCase() == name)[0];
    this.state.student = this.props.user;
    this.state.newRating = 0;
    this.state.newReview = "";
  }

  addReview(){
      this.setState({
        reviews: [...this.state.reviews,
                    {text: this.state.newReview,
                    rating: this.state.newRating,
                    student:    {name: this.state.student.name,
                                program: this.state.student.program,
                                image: this.state.student.image}}
                ],
        newRating: 0,
        newReview: ""
      });
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
                <Card className="review-card">
                    <Row>
                        <Col className="col-md-4 card-col">
                            <p>{text}</p>
                        </Col>
                        <Col className="col-md-3 card-col">
                            <StarRatings rating={rating}
                                        starRatedColor="gold"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="20px"
                                        starSpacing="3px" />
                        </Col>
                        <Col className="col-md-1 card-col">
                            <Image src={`./images/${student.image}`} className="avatar-sm"/>
                        </Col>
                        <Col className="col-md-3 card-col">
                                <p> {student.name + ", " + student.program}</p>
                        </Col>
                    </Row>
                </Card>
            </Row>
            )}
            <Row>
                <Col className="col-md-6">
                    <Form.Group>
                        <Form.Control as="textarea" 
                                    rows={2}
                                    onChange={event => this.setState({ newReview: event.target.value })}
                                    value={this.state.newReview} />
                    </Form.Group>
                </Col>
                <Col className="col-md-3">
                    <StarRatings rating={this.state.newRating}
                                    starRatedColor="gold"
                                    numberOfStars={5}
                                    name='rating'
                                    starHoverColor="gold"
                                    changeRating={newRating => this.setState({newRating: newRating})}
                                    starDimension="20px"
                                    starSpacing="3px" />
                </Col>
                <Col className="col-md-3">
                    <Button onClick={this.addReview.bind(this)}> Leave Review </Button>
                </Col>
            </Row>
        </Container>
      );
  }
}

export default TutorProfile;
