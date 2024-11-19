import { useState, useRef } from 'react';
import './Forms.css';
import logo from '../../assets/Logo.png';
import api from '../../services/api'
import { useNavigate } from 'react-router-dom';

function Forms() {

  const navigate = useNavigate();

  const inputNome = useRef();
  const inputTipoDeCadastro = useRef();
  const inputStatus = useRef();
  const inputValor = useRef();
  const inputPatrimonio = useRef();
  const inputEmpresa = useRef();
  const inputCentroDeCusto = useRef();
  const inputNomeDoResponsavel = useRef();
  const inputObservacao = useRef();
  const inputImagem = useRef(); // Nova referência

  async function createSoli() {

    const valor = parseFloat(inputValor.current.value);
    api.post('/ferramentas', {
      Nome: inputNome.current.value,
      Valor: valor,
      Patrimonio: inputPatrimonio.current.value,
      Observacao: inputObservacao.current.value,
      Empresa: inputEmpresa.current.value,
      CentroDeCusto: inputCentroDeCusto.current.value,
      NomeDeResponsavel: inputNomeDoResponsavel.current.value,
      TipoDeCadastro: inputTipoDeCadastro.current.value,
      Status: 'Ativo',//inputStatus.current.value,
      Imagem: inputImagem.current.files[0]?.name || '', 
      StatusDelete: true
    });
    console.log('Requisição Concluída');

    inputNome.current.value = '';
    inputValor.current.value = '';
    inputPatrimonio.current.value = '';
    inputObservacao.current.value = '';
    inputEmpresa.current.value = 'Empresa';
    inputCentroDeCusto.current.value = '';
    inputNomeDoResponsavel.current.value = '';
    inputTipoDeCadastro.current.value = 'Tipo de Cadastro';
    // inputStatus.current.value = 'Status';
    inputImagem.current.value = ''; 
  }

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

      <div className="form-container">
        <form>
          <h1>Cadastro de Patrimônio</h1>
          <input name="Nome" type="text" placeholder="Nome do Patrimônio" ref={inputNome} />
          <input name="Patrimonio" type="text" placeholder="Patrimonio" ref={inputPatrimonio} />
          <select name="TipoDeCadastro" type="text" placeholder="Tipo de Cadastro" ref={inputTipoDeCadastro}>
            <option>Tipo de Cadastro</option>
            <option value="Ferramenta">Ferramentas</option>
            <option value="Frotas">Frotas</option>
          </select>
          {/* <select name="Status" type="text" placeholder="Status" ref={inputStatus}>
            <option>Status</option>
            <option value="Ativo">Ativo</option>
            <option value="Baixado">Baixado</option>
          </select> */}
          <input name="Valor" type="number" placeholder="Valor" ref={inputValor} />
          <select name="Empresa" type="text" placeholder="Empresa" ref={inputEmpresa}>
            <option>Empresa</option>
            <option value="Qually Matriz">Qually Matriz</option>
            <option value="Qually Bahia">Qually Bahia</option>
            <option value="Qually Ceara">Qually Ceara</option>
            <option value="Qually Paraiba">Qually Paraiba</option>
            <option value="Isaac Grama">Isaac Grama</option>
            <option value="Isaac Cereais">Isaac Cereais</option>
            <option value="Isaac Feno">Isaac Feno</option>
          </select>
          <input name="CentroDeCusto" type="text" placeholder="Centro de Custo" ref={inputCentroDeCusto} />
          <input name="NomeDoResponsavel" type="text" placeholder="Nome do Responsável" ref={inputNomeDoResponsavel} />
          <textarea name="Observacao" type="text" placeholder="Observação" ref={inputObservacao} />
          <input name="Imagem" type="file" ref={inputImagem} /> {/* Campo de imagem */}
          <button type="button" onClick={() => createSoli()}>Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Forms;
