import { useState, useEffect } from 'react';
import './Ferramentas.css';
import logo from '../../assets/Logo.png';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Lapis from '../../assets/lapis.png';
import Lixo from '../../assets/lixo.png';
import Emprestado from '../../assets/Emprestado.png';
import ModalEdit from '../../Components/ModalEdit/ModalEdit';

function Ferramentas() {
  const navigate = useNavigate();
  const [patrimonio, setPatrimonio] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // Estado para controlar o modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFerramenta, setSelectedFerramenta] = useState(null); // Ferramenta selecionada para edição

  async function getFerramentas() {
    const patrimonioFromApi = await api.get('/ferramentas');
    setPatrimonio(patrimonioFromApi.data);
  }

  useEffect(() => {
    getFerramentas();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = patrimonio.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(patrimonio.length / itemsPerPage);

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  // Função para abrir o modal de edição
  const handleEditClick = (ferramenta) => {
    setSelectedFerramenta(ferramenta);
    setIsModalOpen(true); // Abre o modal
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFerramenta(null);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <img src={logo} alt="Logo" className="logo" />
        <button className="sidebar-button" onClick={() => navigate('/')} >
          Cadastro
        </button>
        <button className="sidebar-button" onClick={() => navigate('/Frotas')} >
          Frotas
        </button>
        <button className="sidebar-button" onClick={() => navigate('/Ferramentas')} >
          Ferramentas
        </button>
        <button className="sidebar-button" onClick={() => navigate('/Emprestado')}>
          Emprestados
        </button>
      </div>

      <div className="info-panel-container">
        <div className="button-container">
          <input type="text" className="filter-input" placeholder="Digite para filtrar..." />
          <button className="filter-button">Filtrar</button>
          <button className="export-button">Exportar</button>
        </div>
        <div className="info-panel">
          <div className="container-pag">
            {currentItems.map((ferramenta) => (
              <div className="container-card" key={ferramenta.id}>
                <div className="info-card">
                  <div className="info-details">
                    <div className="info-header">
                      <h2>{ferramenta.Nome}</h2>
                      <div className="action-icons">
                        <img src={Emprestado} alt="Emprestar" className="icon" />
                        <img 
                          src={Lapis} 
                          alt="Editar"  
                          className="icon" 
                          onClick={() => handleEditClick(ferramenta)} // Chama a função de abrir o modal
                        />
                        <img src={Lixo} alt="Excluir" className="icon" />
                      </div>
                    </div>
                    <p>{ferramenta.Patrimonio}</p>
                    <div className="info-columns">
                      <ul>
                        <li><span>Responsável:</span> {ferramenta.NomeDeResponsavel}</li>
                        <li><span>Centro de Custo:</span> {ferramenta.CentroDeCusto}</li>
                        <li><span>Responsavel Emprestado:</span> {ferramenta.ResponsavelEmprestado}</li>
                      </ul>
                      <ul>
                        <li><span>Empresa:</span> {ferramenta.Empresa}</li>
                        <li><span>Valor: </span>R$ {ferramenta.Valor}</li>
                        <li><span>Data Emprestado:</span> {ferramenta.DataEmprestado}</li>
                        <li><span>Data Devolvida:</span> {ferramenta.DataDevolvida}</li>
                      </ul>
                    </div>
                    <div className="container-obs">
                      <ul>
                        <li><span>Observação:</span> {ferramenta.Observacao}</li>
                        <li><span>Obs Emprestado:</span> {ferramenta.ObsEmprestado}</li>
                      </ul>
                    </div>
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

      {/* ModalEdit - Condicionalmente renderizado */}
      {isModalOpen && 
        <ModalEdit 
          ferramenta={selectedFerramenta} 
          onClose={handleCloseModal} 
        />
      }
    </div>
  );
}

export default Ferramentas;
