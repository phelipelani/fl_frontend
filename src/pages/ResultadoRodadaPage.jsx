// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import styled from 'styled-components';
// import { getResultadosDaRodada } from '../services/api';
// import BackButton from '../components/common/BackButton';

// const PageContainer = styled.div`
//     width: 100%;
//     min-height: 100vh;
//     padding: 40px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
// `;

// const Header = styled.div`
//     width: 100%;
//     max-width: 1200px;
//     text-align: center;
//     margin-bottom: 40px;
// `;

// const Title = styled.h1`
//     font-family: 'Oswald', sans-serif;
//     font-size: 3rem;
//     color: #e6f1ff;
//     text-transform: uppercase;
// `;

// const KpiGrid = styled.div`
//     display: grid;
//     grid-template-columns: repeat(2, 1fr);
//     gap: 20px;
//     width: 100%;
//     max-width: 1000px;
//     margin-bottom: 40px;

//     @media (min-width: 768px) {
//         grid-template-columns: repeat(4, 1fr);
//     }
// `;

// const KpiCard = styled.div`
//     background-color: rgba(10, 25, 47, 0.8);
//     padding: 20px;
//     border-radius: 8px;
//     text-align: center;
//     border-left: 4px solid #facc15;
// `;

// const KpiTitle = styled.p`
//     color: #94a3b8;
//     font-size: 0.9rem;
//     margin-bottom: 5px;
// `;

// const KpiValue = styled.p`
//     font-size: 1.5rem;
//     font-weight: bold;
//     color: #facc15;
// `;

// const TabelasContainer = styled.div`
//     display: grid;
//     grid-template-columns: 1fr;
//     gap: 30px;
//     width: 100%;
//     max-width: 1200px;

//     @media (min-width: 1024px) {
//         grid-template-columns: repeat(3, 1fr);
//     }
// `;

// const Tabela = styled.div`
//     background-color: rgba(10, 25, 47, 0.8);
//     border-radius: 8px;
//     overflow: hidden;
// `;

// const TabelaHeader = styled.h3`
//     background-color: #1e293b;
//     padding: 15px;
//     text-align: center;
//     font-size: 1.2rem;
//     font-weight: bold;
// `;

// const TabelaRow = styled.div`
//     display: flex;
//     justify-content: space-between;
//     padding: 12px 15px;
//     border-bottom: 1px solid #1e293b;

//     &:last-child {
//         border-bottom: none;
//     }

//     &.rank-1 {
//         background-color: rgba(250, 204, 21, 0.2);
//         font-weight: bold;
//     }
//     &.rank-last {
//         background-color: rgba(239, 68, 68, 0.2);
//     }
// `;

// const ResultadoRodadaPage = () => {
//     const { rodadaId } = useParams();
//     const [stats, setStats] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchStats = async () => {
//             setLoading(true);
//             const data = await getResultadosDaRodada(rodadaId);
//             setStats(data);
//             setLoading(false);
//         };
//         fetchStats();
//     }, [rodadaId]);

//     if (loading) {
//         return <PageContainer><Title>A carregar estatísticas...</Title></PageContainer>;
//     }

//     const mvp = stats[0];
//     const peDeRato = stats[stats.length - 1];
//     const artilheiro = [...stats].sort((a, b) => b.gols - a.gols)[0];
//     const assistente = [...stats].sort((a, b) => b.assistencias - a.assistencias)[0];

//     return (
//         <PageContainer>
//             <Header>
//                 <Title>Painel de Estatísticas</Title>
//             </Header>

//             <KpiGrid>
//                 <KpiCard><KpiTitle>MVP DA RODADA</KpiTitle><KpiValue>{mvp?.nome || '-'}</KpiValue></KpiCard>
//                 <KpiCard><KpiTitle>Pé de Rato</KpiTitle><KpiValue>{peDeRato?.nome || '-'}</KpiValue></KpiCard>
//                 <KpiCard><KpiTitle>Artilheiro</KpiTitle><KpiValue>{artilheiro?.nome} ({artilheiro?.gols})</KpiValue></KpiCard>
//                 <KpiCard><KpiTitle>Maior Assistente</KpiTitle><KpiValue>{assistente?.nome} ({assistente?.assistencias})</KpiValue></KpiCard>
//             </KpiGrid>
            
