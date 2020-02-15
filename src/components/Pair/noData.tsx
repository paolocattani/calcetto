import React from 'react';
import { Button } from 'react-bootstrap';
import { noDataPropsType } from './type';

// FIXME: change to tounament name
const noData: React.FC<noDataPropsType> = ({ addRow }: noDataPropsType) => {
  return (
    <>
      <p>Aggiungi le coppie per questo torneo...</p>
      <Button variant="success" onClick={addRow}>
        Aggiungi Coppia
      </Button>
    </>
  );
};

export default noData;
