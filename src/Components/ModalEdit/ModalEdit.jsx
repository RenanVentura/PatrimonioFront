import React, { useState, useEffect } from "react";
import "./ModalEdit.css";
import api from "../../services/api";
import logo from "../../assets/Logo.png";
import LixoEdit from "../../assets/lixo.png";
import ModalConfirmDelete from "../ModalConfirmDelete/ModalConfirmDelete";

function ModalEdit({ ferramenta, onClose, onUpdate }) {
  const [editedFerramenta, setEditedFerramenta] = useState(ferramenta);
  const [filiais, setFiliais] = useState([]);
  const [centrocusto, setCentroCusto] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Abre o modal de confirmação
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  // Confirma a exclusão
  const handleConfirmDelete = async () => {
    try {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("pt-BR").split("/");
      const formattedDateString = `${formattedDate[0]}/${formattedDate[1]}/${formattedDate[2]}`;

      await api.post("/ferramentaHistorico", {
        ...ferramenta,
        StatusDelete: false,
        DateAlterado: formattedDateString,
      });

      await api.put(`/ferramentas/${ferramenta.id}`, { StatusDelete: false });

      alert("Ferramenta deletada com sucesso!");
      setShowDeleteModal(false);
      onClose();
    } catch (error) {
      console.error("Erro ao deletar a ferramenta:", error);
      alert("Erro ao deletar a ferramenta.");
    }
  };

  // Cancela a exclusão
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  // Consulta de filiais
  useEffect(() => {
    async function ConsultahFiliais() {
      try {
        const response = await api.get("/Empresa", {
          params: { StatusDelete: true },
        });
        setFiliais(response.data);
      } catch (error) {
        console.error("Erro ao carregar as filiais:", error);
      }
    }
    ConsultahFiliais();
  }, []);

  // Consulta de Centro de Custo
  useEffect(() => {
    async function consultaCentro() {
      try {
        const classes = await api.get("/CentroCusto", {
          params: { StatusDelete: true },
        });
        setCentroCusto(classes.data);
      } catch (error) {
        console.error("Erro ao carregar o centro de custo", error);
      }
    }
    consultaCentro();
  }, []);

  // Atualiza o estado quando a ferramenta muda
  useEffect(() => {
    setEditedFerramenta(ferramenta);
  }, [ferramenta]);

  // Lida com atualizações dos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFerramenta({
      ...editedFerramenta,
      [name]: value,
    });
  };

  // Função para enviar atualização
  const handleUpdate = async () => {
    const modifiedFields = {};
    Object.keys(editedFerramenta).forEach((key) => {
      if (ferramenta[key] !== editedFerramenta[key]) {
        modifiedFields[key] = editedFerramenta[key];
      }
    });

    try {
      // Adiciona o histórico apenas se houver alterações
      if (Object.keys(modifiedFields).length > 0) {
        await api.post("/ferramentaHistorico", {
          ...ferramenta,
          ...modifiedFields,
          StatusDelete: true,
        });
      }

      // Atualiza os dados principais
      await api.put(`/ferramentas/${ferramenta.id}`, editedFerramenta);
      alert("Ferramenta atualizada com sucesso!");
      onUpdate(); // Callback para revalidar os dados no componente pai
      onClose(); // Fecha o modal
    } catch (error) {
      alert("Erro ao atualizar ferramenta");
      console.error(error);
    }
  };

  if (!ferramenta) return null;

  return (
    <>
      {/* Overlay escuro */}
      <div className="modal-overlay" onClick={onClose}></div>

      {/* Modal principal */}
      <div className="formEdit">
        <div className="container-card">
          {/* Cabeçalho do Modal */}
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
            <button className="close" onClick={onClose}>
              X
            </button>
          </div>

          {/* Conteúdo do formulário */}
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
              onChange={handleChange}
            />
            <InputField
              label="Data Devolvida"
              name="DataDevolvida"
              type="date"
              value={editedFerramenta.DataDevolvida || ""}
              onChange={handleChange}
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

            <button onClick={handleUpdate} className="save-button">
              Salvar alterações
            </button>

            {/* Modal de Confirmação de Exclusão */}
            {showDeleteModal && (
              <ModalConfirmDelete
                message="Tem certeza que deseja deletar esta ferramenta?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalEdit;

/* COMPONENTES REUTILIZÁVEIS */

// InputField Component
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

// SelectField Component
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

// TextAreaField Component
function TextAreaField({ label, name, value, onChange }) {
  return (
    <div className="data-container">
      <div className="tituloInput">{label}</div>
      <textarea name={name} value={value} onChange={onChange} />
    </div>
  );
}
