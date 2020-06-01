import React from 'react';
import { Button } from 'react-bootstrap';
import { noDataPropsType } from './type';
import { Link } from 'react-router-dom';

// FIXME: change to tounament name
const noData: React.FC<noDataPropsType> = ({ addRow, optionsLength }: noDataPropsType) => {
  const MIN_PLAYERS = 8;
  const players = optionsLength - 1;
  const diff = players < MIN_PLAYERS ? MIN_PLAYERS - players : 0;
  if (!optionsLength) return null;
  return players >= MIN_PLAYERS ? (
    <>
      <p> Aggiungi le coppie per questo torneo...</p>
      <Button variant="success" onClick={addRow}>
        Aggiungi Coppia
      </Button>
    </>
  ) : (
    <>
      <p>Ci sono solo {players} giocatori definiti ma devono essercene almeno 8 per poter formare un torneo.</p>
      <p>{diff === 1 ? 'Devi creare un altro giocatore...' : `Devi creare almeno altri ${diff}`}</p>
      <Link to={'/player'}>
        <Button variant="success">Gestione Giocatori</Button>
      </Link>
    </>
  );
};

export default noData;
