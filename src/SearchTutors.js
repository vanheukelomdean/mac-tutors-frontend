import React from 'react';
import { Row, Container, } from 'react-bootstrap';
import TutorCard from './TutorCard.js';
import './App.css';

class SearchTutors extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    return (
        
        <Container>
            <h1 class="text-center">{this.props.results.length == 0 ? "No results for search: "+this.props.search : ""}</h1>
            {this.props.results.map((tutor) =>
            <Row>
              <TutorCard tutor={tutor} grade=""/>
            </Row>
          )}
        </Container>
      );
  }
}

export default SearchTutors;