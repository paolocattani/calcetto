import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

const Model: React.FC = _ => {
  const STAGE_NUMBER = 4;

  let element = [];
  for (let ii = 0; ii <= STAGE_NUMBER; ii++) {
    let thisList = [];
    for (let jj = 0; jj < Math.pow(2, ii); jj++) {
      thisList.push(
        <ListGroup.Item>
          {ii}-{jj}
        </ListGroup.Item>
      );
    }
    element.push(
      <ListGroup.Item>
        <ListGroup variant="flush" id="inner-container">
          {thisList}
        </ListGroup>
      </ListGroup.Item>
    );
  }
  return <ListGroup id="outer-container">{element}</ListGroup>;
};

export default Model;
