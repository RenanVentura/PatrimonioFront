import React, { useState, useEffect } from "react";
import "./ModalEmpresa.css";
import api from "../../services/api";
import Lixo from "../../assets/lixo.png";
import Lapis from "../../assets/lapis.png";
import Check from "../../assets/visto.png";
import CloseIcon from "../../assets/remove.png";
import ModalCadastroEmp from "../ModalCadastroEmpresa/ModalCadastroEmp";

function ModalEmpresa({ onClose }) {
  const [holding, setEmpresas] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newCentroCusto, setNewCentroCusto] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [modalCadastro, setModalCadastro] = useState(false);

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

  const atualizaGet = () => {
    getEmpresa();
  };

  const handleUpdate = async (id) => {
    try {
      await api.put(`/Empresa/${id}`, {
        Empresa: newCentroCusto,
      });
      alert("Centro de custo atualizado com sucesso!");
      setEditId(null);
      setIsEditing(false);
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
      setEditId(null);
      getEmpresa();
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar centro de custo.");
    }
  };

  const handleEdit = (empresas) => {
    setEditId(empresas.id);
    setNewCentroCusto(empresas.Empresa);
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setNewCentroCusto("");
    setEditId(null);
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
          <button
            className="buttonConfirmCadastro"
            onClick={() => {
              setModalCadastro(true);
              console.log("Abrir Modal de Cadastro");
            }}
          >
            Cadastrar
          </button>
        </div>
      </div>
      {modalCadastro && (
        <ModalCadastroEmp
          onClose={() => {
            setModalCadastro(false);
            getEmpresa();
          }}
        />
      )}
    </div>
  );
}

export default ModalEmpresa;
