import React from 'react';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import "../components/styles/ConfirmationDialog.css"

const ConfirmationDialog = ({ open, onClose, onConfirm, message }) => {
  return (
    <div className='confirmation-dialog-container'>
    <Modal show={open} onClose={onClose} popup className="confirmation-dialog-modal">
      <Modal.Header className="confirmation-dialog-modal-header" />
      <Modal.Body className="confirmation-dialog-modal-body">
        <div className="text-center confirmation-dialog-modal-text">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 confirmation-dialog-modal-icon" />
          <h3 className="mb-5 text-lg font-normal confirmation-dialog-modal-message">
            {message}
          </h3>
          <div className="flex justify-center gap-4 confirmation-dialog-modal-button-group">
            <Button onClick={onConfirm} className="confirmation-dialog-modal-button-confirm">
              {"Yes, I'm sure"}
            </Button>
            <Button onClick={onClose} className="confirmation-dialog-modal-button-cancel">
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
    </div>
  );
};

export default ConfirmationDialog;