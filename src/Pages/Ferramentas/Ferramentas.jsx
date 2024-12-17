import { useState, useEffect } from "react";
import "./Ferramentas.css";
import logo from "../../assets/Logo.png";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Lapis from "../../assets/lapis.png";
import Lixo from "../../assets/lixo.png";
import Emprestado from "../../assets/Emprestado.png";
import ModalEdit from "../../Components/ModalEdit/ModalEdit";
import ModalConfirmDelete from "../../Components/ModalConfirmDelete/ModalConfirmDelete";

function Ferramentas() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filterText, setFilterText] = useState(""); // Estado para filtro
  const [patrimonio, setPatrimonio] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFerramenta, setSelectedFerramenta] = useState(null);

  const itemsPerPage = 6;
  const navigate = useNavigate();

  async function getFerramentas() {
    try {
      const patrimonioFromApi = await api.get("/ferramentas", {
        params: { StatusDelete: true, TipoDeCadastro: "Ferramentas" },
      });
      setPatrimonio(patrimonioFromApi.data);
    } catch (error) {
      console.error("Erro ao buscar ferramentas:", error);
    }
  }

  useEffect(() => {
    getFerramentas();
  }, []);

  const handleDeleteClick = (ferramenta) => {
    setSelectedFerramenta(ferramenta);
    setShowDeleteModal(true);
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

      alert("Ferramenta deletada com sucesso!");
      setShowDeleteModal(false);
      getFerramentas(); // Atualiza a lista após a exclusão
    } catch (error) {
      console.error("Erro ao deletar a ferramenta:", error);
      alert("Erro ao deletar a ferramenta.");
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleEditClick = (ferramenta) => {
    setSelectedFerramenta(ferramenta);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFerramenta(null);
    getFerramentas(); // Atualiza a lista após edição
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = patrimonio
    .filter(
      (ferramenta) =>
        ferramenta.Nome.toLowerCase().includes(filterText.toLowerCase()) // Filtro
    )
    .slice(indexOfFirstItem, indexOfLastItem);

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

  return (
    <div className="container">
      <div className="sidebar">
        <img src={logo} alt="Logo" className="logo" />
        <button className="sidebar-button" onClick={() => navigate("/")}>
          Cadastro
        </button>
        <button className="sidebar-button" onClick={() => navigate("/Frotas")}>
          Frotas
        </button>
        <button
          className="sidebar-button"
          onClick={() => navigate("/Ferramentas")}
        >
          Ferramentas
        </button>
        <button
          className="sidebar-button"
          onClick={() => navigate("/Emprestado")}
        >
          Emprestados
        </button>
      </div>

      <div className="info-panel-container">
        <div className="button-container">
          <input
            type="text"
            className="filter-input"
            placeholder="Digite para filtrar..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)} // Atualiza o filtro
          />
          <button className="filter-button">Filtrar</button>
          <button className="export-button">Exportar</button>
        </div>

        <div className="info-panel">
          <div className="container-pag">
            {currentItems.map((ferramenta) => (
              <div className="container-card" key={ferramenta.id}>
                <div className="info-card">
                  <div className="info-header">
                    <h2>{ferramenta.Nome}</h2>
                    <div className="action-icons">
                      <img src={Emprestado} alt="Emprestar" className="icon" />
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
                  <p>{ferramenta.Patrimonio}</p>
                  <div className="info-columns">
                    <ul>
                      <li>
                        <span>Responsável:</span> {ferramenta.NomeDeResponsavel}
                      </li>
                      <li>
                        <span>Centro de Custo:</span> {ferramenta.CentroDeCusto}
                      </li>
                      <li>
                        <span>Responsavel Emprestado:</span>{" "}
                        {ferramenta.ResponsavelEmprestado}
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <span>Empresa:</span> {ferramenta.Empresa}
                      </li>
                      <li>
                        <span>Valor:</span> R$ {ferramenta.Valor}
                      </li>
                      <li>
                        <span>Data Emprestado:</span>{" "}
                        {ferramenta.DataEmprestado}
                      </li>
                      <li>
                        <span>Data Devolvida:</span> {ferramenta.DataDevolvida}
                      </li>
                    </ul>
                  </div>
                  <div className="container-obs">
                    <ul>
                      <li>
                        <span>Observação:</span> {ferramenta.Observacao}
                      </li>
                      <li>
                        <span>Obs Emprestado:</span> {ferramenta.ObsEmprestado}
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

      {isModalOpen && (
        <ModalEdit ferramenta={selectedFerramenta} onClose={handleCloseModal} />
      )}

      {showDeleteModal && (
        <ModalConfirmDelete
          message="Tem certeza que deseja deletar esta ferramenta?"
          showModal={showDeleteModal}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default Ferramentas;
