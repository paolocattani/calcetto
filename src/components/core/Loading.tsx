import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';

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
    <Modal.Footer>
      <Spinner animation="border" variant="primary" />
      <Spinner animation="border" variant="secondary" />
      <Spinner animation="border" variant="success" />
      <Spinner animation="border" variant="danger" />
      <Spinner animation="border" variant="warning" />
      <Spinner animation="border" variant="info" />
      <Spinner animation="border" variant="light" />
      <Spinner animation="border" variant="dark" />
    </Modal.Footer>
  </Modal>
);

export default LoadingModal;
