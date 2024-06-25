import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loguin.css';

const Login1 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de autenticação simulada
    if (email === 'usuario@exemplo.com' && password === 'senha123') {
      navigate('/acao');
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (

    
    <div className="login-container">
      <h2 className="font-login">Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label className="font-font">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="font-font">Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    
  );
};

export default Login1;

