import React, { useEffect, useMemo, useState } from "react";
// Importa o Link para navegação
import { useParams, Link } from "react-router-dom";
import { getRodadasPorLiga, getResultadosDaRodada } from "../services/api";

import styled from "styled-components";

// ========== BOTÃO VOLTAR (NOVO) ==========
const HomeButton = styled(Link)`
  position: absolute;
  top: 25px;
  right: 40px;
  z-index: 20; // Garante que fique sobre outros elementos
  background: rgba(8, 20, 33, 0.85);
  color: #e2e8f0;
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background: rgba(12, 30, 49, 0.95);
    border-color: rgba(56, 189, 248, 0.5);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
    padding: 0.5rem 1rem;
  }
`;

// ========== STYLED COMPONENTS (sem alterações) ==========
const PageContainer = styled.main`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background: #030611;
  color: #ecf3ff;
`;

const BackgroundGradients = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  background: radial-gradient(
      circle at 15% 20%,
      rgba(59, 130, 246, 0.22),
      transparent 55%
    ),
    radial-gradient(
      circle at 85% 10%,
      rgba(249, 115, 22, 0.18),
      transparent 52%
    ),
    linear-gradient(135deg, #030611 0%, #071626 45%, #032116 100%);
`;

const OverlayGradient = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  mix-blend-mode: screen;
  opacity: 0.6;
  background: radial-gradient(
    circle at 50% 120%,
    rgba(34, 197, 94, 0.18),
    rgba(2, 10, 14, 0.05) 60%
  );
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1536px;
  margin: 0 auto;
  padding: clamp(1rem, 3vw, 4rem) clamp(1rem, 3vw, 1.5rem)
    clamp(2rem, 5vw, 5rem);

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
  color: #f8fafc;

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
  color: #cbd5e1;
  font-weight: 500;
`;

const FilterSelect = styled.select`
  background: rgba(8, 20, 33, 0.85);
  color: #e2e8f0;
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
    border-color: #38bdf8;
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
  border: 1px solid ${(props) => props.borderColor || "rgba(19, 38, 58, 0.7)"};
  background: rgba(8, 20, 33, 0.85);
  padding: clamp(1rem, 3vw, 1.5rem);
  backdrop-filter: blur(18px);
  transition: all 0.3s ease-out;
  box-shadow: ${(props) =>
    props.active
      ? `0 24px 60px -28px ${props.shadowColor || "rgba(15, 118, 110, 0.8)"}`
      : "none"};

  &:hover {
    transform: translateY(-0.5rem);
    border-opacity: 0.95;
    box-shadow: 0 24px 60px -28px ${(props) => props.shadowColor || "rgba(15, 118, 110, 0.8)"};
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
  background: linear-gradient(
    to bottom right,
    ${(props) => props.gradient || "rgba(15, 118, 110, 0.35)"},
    transparent
  );
  opacity: ${(props) => (props.active ? "1" : "0")};
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
  color: #f8fafc;

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
  background: ${(props) => props.bgColor || "rgba(75, 85, 99, 0.4)"};
  color: ${(props) => props.textColor || "#F8FAFC"};
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
  color: #e0f2fe;
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
  background: linear-gradient(
    to bottom right,
    rgba(6, 22, 38, 0.95),
    rgba(6, 27, 35, 0.92),
    rgba(5, 20, 31, 0.95)
  );
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
  color: #94a3b8;
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
  color: #e2e8f0;
`;

const THead = styled.thead`
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: clamp(0.625rem, 1.5vw, 0.75rem);
  color: #64748b;
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
  color: ${(props) => props.color || "#FACC15"};
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

// ========== PALETAS DE TIMES (sem alterações) ==========
const teamPalettes = {
  "Time Amarelo": {
    badge:
      "linear-gradient(to right, rgba(250, 204, 21, 0.2), rgba(161, 98, 7, 0.4), rgba(251, 191, 36, 0.2))",
    textColor: "#FDF6D8",
    borderColor: "rgba(250, 204, 21, 0.45)",
    gradient: "rgba(250, 204, 21, 0.35)",
    shadowColor: "rgba(250, 204, 21, 0.6)",
  },
  "Time Preto": {
    badge:
      "linear-gradient(to right, rgba(75, 85, 99, 0.4), rgba(17, 24, 39, 0.7), rgba(156, 163, 175, 0.4))",
    textColor: "#F8FAFC",
    borderColor: "rgba(75, 85, 99, 0.55)",
    gradient: "rgba(107, 114, 128, 0.3)",
    shadowColor: "rgba(107, 114, 128, 0.55)",
  },
  "Time Azul": {
    badge:
      "linear-gradient(to right, rgba(14, 165, 233, 0.35), rgba(29, 78, 216, 0.45), rgba(56, 189, 248, 0.35))",
    textColor: "#E0F2FE",
    borderColor: "rgba(56, 189, 248, 0.45)",
    gradient: "rgba(14, 165, 233, 0.35)",
    shadowColor: "rgba(14, 165, 233, 0.55)",
  },
  "Time Rosa": {
    badge:
      "linear-gradient(to right, rgba(251, 113, 133, 0.35), rgba(190, 24, 93, 0.45), rgba(244, 114, 182, 0.3))",
    textColor: "#FCE7F3",
    borderColor: "rgba(244, 114, 182, 0.5)",
    gradient: "rgba(251, 113, 133, 0.35)",
    shadowColor: "rgba(251, 113, 133, 0.55)",
  },
};

const getTeamPalette = (teamName) => {
  return teamPalettes[teamName] || teamPalettes["Time Preto"];
};


const formatarDataRodada = (dataString) => {
  if (!dataString) {
    return "Data inválida";
  }

  let dataParaProcessar = dataString;

  if (typeof dataString === 'string' && dataString.endsWith('.0')) {
    dataParaProcessar = dataString.slice(0, -2); 
  }

  const timestamp = parseInt(dataParaProcessar, 10);

  let data;
  if (!isNaN(timestamp) && timestamp > 0) { 
    data = new Date(timestamp);
  } else {
    data = new Date(dataString.replace(' ', 'T'));
  }
  
  if (isNaN(data.getTime())) {
    console.warn("Formato de data não reconhecido após tentativas:", dataString);
    return "Data não reconhecida";
  }
  
  return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
};

// ========== COMPONENTE PRINCIPAL (VERSÃO CORRIGIDA) ==========
const ResultadoRodadaPage = () => {
  const { ligaId } = useParams();
  const [players, setPlayers] = useState([]);
  const [rodadas, setRodadas] = useState([]);
  const [selectedRodadaId, setSelectedRodadaId] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeHighlight, setActiveHighlight] = useState(0);

  useEffect(() => {
    const fetchRodadas = async () => {
      if (!ligaId) return;
      setLoading(true);
      try {
        const rodadasData = await getRodadasPorLiga(ligaId);
        const sortedRodadas = rodadasData.sort(
          (a, b) => new Date(b.data) - new Date(a.data)
        );
        setRodadas(sortedRodadas);
        if (sortedRodadas.length > 0) {
          setSelectedRodadaId(sortedRodadas[0].id);
        } else {
          setPlayers([]);
          setLoading(false);
        }
      } catch (error) {
        console.error("Erro ao carregar rodadas:", error);
        setLoading(false);
      }
    };
    fetchRodadas();
  }, [ligaId]);

  useEffect(() => {
    const fetchEstatisticas = async () => {
      if (!selectedRodadaId) {
        if (rodadas.length === 0) {
          setPlayers([]);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      try {
        const statsData = await getResultadosDaRodada(selectedRodadaId);
         console.log("Dados de estatísticas recebidos (com time):", statsData);
        setPlayers(statsData);
      } catch (error) {
        console.error(
          `Erro ao carregar estatísticas da rodada ${selectedRodadaId}:`,
          error
        );
        setPlayers([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchEstatisticas();
  }, [selectedRodadaId]);

  const { mvp, topScorer, topPlaymaker, worstPlayer } = useMemo(() => {
    if (!players || players.length === 0) {
      return {
        mvp: null,
        topScorer: null,
        topPlaymaker: null,
        worstPlayer: null,
      };
    }

    const best = players.reduce((b, c) =>
      (c.total_pontos || 0) > (b.total_pontos || 0) ? c : b
    );
    const scorer = players.reduce((b, c) =>
      (c.gols || 0) > (b.gols || 0) ? c : b
    );
    const playmaker = players.reduce((b, c) =>
      (c.assistencias || 0) > (b.assistencias || 0) ? c : b
    );

    const otherPlayers = players.filter((p) => p.id !== best?.id);
    let worst = null;
    if (otherPlayers.length > 0) {
      worst = otherPlayers.reduce(
        (w, c) => ((c.total_pontos || 0) < (w.total_pontos || 0) ? c : w),
        otherPlayers[0]
      );
    } else if (players.length > 0) {
      worst = players[0]; 
    }

    return {
      mvp: best,
      topScorer: scorer,
      topPlaymaker: playmaker,
      worstPlayer: worst,
    };
  }, [players]);

  const highlightCards = useMemo(() => {
    if (!mvp || !topScorer || !topPlaymaker || !worstPlayer) return [];

    return [
      {
        title: "MVP da Rodada",
        player: mvp,
        primaryValue: `${mvp.total_pontos || 0} pts`,
        metricLabel: "Gols/Assist.",
        metricValue: `${mvp.gols || 0}/${mvp.assistencias || 0}`,
        description: `Líder absoluto com ${mvp.gols || 0} gols e ${
          mvp.assistencias || 0
        } assistências.`,
      },
      {
        title: "Maior artilheiro",
        player: topScorer,
        primaryValue: `${topScorer.gols || 0} gols`,
        metricLabel: "Assistências",
        metricValue: (topScorer.assistencias || 0).toString(),
        description: `Artilheiro implacável com ${
          topScorer.gols || 0
        } bolas na rede.`,
      },
      {
        title: "Maior armador",
        player: topPlaymaker,
        primaryValue: `${topPlaymaker.assistencias || 0} assist.`,
        metricLabel: "Pontuação",
        metricValue: (topPlaymaker.total_pontos || 0).toString(),
        description: `Criador de jogadas com ${
          topPlaymaker.assistencias || 0
        } passes decisivos.`,
      },
      {
        title: "Pé de rato",
        player: worstPlayer,
        primaryValue: `${(worstPlayer.total_pontos || 0).toFixed(1)} pts`,
        metricLabel: "Gols/Assist.",
        metricValue: `${worstPlayer.gols || 0}/${
          worstPlayer.assistencias || 0
        }`,
        description: `Precisa melhorar o desempenho nas próximas rodadas.`,
      },
    ];
  }, [mvp, topScorer, topPlaymaker, worstPlayer]);

  const pointsRanking = useMemo(() => {
    if (!players) return [];
    return [...players]
      .sort((a, b) => (b.total_pontos || 0) - (a.total_pontos || 0))
      .slice(0, 7);
  }, [players]);

  const scorersRanking = useMemo(() => {
    if (!players) return [];
    return [...players]
      .sort((a, b) => (b.gols || 0) - (a.gols || 0))
      .slice(0, 3);
  }, [players]);

  const playmakersRanking = useMemo(() => {
    if (!players) return [];
    return [...players]
      .sort((a, b) => (b.assistencias || 0) - (a.assistencias || 0))
      .slice(0, 3);
  }, [players]);

  useEffect(() => {
    if (pointsRanking.length > 0) {
      setSelectedPlayer(pointsRanking[0]);
    } else {
      setSelectedPlayer(null); 
    }
  }, [pointsRanking]);

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

  return (
    <PageContainer>
      {/* ADICIONA O BOTÃO AQUI */}
      <HomeButton to="/">Voltar ao Início</HomeButton>

      <BackgroundGradients />
      <OverlayGradient />
      <ContentWrapper>
        <Header>
          <Subtitle>Painel da Rodada</Subtitle>
          <Title>
            Radar completo: quem decidiu e quais craques dominaram o gramado
          </Title>
          <Description>
            Explore os destaques, rankings e o desempenho individual dos
            jogadores.
          </Description>
        </Header>

        <FilterSection>
          <FilterLabel htmlFor="rodada-filter">Filtrar por Rodada:</FilterLabel>
          <FilterSelect
            id="rodada-filter"
            value={selectedRodadaId}
            onChange={(e) => setSelectedRodadaId(e.target.value)}
            disabled={rodadas.length === 0}
          >
            {rodadas.length > 0 ? (
              rodadas.map((rodada) => (
                <option key={rodada.id} value={rodada.id}>
                  Rodada de {formatarDataRodada(rodada.data)}
                </option>
              ))
            ) : (
              <option>Nenhuma rodada encontrada</option>
            )}
          </FilterSelect>
        </FilterSection>

        {!players || players.length === 0 ? (
          <EmptyState>
            <p>
              Não há estatísticas para exibir nesta rodada. Finalize a rodada
              para ver os dados.
            </p>
          </EmptyState>
        ) : (
          <>
            <HighlightGrid>
              {highlightCards.map((highlight, index) => {
                const palette = getTeamPalette(
                  highlight.player.time || "Time Preto"
                );
                return (
                  <HighlightCard
                    key={index}
                    borderColor={palette.borderColor}
                    shadowColor={palette.shadowColor}
                    active={activeHighlight === index}
                    onMouseEnter={() => setActiveHighlight(index)}
                    onClick={() => setActiveHighlight(index)}
                    tabIndex={0}
                  >
                    <CardGradient
                      gradient={palette.gradient}
                      active={activeHighlight === index}
                    />
                    <CardHeader>
                      <CardHeaderText>
                        <CardSubtitle>{highlight.title}</CardSubtitle>
                        <CardTitle>{highlight.player.nome}</CardTitle>
                        <CardPosition>
                          {highlight.player.posicao || "Jogador"}
                        </CardPosition>
                      </CardHeaderText>
                      <TeamBadge
                        bgColor={palette.badge}
                        textColor={palette.textColor}
                      >
                        {highlight.player.time
                          ? highlight.player.time.replace("Time ", "")
                          : "N/A"}
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
                      {selectedPlayer.nome} —{" "}
                      {selectedPlayer.time || "Sem Time"}
                    </DetailTitle>
                    <DetailSubtitle>
                      {selectedPlayer.posicao ||
                        "Jogador de campo com desempenho consistente"}
                    </DetailSubtitle>
                  </div>
                  <DetailStats>
                    <StatBox>
                      <StatBoxLabel>Equipe</StatBoxLabel>
                      <StatBoxValue>
                        {selectedPlayer.time || "N/A"}
                      </StatBoxValue>
                    </StatBox>
                    <StatBox>
                      <StatBoxLabel>Pontuação</StatBoxLabel>
                      <StatBoxValue>
                        {selectedPlayer.total_pontos || 0}
                      </StatBoxValue>
                    </StatBox>
                    <StatBox>
                      <StatBoxLabel>G+A</StatBoxLabel>
                      <StatBoxValue>
                        {selectedPlayer.gols || 0} /{" "}
                        {selectedPlayer.assistencias || 0}
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
                      Ranking completo que pondera impacto, gols e assistências.
                    </RankingSubtitle>
                  </div>
                  <RankingBadge>Elite da Rodada</RankingBadge>
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
                        const palette = getTeamPalette(
                          player.time || "Time Preto"
                        );
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
                                {player.time
                                  ? player.time.replace("Time ", "")
                                  : "N/A"}
                              </TeamBadge>
                            </Td>
                            <Td>
                              <StatValue color="#FACC15">
                                {player.total_pontos || 0}
                              </StatValue>
                            </Td>
                            <Td>
                              <StatValue color="#22D3EE">
                                {player.gols || 0}
                              </StatValue>
                            </Td>
                            <Td>
                              <StatValue color="#A855F7">
                                {player.assistencias || 0}
                              </StatValue>
                            </Td>
                          </Tr>
                        );
                      })}
                    </TBody>
                  </Table>
                </TableWrapper>
              </RankingPanel>

              <SidePanel>
                <SmallRankingPanel>
                  <RankingHeader>
                    <div>
                      <RankingTitle>Top 3 artilheiros</RankingTitle>
                    </div>
                  </RankingHeader>
                  <TableWrapper>
                    <Table>
                      <THead>
                        <tr>
                          <Th>#</Th>
                          <Th>Jogador</Th>
                          <Th>Gols</Th>
                        </tr>
                      </THead>
                      <TBody>
                        {scorersRanking.map((player, index) => (
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
                              <StatValue color="#FACC15">
                                {player.gols || 0}
                              </StatValue>
                            </Td>
                          </Tr>
                        ))}
                      </TBody>
                    </Table>
                  </TableWrapper>
                </SmallRankingPanel>

                <SmallRankingPanel>
                  <RankingHeader>
                    <div>
                      <RankingTitle>Top 3 armadores</RankingTitle>
                    </div>
                  </RankingHeader>
                  <TableWrapper>
                    <Table>
                      <THead>
                        <tr>
                          <Th>#</Th>
                          <Th>Jogador</Th>
                          <Th>Assist.</Th>
                        </tr>
                      </THead>
                      <TBody>
                        {playmakersRanking.map((player, index) => (
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
                              <StatValue color="#38BDF8">
                                {player.assistencias || 0}
                              </StatValue>
                            </Td>
                          </Tr>
                        ))}
                      </TBody>
                    </Table>
                  </TableWrapper>
                </SmallRankingPanel>
              </SidePanel>
            </MainContent>
          </>
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default ResultadoRodadaPage;