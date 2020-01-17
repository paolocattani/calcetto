import React from 'react';
import Player from './Players';
import { Modal } from 'react-bootstrap';

const PlayerModal: React.FC = () => {
  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Gestione Giocatori</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Player />
      </Modal.Body>
    </Modal.Dialog>
  );
};

export default PlayerModal;
