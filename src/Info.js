import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';

class Info extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
        <div class="text-center"><br/>
            <h1>You Must Login before you can view this page.</h1>
            <Link to="/Home"><input type="button" value="Home" id="home" class="btn btn-secondary"/></Link>
        </div>
        );
  }
}

export default Info;