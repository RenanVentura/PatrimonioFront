import React from "react";
import "./ModalEmprestadoConfirm.css";

function ModalEmprestadoConfirm({ isOpen, onClose, onProceed }) {
  if (!isOpen) return null;

  return (
    <div className="modalOverlayConfirm">
      <div className="modalContentConfirm">
        <div className="modalHeaderConfirm">
          <p className="messageConfirm">
            Tem certeza que deseja salvar as alterações?
          </p>
        </div>
        <div className="modalFooterConfirm">
          <button className="buttonCancelConfirm" onClick={onClose}>
            NÃO
          </button>
          <button className="buttonConfirm" onClick={onProceed}>
            SIM
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalEmprestadoConfirm;
