// Signup.js
import React, { useState } from 'react';
import { Navigate, useNavigate, useNavigation } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import './loguin.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/acao'); 
    } catch (error) {
      alert('Erro ao cadastrar usuário: ' + error.message);
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };
    

  return (
    <div className="login-container">
      <h2 className="font-login">Cadastro</h2>
      <form onSubmit={handleSignup}>
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
        <button type="submit">Cadastrar</button>
        
      </form>"
      <button className="btn-voltar" onClick={goToLogin}>Voltar</button>
    </div>
  );
};

export default Signup;
