// Arquivo: src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // 1. Verifica se o token existe no localStorage
  const token = localStorage.getItem('authToken');

  // 2. Se não houver token (usuário não logado), redireciona para a página de login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 3. Se houver um token, permite o acesso à rota filha (a página protegida)
  return <Outlet />;
};

export default ProtectedRoute;