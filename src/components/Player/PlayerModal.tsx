import React from 'react';
import Player from './Players';
import { Modal } from 'react-bootstrap';

type propsType = {
  show: boolean;
  onHide: () => void;
};
const PlayerModal: React.FC<propsType> = (props: propsType) => {
  const { show, onHide } = props;
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Gestione Giocatori</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Player editable={false} />
      </Modal.Body>
    </Modal>
  );
};

export default PlayerModal;
