import {HashRouter as Router, Route, NavLink} from 'react-router-dom';
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


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {courses: []};
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
          <Route exact path="/" component={Home} />
          <Route path="/FindHelp" render={(props) => (<FindHelp {...props} courses={this.state.courses?? []} />)}/>
          <Route path="/GiveHelp" component={GiveHelp} />
        </Switch>

      </Router>
    );
  }
}

export default App;
