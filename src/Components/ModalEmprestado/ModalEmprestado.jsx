import React, { useState, useEffect } from "react";
import "./ModalEmprestado.css";
import api from "../../services/api";
import ModalEmprestadoConfirm from "../ModalEmprestadoConfirm/ModalEmprestadoConfirm";
import ModalConfirm from "../ModalConfirm/ModalConfirm";

function ModalEmprestado({ ferramenta, onClose }) {
  const [isModalConfirm, setModalConfirm] = useState(false);
  const [editedFerramenta, setEditedFerramenta] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    setEditedFerramenta({
      ...ferramenta,
      DataEmprestado:
        ferramenta?.DataEmprestado || new Date().toISOString().split("T")[0],
    });
  }, [ferramenta]);

  const handleUpdate = async () => {
    setIsSaving(true);
    setIsConfirmOpen(false);

    try {
      const todayISO = new Date().toISOString().split("T")[0];

      await api.post("/ferramentaHistorico", {
        ...editedFerramenta,
        DataEmprestado: editedFerramenta.DataEmprestado || todayISO,
        StatusEmprestado: true,
        Status: "Emprestado",
        DateAlterado: todayISO,
      });

      await api.put(`/ferramentas/${ferramenta.id}`, {
        ...editedFerramenta,
        DataEmprestado: editedFerramenta.DataEmprestado || todayISO,
        Status: "Emprestado",
        StatusEmprestado: true,
      });

      setModalConfirm(true);
    } catch (error) {
      console.error("Erro ao atualizar a ferramenta:", error);
      alert("Erro ao atualizar a ferramenta. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFerramenta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    setIsConfirmOpen(true);
  };

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
  };

  const handleProceedConfirm = () => {
    handleUpdate();
  };

  if (!ferramenta) return null;

  return (
    <>
      <div className="modal-overlay-emp" onClick={onClose}></div>

      <div className="formEditEmp">
        <div className="container-card-emp">
          <div className="titleEditemp">
            <h2>Emprestar Patrimônio</h2>
            <button className="close" onClick={onClose}>
              X
            </button>
          </div>

          <div className="containerEditEmp">
            <InputField
              label="Responsável pelo Empréstimo"
              name="ResponsavelEmprestado"
              value={editedFerramenta.ResponsavelEmprestado || ""}
              onChange={handleChange}
            />

            <InputField
              label="Data do Empréstimo"
              name="DataEmprestado"
              type="date"
              value={editedFerramenta.DataEmprestado || ""}
              onChange={handleChange}
            />

            <TextAreaField
              label="Observação do Empréstimo"
              name="ObsEmprestado"
              value={editedFerramenta.ObsEmprestado || ""}
              onChange={handleChange}
            />

            <button
              onClick={handleConfirm}
              className="save-button"
              disabled={isSaving}
            >
              {isSaving ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </div>
      </div>

      <ModalEmprestadoConfirm
        isOpen={isConfirmOpen}
        onClose={handleCloseConfirm}
        onProceed={handleProceedConfirm}
      />

      {isModalConfirm && (
        <ModalConfirm
          onClose={() => {
            setModalConfirm(false);
            window.location.reload();
            onClose();
          }}
          message="Ferramenta Emprestada com sucesso!"
          messagetittle="Emprestado!"
        />
      )}
    </>
  );
}
export default ModalEmprestado;

function InputField({ label, name, value, onChange, type = "text", min }) {
  return (
    <div className="data-containerEmp">
      <div className="tituloInputEmp">{label}</div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        aria-label={label}
      />
    </div>
  );
}

function TextAreaField({ label, name, value, onChange }) {
  return (
    <div className="data-containerEmp">
      <div className="tituloInputEmp">{label}</div>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        aria-label={label}
      />
    </div>
  );
}
