import React from 'react';
import {Link} from 'react-router-dom';
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import './App.css';

class TutorCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {name: this.props.tutor.name, 
                    program: this.props.tutor.program, 
                    image: this.props.tutor.image, 
                    level: this.props.tutor.level,
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
                            <Image src={`./images/${this.state.image}`} className={`avatar-card avatar-${this.state.level}`} />
                        </Row>
                        <Link to={{ pathname: "profile",
                                    query:{search: this.state.name.replace(/\s+/g, '+').toLowerCase()} }}> 
                            <Button className="view-button"> View Profile</Button>
                        </Link>
                    </Col>
                    <Col className="col-md-6">
                        <Row>
                            <h1>{this.state.name}</h1>
                        </Row>
                        <Row>
                            <h2>{this.state.program}</h2>
                        </Row>

                            <Link to={{ pathname: "hire",
                                        query:{search: this.state.name.replace(/\s+/g, '+').toLowerCase()}}}> 
                                <Button className="hire-button"> Hire</Button>
                            </Link>
                    </Col>
                    <Col className="col-md-3 text-center">
                        <Row>
                            <h1 className='tutor-listing-grade'>{this.state.grade}</h1>
                        </Row>
                        <Row className>
                            <StarRatings rating={this.state.rating}
                                        starRatedColor="gold"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="30px"
                                        starSpacing="5px"/>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Card>
      );
  }
}

export default TutorCard;