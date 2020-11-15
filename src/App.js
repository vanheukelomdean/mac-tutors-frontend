import React from 'react';
import {HashRouter as Router, Route, Link, NavLink, Redirect} from 'react-router-dom';
import Switch from 'react-bootstrap/esm/Switch';
import {Navbar, Nav} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faBell, faBars, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {Form, FormControl} from 'react-bootstrap'
import Home from './Home';
import Info from './Info';
import FindHelp from './FindHelp';
import Profile from './Profile';
import Requests from './Requests';
import Hire from './Hire'
import TutorProfile from './TutorProfile';
import SearchTutors from './SearchTutors';
import tutors from './data/tutors';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user : null, search: "", results: []};
    this.userRegistered = this.userRegistered.bind(this);
    this.addCourses = this.addCourses.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  addCourses(courses){
    var usr = this.state.user;
    usr.courses = Array.from(new Set([...usr.courses, ...courses]));
    this.setState({user: usr});
  }

  deleteCourse(course){
    var usr = this.state.user;
    usr.courses = usr.courses.filter(x => x !== course);
    this.setState({user: usr});
  }

  userRegistered(usr){
    this.setState({
      user : usr
    });
  }

  handleSearchInput(event) {
    var res = tutors.filter(x => x.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()));
    this.setState({
      search: event.target.value,
      results: res
    });
  }

  render() {
    return (
      <Router>
        <Navbar expand="lg">
          <Navbar.Brand ><p className="brand"> MacTutors</p></Navbar.Brand>
          <NavLink to="/Home">
            <FontAwesomeIcon icon={faHome} size="2x"/>
          </NavLink>
          <NavLink to="/FindHelp">Find Help</NavLink>
          
          <Form inline>
              <FormControl type="text" placeholder="Search Tutors" className="mr-sm-2" value={this.state.search} onChange={this.handleSearchInput.bind(this)}/>
              <NavLink to= "/SearchTutors"><FontAwesomeIcon icon={faSearch} size="2x"/></NavLink>
          </Form>
          
          <NavLink to="/Requests">
            <FontAwesomeIcon icon={faBell} size="2x"/>
          </NavLink>
          <NavLink to="/UserProfile">
            <FontAwesomeIcon icon={faUserCircle} size="2x"/>
          </NavLink>
        </Navbar>
        
        <Switch>
          <Route exact path="/Home" render={(props) => (<Home {...props} userRegistered={this.userRegistered} user={this.state.user} findHelp={this.findHelp} giveHelp={this.giveHelp}/>)} />
          <Route path="/FindHelp" render={(props) => (this.state.user != null ? <FindHelp {...props} courses={ ["2C03", "4HC3", "3A04"]} /> : <Redirect to='/Info' />)}/>
          <Route path="/UserProfile" render={(props) => (this.state.user != null ? <Profile {...props} deleteCourse={this.deleteCourse} addCourses={this.addCourses} user={this.state.user} userRegistered={this.userRegistered}/> : <Redirect to='/Info'/>)}/>
          <Route path="/Requests" render={(props) => (this.state.user != null ? <Requests {...props} user={this.state.user} userRegistered={this.userRegistered}/> : <Redirect to='/Info'/>)}/>
          <Route path="/Info" component={Info}/>
          <Route path="/SearchTutors" render={(props) => (this.state.user != null ? <SearchTutors {...props} search={this.state.search} results={this.state.results}/> : <Redirect to='/Info'/>)}/>
          <Route path="/profile" render={(props) => (<TutorProfile {...props}/>)}/>
          <Route path="/hire" render={(props) => (<Hire {...props} user={this.state.user} />)}/>
        </Switch>

      </Router>
    );
  }
}

export default App;
