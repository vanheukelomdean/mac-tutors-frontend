import React from 'react';
import { Row, Container, Col,
        Form} from 'react-bootstrap';
import mytutors from './data/tutors.json';
import TutorCard from './TutorCard.js';
import './App.css';
import { faAssistiveListeningSystems } from '@fortawesome/free-solid-svg-icons';

class FindHelp extends React.Component{
  constructor(props){
    super(props);
    this.state = {courseCodes: this.props.courses,
                    mask: Array(this.props.courses.length).fill(false)};

    var checkedCourses = this.state.courseCodes.filter((cc, index) => this.state.mask[index]);
    this.state.tutors = mytutors.filter(tutor => this.getCodes(tutor, checkedCourses));
  }

  getCodes (tutor, filter_cc) {
    var tutor_codes = tutor.courses.map(course => course.code);
    return filter_cc.filter(code => tutor_codes.includes(code)).length > 0;
  }

  getGrades(tutor) {
    var avg = 0;
    var checkedCourses = this.state.courseCodes.filter((cc, index) => this.state.mask[index]);
    var takingCourses = tutor.courses.filter(c =>checkedCourses.includes(c.code));
    for( var i = 0; i < takingCourses.length; i++ )
        avg += takingCourses[i].grade;
    return takingCourses.length? avg/takingCourses.length: 0;
  }

  flipcheck (evt) {
      var checkId = parseInt(evt.target.id)
      checkId = isNaN(checkId)? 0: checkId;
      this.state.mask[checkId] = !this.state.mask[checkId];

      var checkedCourses = this.state.courseCodes.filter((cc, index) => this.state.mask[index]);

      this.setState({tutors: mytutors.filter(tutor => this.getCodes(tutor, checkedCourses))});
  }

  render() {
    console.log(this.state.tutors)
    return (

        <Container>
          <Col className="text-center"> 
            <Form>
              <Form.Label>Course Filter</Form.Label>
              {this.state.courseCodes.map((courseCode, index) =>
                  <Form.Check>
                      <Form.Check.Input type="checkbox" 
                          id = {index}
                          onChange={this.flipcheck.bind(this)} />
                      <Form.Check.Label>{courseCode}</Form.Check.Label>
                  </Form.Check>
              )}
            </Form> 
          </Col>
          {this.state.tutors.map((tutor) =>
            <Row>
              <TutorCard tutor={tutor} grade={this.getGrades(tutor)}/>
            </Row>
          )}
        </Container>
      );
  }
}

export default FindHelp;