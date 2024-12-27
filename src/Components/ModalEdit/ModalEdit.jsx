import React, { useState, useEffect } from "react";
import "./ModalEdit.css";
import api from "../../services/api";
import logo from "../../assets/Logo.png";
import LixoEdit from "../../assets/lixo.png";
import ModalConfirmDelete from "../ModalConfirmDelete/ModalConfirmDelete";
import Emprestado from "../../assets/Emprestado.png";
import ModalEmprestado from "../ModalEmprestado/ModalEmprestado";
import ModalConfirmEdit from "../ModalConfirmEdit/ModalConfirmEdit";
import ModalConfirmEdicao from "../ModalConfirmEdicao/ModalConfirmEdicao";

function ModalEdit({ ferramenta, onClose }) {
  const [editedFerramenta, setEditedFerramenta] = useState(ferramenta);
  const [filiais, setFiliais] = useState([]);
  const [centrocusto, setCentroCusto] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isModalConfirm, setModalConfirm] = useState(false);
  const [showEmprestadoModal, setShowEmprestadoModal] = useState(false);
  const [modalEdicao, SetModalEdicao] = useState(false);

  useEffect(() => {
    async function fetchFiliais() {
      try {
        const response = await api.get("/Empresa", {
          params: { StatusDelete: true },
        });
        setFiliais(response.data);
      } catch (error) {
        console.error("Erro ao carregar as filiais:", error);
      }
    }

    async function fetchCentroCusto() {
      try {
        const response = await api.get("/CentroCusto", {
          params: { StatusDelete: true },
        });
        setCentroCusto(response.data);
      } catch (error) {
        console.error("Erro ao carregar o centro de custo:", error);
      }
    }

    fetchFiliais();
    fetchCentroCusto();
  }, []);

  useEffect(() => {
    setEditedFerramenta(ferramenta);
  }, [ferramenta]);

  const handleDeleteClick = () => setShowDeleteModal(true);

  const handleConfirmDelete = async () => {
    try {
      const todayISO = new Date().toISOString().split("T")[0];

      await api.post("/ferramentaHistorico", {
        ...ferramenta,
        StatusDelete: true,
        DateAlterado: todayISO,
      });

      await api.put(`/ferramentas/${ferramenta.id}`, { StatusDelete: true });
      setModalConfirm(true);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Erro ao deletar a ferramenta:", error);
      alert("Erro ao deletar a ferramenta.");
    }
  };

  const handleCancelDelete = () => setShowDeleteModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFerramenta({ ...editedFerramenta, [name]: value });
  };

  const handleUpdate = async () => {
    const modifiedFields = {};
    Object.keys(editedFerramenta).forEach((key) => {
      if (ferramenta[key] !== editedFerramenta[key]) {
        modifiedFields[key] = editedFerramenta[key];
      }
    });

    try {
      if (Object.keys(modifiedFields).length > 0) {
        const todayISO = new Date().toISOString().split("T")[0];
        await api.post("/ferramentaHistorico", {
          ...ferramenta,
          ...modifiedFields,
          StatusDelete: true,
          DateAlterado: todayISO,
        });
      }

      await api.put(`/ferramentas/${ferramenta.id}`, editedFerramenta);
      setModalConfirm(true);
    } catch (error) {
      console.error("Erro ao atualizar ferramenta:", error);
      alert("Erro ao atualizar ferramenta");
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleEmprestadoClick = () => setShowEmprestadoModal(true); // Função para abrir o modal de empréstado

  if (!ferramenta) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="formEdit">
        <div className="container-card">
          <div className="titleEdit">
            <img className="logoQually" src={logo} alt="Logo" />
            <h2>
              Editar Ferramenta: <br /> {ferramenta.Nome}
            </h2>
            <img
              className="Lixo"
              src={LixoEdit}
              alt="Lixo"
              onClick={handleDeleteClick}
              style={{ cursor: "pointer" }}
            />
            <img
              className="icon"
              src={Emprestado}
              alt="Emprestado"
              style={{ cursor: "pointer" }}
              onClick={handleEmprestadoClick} // Evento de clique
            />
            <button className="close" onClick={onClose}>
              X
            </button>
          </div>

          <div className="containerEdit">
            <InputField
              label="Patrimônio"
              name="Patrimonio"
              value={editedFerramenta.Patrimonio || ""}
              onChange={handleChange}
            />
            <InputField
              label="Responsável"
              name="NomeDeResponsavel"
              value={editedFerramenta.NomeDeResponsavel || ""}
              onChange={handleChange}
            />
            <InputField
              label="Responsável Emprestado"
              name="ResponsavelEmprestado"
              value={editedFerramenta.ResponsavelEmprestado || ""}
              onChange={handleChange}
            />

            <SelectField
              label="Status"
              name="Status"
              value={editedFerramenta.Status || ""}
              options={["Ativo", "Emprestado", "Inativo"]}
              onChange={handleChange}
            />

            <SelectField
              label="Centro de Custo"
              name="CentroDeCusto"
              value={editedFerramenta.CentroDeCusto || ""}
              options={centrocusto.map((custos) => custos.CentroCusto)}
              onChange={handleChange}
            />

            <SelectField
              label="Empresa"
              name="Empresa"
              value={editedFerramenta.Empresa || ""}
              options={filiais.map((filial) => filial.Empresa)}
              onChange={handleChange}
            />

            <InputField
              label="Valor"
              name="Valor"
              type="number"
              min="0"
              value={editedFerramenta.Valor || ""}
              onChange={handleChange}
            />

            <SelectField
              label="Tipo de Cadastro"
              name="TipoDeCadastro"
              value={editedFerramenta.TipoDeCadastro || ""}
              options={["Frotas", "Ferramentas"]}
              onChange={handleChange}
            />

            <InputField
              label="Data Emprestada"
              name="DataEmprestado"
              type="date"
              value={editedFerramenta.DataEmprestado || ""}
              onChange={(e) =>
                setEditedFerramenta({
                  ...editedFerramenta,
                  DataEmprestado: e.target.value,
                })
              }
            />

            <InputField
              label="Data Devolvida"
              name="DataDevolvida"
              type="date"
              value={editedFerramenta.DataDevolvida || ""}
              onChange={(e) =>
                setEditedFerramenta({
                  ...editedFerramenta,
                  DataDevolvida: e.target.value,
                })
              }
            />
            <TextAreaField
              label="Observação Emprestado"
              name="ObsEmprestado"
              value={editedFerramenta.ObsEmprestado || ""}
              onChange={handleChange}
            />

            <TextAreaField
              label="Observação"
              name="Observacao"
              value={editedFerramenta.Observacao || ""}
              onChange={handleChange}
            />

            <button
              onClick={() => SetModalEdicao(true)}
              className="save-button"
            >
              Salvar alterações
            </button>

            {showDeleteModal && (
              <ModalConfirmDelete
                message="Tem certeza que deseja deletar esta ferramenta?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
              />
            )}

            {isModalConfirm && (
              <ModalConfirmEdit
                message="Patrimônio Alterado com sucesso!"
                messagetittle="Alterado!"
                onClose={() => {
                  setModalConfirm(false);
                  onClose();
                }}
              />
            )}

            {showEmprestadoModal && (
              <ModalEmprestado
                onClose={() => setShowEmprestadoModal(false)} // Fechar o modal
                ferramenta={ferramenta}
              />
            )}

            {modalEdicao && (
              <ModalConfirmEdicao
                onConfirm={handleUpdate}
                onCancel={() => SetModalEdicao(false)} // Passar como função anônima
                message="Deseja realmente editar?"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalEdit;

function InputField({ label, name, value, onChange, type = "text", min }) {
  return (
    <div className="data-container">
      <div className="tituloInput">{label}</div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
      />
    </div>
  );
}

function SelectField({ label, name, value, options, onChange }) {
  return (
    <div className="data-container">
      <div className="tituloInput">{label}</div>
      <select name={name} value={value} onChange={onChange}>
        <option value="">Selecione</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({ label, name, value, onChange }) {
  return (
    <div className="data-container">
      <div className="tituloInput">{label}</div>
      <textarea name={name} value={value} onChange={onChange} />
    </div>
  );
}
