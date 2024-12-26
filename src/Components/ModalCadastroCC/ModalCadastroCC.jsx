import { useState, useRef } from "react";
import "./ModalCadastroCC.css";
import api from "../../services/api";

function ModalCadastroCC({ onClose }) {
  const inputCentroDeCusto = useRef();

  const createCC = async () => {
    try {
      await api.post("/CentroCusto", {
        CentroCusto: inputCentroDeCusto.current.value,
        StatusDelete: false,
      });

      inputCentroDeCusto.current.value = "";
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
          <div className="inputname">Nome do Centro de Custo</div>
          <input
            name="CentroCusto"
            type="text"
            placeholder="Centro de Custo"
            ref={inputCentroDeCusto}
          />
        </div>
        <button className="buttonconfirmCC" onClick={createCC}>
          Cadastrar
        </button>
      </div>
    </div>
  );
}

export default ModalCadastroCC;
