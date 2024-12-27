import { useState, useRef, useEffect } from "react";
import "./Forms.css";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/Logo.png";
import api from "../../services/api";
import ModalCC from "../../Components/ModalCentroCusto/ModalCentroCusto";
import ModalEmpresa from "../../Components/ModalEmpresa/ModalEmpresa";
import ModalConfirm from "../../Components/ModalConfirm/ModalConfirm";

function Forms() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEmp, setIsModalOpenEmp] = useState(false);
  const [isModalConfirm, setModalConfirm] = useState(false);
  const [filiais, setFiliais] = useState([]);
  const [selectFiliais, setSelectFiliais] = useState("");
  const [centrocusto, setCentroCusto] = useState([]);
  const [selectCentroCusto, setSelectCentroCusto] = useState("");

  const inputNome = useRef();
  const inputTipoDeCadastro = useRef();
  const inputValor = useRef();
  const inputPatrimonio = useRef();
  const inputNomeDoResponsavel = useRef();
  const inputObservacao = useRef();

  useEffect(() => {
    const consultaFiliais = async () => {
      try {
        const holding = await api.get("/Empresa");
        setFiliais(holding.data);
      } catch (error) {
        console.error("Erro ao carregar filiais", error);
      }
    };
    consultaFiliais();
  }, []);

  useEffect(() => {
    const consultaCentro = async () => {
      try {
        const classes = await api.get("/CentroCusto");
        setCentroCusto(classes.data);
      } catch (error) {
        console.error("Erro ao carregar o centro de custo", error);
      }
    };
    consultaCentro();
  }, []);

  const createSoli = async () => {
    const preco = parseFloat(inputValor.current.value);
    try {
      await api.post("/ferramentas", {
        Nome: inputNome.current.value,
        Valor: preco,
        Patrimonio: inputPatrimonio.current.value,
        Observacao: inputObservacao.current.value,
        Empresa: selectFiliais,
        CentroDeCusto: selectCentroCusto,
        NomeDeResponsavel: inputNomeDoResponsavel.current.value,
        TipoDeCadastro: inputTipoDeCadastro.current.value,
        Status: "Ativo",
        StatusDelete: false,
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

      setModalConfirm(true);

      // Reset dos inputs
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
  };

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
      <div className="form-container">
        <form className="Formulario">
          <h1>Cadastro de Patrimônio</h1>

          <div className="tutiloInput">
            <span>Nome Patrimônio</span>
          </div>
          <input
            name="Nome"
            type="text"
            placeholder="Nome do Patrimônio"
            ref={inputNome}
          />

          <div className="tutiloInput">
            <span>Patrimônio</span>
          </div>
          <input
            name="Patrimonio"
            type="text"
            placeholder="Patrimônio"
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
            value={selectFiliais}
            onChange={(e) => setSelectFiliais(e.target.value)}
          >
            <option value="">Selecione uma Empresa</option>
            {filiais.map((filial) => (
              <option key={filial.id} value={filial.Empresa}>
                {filial.Empresa}
              </option>
            ))}
          </select>
          <div className="linkCadastro">
            <span
              onClick={() => setIsModalOpenEmp(true)}
              className="linkClickable"
            >
              Cadastro de Empresa
            </span>
          </div>

          <div className="tutiloInput">
            <span>Centro de Custo</span>
          </div>
          <select
            name="CentroDeCusto"
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
          <div className="linkCadastro">
            <span
              onClick={() => setIsModalOpen(true)}
              className="linkClickable"
            >
              Cadastro de Centro de Custo
            </span>
          </div>

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

      {isModalOpen && <ModalCC onClose={() => setIsModalOpen(false)} />}
      {isModalConfirm && (
        <ModalConfirm
          message="Cadastro Concluido com sucesso!"
          onClose={() => setModalConfirm(false)}
        />
      )}
      {isModalOpenEmp && (
        <ModalEmpresa onClose={() => setIsModalOpenEmp(false)} />
      )}
    </div>
  );
}

export default Forms;
