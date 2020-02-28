import React from 'react';
import { Modal, Spinner, Toast, Alert } from 'react-bootstrap';

type propsType = {
  show: boolean;
  message: string;
  onHide?: () => void;
};

type toastType = {
  message: string;
};
export const LoadingModal: React.FC<propsType> = ({ message, show, onHide = () => (show = false) }: propsType) => (
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

export const SuccessToast: React.FC<toastType> = ({ message }: toastType) =>
  message && message !== '' ? (
    <Toast className="rounded mr-2" key={'success-message'} show={message !== ''}>
      <Toast.Header closeButton={false}>
        <strong>Operazione completata !</strong>
      </Toast.Header>
      <Toast.Body>
        <Alert variant={'success'}>{message}</Alert>
      </Toast.Body>
    </Toast>
  ) : null;

export const WarningToast: React.FC<toastType> = ({ message }: toastType) =>
  message && message !== '' ? (
    <Toast className="rounded mr-2" key={'warning-message'} show={message !== ''}>
      <Toast.Header closeButton={false}>
        <strong>Operazione completata !</strong>
      </Toast.Header>
      <Toast.Body>
        <Alert variant={'warning'}>{message}</Alert>
      </Toast.Body>
    </Toast>
  ) : null;

export const ErrorToast: React.FC<toastType> = ({ message }: toastType) =>
  message && message !== '' ? (
    <Toast className="rounded mr-2" key={'error-message'} show={message !== ''}>
      <Toast.Header closeButton={false}>
        <strong>Operazione completata !</strong>
      </Toast.Header>
      <Toast.Body>
        <Alert variant={'danger'}>{message}</Alert>
      </Toast.Body>
    </Toast>
  ) : null;
