import {HashRouter as Router, Route, NavLink, Redirect} from 'react-router-dom';
import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Form, FormControl} from 'react-bootstrap'
import Home from './Home';
import FindHelp from './FindHelp';
import GiveHelp from './GiveHelp';
import './App.css';
import { Button} from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
import { courses } from './data/mcmasterCourses.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {courses: [], user : null};
    this.userRegistered = this.userRegistered.bind(this);
    this.findHelp = this.findHelp.bind(this);
    this.giveHelp = this.giveHelp.bind(this);
  }

  userRegistered(usr){
    this.setState({
      user : usr
    });
  }

  findHelp(){
    <Redirect to='/FindHelp'/>
  }

  giveHelp(){
    <Redirect to='/GiveHelp'/>
  }
  
  render() {
    return (

      <Router>

        <Navbar expand="lg">
          <Navbar.Brand>MacTutors</Navbar.Brand>
          <NavLink exact to="/"><i class="fa fa-home"></i></NavLink>
          <NavLink to="/FindHelp">Find Help</NavLink>
          <NavLink to="/GiveHelp">Give Help</NavLink>
          <a class="hamburger" id="hamburger">
            <FontAwesomeIcon icon="bars" size="2x"/>
          </a>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light"><FontAwesomeIcon icon="search" size="2x"/></Button>
          </Form>
        </Navbar>
        
        <Switch>
          <Route exact path="/" render={(props) => (<Home {...props} userRegistered={this.userRegistered} user={this.state.user} findHelp={this.findHelp} giveHelp={this.giveHelp}/>)} />
          <Route path="/FindHelp" render={(props) => (this.state.user != null ? <FindHelp {...props} courses={this.state.courses?? []} /> : <Redirect to='/' />)}/>
          <Route path="/GiveHelp" render={(props) => (this.state.user != null ? <GiveHelp/> : <Redirect to='/' />)}/>
        </Switch>

      </Router>
    );
  }
}

export default App;
