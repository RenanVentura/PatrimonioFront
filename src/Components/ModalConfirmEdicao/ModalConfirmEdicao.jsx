import React from "react";
import "./ModalConfirmEdicao.css"; // CSS opcional para estilização

function ModalConfirmEdicao({ message, onConfirm, onCancel }) {
  return (
    <>
      <div className="modal-overlay-edicao" onClick={onCancel}></div>

      <div className="modal-confirm-edicao">
        <div className="modal-header-edicao">
          <h3>Confirmação</h3>
        </div>
        <div className="modal-body-edicao">
          <p>{message}</p>
        </div>
        <div className="modal-footer-edicao">
          <button className="cancel-button-edit-edicao" onClick={onCancel}>
            Não
          </button>

          <button className="confirm-button-edicao" onClick={onConfirm}>
            Sim
          </button>
        </div>
      </div>
    </>
  );
}

export default ModalConfirmEdicao;
