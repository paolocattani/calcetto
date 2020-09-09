import React, { CSSProperties } from 'react';
import { Modal, Spinner, Toast, Alert, Row, Button, Container, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SessionSelector } from 'redux/selectors/session.selector';
import './style.css';

const modalStyle: CSSProperties = { color: 'whitesmoke', backgroundColor: '#343a40', borderColor: '#ffc107' };
const fancyModalFooter = (
  <>
    <Spinner animation="border" variant="light" />
    <Spinner animation="border" variant="primary" />
    <Spinner animation="border" variant="secondary" />
    <Spinner animation="border" variant="success" />
    <Spinner animation="border" variant="danger" />
    <Spinner animation="border" variant="warning" />
    <Spinner animation="border" variant="info" />
    <Spinner animation="border" variant="dark" />
  </>
);
// Loading Modal
interface LoadingModalPropsType {
  show?: boolean;
  title?: string;
  message?: string;
  onHide?: () => void;
}

export const LoadingModal: React.FC<LoadingModalPropsType> = ({
  title = 'Caricamento....',
  message = 'Caricamento....',
  show = true,
  onHide = () => (show = false),
}) => (
  <Modal show={show} onHide={onHide} size="lg" centered style={{ borderColor: '#ffc107', borderWidth: '3px' }}>
    <Modal.Header closeButton style={modalStyle}>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body className="text-center font-weight-bold" style={modalStyle}>
      {message}
    </Modal.Body>
    <Modal.Footer style={modalStyle}>{fancyModalFooter}</Modal.Footer>
  </Modal>
);

export interface YesNoModalProps {
  title: string;
  show: boolean;
  message: string;
  onHide?: () => void;
  onClick: () => void;
}

export const YesNoModal: React.FC<YesNoModalProps> = ({
  title,
  message,
  show,
  onHide = () => (show = false),
  onClick,
}) => (
  <Modal
    className="YesNoModal"
    show={show}
    onHide={onHide}
    centered
    style={{ borderColor: '#ffc107', borderWidth: '3px' }}
  >
    <Modal.Header closeButton style={modalStyle}>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body style={modalStyle}>
      <Container fluid>
        <Row style={{ fontSize: 'larger' }}>{message}</Row>
        <Row style={{ padding: '2rem 0rem 0rem 0rem' }}>
          <Col>
            <Button variant="outline-secondary" className="float-left" onClick={() => onHide()}>
              Annulla
            </Button>
          </Col>
          <Col>
            <Button variant="outline-success" className="float-right" onClick={() => onClick()}>
              Conferma
            </Button>
          </Col>
        </Row>
      </Container>
    </Modal.Body>
    <Modal.Footer style={modalStyle}>{fancyModalFooter}</Modal.Footer>
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

// Util per loggare i dati utente in sessione
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

// TODO: Componente fallback se route non trovata
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
