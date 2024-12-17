import "./ModalEditConfirm.css";

function ModalEmprestadoConfirm({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modalOverlayConfirm">
      <div className="modalContentConfirm">
        <div className="modalHeaderConfirm">
          <button className="closeButtonConfirm" onClick={onClose}>
            X
          </button>
          <p className="messageConfirm">Edição Concluida!</p>
        </div>
      </div>
    </div>
  );
}

export default ModalEmprestadoConfirm;
