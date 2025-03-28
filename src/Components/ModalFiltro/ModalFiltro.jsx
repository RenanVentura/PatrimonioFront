import React, { useState, useEffect } from "react";
import "./ModalFiltro.css";
import api from "../../services/api";

function ModalFiltro({ onClose, onApplyFilter }) {
  const [centroCusto, setCentroCusto] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [centrosCustoOptions, setCentrosCustoOptions] = useState([]);
  const [empresasOptions, setEmpresasOptions] = useState([]);

  const handleApplyFilter = () => {
    const filterData = {
      centroCusto: centroCusto,
      empresa: empresa,
    };
    onApplyFilter(filterData);
  };

  useEffect(() => {
    const consultaFiliais = async () => {
      try {
        const response = await api.get("/Empresa", {
          params: { StatusDelete: "false" },
        });
        setEmpresasOptions(response.data);
      } catch (error) {
        console.error("Erro ao carregar empresas", error);
      }
    };
    consultaFiliais();
  }, []);

  useEffect(() => {
    const consultaCentro = async () => {
      try {
        const response = await api.get("/CentroCusto", {
          params: { StatusDelete: "false" },
        });
        setCentrosCustoOptions(response.data);
      } catch (error) {
        console.error("Erro ao carregar o centro de custo", error);
      }
    };
    consultaCentro();
  }, []);

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
              <select
                id="centroCusto"
                value={centroCusto}
                onChange={(e) => setCentroCusto(e.target.value)}
              >
                <option value="">Selecione o Centro de Custo</option>
                {centrosCustoOptions.map((centro) => (
                  <option key={centro.id} value={centro.CentroCusto}>
                    {centro.CentroCusto}
                  </option>
                ))}
              </select>
            </div>
            <div className="fieldGroupFiltro">
              <label htmlFor="empresa">Empresa</label>
              <select
                id="empresa"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
              >
                <option value="">Selecione a Empresa</option>
                {empresasOptions.map((empresa) => (
                  <option key={empresa.id} value={empresa.Empresa}>
                    {empresa.Empresa}
                  </option>
                ))}
              </select>
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
