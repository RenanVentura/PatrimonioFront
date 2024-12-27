import "./ModalConfirm.css";

function ModalConfirm({ onClose, message, messagetittle }) {
  return (
    <div className="modalOverlayConfirma">
      <div className="modalContentConfirma">
        <h3>{messagetittle}</h3>
        <div className="modalHeaderConfirma">
          <p className="messageConfirma">{message}</p>
        </div>
        <button className="buttonConfirma" onClick={onClose}>
          Finalizar!
        </button>
      </div>
    </div>
  );
}
export default ModalConfirm;
