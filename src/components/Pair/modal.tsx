import React from 'react';
import PairsTable from './table';
import { Modal } from 'react-bootstrap';

type propsType = {
  show: boolean;
  onHide: () => void;
};

const PairsModal: React.FC<propsType> = (props: propsType) => {
  const { show, onHide } = props;
  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Gestione Coppie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PairsTable />
      </Modal.Body>
    </Modal>
  );
};

export default PairsModal;
