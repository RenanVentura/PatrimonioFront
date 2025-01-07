import { useState, useEffect } from "react";
import "./Emprestado.css";
import logo from "../../assets/Logo.png";
import api from "../../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import Lixo from "../../assets/lixo.png";
import Devolucao from "../../assets/devolução.png";
import Vazio from "../../assets/icon_vazio.png";
import ModalConfirmDelete from "../../Components/ModalConfirmDelete/ModalConfirmDelete";
import ModalDevolucao from "../../Components/ModalDevolucao/ModalDevolucao";
import * as XLSX from "xlsx";
import ModalConfirm from "../../Components/ModalConfirm/ModalConfirm";
import ModalFiltro from "../../Components/ModalFiltro/ModalFiltro";

function Ferramentas() {
  const [patrimonio, setPatrimonio] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFerramenta, setSelectedFerramenta] = useState(null);
  const [isModalConfirm, setModalConfirm] = useState(false);
  const [isModalFiltro, setModalFiltro] = useState(false);

  const [isModalEmprestadoOpen, setIsModalEmprestadoOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const itemsPerPage = 6;
  const navigate = useNavigate();
  const location = useLocation();

  const formatDate = (date) => {
    if (!date) return "";

    const newDate = new Date(date);
    if (isNaN(newDate.getTime())) return "";

    const day = String(newDate.getUTCDate()).padStart(2, "0");
    const month = String(newDate.getUTCMonth() + 1).padStart(2, "0");
    const year = newDate.getUTCFullYear();

    return `${day}/${month}/${year}`;
  };

  function exportToExcel() {
    if (patrimonio.length === 0) {
      alert("Nenhum dado disponível para exportação!");
      return;
    }

    // Mapeia os dados para o formato desejado na planilha
    const formattedData = patrimonio.map((item) => ({
      Nome: item.Nome ?? "",
      Patrimonio: item.Patrimonio ?? "",
      Responsável: item.NomeDeResponsavel ?? "",
      "Centro de Custo": item.CentroDeCusto ?? "",
      Empresa: item.Empresa ?? "",
      Valor: item.Valor ?? "",
      "Data Emprestado": formatDate(item.DataEmprestado ?? ""),
      "Data Devolvida": formatDate(item.DataDevolvida ?? ""),
      Observação: item.Observacao ?? "",
      "Obs Emprestado": item.ObsEmprestado ?? "",
      "Tipo de Cadastro": item.TipoDeCadastro ?? "",
    }));

    // Cria um novo workbook e adiciona os dados
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ferramentas");

    // Exporta o arquivo Excel
    XLSX.writeFile(workbook, "Patrimonio_Emprestado.xlsx");
  }

  const getFerramentas = async (filters = {}) => {
    console.log("Filtros enviados na requisição:", filters);
    try {
      const response = await api.get("/ferramentas", {
        params: {
          StatusDelete: false,
          StatusEmprestado: true,
          CentroDeCusto: filters.centroCusto || "",
          Empresa: filters.empresa || "",
          DataInicialEmprestado: filters.DataInicialEmprestado || "",
          DataFinalEmprestado: filters.DataFinalEmprestado || "",
          DataInicialDevolvida: filters.dataInicialDevolvida || "",
          DataFinalDevolvida: filters.dataFinalDevolvida || "",
        },
      });
      console.log("Dados recebidos:", response.data);
      setPatrimonio(response.data);
    } catch (error) {
      console.error("Erro ao buscar ferramentas:", error);
    }
  };

  useEffect(() => {
    getFerramentas();
  }, []);

  const handleApplyFilter = (filterData) => {
    console.log("Filtros aplicados:", filterData);
    setModalFiltro(false);
    getFerramentas(filterData);
  };

  const handleDeleteClick = (ferramenta) => {
    setSelectedFerramenta(ferramenta);
    setIsModalDeleteOpen(true);
  };

  const handleDevolvidaClick = (ferramenta) => {
    setSelectedFerramenta(ferramenta);
    setIsModalEmprestadoOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("pt-BR").split("/");
      const formattedDateString = `${formattedDate[0]}/${formattedDate[1]}/${formattedDate[2]}`;

      await api.post("/ferramentaHistorico", {
        ...selectedFerramenta,
        StatusDelete: false,
        DateAlterado: formattedDateString,
      });

      await api.put(`/ferramentas/${selectedFerramenta.id}`, {
        StatusDelete: false,
      });

      setModalConfirm(true);
      getFerramentas();
    } catch (error) {
      console.error("Erro ao deletar a ferramenta:", error);
      alert("Erro ao deletar a ferramenta.");
    }
  };

  const handleCloseEmprestadoModal = () => {
    setIsModalEmprestadoOpen(false);
    setSelectedFerramenta(null);
  };

  const handleCloseDeleteModal = () => {
    setIsModalDeleteOpen(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = patrimonio.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(patrimonio.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="container">
      <div className="sidebar">
        <img src={logo} alt="Logo" className="logo" />
        <button
          className={`sidebar-button ${isActive("/") ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          Cadastro
        </button>
        <button
          className={`sidebar-button ${isActive("/Frotas") ? "active" : ""}`}
          onClick={() => navigate("/Frotas")}
        >
          Frotas
        </button>
        <button
          className={`sidebar-button ${
            isActive("/Ferramentas") ? "active" : ""
          }`}
          onClick={() => navigate("/Ferramentas")}
        >
          Ferramentas
        </button>
        <button
          className={`sidebar-button ${
            isActive("/Emprestado") ? "active" : ""
          }`}
          onClick={() => navigate("/Emprestado")}
        >
          Emprestados
        </button>
      </div>

      <div className="info-panel-container">
        <div className="button-container">
          <button
            className="filter-button"
            onClick={() => setModalFiltro(true)}
          >
            Filtrar
          </button>

          <button className="export-button" onClick={exportToExcel}>
            Exportar
          </button>
        </div>

        <div className="info-panel">
          <div className="container-pag">
            {patrimonio && patrimonio.length === 0 ? (
              <div className="empty-message-emprestada">
                <img className="IconVazioEmp" src={Vazio} alt="Vazio" />
                Nenhum Patrimônio foi emprestado
              </div>
            ) : (
              currentItems.map((ferramenta) => (
                <div className="container-card" key={ferramenta.id}>
                  <div className="info-card">
                    <div className="info-header">
                      <h2>{ferramenta.Nome ?? ""}</h2>
                      <div className="action-icons">
                        <img
                          src={Devolucao}
                          alt="Excluir"
                          className="icon"
                          onClick={() => handleDevolvidaClick(ferramenta)}
                          style={{ cursor: "pointer" }}
                        />
                        <img
                          src={Lixo}
                          alt="Excluir"
                          className="icon"
                          onClick={() => handleDeleteClick(ferramenta)}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </div>
                    <p className="LabelPatrimonio">
                      {ferramenta.Patrimonio ?? ""}
                    </p>
                    <div className="info-columns">
                      <ul>
                        <li>
                          <span>Responsável:</span>{" "}
                          {ferramenta.NomeDeResponsavel ?? ""}
                        </li>
                        <li>
                          <span>Centro de Custo:</span>{" "}
                          {ferramenta.CentroDeCusto ?? ""}
                        </li>
                        <li>
                          <span>Responsável Emprestado:</span>{" "}
                          {ferramenta.ResponsavelEmprestado ?? ""}
                        </li>
                        <li>
                          <span>Tipo de Cadastro:</span>{" "}
                          {ferramenta.TipoDeCadastro ?? ""}
                        </li>
                      </ul>
                      <ul className="listaOrdenada2">
                        <li>
                          <span>Empresa:</span> {ferramenta.Empresa ?? ""}
                        </li>
                        <li>
                          <span>Valor:</span> R$ {ferramenta.Valor ?? ""}
                        </li>
                        <li>
                          <span>Data Emprestado:</span>{" "}
                          {formatDate(ferramenta.DataEmprestado ?? "")}
                        </li>
                        <li>
                          <span>Data Devolvida:</span>{" "}
                          {formatDate(ferramenta.DataDevolvida ?? "")}
                        </li>
                        <li>
                          <span>Status:</span> {ferramenta.Status ?? ""}
                        </li>
                      </ul>
                    </div>
                    <div className="container-obs">
                      <ul>
                        <li>
                          <span>Observação:</span> {ferramenta.Observacao ?? ""}
                        </li>
                        <div className="labelobs">
                          <li>
                            <span>Obs Emprestado:</span>{" "}
                            {ferramenta.ObsEmprestado ?? ""}
                          </li>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="pagination">
            <button
              className="pagination-button"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            <span className="pagination-info">
              Página {currentPage} de {totalPages}
            </span>
            <button
              className="pagination-button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {isModalEmprestadoOpen && (
        <ModalDevolucao
          ferramenta={selectedFerramenta}
          onClose={handleCloseEmprestadoModal}
        />
      )}

      {isModalFiltro && (
        <ModalFiltro
          onClose={() => setModalFiltro(false)}
          onApplyFilter={handleApplyFilter}
        />
      )}

      {isModalDeleteOpen && (
        <ModalConfirmDelete
          message="Tem certeza que deseja deletar esta ferramenta?"
          showModal={isModalDeleteOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseDeleteModal}
        />
      )}

      {isModalConfirm && (
        <ModalConfirm
          message="Patrimônio Deletado com sucesso!"
          onClose={() => {
            setModalConfirm(false);
            setIsModalDeleteOpen(false);
            window.location.reload();
          }}
          messagetittle="Deletado!"
        />
      )}
    </div>
  );
}

export default Ferramentas;
