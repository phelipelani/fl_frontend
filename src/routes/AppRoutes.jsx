// Arquivo: src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LigasPage from '../pages/LigasPage';
import LigaDetailPage from '../pages/LigaDetailPage';
import RodadaPage from '../pages/RodadaPage';
import SorteioPage from '../pages/SorteioPage';
import PartidasPage from '../pages/PartidasPage';
import ResultadoRodadaPage from '../pages/ResultadoRodadaPage';
import EstatisticasPage from '../pages/EstatisticasPage';
import LoginPage from '../pages/LoginPage';
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from './ProtectedRoute'; // 1. Importar o nosso protetor

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* 2. Envolvemos as rotas protegidas com o ProtectedRoute */}
      <Route element={<ProtectedRoute />}>
        {/* Todas as rotas aqui dentro agora exigem login */}
        
        <Route element={<MainLayout />}>
          <Route path="/ligas" element={<LigasPage />} />
          <Route path="/liga/:ligaId" element={<LigaDetailPage />} />
          <Route path="/liga/:ligaId/rodada/:rodadaId" element={<RodadaPage />} />
          <Route path="/estatisticas" element={<EstatisticasPage />} />
        </Route>

        <Route path="/liga/:ligaId/rodada/:rodadaId/sorteio" element={<SorteioPage />} />
        <Route path="/liga/:ligaId/rodada/:rodadaId/partidas" element={<PartidasPage />} />
        <Route path="/liga/:ligaId/rodada/:rodadaId/resultados" element={<ResultadoRodadaPage />} />

      </Route>
    </Routes>
  );
};

export default AppRoutes;