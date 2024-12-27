import { useState, useRef } from "react";
import "./ModalCadastroEmp.css";
import api from "../../services/api";

function ModalCadastroEmp({ onClose }) {
  const inputEmpresa = useRef();

  const createEmp = async () => {
    try {
      await api.post("/Empresa", {
        Empresa: inputEmpresa.current.value,
        StatusDelete: false,
      });

      inputEmpresa.current.value = "";
    } catch {
      alert("Erro ao cadastrar");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="tittle">Cadastro</h3>
          <span className="close-button" onClick={onClose}>
            X
          </span>
        </div>

        <div className="ContentCadastro">
          <div className="inputname">Nome da Empresa</div>
          <input
            name="Empresa"
            type="text"
            placeholder="Empresa"
            ref={inputEmpresa}
          />
        </div>
        <button className="buttonconfirmCC" onClick={createEmp}>
          Cadastrar
        </button>
      </div>
    </div>
  );
}

export default ModalCadastroEmp;
