import React from "react";
import "./ModalEmprestadoConfirm.css";

function ModalEmprestadoConfirm({ isOpen, onClose, onProceed }) {
  if (!isOpen) return null;

  return (
    <div className="modalOverlayConfirmEmp">
      <div className="modalContentConfirmEmp">
        <div className="modalHeaderConfirmEmp">
          <h3>Confirmação</h3>
          <p className="messageConfirmEmpresta">
            Tem certeza que deseja salvar as alterações?
          </p>
        </div>
        <div className="modalFooterConfirmEmp">
          <button className="buttonCancelConfirmEmp" onClick={onClose}>
            NÃO
          </button>
          <button className="buttonConfirmEmp" onClick={onProceed}>
            SIM
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalEmprestadoConfirm;
