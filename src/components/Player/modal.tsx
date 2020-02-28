import React from 'react';
import PlayerTable from './table';
import { Modal } from 'react-bootstrap';

type propsType = {
  show: boolean;
  onHide: () => void;
};

const PlayerModal: React.FC<propsType> = (props: propsType) => {
  const { show, onHide } = props;
  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Gestione Giocatori</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PlayerTable />
      </Modal.Body>
    </Modal>
  );
};

export default PlayerModal;
