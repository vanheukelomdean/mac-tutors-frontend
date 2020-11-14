import React from 'react';

import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import './App.css';

class TutorCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {name: this.props.tutor.name, 
                    program: this.props.tutor.program, 
                    image: this.props.tutor.image, 
                    rating: this.props.tutor.rating,
                    grade: this.props.grade};
  }

  render() {
    return (
        <Card className="tutor-listing">
            <Container>
                <Row>
                    <Col className="col-md-3">
                        <Row>
                            <Image src={`./images/${this.state.image}`} className='avatar-card' />
                        </Row>
                        <Row>
                            <Button className="view-button"> View Profile</Button>
                        </Row>
                    </Col>
                    <Col className="col-md-6">
                        <Row>
                            <h1>{this.state.name}</h1>
                        </Row>
                        <Row>
                            <h2>{this.state.program}</h2>
                        </Row>
                        <Row>
                            <Button className="hire-button" > Hire</Button>
                        </Row>
                    </Col>
                    <Col className="col-md-3 text-center">
                        <Row>
                            <h1 className='tutor-listing-grade'>{this.state.grade}</h1>
                        </Row>
                        <Row className>
                            <StarRatings
                                    rating={this.state.rating}
                                    starRatedColor="gold"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="30px"
                                    starSpacing="5px"
                                />
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Card>
      );
  }
}

export default TutorCard;