import React from 'react';
import { Button, Row, Container, Form, Col, Image} from 'react-bootstrap';
import './App.css';

class FindHelp extends React.Component{
  constructor(props){
    super(props);
    this.state = {mask: [true] * 6};
  }

  render(props) {
    return (
      <Container> 
        <Row> 
          <Form>
            <Form.Label>Priority</Form.Label>
            {this.props.courses.map((course, index) =>
                <Form.Check>
                    <Form.Check.Input type="checkbox" 
                        id = {index?? 0}
                        checked={this.state.mask[index]}
                        onChange={this.flipcheck.bind(this)} />
                    <Form.Check.Label>{course}</Form.Check.Label>
                </Form.Check>
            )}
          </Form> 
        </Row>
        {this.props.tutors.map(({name, program, image, grade}) =>
          <Row>
            <Col>
              <Image src={image} roundedCircle />
            </Col>
            <Col>
              <Row>
                <h2> {name} </h2>
              </Row>
              <Row>
                <Button> Hire </Button>
              </Row>
              <Row>
                <h4> {program} </h4>
              </Row>
            </Col>
            <Col>
              <Image src={image} roundedCircle />
          </Col>
          </Row>
        )}
      </Container>
      );
  }
}

export default FindHelp;