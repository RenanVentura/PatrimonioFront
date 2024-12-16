import React, { useState, useEffect } from 'react';
import './ModalEdit.css';
import api from '../../services/api';
import logo from '../../assets/Logo.png';
import Lixo from '../../assets/lixo.png';

function ModalEdit({ ferramenta, onClose }) {
    const [editedFerramenta, setEditedFerramenta] = useState(ferramenta);

    useEffect(() => {
        setEditedFerramenta(ferramenta);
    }, [ferramenta]);

    const handleUpdate = async (id) => {
        try {
            // Criando o backup da ferramenta antes de atualizar
            await api.post('/ferramentaHistorico', {
                Nome: ferramenta.Nome,
                Patrimonio: ferramenta.Patrimonio,
                NomeDeResponsavel: ferramenta.NomeDeResponsavel,
                ResponsavelEmprestado: ferramenta.ResponsavelEmprestado,
                Status: ferramenta.Status,
                CentroDeCusto: ferramenta.CentroDeCusto,
                Empresa: ferramenta.Empresa,
                Valor: ferramenta.Valor,
                TipoDeCadastro: ferramenta.TipoDeCadastro,
                DataEmprestado: ferramenta.DataEmprestado,
                DataDevolvida: ferramenta.DataDevolvida,
                ObsEmprestado: ferramenta.ObsEmprestado,
                Observacao: ferramenta.Observacao,
                // Campos adicionais que você possa ter
            });

            // Atualizando os dados no banco de dados principal
            await api.put(`/ferramentas/${id}`, editedFerramenta);

            alert('Ferramenta atualizada com sucesso!');
            window.location.reload();
        } catch (error) {
            alert('Erro ao atualizar ferramenta');
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedFerramenta({
            ...editedFerramenta,
            [name]: value
        });
    };

    if (!ferramenta) return null; 

    return (
        <div className="formEdit">
            <div className="container-card">
                <div className="titleEdit">
                    <img className="logoQually" src={logo} alt="Logo" />
                    <h2>Editar Ferramenta:<br />
                        {ferramenta.Nome}</h2>
                    <img className="Lixo" src={Lixo} alt="Lixo" />
                    <button className="close" onClick={onClose}>X</button>
                </div>
                <div className="containerEdit">
                    <div className="data-container">
                        <div className="tituloInput">Patrimônio</div>
                        <input
                            type="text"
                            name="Patrimonio"
                            placeholder="Patrimônio"
                            value={editedFerramenta.Patrimonio || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="data-container">
                        <div className="tituloInput">Responsável</div>
                        <input
                            type="text"
                            name="NomeDeResponsavel"
                            placeholder="Responsável"
                            value={editedFerramenta.NomeDeResponsavel || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="data-container">
                        <div className="tituloInput">Responsável Emprestado</div>
                        <input
                            type="text"
                            name="ResponsavelEmprestado"
                            placeholder="Responsável Emprestado"
                            value={editedFerramenta.ResponsavelEmprestado || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="data-container">
                        <div className="tituloInput">Status</div>
                        <select
                            name="Status"
                            value={editedFerramenta.Status || ''}
                            onChange={handleChange}
                        >
                            <option value="Ativo">Ativo</option>
                            <option value="Emprestado">Emprestado</option>
                            <option value="Inativo">Inativo</option>
                        </select>
                    </div>
                    <div className="data-container">
                        <div className="tituloInput">Centro de Custo</div>
                        <select
                            type="text"
                            name="CentroDeCusto"
                            placeholder="Centro de Custo"
                            value={editedFerramenta.CentroDeCusto || ''}
                            onChange={handleChange}
                        >
                            <option value="Oficina">Oficina</option>
                            <option value="Agricola">Agricola</option>
                            <option value="Logistica">Logistica</option>
                            <option value="Frotas">Frotas</option>
                            <option value="Almoxarifado">Almoxarifado</option>
                        </select>
                    </div>
                    <div className="data-container">
                        <div className="tituloInput">Empresa</div>
                        <select
                            type="text"
                            name="Empresa"
                            placeholder="Empresa"
                            value={editedFerramenta.Empresa || ''}
                            onChange={handleChange}
                        >
                            <option value="Qually Matriz">Qually Matriz</option>
                            <option value="Qually Bahia">Qually Bahia</option>
                            <option value="Qually Ceara">Qually Ceara</option>
                            <option value="Qually Paraiba">Qually Paraiba</option>
                            <option value="Isaac Grama">Isaac Grama</option>
                            <option value="Isaac Cereais">Isaac Cereais</option>
                            <option value="Isaac Feno">Isaac Feno</option>
                        </select>
                    </div>
                    <div className="data-container">
                        <div className="tituloInput">Valor</div>
                        <input
                            type="number"
                            name="Valor"
                            placeholder="Valor"
                            value={editedFerramenta.Valor || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="data-container">
                        <div className="tituloInput">Tipo de Cadastro</div>
                        <select
                            type="text"
                            name="TipoDeCadastro"
                            placeholder="Tipo de Cadastro"
                            value={editedFerramenta.TipoDeCadastro || ''}
                            onChange={handleChange}
                        >
                            <option value="Frotas">Frotas</option>
                            <option value="Ferramentas">Ferramentas</option>
                        </select>
                    </div>
                    <div className="data-container">
                        <div className="tituloInput">Data Emprestada</div>
                        <input
                            type="date"
                            name="DataEmprestado"
                            value={editedFerramenta.DataEmprestado || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="data-container">
                        <div className="tituloInput">Data Devolvida</div>
                        <input
                            type="date"
                            name="DataDevolvida"
                            value={editedFerramenta.DataDevolvida || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="data-container">
                        <div className="tituloInput">Observação Emprestado</div>
                        <textarea
                            name="ObsEmprestado"
                            placeholder="Observação Emprestado"
                            value={editedFerramenta.ObsEmprestado || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="data-container">
                        <div className="tituloInput">Observação</div>
                        <textarea
                            name="Observacao"
                            placeholder="Observação"
                            value={editedFerramenta.Observacao || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <button onClick={() => handleUpdate(ferramenta.id)}>Salvar alterações</button>
                </div>
            </div>
        </div>
    );
}

export default ModalEdit;
