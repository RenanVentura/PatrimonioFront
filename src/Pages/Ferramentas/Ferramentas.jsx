import { useState, useEffect } from 'react';
import './Ferramentas.css';
import logo from '../../assets/Logo.png';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

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
            <div key={ferramenta.id}>
              <div className="info-card">

                <div className="info-details">
                  <h2>{ferramenta.Nome}</h2>
                  <p><span></span>{ferramenta.Patrimonio}</p>
                  <div className="info-columns">
                    <ul>
                      <li>Valor: {ferramenta.Valor}</li>
                      <li>Empresa: {ferramenta.Empresa}</li>
                      <li>Responsável: {ferramenta.NomeDeResponsavel}</li>
                      <li>Status: {ferramenta.Status}</li>
                    </ul>
                    <ul>
                      <li>Centro de Custo: {ferramenta.CentroDeCusto}</li>
                      <li>Tipo de Cadastro: {ferramenta.TipoDeCadastro}</li>
                      <li>Observação: {ferramenta.Observacao}</li>
                    </ul>
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
