import React, { useState, useEffect } from "react";
import "./ModalCentroCusto.css"; // Verifique se o CSS está configurado corretamente
import api from "../../services/api";
import Lixo from "../../assets/lixo.png";
import Lapis from "../../assets/lapis.png";
import Check from "../../assets/visto.png"; // Adicione o ícone de check (certo)
import CloseIcon from "../../assets/remove.png";

function ModalCC({ onClose }) {
  const [centrocusto, setCentroCusto] = useState([]);
  const [editId, setEditId] = useState(null); // Para controlar o ID do centro de custo sendo editado
  const [newCentroCusto, setNewCentroCusto] = useState(""); // Para controlar o valor editado
  const [isEditing, setIsEditing] = useState(false);

  // Função para buscar os centros de custo
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
        StatusDelete: false,
      });
      alert("Centro de custo atualizado com sucesso!");
      setEditId(null); // Após a edição, volta ao modo de visualização
      getCC(); // Recarrega os dados atualizados
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar centro de custo.");
    }
  };

  // Função para iniciar o processo de edição
  const handleEdit = (cc) => {
    setEditId(cc.id); // Define o ID do centro de custo sendo editado
    setNewCentroCusto(cc.CentroCusto);
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false); // Desativa o modo de edição
    setNewCentroCusto(""); // Limpa o campo de edição
    setEditId(null); // Limpa o ID de edição
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
                      onChange={(e) => setNewCentroCusto(e.target.value)} // Atualiza o valor enquanto edita
                    />
                    <img
                      src={Check}
                      alt="Confirmar"
                      className="iconLixo"
                      onClick={() => handleUpdate(cc.id)} // Confirma a edição
                    />
                    <img
                      src={CloseIcon}
                      alt="Fechar edição"
                      className="iconLixo"
                      onClick={handleCloseEdit} // Fecha a edição
                    />
                  </>
                ) : (
                  <>
                    <span className="nomeCentroCusto">{cc.CentroCusto}</span>
                    <img
                      src={Lixo}
                      alt="Excluir"
                      className="iconLixo"
                      onClick={() => handleUpdateDelete(cc.id)} // Exclui
                    />
                    <img
                      src={Lapis}
                      alt="Editar"
                      className="iconLixo"
                      onClick={() => handleEdit(cc)} // Inicia o processo de edição
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
          <button className="buttonConfirmCadastro">Cadastrar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalCC;
