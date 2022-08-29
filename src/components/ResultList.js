import React from 'react';
import ResultCard from './ResultCard';
import { Row, Col } from 'reactstrap'

function ResultList({results, saveInLocalStorage, removeFromLocalStorage}){
  
  return(
    <>
    {results.length ?
      <Row>
        {results.map(({id, base_experience, name, url, sprites, index}) => (
          <Col className="col-sm-3" key={id}>
            <ResultCard
              key={index}
              id={id}
              sprites={sprites}
              base_experience={base_experience}
              name={name}
              url={url}
              saveInLocalStorage={saveInLocalStorage}
              removeFromLocalStorage={removeFromLocalStorage}
            />
          </Col>
        ))}
        
      </Row>
      : null }
    </>
  )
}

export default ResultList;