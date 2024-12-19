import React, { useState, useEffect } from "react";
import "./ModalEmprestado.css";
import api from "../../services/api";
import ModalEmprestadoConfirm from "../ModalEmprestadoConfirm/ModalEmprestadoConfirm";

function ModalEmprestado({ ferramenta, onClose }) {
  const [editedFerramenta, setEditedFerramenta] = useState(ferramenta || {});
  const [isSaving, setIsSaving] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    setEditedFerramenta(ferramenta || {});
  }, [ferramenta]);

  const formatToISODate = (brDate) => {
    if (!brDate) return "";
    const [day, month, year] = brDate.split("/");
    return `${year}-${month}-${day}`;
  };

  const handleUpdate = async () => {
    setIsSaving(true);
    setIsConfirmOpen(false);

    try {
      const todayISO = new Date().toISOString().split("T")[0];

      await api.post("/ferramentaHistorico", {
        ...editedFerramenta,
        StatusEmprestado: true,
        DateAlterado: todayISO,
      });

      await api.put(`/ferramentas/${ferramenta.id}`, {
        ...editedFerramenta,
        StatusEmprestado: true,
      });

      alert("Ferramenta alterada com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar a ferramenta:", error);
      alert("Erro ao atualizar a ferramenta. Tente novamente.");
    } finally {
      setIsSaving(false);
    }

    window.location.reload();
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
              label="Responsável"
              name="ResponsavelEmprestado"
              value={editedFerramenta.ResponsavelEmprestado || ""}
              onChange={handleChange}
            />

            <InputField
              label="Data Emprestada"
              name="DataEmprestado"
              type="date"
              value={
                editedFerramenta.DataEmprestado ||
                new Date().toISOString().split("T")[0]
              }
              onChange={handleChange}
            />

            <TextAreaField
              label="Observação Emprestado"
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
