import { useState, useEffect } from 'react';
import './Ferramentas.css';
import logo from '../../assets/Logo.png';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Lapis from '../../assets/lapis.png'
import Lixo from '../../assets/lixo.png'


function Ferramentas() {
  const navigate = useNavigate();
  const [patrimonio, setPatrimonio] = useState([]);

  async function getFerramentas() {
    const patrimonioFromApi = await api.get('/ferramentas');
    setPatrimonio(patrimonioFromApi.data);
  }

  useEffect(() => {
    getFerramentas();
  }, []);

  return (
    <div className="container">
      <div className="sidebar">
        <img src={logo} alt="Logo" className="logo" />
        <button className="sidebar-button" onClick={() => navigate('/')}>
          Cadastro
        </button>
        <button className="sidebar-button" onClick={() => navigate('/Frotas')}>
          Frotas
        </button>
        <button className="sidebar-button" onClick={() => navigate('/Ferramentas')}>
          Ferramentas
        </button>
      </div>

      <div className="info-panel-container">
        <div className="button-container">
          <input type="text" className="filter-input" placeholder="Digite para filtrar..." />
          <button className="filter-button">Filtrar</button>
          <button className="export-button">Exportar</button>
        </div>
        <div className="info-panel">
          {patrimonio.map((ferramenta) => (
            <div className="container-card" key={ferramenta.id}>
              <div className="info-card">
                <div className="info-details">
                  <div className="info-header">
                    <h2>{ferramenta.Nome}</h2>
                    <div className="action-icons">
                      <img src={Lapis} alt="Editar" class="icon"></img>
                        <img src={Lixo} alt="Excluir" class="icon"></img>
                        </div>
                    </div>
                    <p>{ferramenta.Patrimonio}</p>
                    <div class="info-columns">
                      <ul>
                        
                        <li><span>Responsável:</span> {ferramenta.NomeDeResponsavel}</li>
                        <li><span>Status:</span> {ferramenta.Status}</li>
                        <li><span>Centro de Custo:</span> {ferramenta.CentroDeCusto}</li>
                      </ul>
                      <ul>
                       <li><span>Empresa:</span> {ferramenta.Empresa}</li>
                       <li><span>Valor: </span>R$ {ferramenta.Valor}</li>
                      <li><span>Tipo de Cadastro:</span> {ferramenta.TipoDeCadastro}</li>
                
                        <li></li>
                      </ul>
                    </div>
                    <div className="container-obs">
                    <span>Observação:</span> {ferramenta.Observacao}
                    </div>
                  </div>
                </div>
              </div>
          ))}
            </div>
      </div>
      </div>
      );
}

      export default Ferramentas;
