import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login1 from './pages/loguin/Login'; 
import Acao from './açao/index';
import Header from './components/Header';
import './App.css';

function App() {
  const location = useLocation();
 

  return (
    <div>
       <Header />
      
      <Routes>
        <Route path="/login" element={<Login1 />} />
        <Route path="/acao" element={<Acao />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