//             <TabelasContainer>
//                 <Tabela>
//                     <TabelaHeader>TABELA PONTOS</TabelaHeader>
//                     {stats.map((j, i) => (
//                         <TabelaRow key={j.id} className={i === 0 ? 'rank-1' : i === stats.length - 1 ? 'rank-last' : ''}>
//                             <span>{i + 1}. {j.nome}</span>
//                             <strong>{j.total_pontos}</strong>
//                         </TabelaRow>
//                     ))}
//                 </Tabela>
//                  <Tabela>
//                     <TabelaHeader>TABELA DE GOLS</TabelaHeader>
//                     {[...stats].sort((a, b) => b.gols - a.gols).map((j, i) => (
//                         <TabelaRow key={j.id} className={i === 0 ? 'rank-1' : ''}>
//                             <span>{i + 1}. {j.nome}</span>
//                             <strong>{j.gols}</strong>
//                         </TabelaRow>
//                     ))}
//                 </Tabela>
//                  <Tabela>
//                     <TabelaHeader>TABELA DE ASSISTÊNCIAS</TabelaHeader>
//                     {[...stats].sort((a, b) => b.assistencias - a.assistencias).map((j, i) => (
//                         <TabelaRow key={j.id} className={i === 0 ? 'rank-1' : ''}>
//                             <span>{i + 1}. {j.nome}</span>
//                             <strong>{j.assistencias}</strong>
//                         </TabelaRow>
//                     ))}
//                 </Tabela>
//             </TabelasContainer>

//             <BackButton />
//         </PageContainer>
//     );
// };

// export default ResultadoRodadaPage;

import React, { useEffect, useMemo, useState } from "react";
import { getEstatisticas, getLigas } from "../services/api";
import styled from "styled-components";

// ========== STYLED COMPONENTS ==========
const PageContainer = styled.main`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background: #030611;
  color: #ECF3FF;
`;

const BackgroundGradients = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 15% 20%, rgba(59,130,246,0.22), transparent 55%),
              radial-gradient(circle at 85% 10%, rgba(249,115,22,0.18), transparent 52%),
              linear-gradient(135deg, #030611 0%, #071626 45%, #032116 100%);
`;

const OverlayGradient = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  mix-blend-mode: screen;
  opacity: 0.6;
  background: radial-gradient(circle at 50% 120%, rgba(34,197,94,0.18), rgba(2,10,14,0.05) 60%);
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1536px;
  margin: 0 auto;
  padding: clamp(1rem, 3vw, 4rem) clamp(1rem, 3vw, 1.5rem) clamp(2rem, 5vw, 5rem);

  @media (max-width: 768px) {
    padding: 1rem 1rem 2rem;
  }
`;

const Header = styled.header`
  margin-bottom: clamp(2rem, 4vw, 4rem);

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Subtitle = styled.span`
  display: block;
  text-transform: uppercase;
  font-size: clamp(0.625rem, 2vw, 0.75rem);
  letter-spacing: 0.4em;
  color: rgba(56, 189, 248, 0.7);
  margin-bottom: clamp(0.5rem, 2vw, 1rem);
`;

const Title = styled.h1`
  margin-top: clamp(0.5rem, 2vw, 1rem);
  font-size: clamp(1.5rem, 5vw, 3rem);
  font-weight: 600;
  line-height: 1.2;
  color: #F8FAFC;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const Description = styled.p`
  margin-top: clamp(0.5rem, 2vw, 1rem);
  max-width: 42rem;
  font-size: clamp(0.875rem, 2.5vw, 1.125rem);
  line-height: 1.6;
  color: rgba(203, 213, 245, 0.8);

  @media (max-width: 768px) {
    font-size: 0.9375rem;
  }
`;

const FilterSection = styled.section`
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 2vw, 1rem);
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterLabel = styled.label`
  font-size: clamp(0.875rem, 2vw, 1rem);
  color: #CBD5E1;
  font-weight: 500;
`;

