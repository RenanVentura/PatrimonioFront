import React, { useState, useEffect } from "react";
import "./ModalCentroCusto.css";
import api from "../../services/api";
import Lixo from "../../assets/lixo.png";
import Lapis from "../../assets/lapis.png";
import Check from "../../assets/visto.png";
import CloseIcon from "../../assets/remove.png";
import ModalCadastroCC from "../ModalCadastroCC/ModalCadastroCC";

function ModalCC({ onClose }) {
  const [centrocusto, setCentroCusto] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newCentroCusto, setNewCentroCusto] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [modalCadastro, setModalCadastro] = useState(false);

  async function getCC() {
    try {
      const CCFromApi = await api.get("/CentroCusto", {
        params: { StatusDelete: "false" },
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
      await api.put(`/CentroCusto/${id}`, {
        CentroCusto: newCentroCusto,
      });
      alert("Centro de custo atualizado com sucesso!");
      setEditId(null);
      setIsEditing(false);
      getCC();
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar centro de custo.");
    }
  };

  const handleUpdateDelete = async (id) => {
    try {
      await api.put(`/CentroCusto/${id}`, {
        StatusDelete: true,
      });
      alert("Centro de custo atualizado com sucesso!");
      setEditId(null);
      getCC();
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar centro de custo.");
    }
  };

  const handleEdit = (cc) => {
    setEditId(cc.id);
    setNewCentroCusto(cc.CentroCusto);
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setNewCentroCusto("");
    setEditId(null);
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
                {editId === cc.id ? (
                  <>
                    <input
                      type="text"
                      value={newCentroCusto}
                      onChange={(e) => setNewCentroCusto(e.target.value)}
                    />
                    <img
                      src={Check}
                      alt="Confirmar"
                      className="iconLixo"
                      onClick={() => handleUpdate(cc.id)}
                    />
                    <img
                      src={CloseIcon}
                      alt="Fechar edição"
                      className="iconLixo"
                      onClick={handleCloseEdit}
                    />
                  </>
                ) : (
                  <>
                    <span className="nomeCentroCusto">{cc.CentroCusto}</span>
                    <img
                      src={Lixo}
                      alt="Excluir"
                      className="iconLixo"
                      onClick={() => handleUpdateDelete(cc.id)}
                    />
                    <img
                      src={Lapis}
                      alt="Editar"
                      className="iconLixo"
                      onClick={() => handleEdit(cc)}
                    />
                  </>
                )}
              </div>
            ))
          ) : (
            <p>Carregando centros de custo...</p>
          )}
        </div>

        <div className="modalFooterConfirm">
          <button
            className="buttonConfirmCadastro"
            onClick={() => {
              setModalCadastro(true);
              console.log("Abrir modal de cadastro");
            }}
          >
            Cadastrar
          </button>
        </div>
      </div>
      {modalCadastro && (
        <ModalCadastroCC onClose={() => setModalCadastro(false)} />
      )}
    </div>
  );
}

export default ModalCC;
