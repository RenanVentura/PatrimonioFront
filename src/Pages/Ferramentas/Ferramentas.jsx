import { useState, useEffect } from "react";
import "./Ferramentas.css";
import logo from "../../assets/Logo.png";
import api from "../../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import Lapis from "../../assets/lapis.png";
import Lixo from "../../assets/lixo.png";
import Emprestado from "../../assets/Emprestado.png";
import ModalEdit from "../../Components/ModalEdit/ModalEdit";
import ModalConfirmDelete from "../../Components/ModalConfirmDelete/ModalConfirmDelete";
import ModalEmprestado from "../../Components/ModalEmprestado/ModalEmprestado";

function Ferramentas() {
  const [patrimonio, setPatrimonio] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFerramenta, setSelectedFerramenta] = useState(null);

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalEmprestadoOpen, setIsModalEmprestadoOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const itemsPerPage = 6;
  const navigate = useNavigate();
  const location = useLocation(); // Hook para obter a rota atual

  async function getFerramentas() {
    try {
      const patrimonioFromApi = await api.get("/ferramentas", {
        params: {
          StatusDelete: false,
          StatusEmprestado: false,
          TipoDeCadastro: "Ferramentas",
        },
      });
      setPatrimonio(patrimonioFromApi.data);
    } catch (error) {
      console.error("Erro ao buscar ferramentas:", error);
    }
  }

  const formatDate = (date) => {
    if (!date) return "";

    const newDate = new Date(date);
    if (isNaN(newDate.getTime())) return "";

    const day = String(newDate.getUTCDate()).padStart(2, "0");
    const month = String(newDate.getUTCMonth() + 1).padStart(2, "0");
    const year = newDate.getUTCFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    getFerramentas();
  }, []);

  const handleDeleteClick = (ferramenta) => {
    setSelectedFerramenta(ferramenta);
    setIsModalDeleteOpen(true);
  };

  const handleEmprestaClick = (ferramenta) => {
    setSelectedFerramenta(ferramenta);
    setIsModalEmprestadoOpen(true);
  };

  const handleEditClick = (ferramenta) => {
    setSelectedFerramenta(ferramenta);
    setIsModalEditOpen(true);
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
        StatusDelete: true,
      });

      alert("Ferramenta deletada com sucesso!");
      setIsModalDeleteOpen(false);
      getFerramentas();
    } catch (error) {
      console.error("Erro ao deletar a ferramenta:", error);
      alert("Erro ao deletar a ferramenta.");
    }
  };

  const handleCloseEditModal = () => {
    setIsModalEditOpen(false);
    setSelectedFerramenta(null);
    getFerramentas();
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
          <button className="filter-button">Filtrar</button>
          <button className="export-button">Exportar</button>
        </div>

        <div className="info-panel">
          <div className="container-pag">
            {currentItems.map((ferramenta) => (
              <div className="container-card" key={ferramenta.id}>
                <div className="info-card">
                  <div className="info-header">
                    <h2>{ferramenta.Nome ?? ""}</h2>
                    <div className="action-icons">
                      <img
                        src={Emprestado}
                        alt="Emprestar"
                        className="iconEmprestado"
                        onClick={() => handleEmprestaClick(ferramenta)}
                      />
                      <img
                        src={Lapis}
                        alt="Editar"
                        className="icon"
                        onClick={() => handleEditClick(ferramenta)}
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
                  <p>{ferramenta.Patrimonio ?? ""}</p>
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
                        <span>Responsavel Emprestado:</span>{" "}
                        {ferramenta.ResponsavelEmprestado ?? ""}
                      </li>
                    </ul>
                    <ul>
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
                    </ul>
                  </div>
                  <div className="container-obs">
                    <ul>
                      <li>
                        <span>Observação:</span> {ferramenta.Observacao ?? ""}
                      </li>
                      <li>
                        <span>Obs Emprestado:</span>{" "}
                        {ferramenta.ObsEmprestado ?? ""}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              className="pagination-button"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span className="pagination-info">
              Página {currentPage} de {totalPages}
            </span>
            <button
              className="pagination-button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Próximo
            </button>
          </div>
        </div>
      </div>

      {isModalEditOpen && (
        <ModalEdit
          ferramenta={selectedFerramenta}
          onClose={handleCloseEditModal}
        />
      )}

      {isModalEmprestadoOpen && (
        <ModalEmprestado
          ferramenta={selectedFerramenta}
          onClose={handleCloseEmprestadoModal}
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
    </div>
  );
}

export default Ferramentas;
