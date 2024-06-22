import './header.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [showConfig, setShowConfig] = useState(false);
    const navigate = useNavigate();

    const openConfig = () => {
        setShowConfig(true);
        
    };

    const closeConfig = () => {
        setShowConfig(false);
    };

    const handleLogout = () => {
         // Verifique se essa mensagem aparece no console
        // Lógica de logout, como limpar tokens de autenticação
        navigate('/Login'); // Redirecionar para a página de login
    };

    return (
        <header>
            <h1 className="titulo">AppCount</h1>
            <button id="botaoConfig" onClick={openConfig}>co</button>

            {showConfig && (
                <div className="config-modal">
                    <div className="config-content">
                        <span className="close" onClick={closeConfig}>&times;</span>
                        <button className="bt">Estatística</button>
                        <button className="bt">Relatório</button>
                        <button className="bt" onClick={handleLogout}>Sair</button>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
