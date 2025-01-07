import React, { useState } from "react";
import "./ModalFiltro.css";

function ModalFiltro({ onClose, onApplyFilter }) {
  const [centroCusto, setCentroCusto] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [dataInicialEmprestado, setDataInicialEmprestado] = useState("");
  const [dataFinalEmprestado, setDataFinalEmprestado] = useState("");
  const [dataInicialDevolvida, setDataInicialDevolvida] = useState("");
  const [dataFinalDevolvida, setDataFinalDevolvida] = useState("");

  const handleApplyFilter = () => {
    const filters = {
      centroCusto,
      empresa,
      dataInicialEmprestado,
      dataFinalEmprestado,
      dataInicialDevolvida,
      dataFinalDevolvida,
    };
    onApplyFilter(filters);
    onClose();
  };

  return (
    <div className="modalOverlayFiltro">
      <div className="modalContentFiltro">
        <div className="modalHeaderFiltro">
          <h3>Filtrar Dados</h3>
          <span className="closeIconFiltro" onClick={onClose}>
            X
          </span>
        </div>
        <div className="modalBodyFiltro">
          <div className="rowFields">
            <div className="fieldGroupFiltro">
              <label htmlFor="centroCusto">Centro de Custo</label>
              <input
                id="centroCusto"
                type="text"
                value={centroCusto}
                onChange={(e) => setCentroCusto(e.target.value)}
                placeholder="Digite o centro de custo"
              />
            </div>
            <div className="fieldGroupFiltro">
              <label htmlFor="empresa">Empresa</label>
              <input
                id="empresa"
                type="text"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                placeholder="Digite a empresa"
              />
            </div>
          </div>
          <div className="dateFields">
            <div className="fieldGroupFiltro">
              <label htmlFor="dataInicialEmprestado">
                Data Inicial Emprestado
              </label>
              <input
                id="dataInicialEmprestado"
                type="date"
                value={dataInicialEmprestado}
                onChange={(e) => setDataInicialEmprestado(e.target.value)}
              />
            </div>
            <div className="fieldGroupFiltro">
              <label htmlFor="dataFinalEmprestado">Data Final Emprestado</label>
              <input
                id="dataFinalEmprestado"
                type="date"
                value={dataFinalEmprestado}
                onChange={(e) => setDataFinalEmprestado(e.target.value)}
              />
            </div>
          </div>
          <div className="dateFields">
            <div className="fieldGroupFiltro">
              <label htmlFor="dataInicialDevolvida">
                Data Inicial Devolvida
              </label>
              <input
                id="dataInicialDevolvida"
                type="date"
                value={dataInicialDevolvida}
                onChange={(e) => setDataInicialDevolvida(e.target.value)}
              />
            </div>
            <div className="fieldGroupFiltro">
              <label htmlFor="dataFinalDevolvida">Data Final Devolvida</label>
              <input
                id="dataFinalDevolvida"
                type="date"
                value={dataFinalDevolvida}
                onChange={(e) => setDataFinalDevolvida(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="modalFooterFiltro">
          <button className="buttonFiltro" onClick={handleApplyFilter}>
            Aplicar Filtro
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalFiltro;