const FilterSelect = styled.select`
  background: rgba(8, 20, 33, 0.85);
  color: #E2E8F0;
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 0.5rem;
  padding: clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1rem);
  font-size: clamp(0.875rem, 2vw, 1rem);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: rgba(56, 189, 248, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #38BDF8;
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const HighlightGrid = styled.section`
  display: grid;
  gap: clamp(0.75rem, 2vw, 1.5rem);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  margin-bottom: clamp(2rem, 4vw, 3.5rem);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const HighlightCard = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 2vw, 1.25rem);
  overflow: hidden;
  border-radius: 1.5rem;
  border: 1px solid ${props => props.borderColor || 'rgba(19, 38, 58, 0.7)'};
  background: rgba(8, 20, 33, 0.85);
  padding: clamp(1rem, 3vw, 1.5rem);
  backdrop-filter: blur(18px);
  transition: all 0.3s ease-out;
  box-shadow: ${props => props.active ? `0 24px 60px -28px ${props.shadowColor || 'rgba(15, 118, 110, 0.8)'}` : 'none'};

  &:hover {
    transform: translateY(-0.5rem);
    border-opacity: 0.95;
    box-shadow: 0 24px 60px -28px ${props => props.shadowColor || 'rgba(15, 118, 110, 0.8)'};
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    
    &:hover {
      transform: translateY(-0.25rem);
    }
  }
`;

const CardGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom right, ${props => props.gradient || 'rgba(15, 118, 110, 0.35)'}, transparent);
  opacity: ${props => props.active ? '1' : '0'};
  transition: opacity 0.5s;
`;

const CardHeader = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: clamp(0.5rem, 2vw, 1rem);
`;

const CardHeaderText = styled.div`
  flex: 1;
  min-width: 0;
`;

const CardSubtitle = styled.p`
  text-transform: uppercase;
  font-size: clamp(0.625rem, 1.5vw, 0.75rem);
  letter-spacing: 0.4em;
  color: rgba(148, 163, 184, 0.8);
`;

const CardTitle = styled.h2`
  margin-top: clamp(0.5rem, 2vw, 0.75rem);
  font-size: clamp(1rem, 3vw, 1.25rem);
  font-weight: 600;
  line-height: 1.3;
  color: #F8FAFC;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const CardPosition = styled.p`
  font-size: clamp(0.75rem, 2vw, 0.875rem);
  color: rgba(203, 213, 225, 0.7);
  margin-top: 0.25rem;
`;

const TeamBadge = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  padding: clamp(0.375rem, 1.5vw, 0.5rem) clamp(0.625rem, 2vw, 0.75rem);
  font-size: clamp(0.625rem, 1.5vw, 0.75rem);
  font-weight: 600;
  flex-shrink: 0;
  background: ${props => props.bgColor || 'rgba(75, 85, 99, 0.4)'};
  color: ${props => props.textColor || '#F8FAFC'};
  box-shadow: 0 0 25px -10px rgba(255, 255, 255, 0.8);
`;

const CardStats = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1rem);
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

const PrimaryValue = styled.span`
  font-size: clamp(1.5rem, 5vw, 1.875rem);
  font-weight: 600;
  color: white;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const MetricLabel = styled.div`
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: clamp(0.625rem, 1.5vw, 0.75rem);
  color: rgba(148, 163, 184, 0.8);
`;

const MetricValue = styled.p`
  margin-top: 0.25rem;
  font-size: clamp(0.875rem, 2vw, 1rem);
  font-weight: 600;
  color: #E0F2FE;
`;

const CardDescription = styled.p`
  position: relative;
  z-index: 10;
  font-size: clamp(0.75rem, 2vw, 0.875rem);
  line-height: 1.6;
  color: rgba(203, 213, 245, 0.8);
`;

const DetailPanel = styled.section`
  margin-top: clamp(1.5rem, 3vw, 2rem);
  border-radius: 1.5rem;
  border: 1px solid rgba(19, 38, 58, 0.7);
  background: linear-gradient(to bottom right, rgba(6, 22, 38, 0.95), rgba(6, 27, 35, 0.92), rgba(5, 20, 31, 0.95));
  padding: clamp(1rem, 3vw, 1.5rem);
  box-shadow: 0 32px 90px -45px rgba(8, 47, 73, 0.8);

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

const DetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 2vw, 1rem);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: clamp(0.75rem, 2vw, 1.25rem);
  margin-bottom: clamp(1rem, 3vw, 1.5rem);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const DetailBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 9999px;
  background: rgba(15, 31, 46, 0.8);
  padding: clamp(0.375rem, 1.5vw, 0.5rem) clamp(0.75rem, 2vw, 1rem);
  font-size: clamp(0.625rem, 1.5vw, 0.75rem);
  text-transform: uppercase;
  letter-spacing: 0.35em;
  color: rgba(56, 189, 248, 0.7);
  font-weight: 500;
  width: fit-content;
