import React from "react";
import "./ModalConfirmDelete.css"; // CSS opcional para estilização

function ModalConfirmDelete({ message, onConfirm, onCancel }) {
  return (
    <>
      <div className="modal-overlay-edit" onClick={onCancel}></div>

      <div className="modal-confirm-delete">
        <div className="modal-header">
          <h3>Confirmação</h3>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="cancel-button-edit" onClick={onCancel}>
            Não
          </button>

          <button className="confirm-button-edit" onClick={onConfirm}>
            Sim
          </button>
        </div>
      </div>
    </>
  );
}

export default ModalConfirmDelete;
