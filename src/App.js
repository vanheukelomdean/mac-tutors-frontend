import {HashRouter as Router, Route, NavLink} from 'react-router-dom';
import React from 'react';
import Home from './Home';
import FindHelp from './FindHelp';
import GiveHelp from './GiveHelp';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (

      <Router>

        <div class="navbar">
          <h2 class="brand">MacTutor</h2>
          <NavLink exact to="/"><i class="fa fa-home"></i></NavLink>
          <NavLink to="/FindHelp">Find Help</NavLink>
          <NavLink to="/GiveHelp">Give Help</NavLink>
          <a class="hamburger" id="hamburger">
              <i class="fa fa-bars"></i>
          </a>
          <div class="search">
              <input type="text" placeholder="Search.."/>
              <button>
                  <i class="fa fa-search"></i>
              </button>
          </div>
        </div>
        
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/FindHelp" component={FindHelp} />
          <Route path="/GiveHelp" component={GiveHelp} />
        </div>

      </Router>
    );
  }
}

export default App;
