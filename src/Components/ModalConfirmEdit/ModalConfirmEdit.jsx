import "./ModalConfirmEdit.css";

function ModalConfirmEdit({ onClose, message }) {
  return (
    <div className="modalOverlayConfirmEdicao">
      <div className="modalContentConfirm">
        <div className="modalHeaderConfirm">
          <p className="messageConfirm">{message}</p>
        </div>
        <button className="buttonConfirmX" onClick={onClose}>
          Finalizar!
        </button>
      </div>
    </div>
  );
}
export default ModalConfirmEdit;
