import { useState, useRef } from 'react';
import './Forms.css';
import logo from '../../assets/Logo.png';
import api from '../../services/api';
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

  async function createSoli() {
    const valor = parseFloat(inputValor.current.value);
    try {
      // Envia os dados para a API
      const response = await api.post('/ferramentas', {
        Nome: inputNome.current.value,
        Valor: valor,
        Patrimonio: inputPatrimonio.current.value,
        Observacao: inputObservacao.current.value,
        Empresa: inputEmpresa.current.value,
        CentroDeCusto: inputCentroDeCusto.current.value,
        NomeDeResponsavel: inputNomeDoResponsavel.current.value,
        TipoDeCadastro: inputTipoDeCadastro.current.value,
        Status: 'Ativo',  // Ou use inputStatus.current.value se quiser permitir a seleção
        StatusDelete: true
      });

      console.log('Cadastro realizado com sucesso', response);
      alert('Cadastro realizado com sucesso!');

      // Limpa os campos do formulário após o envio
      inputNome.current.value = '';
      inputValor.current.value = '';
      inputPatrimonio.current.value = '';
      inputObservacao.current.value = '';
      inputEmpresa.current.value = 'Empresa';
      inputCentroDeCusto.current.value = '';
      inputNomeDoResponsavel.current.value = '';
      inputTipoDeCadastro.current.value = 'Tipo de Cadastro';
    } catch (error) {
      console.error('Erro ao enviar o formulário', error);
      alert('Erro ao enviar o formulário. Tente novamente mais tarde.');
    }
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
        <button className="sidebar-button" onClick={() => navigate('/Emprestado')}>
          Emprestados
        </button>
      </div>

      <div className="form-container">
        <form>
          <h1>Cadastro de Patrimônio</h1>
          <input name="Nome" type="text" placeholder="Nome do Patrimônio" ref={inputNome} />
          <input name="Patrimonio" type="text" placeholder="Patrimonio" ref={inputPatrimonio} />
          <select name="TipoDeCadastro" ref={inputTipoDeCadastro}>
            <option>Tipo de Cadastro</option>
            <option value="Ferramenta">Ferramentas</option>
            <option value="Frota">Frotas</option>
          </select>
          <input name="Valor" type="number" placeholder="Valor" ref={inputValor} />
          <select name="Empresa" ref={inputEmpresa}>
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
          <textarea name="Observacao" placeholder="Observação" ref={inputObservacao} />
          <button type="button" onClick={createSoli}>Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Forms;
