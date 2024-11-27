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
    const [isModalOpen, setIsModalOpen] = useState(true); // Estado para controlar a visibilidade do modal

    async function getFerramentas() {
        const patrimonioFromApi = await api.get('/ferramentas');
        setPatrimonio(patrimonioFromApi.data);
    }

    const handleUpdate = async (id) => {
        try {
            const response = await api.put(`/ferramentas/${id}`, editedFerramenta);
            alert('Ferramenta atualizada com sucesso!');
            getFerramentas(); // Recarrega os dados após a atualização
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
        setIsModalOpen(false); // Fechar o modal
    };

    useEffect(() => {
        getFerramentas();
    }, []);

    // Exibindo apenas o primeiro item de patrimonio
    const ferramenta = patrimonio[0];

    return (
        isModalOpen && (
            <div className="formEdit">
                {ferramenta && (
                    <div className="container-card">
                        <div className="titleEdit">
                            <h2>Modificar aqui</h2>
                            <button className="close" onClick={closeModal}>X</button> {/* "X" estilizado */}
                        </div>
                        <div className="containerEdit">
                            <input
                                type="text"
                                name="patrimonio"
                                value={editedFerramenta.patrimonio || ferramenta.patrimonio}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="responsavel"
                                value={editedFerramenta.responsavel || ferramenta.responsavel}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="status"
                                value={editedFerramenta.status || ferramenta.status}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="centroDeCusto"
                                value={editedFerramenta.centroDeCusto || ferramenta.centroDeCusto}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="empresa"
                                value={editedFerramenta.empresa || ferramenta.empresa}
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                name="valor"
                                value={editedFerramenta.valor || ferramenta.valor}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="tipoDeCadastro"
                                value={editedFerramenta.tipoDeCadastro || ferramenta.tipoDeCadastro}
                                onChange={handleChange}
                            />
                            <textarea
                                name="observacao"
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
