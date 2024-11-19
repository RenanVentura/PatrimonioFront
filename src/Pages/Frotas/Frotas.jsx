import { useState, useRef } from 'react';
import './Frotas.css';
import logo from '../../assets/Logo.png';
import api from '../../services/api'
import { useNavigate } from 'react-router-dom';

function Frotas() {
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
            </div>
        </div>


    )
}

export default Frotas