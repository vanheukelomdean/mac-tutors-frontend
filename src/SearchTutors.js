import React from 'react';
import { Row, Container, } from 'react-bootstrap';
import TutorCard from './TutorCard.js';
import './App.css';

class SearchTutors extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    const { query } = this.props.location;
    return (
        
        <Container>
            <h1 class="text-center">{query.results.length == 0 ? "No results for search: "+query.search : ""}</h1>
            {query.results.map((tutor) =>
            <Row>
              <TutorCard tutor={tutor} grade=""/>
            </Row>
          )}
        </Container>
      );
  }
}

export default SearchTutors;