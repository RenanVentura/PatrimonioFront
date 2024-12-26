import React, { useState, useEffect } from "react";
import "./ModalEmpresa.css";
import api from "../../services/api";
import Lixo from "../../assets/lixo.png";
import Lapis from "../../assets/lapis.png";
import Check from "../../assets/visto.png"; // Adicione o ícone de check (certo)
import CloseIcon from "../../assets/remove.png"; // Ícone de fechar a edição

function ModalEmpresa({ onClose }) {
  const [holding, setEmpresas] = useState([]);
  const [editId, setEditId] = useState(null); // Para controlar o ID da empresa sendo editada
  const [newCentroCusto, setNewCentroCusto] = useState(""); // Para controlar o valor editado
  const [isEditing, setIsEditing] = useState(false); // Para controlar o estado de edição

  // Função para buscar as empresas
  async function getEmpresa() {
    try {
      const EmpresaFromApi = await api.get("/Empresa", {
        params: { StatusDelete: "false" },
      });
      setEmpresas(EmpresaFromApi.data);
    } catch (error) {
      console.log("Erro ao buscar Empresas:", error);
    }
  }

  useEffect(() => {
    getEmpresa();
  }, []);

  const handleUpdate = async (id) => {
    try {
      await api.put(`/Empresa/${id}`, {
        Empresa: newCentroCusto,
      });
      alert("Centro de custo atualizado com sucesso!");
      setEditId(null);
      setIsEditing(false); // Desativa o modo de edição
      getEmpresa();
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar centro de custo.");
    }
  };

  const handleUpdateDelete = async (id) => {
    try {
      await api.put(`/Empresa/${id}`, {
        StatusDelete: true,
      });
      alert("Centro de custo atualizado com sucesso!");
      setEditId(null); // Após a edição, volta ao modo de visualização
      getEmpresa(); // Recarrega os dados atualizados
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar centro de custo.");
    }
  };

  // Função para iniciar o processo de edição
  const handleEdit = (empresas) => {
    setEditId(empresas.id); // Define o ID da empresa sendo editada
    setNewCentroCusto(empresas.Empresa); // Preenche o valor atual no campo de edição
    setIsEditing(true); // Ativa o modo de edição
  };

  // Função para fechar a edição
  const handleCloseEdit = () => {
    setIsEditing(false); // Desativa o modo de edição
    setNewCentroCusto(""); // Limpa o campo de edição
    setEditId(null); // Limpa o ID de edição
  };

  return (
    <div className="modalOverlayCadastroEmp">
      <div className="modalContentCadastroEmp">
        <div className="modalHeaderCadastroEmp">
          <h3>Cadastro de Empresas</h3>
          <div className="ModalHeaderClose">
            <h3 onClick={onClose}>X</h3>
          </div>
        </div>

        <div className="modalBodyCadastro">
          {holding.length > 0 ? (
            holding.map((empresas) => (
              <div key={empresas.id} className="cardEmp">
                {editId === empresas.id ? (
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
                      onClick={() => handleUpdate(empresas.id)} // Confirma a edição
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
                    <span className="nomeEmpresa">{empresas.Empresa}</span>
                    <img
                      src={Lixo}
                      alt="Excluir"
                      className="iconLixo"
                      onClick={() => handleUpdateDelete(empresas.id)}
                    />
                    <img
                      src={Lapis}
                      alt="Editar"
                      className="iconLixo"
                      onClick={() => handleEdit(empresas)} // Inicia o processo de edição
                    />
                  </>
                )}
              </div>
            ))
          ) : (
            <p>Carregando Empresas...</p>
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
