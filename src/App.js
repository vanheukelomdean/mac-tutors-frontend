import {HashRouter as Router, Route, NavLink} from 'react-router-dom';
import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faBell, faBars} from '@fortawesome/free-solid-svg-icons';
import {Form, FormControl} from 'react-bootstrap'
import Home from './Home';
import FindHelp from './FindHelp';
import GiveHelp from './GiveHelp';
import TutorProfile from './TutorProfile';
import './App.css';
import { Button} from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';


class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Router>
        <Navbar expand="lg">
          <Navbar.Brand className="brand">MacTutors</Navbar.Brand>
          <NavLink to="/Home">
            <FontAwesomeIcon icon={faHome} size="2x"/>
          </NavLink>
          <NavLink to="/FindHelp">Find Help</NavLink>

          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light"><FontAwesomeIcon icon={faSearch} size="2x"/></Button>
          </Form>
          <NavLink to="/Requests">
            <FontAwesomeIcon icon={faBell} size="2x"/>
          </NavLink>
        </Navbar>
        
        <Switch>
          <Route exact path="/"  component={Home}/>
          <Route path="/FindHelp" render={(props) => (<FindHelp {...props} courses={ ["2C03", "4HC3", "3A04"]} />)}/>
          <Route path="/GiveHelp" component={GiveHelp} />
          <Route path="/profile" render={(props) => (<TutorProfile {...props} name={this.state.name} />)}/>
        </Switch>

      </Router>
    );
  }
}

export default App;
