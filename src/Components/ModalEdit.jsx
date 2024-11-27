import React, { useState, useEffect } from 'react';
import './ModalEdit.css';
import api from '../services/api';

function ModalEdit() {
    const [patrimonio, setPatrimonio] = useState([]);
    const [editedFerramenta, setEditedFerramenta] = useState({
        patrimonio: '',
        responsavel: '',
        status: '',
        centroDeCusto: '',
        empresa: '',
        valor: '',
        tipoDeCadastro: '',
        observacao: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(true); 

    async function getFerramentas() {
        try {
            const patrimonioFromApi = await api.get('/ferramentas');
            setPatrimonio(patrimonioFromApi.data);
        } catch (error) {
            console.error('Erro ao carregar ferramentas:', error);
        }
    }

    const handleUpdate = async (id) => {
        try {
            await api.put(`/ferramentas/${id}`, editedFerramenta);
            alert('Ferramenta atualizada com sucesso!');
            getFerramentas(); 
            closeModal();
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

    const closeModal = () => {
        setIsModalOpen(false); 
    };

    useEffect(() => {
        getFerramentas();
    }, []);

    const ferramenta = patrimonio[0];

    return (
        isModalOpen && (
            <div className="formEdit">
                {ferramenta && (
                    <div className="container-card">
                        <div className="titleEdit">
                            <h2>Editar Ferramenta</h2>
                            <button className="close" onClick={closeModal}>X</button>
                        </div>
                        <div className="containerEdit">
                            <input
                                type="text"
                                name="patrimonio"
                                placeholder="Patrimônio"
                                value={editedFerramenta.patrimonio || ferramenta.patrimonio}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="responsavel"
                                placeholder="Responsável"
                                value={editedFerramenta.responsavel || ferramenta.responsavel}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="status"
                                placeholder="Status"
                                value={editedFerramenta.status || ferramenta.status}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="centroDeCusto"
                                placeholder="Centro de Custo"
                                value={editedFerramenta.centroDeCusto || ferramenta.centroDeCusto}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="empresa"
                                placeholder="Empresa"
                                value={editedFerramenta.empresa || ferramenta.empresa}
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                name="valor"
                                placeholder="Valor"
                                value={editedFerramenta.valor || ferramenta.valor}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="tipoDeCadastro"
                                placeholder="Tipo de Cadastro"
                                value={editedFerramenta.tipoDeCadastro || ferramenta.tipoDeCadastro}
                                onChange={handleChange}
                            />
                            <textarea
                                name="observacao"
                                placeholder="Observação"
                                value={editedFerramenta.observacao || ferramenta.observacao}
                                onChange={handleChange}
                            />
                            <button onClick={() => handleUpdate(ferramenta.id)}>Salvar alterações</button>
                        </div>
                    </div>
                )}
            </div>
        )
    );
}

export default ModalEdit;