`;

const DetailTitle = styled.h3`
  font-size: clamp(1.25rem, 4vw, 1.5rem);
  font-weight: 600;
  color: white;

  @media (max-width: 768px) {
    font-size: 1.375rem;
  }
`;

const DetailSubtitle = styled.p`
  margin-top: 0.5rem;
  max-width: 42rem;
  font-size: clamp(0.75rem, 2vw, 0.875rem);
  color: rgba(165, 180, 252, 0.8);
`;

const DetailStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 140px), 1fr));
  gap: clamp(0.75rem, 2vw, 1rem);
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatBox = styled.div`
  border-radius: 1rem;
  background: rgba(8, 19, 32, 0.85);
  padding: clamp(0.75rem, 2vw, 1rem);
  text-align: center;
  box-shadow: 0 10px 30px -20px rgba(56, 189, 248, 0.45);
`;

const StatBoxLabel = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: clamp(0.625rem, 1.5vw, 0.75rem);
  color: #94A3B8;
`;

const StatBoxValue = styled.p`
  margin-top: 0.5rem;
  font-size: clamp(1rem, 3vw, 1.125rem);
  font-weight: 600;
  color: white;
`;

const MainContent = styled.section`
  margin-top: clamp(2rem, 4vw, 3.5rem);
  display: grid;
  gap: clamp(1.5rem, 3vw, 2rem);
  
  @media (min-width: 1280px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const RankingPanel = styled.div`
  border-radius: 1.5rem;
  border: 1px solid rgba(19, 38, 58, 0.7);
  background: rgba(7, 20, 35, 0.95);
  padding: clamp(1rem, 3vw, 1.5rem);
  backdrop-filter: blur(18px);
  box-shadow: 0 32px 80px -40px rgba(8, 47, 73, 0.7);

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

const RankingHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 2vw, 1rem);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: clamp(0.75rem, 2vw, 1.25rem);
  margin-bottom: clamp(0.75rem, 2vw, 1rem);

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const RankingTitle = styled.h3`
  font-size: clamp(1rem, 3vw, 1.25rem);
  font-weight: 600;
  color: white;
`;

const RankingSubtitle = styled.p`
  font-size: clamp(0.75rem, 2vw, 0.875rem);
  color: rgba(165, 180, 252, 0.7);
  margin-top: 0.25rem;
`;

const RankingBadge = styled.span`
  border-radius: 9999px;
  background: rgba(11, 26, 40, 0.8);
  padding: clamp(0.375rem, 1.5vw, 0.5rem) clamp(0.75rem, 2vw, 1rem);
  font-size: clamp(0.625rem, 1.5vw, 0.75rem);
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: rgba(56, 189, 248, 0.7);
  width: fit-content;
`;

const TableWrapper = styled.div`
  margin-top: clamp(0.75rem, 2vw, 1rem);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  font-size: clamp(0.75rem, 2vw, 0.875rem);
  color: #E2E8F0;
`;

const THead = styled.thead`
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: clamp(0.625rem, 1.5vw, 0.75rem);
  color: #64748B;
`;

const Th = styled.th`
  padding: clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 2vw, 1rem);
  text-align: left;
  font-weight: 500;
  
  &:first-child {
    border-radius: 0.5rem 0 0 0.5rem;
  }
  
  &:last-child {
    border-radius: 0 0.5rem 0.5rem 0;
  }
`;

const TBody = styled.tbody``;

const Tr = styled.tr`
  background: rgba(11, 24, 36, 0.85);
  transition: all 0.3s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    background: rgba(16, 35, 56, 0.9);
  }
`;

const Td = styled.td`
  padding: clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 2vw, 1rem);
  
  &:first-child {
    border-radius: 0.5rem 0 0 0.5rem;
  }
  
  &:last-child {
    border-radius: 0 0.5rem 0.5rem 0;
  }
`;

const RankNumber = styled.span`
  font-weight: 600;
  color: rgba(56, 189, 248, 0.9);
`;

const PlayerName = styled.span`
  font-weight: 500;
  color: white;
`;

const StatValue = styled.span`
  font-weight: 600;
  color: ${props => props.color || '#FACC15'};
`;

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 3vw, 2rem);
`;

const SmallRankingPanel = styled(RankingPanel)``;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 5vw, 3rem);
  text-align: center;
  color: rgba(203, 213, 245, 0.6);
  
  svg {
    width: clamp(3rem, 8vw, 4rem);
    height: clamp(3rem, 8vw, 4rem);
    margin-bottom: 1rem;
    opacity: 0.5;
  }
  
  p {
    font-size: clamp(0.875rem, 2vw, 1rem);
  }
`;

