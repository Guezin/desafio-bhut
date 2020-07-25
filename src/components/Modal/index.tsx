import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

export interface IModalProps {
  isOpen: boolean;
  setIsOpen(): void;
}

const Modal: React.FC<IModalProps> = ({ isOpen, setIsOpen, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={setIsOpen}
      ariaHideApp={false}
      style={{
        content: {
          width: '736px',
          height: '512px',
          margin: 'auto',
          color: '#000',
          borderRadius: '6px',
          backgroundColor: '#f0f0f5',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
