import React, { useState, useEffect } from "react";
import "./ModalDevolucao.css";
import api from "../../services/api";
import ModalEmprestadoConfirm from "../ModalEmprestadoConfirm/ModalEmprestadoConfirm";
import ModalConfirm from "../ModalConfirm/ModalConfirm";

function ModalDevolucao({ ferramenta, onClose }) {
  const [editedFerramenta, setEditedFerramenta] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isModalConfirm, setModalConfirm] = useState(false);

  useEffect(() => {
    setEditedFerramenta({
      ...ferramenta,
      DataDevolvida:
        ferramenta?.DataDevolvida || new Date().toISOString().split("T")[0],
    });
  }, [ferramenta]);

  const handleUpdate = async () => {
    setIsSaving(true);
    setIsConfirmOpen(false);

    try {
      const todayISO = new Date().toISOString().split("T")[0];

      await api.post("/ferramentaHistorico", {
        ...editedFerramenta,
        DataDevolvida: editedFerramenta.DataDevolvida || todayISO,
        StatusEmprestado: false,
        DateAlterado: todayISO,
      });

      await api.put(`/ferramentas/${ferramenta.id}`, {
        ...editedFerramenta,
        DataDevolvida: editedFerramenta.DataDevolvida || todayISO,
        StatusEmprestado: false,
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
            <h2>Devolver Patrimônio</h2>
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
              label="Data da Devolução"
              name="DataDevolvida"
              type="date"
              value={editedFerramenta.DataDevolvida || ""}
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

      {isModalConfirm && (
        <ModalConfirm
          message="Patrimônio Devolvido com sucesso!"
          onClose={() => {
            setModalConfirm(false);
            onClose();
            window.location.reload();
          }}
          messagetittle="Devolvido!"
        />
      )}

      <ModalEmprestadoConfirm
        isOpen={isConfirmOpen}
        onClose={handleCloseConfirm}
        onProceed={handleProceedConfirm}
      />
    </>
  );
}

export default ModalDevolucao;

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