// ========== PALETAS DE TIMES ==========
const teamPalettes = {
  "Time Amarelo": {
    badge: "linear-gradient(to right, rgba(250, 204, 21, 0.2), rgba(161, 98, 7, 0.4), rgba(251, 191, 36, 0.2))",
    textColor: "#FDF6D8",
    borderColor: "rgba(250, 204, 21, 0.45)",
    gradient: "rgba(250, 204, 21, 0.35)",
    shadowColor: "rgba(250, 204, 21, 0.6)",
  },
  "Time Preto": {
    badge: "linear-gradient(to right, rgba(75, 85, 99, 0.4), rgba(17, 24, 39, 0.7), rgba(156, 163, 175, 0.4))",
    textColor: "#F8FAFC",
    borderColor: "rgba(75, 85, 99, 0.55)",
    gradient: "rgba(107, 114, 128, 0.3)",
    shadowColor: "rgba(107, 114, 128, 0.55)",
  },
  "Time Azul": {
    badge: "linear-gradient(to right, rgba(14, 165, 233, 0.35), rgba(29, 78, 216, 0.45), rgba(56, 189, 248, 0.35))",
    textColor: "#E0F2FE",
    borderColor: "rgba(56, 189, 248, 0.45)",
    gradient: "rgba(14, 165, 233, 0.35)",
    shadowColor: "rgba(14, 165, 233, 0.55)",
  },
  "Time Rosa": {
    badge: "linear-gradient(to right, rgba(251, 113, 133, 0.35), rgba(190, 24, 93, 0.45), rgba(244, 114, 182, 0.3))",
    textColor: "#FCE7F3",
    borderColor: "rgba(244, 114, 182, 0.5)",
    gradient: "rgba(251, 113, 133, 0.35)",
    shadowColor: "rgba(251, 113, 133, 0.55)",
  },
};

const getTeamPalette = (teamName) => {
  return teamPalettes[teamName] || teamPalettes["Time Preto"];
};

