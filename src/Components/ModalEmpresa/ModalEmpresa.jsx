import React, { useState, useEffect } from "react";
import "./ModalEmpresa.css";
import api from "../../services/api";
import Lixo from "../../assets/lixo.png";

function ModalEmpresa({ onClose }) {
  const [holding, setEmpresas] = useState([]);

  async function getEmp() {
    try {
      const EmpresaFromApi = await api.get("/Empresa", {
        params: { StatusDelete: "true" },
      });
      setEmpresas(EmpresaFromApi.data);
    } catch (error) {
      console.log("Erro ao buscar Centro de Custo:", error);
    }
  }

  useEffect(() => {
    getEmp();
  }, []);
  const handleUpdate = async (id) => {
    try {
      await api.put(`/Empresa/${id}`, { StatusDelete: false });
      alert("Centro de custo atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar centro de custo.");
    }
  };

  return (
    <div className="modalOverlayEmpresa">
      <div className="modalContentEmpresa">
        <div className="modalHeaderEmpresa">
          <h3>Cadastro de Empresa</h3>
          <div className="ModalHeaderClose">
            <h3 onClick={onClose}>X</h3>
          </div>
        </div>

        <div className="modalBodyEmpresa">
          {holding.length > 0 ? (
            holding.map((filiais) => (
              <div key={filiais.id} className="cardEmpresa">
                <span className="nomeEmpresa">{filiais.Empresa}</span>
                <img
                  src={Lixo}
                  alt="Excluir"
                  className="iconLixo"
                  onClick={() => handleUpdate(filiais.id)}
                />
              </div>
            ))
          ) : (
            <p>Carregando centros de custo...</p>
          )}
        </div>

        <div className="modalFooterConfirm">
          <button className="buttonConfirmCadastro">Cadastrar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalEmpresa;
