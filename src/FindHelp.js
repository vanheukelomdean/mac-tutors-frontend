import React from 'react';
import { Row, Container, Col,
        Form} from 'react-bootstrap';
import mytutors from './data/tutors.json';
import TutorCard from './TutorCard.js';
import './App.css';
import Select from 'react-select';
import {Courses} from './data/Courses.js';

class FindHelp extends React.Component{
  constructor(props){
    super(props);
    this.state = {student: this.props.user,
                  courseCodes: this.props.courses,
                  checkedCourses:[]};
    this.state.tutors = mytutors.filter(tutor => this.getCodes(tutor));
  }

  getCodes (tutor) {
    var tutor_codes = tutor.courses.map(course => course.code);
    return this.state.checkedCourses.filter(code => tutor_codes.includes(code)).length > 0;
  }

  getGrades(tutor) {
    var avg = 0;
    var takingCourses = tutor.courses.filter(c => this.state.checkedCourses.includes(c.code));
    for( var i = 0; i < takingCourses.length; i++ )
        avg += takingCourses[i].grade;
    return takingCourses.length? avg/takingCourses.length: 0;
  }

  flipcheck (evt) {
      if (evt) {
        this.state.checkedCourses = evt.map(option => option.value);
        this.setState({tutors: mytutors.filter(tutor => this.getCodes(tutor))});
      }
  }

  render() {
    return (
      <Container>
        <Col className="text-center"> 
          <h3>Select Courses</h3>
          <Select
            closeMenuOnSelect={false}
            isMulti
            options={Courses}
            onChange={this.flipcheck.bind(this)}
          />
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