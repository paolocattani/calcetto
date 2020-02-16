import React from 'react';
import { Modal } from 'react-bootstrap';

type propsType = {
  show: boolean;
  message: string;
  onHide?: () => void;
};

const LoadingModal: React.FC<propsType> = ({ message, show, onHide = () => (show = false) }: propsType) => (
  <Modal show={show} onHide={onHide} size="xl" centered>
    <Modal.Header closeButton>
      <Modal.Title>Caricamento....</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
  </Modal>
);

export default LoadingModal;
