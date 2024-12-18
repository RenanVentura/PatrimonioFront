import { useState, useRef, useEffect } from "react";
import "./Forms.css";
import logo from "../../assets/Logo.png";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Forms() {
  const navigate = useNavigate();

  const [filiais, setFiliais] = useState([]);
  const [selectFiliais, setSelectFiliais] = useState("");
  const [centrocusto, setCentroCusto] = useState([]);
  const [selectCentroCusto, setSelectCentroCusto] = useState("");

  const inputNome = useRef();
  const inputTipoDeCadastro = useRef();
  const inputStatus = useRef();
  const inputValor = useRef();
  const inputPatrimonio = useRef();
  const inputEmpresa = useRef();
  const inputCentroDeCusto = useRef();
  const inputNomeDoResponsavel = useRef();
  const inputObservacao = useRef();

  useEffect(() => {
    async function consultaFiliais() {
      try {
        const holding = await api.get("/Empresa");
        setFiliais(holding.data);
      } catch (error) {
        console.error("Erro ao carregar filiais", error);
      }
    }
    consultaFiliais();
  }, []);

  useEffect(() => {
    async function consultaCentro() {
      try {
        const classes = await api.get("/CentroCusto");
        setCentroCusto(classes.data);
      } catch (error) {
        console.error("Erro ao carregar o centro de custo", error);
      }
    }
    consultaCentro();
  }, []);

  async function createSoli() {
    const preco = parseFloat(inputValor.current.value);
    try {
      const response = await api.post("/ferramentas", {
        Nome: inputNome.current.value,
        Valor: preco,
        Patrimonio: inputPatrimonio.current.value,
        Observacao: inputObservacao.current.value,
        Empresa: selectFiliais,
        CentroDeCusto: selectCentroCusto,
        NomeDeResponsavel: inputNomeDoResponsavel.current.value,
        TipoDeCadastro: inputTipoDeCadastro.current.value,
        Status: "Ativo",
        StatusDelete: true,
        ObsEmprestado: null,
        ResponsavelEmprestado: null,
        DataEmprestado: null,
        DataDevolvida: null,
        StatusEmprestado: false,
      });

      await api.post("/FerramentaHistorico", {
        Nome: inputNome.current.value,
        Valor: preco,
        Patrimonio: inputPatrimonio.current.value,
        Observacao: inputObservacao.current.value,
        Empresa: selectFiliais,
        CentroDeCusto: selectCentroCusto,
        NomeDeResponsavel: inputNomeDoResponsavel.current.value,
        TipoDeCadastro: inputTipoDeCadastro.current.value,
        Status: "Ativo",
        StatusDelete: true,
        ObsEmprestado: null,
        ResponsavelEmprestado: null,
        DataEmprestado: null,
        DataDevolvida: null,
        StatusEmprestado: false,
      });
      console.log("Cadastro realizado com sucesso");
      alert("Cadastro realizado com sucesso!");

      // Reseta os valores dos inputs
      inputNome.current.value = "";
      inputTipoDeCadastro.current.value = "Tipo de Cadastro";
      inputValor.current.value = "";
      inputPatrimonio.current.value = "";
      inputObservacao.current.value = "";
      inputNomeDoResponsavel.current.value = "";
      setSelectFiliais("");
      setSelectCentroCusto("");
    } catch (error) {
      console.error("Erro ao enviar o formulário", error);
      alert("Erro ao enviar o formulário. Tente novamente mais tarde.");
    }
  }

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

      <div className="form-container">
        <form className="Formulario">
          <h1>Cadastro de Patrimônio</h1>

          <div className="tutiloInput">
            <span>Nome Patrimonio</span>
          </div>
          <input
            name="Nome"
            type="text"
            placeholder="Nome do Patrimônio"
            ref={inputNome}
          />

          <div className="tutiloInput">
            <span>Patrimonio</span>
          </div>
          <input
            name="Patrimonio"
            type="text"
            placeholder="Patrimonio"
            ref={inputPatrimonio}
          />

          <div className="tutiloInput">
            <span>Tipo de Cadastro</span>
          </div>
          <select name="TipoDeCadastro" ref={inputTipoDeCadastro}>
            <option>Tipo de Cadastro</option>
            <option value="Ferramentas">Ferramentas</option>
            <option value="Frotas">Frotas</option>
          </select>

          <div className="tutiloInput">
            <span>Valor</span>
          </div>
          <input
            name="Valor"
            type="number"
            placeholder="Valor"
            ref={inputValor}
          />

          <div className="tutiloInput">
            <span>Empresas</span>
          </div>
          <select
            name="Empresa"
            type="text"
            value={selectFiliais}
            onChange={(e) => setSelectFiliais(e.target.value)}
          >
            <option value="">Selecione uma Filial</option>
            {filiais.map((filial) => (
              <option key={filial.id} value={filial.Empresa}>
                {filial.Empresa}
              </option>
            ))}
          </select>

          <div className="tutiloInput">
            <span>Centro de Custo</span>
          </div>
          <select
            name="CentroDeCusto"
            type="text"
            value={selectCentroCusto}
            onChange={(e) => setSelectCentroCusto(e.target.value)}
          >
            <option value="">Selecione um Centro de Custo</option>
            {centrocusto.map((custos) => (
              <option key={custos.id} value={custos.CentroCusto}>
                {custos.CentroCusto}
              </option>
            ))}
          </select>

          <div className="tutiloInput">
            <span>Responsável</span>
          </div>
          <input
            name="NomeDoResponsavel"
            type="text"
            placeholder="Nome do Responsável"
            ref={inputNomeDoResponsavel}
          />

          <div className="tutiloInput">
            <span>Observação</span>
          </div>
          <textarea
            name="Observacao"
            placeholder="Observação"
            ref={inputObservacao}
          />
          <button type="button" onClick={createSoli}>
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forms;
