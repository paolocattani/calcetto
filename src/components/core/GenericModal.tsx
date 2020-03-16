import React from 'react';
import { Modal } from 'react-bootstrap';

type propsType = {
  title: string;
  component: JSX.Element;
  show: boolean;
  onHide?: () => void;
  size?: 'sm' | 'lg' | 'xl';
};

const GenericModal: React.FC<propsType> = ({ title, show, onHide, component, size }: propsType) => {
  let showWrapper = show;
  if (!onHide) onHide = () => (showWrapper = false);
  return (
    <Modal show={showWrapper} onHide={onHide} size={size || 'lg'} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{component}</Modal.Body>
    </Modal>
  );
};

export default GenericModal;
