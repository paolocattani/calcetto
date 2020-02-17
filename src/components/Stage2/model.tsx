import React, { useState, CSSProperties } from 'react';
import { ListGroup, InputGroup, FormControl } from 'react-bootstrap';

const Model: React.FC = _ => {
  const STAGE_NUMBER = 4;

  const outerStyle: CSSProperties = {
    flexDirection: 'row-reverse'
  };

  const innerElementStyle: CSSProperties = {
    flexDirection: 'column',
    alignItems: 'stretch'
  };

  const innerParentStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'space-around'
  };

  let element = [];
  for (let ii = 0; ii <= STAGE_NUMBER; ii++) {
    let thisList = [];
    for (let jj = 0; jj < Math.pow(2, ii); jj++) {
      thisList.push(
        <ListGroup.Item key={`item-${ii}-${jj}`} style={innerElementStyle}>
          <InputGroup>
            <FormControl placeholder={`${ii}-${jj}`} />
          </InputGroup>
        </ListGroup.Item>
      );
    }
    element.push(
      <ListGroup.Item key={`col-${ii}`} style={innerParentStyle}>
        <ListGroup variant="flush">{thisList}</ListGroup>
      </ListGroup.Item>
    );
  }
  return (
    <ListGroup variant="flush" id="outer-container" style={outerStyle}>
      {element}
    </ListGroup>
  );
};

export default Model;
