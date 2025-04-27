import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig'; 
import './loguin.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword( email, password);
      navigate('/acao');
    } catch (error) {
      alert('Credenciais inválidas: ' + error.message);
    }
  };

  const goToacao = () => {
    navigate('/acao');

  }

  const goToSignup = () => {
    navigate('/signup');
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
        <button type="submit" onClick={goToacao}>Login</button>
      </form>
      <button className="btn-cadastro"onClick={goToSignup}>Cadastrar</button>
    </div>
  );
};

export default Login;
