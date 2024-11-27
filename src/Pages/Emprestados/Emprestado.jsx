import { useState, useRef } from 'react';
import './Emprestado.css';
import logo from '../../assets/Logo.png';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

function Emprestado() {
    const navigate = useNavigate();

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
        </div>

    )
}

export default Emprestado