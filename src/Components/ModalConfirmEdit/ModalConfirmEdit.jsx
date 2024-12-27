import "./ModalConfirmEdit.css";

function ModalConfirmEdit({ onClose, message, messagetittle }) {
  return (
    <div className="modalOverlayConfirmEdicao">
      <div className="modalContentConfirmaEdicao">
        <div className="modalHeaderConfirmaEdicao">
          <h3>{messagetittle}</h3>
          <p className="messageConfirmaEdicao">{message}</p>
        </div>
        <button className="buttonConfirmaEdicao" onClick={onClose}>
          Finalizar!
        </button>
      </div>
    </div>
  );
}
export default ModalConfirmEdit;
