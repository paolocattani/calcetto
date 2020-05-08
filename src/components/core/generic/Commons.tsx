import React from 'react';
import { Modal, Spinner, Toast, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SessionSelector } from 'selectors/session.selector';

// Loading Modal
type loadingModalPropsType = {
  show: boolean;
  message?: string;
  onHide?: () => void;
};

export const LoadingModal: React.FC<loadingModalPropsType> = ({
  message,
  show,
  onHide = () => (show = false),
}: loadingModalPropsType) => (
  <Modal show={show} onHide={onHide} size="xl" centered>
    <Modal.Header closeButton>
      <Modal.Title>Caricamento....</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message ? message : 'Caricamento....'}</Modal.Body>
    <Modal.Footer>
      <Spinner animation="border" variant="light" />
      <Spinner animation="border" variant="primary" />
      <Spinner animation="border" variant="secondary" />
      <Spinner animation="border" variant="success" />
      <Spinner animation="border" variant="danger" />
      <Spinner animation="border" variant="warning" />
      <Spinner animation="border" variant="info" />
      <Spinner animation="border" variant="dark" />
    </Modal.Footer>
  </Modal>
);

// Toasts
export interface IToastProps {
  message: string;
  type?: toastType;
}

export type toastType = 'success' | 'warning' | 'danger';

export const GenericToast: React.FC<IToastProps> = ({ message, type }) =>
  message && message !== '' ? (
    <Toast className="rounded mr-2 mx-auto" key={`${type}-message`} show={message !== ''}>
      <Toast.Header closeButton={false}>
        <strong>Operazione completata !</strong>
      </Toast.Header>
      <Toast.Body>
        <Alert variant={type}>{message}</Alert>
      </Toast.Body>
    </Toast>
  ) : null;

export const LogSessionContext: React.FC<{}> = () => {
  const session = useSelector(SessionSelector.getSession);

  return (
    <>
      {Object.entries(session).map(([key, value]) => (
        <p>
          {key} : {value}
        </p>
      ))}
    </>
  );
};

export function RedirectionControl(props: any): JSX.Element {
  const location = useLocation();
  return (
    <div>
      <h1>
        Current Ruote : <code>{location.pathname}</code>
      </h1>
    </div>
  );
}