// ========== COMPONENTE PRINCIPAL ==========
const ResultadoRodadaPage = () => {
  const [players, setPlayers] = useState([]);
  const [ligas, setLigas] = useState([]);
  const [selectedLigaId, setSelectedLigaId] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [statsData, ligasData] = await Promise.all([
          getEstatisticas(selectedLigaId || null),
          getLigas()
        ]);
        setPlayers(statsData);
        setLigas(ligasData);
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedLigaId]);

  // Cálculos dos destaques
  const mvp = useMemo(() => {
    if (players.length === 0) return null;
    return players.reduce((best, current) =>
      (current.eficiencia || 0) > (best.eficiencia || 0) ? current : best
    );
  }, [players]);

  const topScorer = useMemo(() => {
    if (players.length === 0) return null;
    return players.reduce((best, current) =>
      (current.gols || 0) > (best.gols || 0) ? current : best
    );
  }, [players]);

  const topPlaymaker = useMemo(() => {
    if (players.length === 0) return null;
    return players.reduce((best, current) =>
      (current.assistencias || 0) > (best.assistencias || 0) ? current : best
    );
  }, [players]);

  const worstPlayer = useMemo(() => {
    if (players.length === 0) return null;
    return players.reduce((worst, current) =>
      (current.eficiencia || 0) < (worst.eficiencia || 0) ? current : worst
    );
  }, [players]);

  const highlightCards = useMemo(() => {
    if (!mvp || !topScorer || !topPlaymaker || !worstPlayer) return [];
    
    return [
      {
        title: "MVP da temporada",
        badge: "MVP",
        player: mvp,
        primaryValue: `${mvp.total_pontos || 0} pts`,
        metricLabel: "Índice de impacto",
        metricValue: (mvp.eficiencia || 0).toFixed(1),
        description: `Líder absoluto com ${mvp.gols || 0} gols e ${mvp.assistencias || 0} assistências.`,
      },
      {
        title: "Maior artilheiro",
        badge: "Goleador",
        player: topScorer,
        primaryValue: `${topScorer.gols || 0} gols`,
        metricLabel: "Assistências",
        metricValue: (topScorer.assistencias || 0).toString(),
        description: `Artilheiro implacável com ${topScorer.gols || 0} bolas na rede.`,
      },
      {
        title: "Maior armador",
        badge: "Maestro",
        player: topPlaymaker,
        primaryValue: `${topPlaymaker.assistencias || 0} assistências`,
        metricLabel: "Pontuação",
        metricValue: (topPlaymaker.total_pontos || 0).toString(),
        description: `Criador de jogadas com ${topPlaymaker.assistencias || 0} passes decisivos.`,
      },
      {
        title: "Pé de rato",
        badge: "Em ajustes",
        player: worstPlayer,
        primaryValue: `${(worstPlayer.eficiencia || 0).toFixed(1)} de eficiência`,
        metricLabel: "Pontuação",
        metricValue: (worstPlayer.total_pontos || 0).toString(),
        description: `Precisa melhorar o desempenho nas próximas rodadas.`,
      },
    ];
  }, [mvp, topScorer, topPlaymaker, worstPlayer]);

  const pointsRanking = useMemo(() => {
    return [...players]
      .sort((a, b) => (b.total_pontos || 0) - (a.total_pontos || 0))
      .slice(0, 7);
  }, [players]);

  const scorersRanking = useMemo(() => {
    return [...players]
      .sort((a, b) => (b.gols || 0) - (a.gols || 0))
      .slice(0, 3);
  }, [players]);

  const playmakersRanking = useMemo(() => {
    return [...players]
      .sort((a, b) => (b.assistencias || 0) - (a.assistencias || 0))
      .slice(0, 3);
  }, [players]);

  useEffect(() => {
    if (pointsRanking.length > 0) {
      setSelectedPlayer(pointsRanking[0]);
    }
  }, [pointsRanking]);

  const [activeHighlight, setActiveHighlight] = useState(0);

  if (loading) {
    return (
      <PageContainer>
        <BackgroundGradients />
        <OverlayGradient />
        <ContentWrapper>
          <EmptyState>
            <p>Carregando estatísticas...</p>
          </EmptyState>
        </ContentWrapper>
      </PageContainer>
    );
  }

  if (players.length === 0) {
    return (
      <PageContainer>
        <BackgroundGradients />
        <OverlayGradient />
        <ContentWrapper>
          <Header>
            <Subtitle>Estatísticas da Liga</Subtitle>
            <Title>Nenhum dado disponível</Title>
            <Description>
              Não há estatísticas para exibir. Complete algumas rodadas primeiro!
            </Description>
          </Header>
        </ContentWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackgroundGradients />
      <OverlayGradient />
      <ContentWrapper>
        <Header>
          <Subtitle>Painel da Rodada</Subtitle>
          <Title>
            Radar completo: quem decidiu e quais craques dominaram o gramado
          </Title>
          <Description>
            Explore os destaques, rankings completos e o desempenho individual dos jogadores em um ambiente inspirado na noite iluminada do estádio.
          </Description>
        </Header>

        <FilterSection>
          <FilterLabel htmlFor="liga-filter">Filtrar por Liga:</FilterLabel>
          <FilterSelect
            id="liga-filter"
            value={selectedLigaId}
            onChange={(e) => setSelectedLigaId(e.target.value)}
          >
            <option value="">Todas as Ligas</option>
            {ligas.map((liga) => (
              <option key={liga.id} value={liga.id}>
                {liga.nome}
              </option>
            ))}
          </FilterSelect>
        </FilterSection>

        <HighlightGrid>
          {highlightCards.map((highlight, index) => {
            const palette = getTeamPalette(highlight.player.time || "Time Preto");
            const isActive = activeHighlight === index;

            return (
              <HighlightCard
                key={index}
                borderColor={palette.borderColor}
                shadowColor={palette.shadowColor}
                active={isActive}
                onMouseEnter={() => setActiveHighlight(index)}
                onClick={() => setActiveHighlight(index)}
                tabIndex={0}
              >
                <CardGradient gradient={palette.gradient} active={isActive} />
                
                <CardHeader>
                  <CardHeaderText>
                    <CardSubtitle>{highlight.title}</CardSubtitle>
                    <CardTitle>{highlight.player.nome}</CardTitle>
                    <CardPosition>{highlight.player.posicao || 'Jogador'}</CardPosition>
                  </CardHeaderText>
                  <TeamBadge
                    bgColor={palette.badge}
                    textColor={palette.textColor}
                  >
                    {highlight.player.time ? highlight.player.time.replace('Time ', '') : 'N/A'}
                  </TeamBadge>
                </CardHeader>

                <CardStats>
                  <PrimaryValue>{highlight.primaryValue}</PrimaryValue>
                  <div>
                    <MetricLabel>{highlight.metricLabel}</MetricLabel>
                    <MetricValue>{highlight.metricValue}</MetricValue>
                  </div>
                </CardStats>

                <CardDescription>{highlight.description}</CardDescription>
              </HighlightCard>
            );
          })}
        </HighlightGrid>

        {selectedPlayer && (
          <DetailPanel>
            <DetailHeader>
              <div>
                <DetailBadge>Destaque selecionado</DetailBadge>
                <DetailTitle>
                  {selectedPlayer.nome} — {selectedPlayer.time || 'Sem Time'}
                </DetailTitle>
                <DetailSubtitle>
                  {selectedPlayer.posicao || 'Jogador de campo com desempenho consistente'}
                </DetailSubtitle>
              </div>
              <DetailStats>
                <StatBox>
                  <StatBoxLabel>Equipe</StatBoxLabel>
                  <StatBoxValue>{selectedPlayer.time || 'N/A'}</StatBoxValue>
                </StatBox>
                <StatBox>
                  <StatBoxLabel>Pontuação</StatBoxLabel>
                  <StatBoxValue>{selectedPlayer.total_pontos || 0}</StatBoxValue>
                </StatBox>
                <StatBox>
                  <StatBoxLabel>G+A</StatBoxLabel>
                  <StatBoxValue>
                    {selectedPlayer.gols || 0} / {selectedPlayer.assistencias || 0}
                  </StatBoxValue>
                </StatBox>
              </DetailStats>
            </DetailHeader>
          </DetailPanel>
        )}

        <MainContent>
          <RankingPanel>
            <RankingHeader>
              <div>
                <RankingTitle>Top 7 por pontuação</RankingTitle>
                <RankingSubtitle>
                  Ranking completo que pondera impacto, gols e assistências acumuladas.
                </RankingSubtitle>
              </div>
              <RankingBadge>Elite da temporada</RankingBadge>
            </RankingHeader>
            
            <TableWrapper>
              <Table>
                <THead>
                  <tr>
                    <Th>#</Th>
                    <Th>Jogador</Th>
                    <Th>Time</Th>
                    <Th>Pts</Th>
                    <Th>Gols</Th>
                    <Th>Assist.</Th>
                  </tr>
                </THead>
                <TBody>
                  {pointsRanking.map((player, index) => {
                    const palette = getTeamPalette(player.time || "Time Preto");
                    
                    return (
                      <Tr
                        key={player.id}
                        onMouseEnter={() => setSelectedPlayer(player)}
                        onClick={() => setSelectedPlayer(player)}
                      >
                        <Td>
                          <RankNumber>{index + 1}</RankNumber>
                        </Td>
                        <Td>
                          <PlayerName>{player.nome}</PlayerName>
                        </Td>
                        <Td>
                          <TeamBadge
                            bgColor={palette.badge}
                            textColor={palette.textColor}
                          >
                            {player.time ? player.time.replace('Time ', '') : 'N/A'}
                          </TeamBadge>
                        </Td>
                        <Td>
                          <StatValue color="#FACC15">{player.total_pontos || 0}</StatValue>
                        </Td>
                        <Td>
                          <StatValue color="#22D3EE">{player.gols || 0}</StatValue>
                        </Td>
                        <Td>
                          <StatValue color="#A855F7">{player.assistencias || 0}</StatValue>
                        </Td>
                      </Tr>
                    );
                  })}
                </TBody>
              </Table>
            </TableWrapper>

            <DetailPanel style={{ marginTop: '1.5rem' }}>
              <DetailHeader>
                <div>
                  <DetailBadge>Jogador focado</DetailBadge>
                  <DetailTitle>
                    {selectedPlayer?.nome} — {selectedPlayer?.time || 'Sem Time'}
                  </DetailTitle>
                  <DetailSubtitle>
                    Desempenho detalhado do jogador selecionado
                  </DetailSubtitle>
                </div>
                <DetailStats>
                  <StatBox>
                    <StatBoxLabel>Pts</StatBoxLabel>
                    <StatBoxValue>{selectedPlayer?.total_pontos || 0}</StatBoxValue>
                  </StatBox>
                  <StatBox>
                    <StatBoxLabel>Gols</StatBoxLabel>
                    <StatBoxValue>{selectedPlayer?.gols || 0}</StatBoxValue>
                  </StatBox>
                  <StatBox>
                    <StatBoxLabel>Assist.</StatBoxLabel>
                    <StatBoxValue>{selectedPlayer?.assistencias || 0}</StatBoxValue>
                  </StatBox>
                  <StatBox>
                    <StatBoxLabel>Eficiência</StatBoxLabel>
                    <StatBoxValue>{(selectedPlayer?.eficiencia || 0).toFixed(1)}</StatBoxValue>
                  </StatBox>
                </DetailStats>
              </DetailHeader>
            </DetailPanel>
          </RankingPanel>

          <SidePanel>
            <SmallRankingPanel>
              <RankingHeader>
                <div>
                  <RankingTitle>Top 3 artilheiros</RankingTitle>
                  <RankingSubtitle>
                    Quem mais balançou as redes nesta temporada.
                  </RankingSubtitle>
                </div>
              </RankingHeader>
              
              <TableWrapper>
                <Table>
                  <THead>
                    <tr>
                      <Th>#</Th>
                      <Th>Jogador</Th>
                      <Th>Time</Th>
                      <Th>Gols</Th>
                      <Th>Assist.</Th>
                    </tr>
                  </THead>
                  <TBody>
                    {scorersRanking.map((player, index) => {
                      const palette = getTeamPalette(player.time || "Time Preto");
                      
                      return (
                        <Tr
                          key={player.id}
                          onMouseEnter={() => setSelectedPlayer(player)}
                          onClick={() => setSelectedPlayer(player)}
                        >
                          <Td>
                            <RankNumber>{index + 1}</RankNumber>
                          </Td>
                          <Td>
                            <PlayerName>{player.nome}</PlayerName>
                          </Td>
                          <Td>
                            <TeamBadge
                              bgColor={palette.badge}
                              textColor={palette.textColor}
                            >
                              {player.time ? player.time.replace('Time ', '') : 'N/A'}
                            </TeamBadge>
                          </Td>
                          <Td>
                            <StatValue color="#FACC15">{player.gols || 0}</StatValue>
                          </Td>
                          <Td>
                            <StatValue color="#A855F7">{player.assistencias || 0}</StatValue>
                          </Td>
                        </Tr>
                      );
                    })}
                  </TBody>
                </Table>
              </TableWrapper>
            </SmallRankingPanel>

            <SmallRankingPanel>
              <RankingHeader>
                <div>
                  <RankingTitle>Top 3 armadores</RankingTitle>
                  <RankingSubtitle>
                    Quem mais arquitetou finalizações claras.
                  </RankingSubtitle>
                </div>
              </RankingHeader>
              
              <TableWrapper>
                <Table>
                  <THead>
                    <tr>
                      <Th>#</Th>
                      <Th>Jogador</Th>
                      <Th>Time</Th>
                      <Th>Assist.</Th>
                      <Th>Pts</Th>
                    </tr>
                  </THead>
                  <TBody>
                    {playmakersRanking.map((player, index) => {
                      const palette = getTeamPalette(player.time || "Time Preto");
                      
                      return (
                        <Tr
                          key={player.id}
                          onMouseEnter={() => setSelectedPlayer(player)}
                          onClick={() => setSelectedPlayer(player)}
                        >
                          <Td>
                            <RankNumber>{index + 1}</RankNumber>
                          </Td>
                          <Td>
                            <PlayerName>{player.nome}</PlayerName>
                          </Td>
                          <Td>
                            <TeamBadge
                              bgColor={palette.badge}
                              textColor={palette.textColor}
                            >
                              {player.time ? player.time.replace('Time ', '') : 'N/A'}
                            </TeamBadge>
                          </Td>
                          <Td>
                            <StatValue color="#38BDF8">{player.assistencias || 0}</StatValue>
                          </Td>
                          <Td>
                            <StatValue color="#FACC15">{player.total_pontos || 0}</StatValue>
                          </Td>
                        </Tr>
                      );
                    })}
                  </TBody>
                </Table>
              </TableWrapper>
            </SmallRankingPanel>
          </SidePanel>
        </MainContent>
      </ContentWrapper>
    </PageContainer>
  );
};

export default ResultadoRodadaPage;
