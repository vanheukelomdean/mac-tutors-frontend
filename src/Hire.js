import React from 'react';
import {Container, Row, Col,
        Form, Dropdown, Button, Alert} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

import users from './data/users';
import tutors from './data/tutors';

import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import 'rc-time-picker/assets/index.css';

class LoginForm extends React.Component {
    constructor(props){
        super(props);
        var name = this.props.location.query.search.replace(/\+/g, ' ');
        this.state = {
            student: this.props.user,
            tutor: tutors.filter(profile => profile.name.toLowerCase() == name)[0],
            course: null,
            date: null,
            start: null,
            end: null,
            startGTend: false,
            duration: null,
            notes: null,
            submit: false,
            success: false,
        };
    }

    dateChange(val, evt) {
        var today = new Date();
        if (val > today) {
            this.setState({
                date: val
            });
        } else {
            this.setState({
                date: null,
                dateFeedBack: "Date selection must be in the future."
            })
        }
    }

    startTimeChange(val) {
        this.setState({start: val});
        this.calcDuration();

    }

    endTimeChange(val) {
        this.setState({end: val});
        this.calcDuration();
    }

    calcDuration() {
        if (this.state.start != null && this.state.end != null) {
            if(this.state.end > this.state.start) {
                this.setState({duration:  moment.duration(this.state.end.diff(this.state.start)).asHours(),
                                startGTend: false,
                                endFeedBack: null});
                console.log(this.state.duration);

            } else {
                this.setState({duration: null,
                                startGTend: true,
                                endFeedBack: "End time must be greater than start time."});
            }
        }
    }

    handleSubmit(){
        console.log('submit');

        this.setState({submit: true});

        if (this.state.course == null) {
            this.state.courseFeedback = "Please select a course"
        }
        if (this.state.date == null) {
            this.state.dateFeedback = "Please select a date"
        }
        if (this.state.start == null) {
            this.state.startFeedback = "Please select a time to start the session"
        }
        if (this.state.end == null) {
            this.state.endFeedback = "Please select a time to end the session"
        }

        if (this.state.course != null &&
            this.state.date != null &&
            this.state.start != null &&
            this.state.end != null) {

            this.clearState();
            console.log("cleared");
            console.log(this.state);
        }
    }

    clearState() {
        this.setState({
            success: true,
            submit:false,
            course: null,
            date: null,
            start: null,
            end: null,
            notes: null
        });
    }

    render() {
        console.log(this.state);
        const showCourse = this.state.submit && this.state.course == null;
        const showDate = this.state.submit && this.state.date == null;
        const showStart = this.state.submit && this.state.start == null;
        const showEnd = (this.state.submit && this.state.end == null) || this.state.startGTend;

        return (
            <Container>
                <Row>
                    <Alert show={this.state.success} className="banner" variant="success"> Request Submitted!</Alert>
                </Row>
                <Row >
                    <h2 className="text-center">Book a tutoring session with {this.state.tutor.name}</h2>
                </Row>
                <Row>
                    <p>*Please Note: MacTutors chargest a standard $20.00/hour</p>
                </Row>
                <Form>
                    <Row>
                        <Col className="col-md-3">
                            <Form.Group className="required">
                                <Dropdown onSelect={(course) => this.setState({course: course})}>
                                    <Dropdown.Toggle id="course"> 
                                        {this.state.course?? "Select Course"} 
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {this.state.tutor.courses.map(course => 
                                            <Dropdown.Item eventKey={course.code}>{course.code}</Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Alert show={showCourse} variant="danger">{this.state.courseFeedback}</Alert>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="required">
                                <Form.Label for="date" className="control-label datetime-label">Date:</Form.Label>
                                <DatePicker className = "date" 
                                            id ="date"
                                            onChange={this.dateChange.bind(this)}
                                            placeholder = "Date"
                                            selected={this.state.date}
                                            value={this.state.date}/>
                                <Alert show={showDate} variant="danger">{this.state.dateFeedback}</Alert>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="required">
                                <Form.Label for="start-time" className="control-label datetime-label">Start Time:</Form.Label>
                                <TimePicker id="start-time"
                                            onChange={this.startTimeChange.bind(this)}
                                            use12Hours={true}
                                            value={this.state.start}  
                                            showSecond={false}
                                            minuteStep={30}/>
                                <Alert show={showStart} variant="danger">{this.state.startFeedback}</Alert>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="required">
                                <Form.Label for="end-time" className="control-label datetime-label">End Time:</Form.Label>
                                <TimePicker id="end-time"
                                            onChange={this.endTimeChange.bind(this)}
                                            use12Hours={true}
                                            value={this.state.end}
                                            showSecond={false}
                                            minuteStep={30}/>
                                <Alert show={showEnd} variant="danger">{this.state.endFeedback}</Alert>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Extra Notes</Form.Label>
                                <Form.Control as="textarea" 
                                            rows={3}
                                            onChange={event => this.setState({ notes: event.target.value })}
                                            value={this.state.notes} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>Session Cost: ${20 * (this.state.duration??0)}.00</p> 
                        </Col>
                            <Button className="hire-button"
                                        onClick={this.handleSubmit.bind(this)}>Submit</Button>

                    </Row>
                </Form>
            </Container>
        );
    }
  } export default LoginForm;