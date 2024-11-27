import React, { useState, useEffect } from 'react';
import './ModalEdit.css';
import api from '../services/api';
import logo from '../assets/Logo.png';
import Lixo from '../assets/lixo.png';

function ModalEdit({ ferramenta, onClose }) {
    const [editedFerramenta, setEditedFerramenta] = useState(ferramenta);

    useEffect(() => {
        setEditedFerramenta(ferramenta); // Atualiza os dados quando a ferramenta for passada para o modal
    }, [ferramenta]);

    const handleUpdate = async (id) => {
        try {
            await api.put(`/ferramentas/${id}`, editedFerramenta);
            alert('Ferramenta atualizada com sucesso!');
            onClose(); // Fecha o modal após atualização
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

    if (!ferramenta) return null; // Garantir que ferramenta não seja null ou undefined

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
                        <input
                            type="text"
                            name="Status"
                            placeholder="Status"
                            value={editedFerramenta.Status || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="data-container">
                        <div className="tituloInput">Centro de Custo</div>
                        <input
                            type="text"
                            name="CentroDeCusto"
                            placeholder="Centro de Custo"
                            value={editedFerramenta.CentroDeCusto || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="data-container">
                        <div className="tituloInput">Empresa</div>
                        <input
                            type="text"
                            name="Empresa"
                            placeholder="Empresa"
                            value={editedFerramenta.Empresa || ''}
                            onChange={handleChange}
                        />
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
                        <input
                            type="text"
                            name="TipoDeCadastro"
                            placeholder="Tipo de Cadastro"
                            value={editedFerramenta.TipoDeCadastro || ''}
                            onChange={handleChange}
                        />
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
                            name="Observacao"
                            placeholder="Observação Emprestado"
                            value={editedFerramenta.ObsEmprestado || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="data-container">
                        <div className="tituloInput">Observação Emprestado</div>
                        <textarea
                            name="Observação"
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
