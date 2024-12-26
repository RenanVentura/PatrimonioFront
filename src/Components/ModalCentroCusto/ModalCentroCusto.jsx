import React, { useState, useEffect } from "react";
import "./ModalCentroCusto.css"; // Verifique se o CSS está configurado corretamente
import api from "../../services/api";
import Lixo from "../../assets/lixo.png";

function ModalCC({ onClose }) {
  const [centrocusto, setCentroCusto] = useState([]);

  async function getCC() {
    try {
      const CCFromApi = await api.get("/CentroCusto", {
        params: { StatusDelete: "true" },
      });
      setCentroCusto(CCFromApi.data);
    } catch (error) {
      console.log("Erro ao buscar Centro de Custo:", error);
    }
  }

  useEffect(() => {
    getCC();
  }, []);
  const handleUpdate = async (id) => {
    try {
      await api.put(`/CentroCusto/${id}`, { StatusDelete: false });
      alert("Centro de custo atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar centro de custo.");
    }
  };

  return (
    <div className="modalOverlayCadastro">
      <div className="modalContentCadastro">
        <div className="modalHeaderCadastro">
          <h3>Cadastro de Centro de Custo</h3>
          <div className="ModalHeaderClose">
            <h3 onClick={onClose}>X</h3>
          </div>
        </div>

        <div className="modalBodyCadastro">
          {centrocusto.length > 0 ? (
            centrocusto.map((cc) => (
              <div key={cc.id} className="cardCentroCusto">
                <span className="nomeCentroCusto">{cc.CentroCusto}</span>
                <img
                  src={Lixo}
                  alt="Excluir"
                  className="iconLixo"
                  onClick={() => handleUpdate(cc.id)}
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

export default ModalCC;
