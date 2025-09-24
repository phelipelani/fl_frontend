import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  createPartida,
  savePartidaResultados,
  finalizarRodada,
  registrarGolContraAPI,
} from "../services/api";
import SelecionarTimeModal from "../components/partidas/SelecionarTimeModal";
import SubstituirJogadorModal from "../components/partidas/SubstituirJogadorModal";
import TimeDisplay from "../components/partidas/TimeDisplay";
import FimDeJogoModal from "../components/partidas/FimDeJogoModal";
import FimRodadaModal from "../components/rodadas/FimRodadaModal";
import ConfirmacaoModal from "../components/common/ConfirmacaoModal";
import Button from "../components/common/Button";
import GolContraModal from "../components/partidas/GolContraModal";
import Amarelo from "../assets/Amarelo.png";
import Preto from "../assets/Preto.png";
import Azul from "../assets/Azul.png";
import Rosa from "../assets/Rosa.png";

const teamIcons = [Amarelo, Preto, Azul, Rosa];

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding: ${(props) => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  gap: ${(props) => props.theme.spacing.sm};
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: ${(props) => props.theme.spacing.sm};
    gap: ${(props) => props.theme.spacing.xs};
  }

  @media (max-width: 480px) {
    padding: ${(props) => props.theme.spacing.xs};
    gap: ${(props) => props.theme.spacing.xs};
  }

  @media (orientation: landscape) and (max-height: 500px) {
    padding: ${(props) => props.theme.spacing.xs};
    gap: ${(props) => props.theme.spacing.xs};
  }
`;

const FloatingBackButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(250, 204, 21, 0.8);
  color: #0a192f;
  border: none;
  width: clamp(40px, 5vw, 50px);
  height: clamp(40px, 5vw, 50px);
  border-radius: 50%;
  font-size: clamp(1rem, 3vw, 1.5rem);
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  transition: all 0.3s ease;

  &:hover {
    background-color: #facc15;
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    top: 5px;
    left: 5px;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    top: 5px;
    left: 5px;
    width: 24px;
    height: 24px;
    font-size: 1rem;
  }
`;

const PlacarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }

  @media (max-width: 480px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    // gap: ${(props) => props.theme.spacing.xs};
    width: 100%;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    flex-direction: row;
    gap: ${(props) => props.theme.spacing.xs};
  }
`;

const TimePlacar = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  width: 45%;
  justify-content: ${(props) =>
    props.align === "right" ? "flex-end" : "flex-start"};

  @media (max-width: 768px) {
    gap: ${(props) => props.theme.spacing.sm};
    width: auto;
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    gap: ${(props) => props.theme.spacing.xs};
  }

  @media (orientation: landscape) and (max-height: 500px) {
    gap: ${(props) => props.theme.spacing.xs};
  }
`;

const ScoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xs};
`;

const PlacarNumero = styled.div`
  font-size: clamp(2rem, 8vw, 4rem);
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.primary};

  @media (orientation: landscape) and (max-height: 500px) {
    font-size: clamp(1.5rem, 6vw, 3rem);
  }
`;

const TimeSelector = styled.div`
  width: clamp(80px, 10vw, 120px);
  height: clamp(80px, 10vw, 120px);
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  border: 2px dashed ${(props) => props.theme.colors.primary};
  transition: all 0.3s ease;
  overflow: hidden;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  flex-shrink: 0;

  &:hover {
    background-color: ${(props) =>
      props.disabled ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.2)"};
    border-style: ${(props) => (props.disabled ? "dashed" : "solid")};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 480px) {
    width: clamp(60px, 15vw, 80px);
    height: clamp(60px, 15vw, 80px);
  }

  @media (orientation: landscape) and (max-height: 500px) {
    width: 60px;
    height: 60px;
  }
`;

const EventHistory = styled.div`
  font-size: clamp(0.6rem, 2vw, 0.8rem);
  color: ${(props) => props.theme.colors.text};
  height: clamp(40px, 8vh, 60px);
  overflow-y: auto;
  text-align: center;
  width: clamp(100px, 15vw, 150px);
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 4px;
  }

  @media (max-width: 480px) {
    height: 40px;
    width: 100px;
    font-size: 0.6rem;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    height: 30px;
    width: 80px;
    font-size: 0.5rem;
  }
`;

const JogadoresContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1200px;
  gap: ${(props) => props.theme.spacing.md};
  flex-grow: 1;
  min-height: 0;
  overflow: hidden;

  @media (max-width: 768px) {
    gap: ${(props) => props.theme.spacing.sm};
  }

  @media ${(props) => props.theme.breakpoints.mobile} {
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.xs};
  }

  @media (orientation: landscape) and (max-height: 500px) {
    gap: ${(props) => props.theme.spacing.xs};
  }
`;

const CronometroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(5px, 1vh, 10px);
  flex-shrink: 0;
`;

const Tempo = styled.div`
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.5);
  padding: clamp(5px, 2vw, 10px) clamp(10px, 3vw, 20px);
  border-radius: 10px;
  width: clamp(120px, 20vw, 200px);
  text-align: center;
  color: #ef4444;

  @media (orientation: landscape) and (max-height: 500px) {
    font-size: 1.5rem;
    padding: 5px 10px;
    width: 120px;
  }
`;

const BotoesCronometro = styled.div`
  display: flex;
  gap: clamp(10px, 2vw, 15px);

  button {
    background: #facc15;
    color: #0a192f;
    border: none;
    width: clamp(30px, 4vw, 40px);
    height: clamp(30px, 4vw, 40px);
    border-radius: 50%;
    font-size: clamp(1rem, 3vw, 1.5rem);
    cursor: pointer;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    gap: 5px;

    button {
      width: 30px;
      height: 30px;
      font-size: 1rem;
    }
  }
`;

const BotoesAcaoContainer = styled.div`
  display: flex;
  gap: clamp(5px, 1vw, 10px);
`;

const GolContraButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  width: clamp(25px, 4vw, 35px);
  height: clamp(25px, 4vw, 35px);
  border-radius: 50%;
  font-size: clamp(0.6rem, 2vw, 0.8rem);
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (orientation: landscape) and (max-height: 500px) {
    width: 25px;
    height: 25px;
    font-size: 0.6rem;
  }
`;

const GoleiroButton = styled.button`
  background: #10b981;
  color: white;
  border: none;
  width: clamp(25px, 4vw, 35px);
  height: clamp(25px, 4vw, 35px);
  border-radius: 50%;
  font-size: clamp(0.6rem, 2vw, 0.8rem);
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (orientation: landscape) and (max-height: 500px) {
    width: 25px;
    height: 25px;
    font-size: 0.6rem;
  }
`;

const CenterButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  margin-top: ${(props) => props.theme.spacing.xs};

  @media (max-width: 480px) {
    margin-top: 0;
  }
`;

const BottomRightButtonContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;

  button {
    background-color: #ef4444;
    width: auto;
    padding: clamp(5px, 2vw, 10px) clamp(10px, 3vw, 20px);
    font-size: clamp(0.7rem, 2vw, 0.9rem);
  }

  @media (orientation: landscape) and (max-height: 500px) {
    right: 5px;
      bottom: -45px;
  }
`;

const PartidasPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ligaId, rodadaId } = useParams();

  const teams = location.state?.teams || [];
  const colors = location.state?.colors || [];

  const [partidaId, setPartidaId] = useState(null);
  const [time1, setTime1] = useState(null);
  const [time2, setTime2] = useState(null);
  const [eventHistory, setEventHistory] = useState({ time1: [], time2: [] });
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [isFimDeJogoModalOpen, setIsFimDeJogoModalOpen] = useState(false);
  const [vencedorInfo, setVencedorInfo] = useState(null);
  const [substituicaoInfo, setSubstituicaoInfo] = useState({ jogador: null, setTime: null });
  const [selectingFor, setSelectingFor] = useState(null);
  const [tempo, setTempo] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const countRef = useRef(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFimRodadaModalOpen, setIsFimRodadaModalOpen] = useState(false);
  const [resultadoRodada, setResultadoRodada] = useState(null);
  const [isGolContraModalOpen, setIsGolContraModalOpen] = useState(false);
  const [golContraInfo, setGolContraInfo] = useState({ time: null, timeNumero: null });
  const [placarExtras, setPlacarExtras] = useState({ time1: 0, time2: 0 });

  useEffect(() => {
    if (teams.length === 0 && location.pathname.includes('/partidas')) {
      alert("Dados da partida não encontrados. Redirecionando para a página da rodada...");
      navigate(`/liga/${ligaId}/rodada/${rodadaId}`);
    }
  }, [teams, ligaId, rodadaId, navigate, location.pathname]);

  const createNewPartida = useCallback(async () => {
    try {
      const novaPartida = await createPartida(rodadaId);
      setPartidaId(novaPartida.id);
    } catch (error) {
      alert("Não foi possível criar uma nova partida no servidor.");
      navigate(-1);
    }
  }, [rodadaId, navigate]);

  useEffect(() => { createNewPartida(); }, [createNewPartida]);

  const handleStart = () => {
    if (!isActive && time1 && time2) {
      setIsActive(true);
      countRef.current = setInterval(() => setTempo((t) => t + 1), 1000);
    }
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsActive(false);
  };
  
  const placar1 = (time1 ? time1.jogadores.reduce((sum, j) => sum + j.gols, 0) : 0) + placarExtras.time1;
  const placar2 = (time2 ? time2.jogadores.reduce((sum, j) => sum + j.gols, 0) : 0) + placarExtras.time2;

  const handleFinalizarPartida = async () => {
    handlePause();
    if (!time1 || !time2) return;
    let vencedor = null;
    if (placar1 > placar2) {
      vencedor = { nome: `Time ${time1.teamIndex + 1}`, cor: colors[time1.teamIndex][0], timeVencedor: time1 };
    } else if (placar2 > placar1) {
      vencedor = { nome: `Time ${time2.teamIndex + 1}`, cor: colors[time2.teamIndex][0], timeVencedor: time2 };
    } else {
      vencedor = { nome: "Empate" };
    }
    setVencedorInfo(vencedor);
    const data = { placar1, placar2, duracao: tempo, time1: time1.jogadores, time2: time2.jogadores, time1_numero: time1.teamIndex + 1, time2_numero: time2.teamIndex + 1 };
    try {
      await savePartidaResultados(partidaId, data);
      setIsFimDeJogoModalOpen(true);
    } catch (error) {
      alert(`Erro ao finalizar a partida: ${error.message}`);
    }
  };

  const handleProximaPartida = () => {
    setIsFimDeJogoModalOpen(false);
    setTempo(0);
    setEventHistory({ time1: [], time2: [] });
    if (vencedorInfo.nome === "Empate") {
      setTime1(null); setTime2(null);
    } else {
      const timeVencedorResetado = { ...vencedorInfo.timeVencedor, jogadores: vencedorInfo.timeVencedor.jogadores.map((j) => ({ ...j, gols: 0, assistencias: 0 }))};
      setTime1(timeVencedorResetado); setTime2(null);
    }
    setVencedorInfo(null);
    setPlacarExtras({ time1: 0, time2: 0 });
    createNewPartida();
  };

  const openSelectModal = (timeSlot) => {
    if (isActive) { alert("Pause o cronómetro para trocar os times."); return; }
    setSelectingFor(timeSlot); setIsSelectModalOpen(true);
  };

  const handleSelectTime = (teamData, teamIndex) => {
    const timeComStats = { ...teamData, teamIndex, jogadores: teamData.jogadores.map((j) => ({ ...j, gols: 0, assistencias: 0 })) };
    if (selectingFor === "time1") setTime1(timeComStats);
    else setTime2(timeComStats);
    setIsSelectModalOpen(false);
  };

  const openSubModal = (jogador, setTime) => {
    if (isActive) { alert("Pause o cronómetro para fazer uma substituição."); return; }
    setSubstituicaoInfo({ jogador, setTime }); setIsSubModalOpen(true);
  };

  const handleSubstituicao = (novoJogador) => {
    const { jogador: jogadorAntigo, setTime } = substituicaoInfo;
    const novoJogadorComStats = { ...novoJogador, gols: jogadorAntigo.gols, assistencias: jogadorAntigo.assistencias };
    setTime((prevTime) => ({ ...prevTime, jogadores: prevTime.jogadores.map((j) => (j.id === jogadorAntigo.id ? novoJogadorComStats : j)) }));
    setIsSubModalOpen(false);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleStatChange = (timeSlot, jogadorId, stat, delta) => {
    const timeState = timeSlot === 'time1' ? time1 : time2;
    const setTime = timeSlot === 'time1' ? setTime1 : setTime2;

    if (!timeState) return;

    if (stat === 'gols') {
      const jogador = timeState.jogadores.find(j => j.id === jogadorId);
      if (jogador) {
        if (delta === 1) {
          const newEvent = { id: Date.now(), text: `Golo: ${jogador.nome} ${formatTime(tempo)}`, jogadorId: jogador.id };
          setEventHistory(prev => ({ ...prev, [timeSlot]: [...prev[timeSlot], newEvent] }));
        } else if (delta === -1) {
          setEventHistory(prev => {
            const events = prev[timeSlot];
            // Encontrar o último evento de gol daquele jogador
            for (let i = events.length - 1; i >= 0; i--) {
              if (events[i].text.startsWith('Golo:') && events[i].jogadorId === jogadorId) {
                const newEvents = [...events];
                newEvents.splice(i, 1);
                return { ...prev, [timeSlot]: newEvents };
              }
            }
            return prev;
          });
        }
      }
    }

    setTime((prevTime) => {
      if (!prevTime) return null;
      return { ...prevTime, jogadores: prevTime.jogadores.map((j) => {
        if (j.id === jogadorId) return { ...j, [stat]: Math.max(0, j[stat] + delta) };
        return j;
      })};
    });
  };

  const handleOpenGolContraModal = (time, timeNumero) => {
    if (!time) return;
    setGolContraInfo({ time, timeNumero });
    setIsGolContraModalOpen(true);
  };

  const handleSelectGolContra = async (jogador) => {
    const timeAdversarioId = golContraInfo.timeNumero === 1 ? 2 : 1;
    const timeDoJogadorNumero = golContraInfo.timeNumero;
    try {
      await registrarGolContraAPI(partidaId, jogador.id, timeAdversarioId, timeDoJogadorNumero);
      setPlacarExtras(prev => ({ ...prev, [`time${timeAdversarioId}`]: prev[`time${timeAdversarioId}`] + 1 }));
      setEventHistory(prev => ({ ...prev, [`time${timeAdversarioId}`]: [...prev[`time${timeAdversarioId}`], { id: Date.now(), text: `Gol Contra: ${jogador.nome} ${formatTime(tempo)}`, jogadorId: jogador.id }]}));
    } catch (error) {
      alert(`Erro ao registrar gol contra: ${error.message}`);
    } finally {
      setIsGolContraModalOpen(false);
    }
  };

  const handleGolGoleiro = (timeNumero) => {
    setPlacarExtras(prev => ({ ...prev, [`time${timeNumero}`]: prev[`time${timeNumero}`] + 1 }));
    setEventHistory(prev => ({ ...prev, [`time${timeNumero}`]: [...prev[`time${timeNumero}`], { id: Date.now(), text: `Golo de Goleiro! ${formatTime(tempo)}` }]}));
  };

  const handleFinalizarRodadaClick = async () => {
    setIsConfirmModalOpen(false);
    try {
      const resultado = await finalizarRodada(rodadaId);
      setResultadoRodada(resultado);
      setIsFimRodadaModalOpen(true);
    } catch (error) {
      alert(`Erro ao finalizar a rodada: ${error.message}`);
    }
  };

  if (teams.length === 0) {
    return <PageContainer><h2>Carregando dados da partida...</h2></PageContainer>;
  }

  const jogadoresEmCampoIds = [...(time1?.jogadores.map((j) => j.id) || []), ...(time2?.jogadores.map((j) => j.id) || [])];
  const todosJogadoresSorteados = teams.flatMap((t) => t.jogadores);
  const jogadoresNoBanco = todosJogadoresSorteados.filter((j) => !jogadoresEmCampoIds.includes(j.id));

  return (
    <PageContainer>
      <FloatingBackButton onClick={() => navigate(-1)}>&larr;</FloatingBackButton>
      <PlacarContainer>
        <TimePlacar align="left">
          <TimeSelector onClick={() => openSelectModal("time1")} disabled={isActive}>
            {time1 ? <img src={teamIcons[time1.teamIndex]} alt={`Time ${time1.teamIndex + 1}`} /> : "Selecionar"}
          </TimeSelector>
          <ScoreInfo>
            <PlacarNumero>{placar1}</PlacarNumero>
            <BotoesAcaoContainer>
              {time1 && <GolContraButton onClick={() => handleOpenGolContraModal(time1, 1)}>GC</GolContraButton>}
              {time1 && <GoleiroButton onClick={() => handleGolGoleiro(1)}>GOL</GoleiroButton>}
            </BotoesAcaoContainer>
            <EventHistory>{eventHistory.time1.map((e) => (<div key={e.id}>{e.text}</div>))}</EventHistory>
          </ScoreInfo>
        </TimePlacar>
        
        <CronometroContainer>
            <Tempo>{formatTime(tempo)}</Tempo>
            <BotoesCronometro>
                <button onClick={handleStart}>▶</button>
                <button onClick={handlePause}>⏸</button>
            </BotoesCronometro>
        </CronometroContainer>

        <TimePlacar align="right">
          <ScoreInfo>
            <PlacarNumero>{placar2}</PlacarNumero>
            <BotoesAcaoContainer>
              {time2 && <GolContraButton onClick={() => handleOpenGolContraModal(time2, 2)}>GC</GolContraButton>}
              {time2 && <GoleiroButton onClick={() => handleGolGoleiro(2)}>GOL</GoleiroButton>}
            </BotoesAcaoContainer>
            <EventHistory>{eventHistory.time2.map((e) => (<div key={e.id}>{e.text}</div>))}</EventHistory>
          </ScoreInfo>
          <TimeSelector onClick={() => openSelectModal("time2")} disabled={isActive}>
            {time2 ? <img src={teamIcons[time2.teamIndex]} alt={`Time ${time2.teamIndex + 1}`} /> : "Selecionar"}
          </TimeSelector>
        </TimePlacar>
      </PlacarContainer>

      <JogadoresContainer>
        <TimeDisplay timeData={time1} onStatChange={handleStatChange} onOpenSubModal={(j) => openSubModal(j, setTime1)} bgColor={time1 ? `${colors[time1.teamIndex][0]}99` : undefined} isJogoAtivo={isActive} timeSlot="time1"/>
        <TimeDisplay timeData={time2} onStatChange={handleStatChange} onOpenSubModal={(j) => openSubModal(j, setTime2)} bgColor={time2 ? `${colors[time2.teamIndex][0]}99` : undefined} isJogoAtivo={isActive} timeSlot="time2"/>
      </JogadoresContainer>
      
      <CenterButtonContainer>
          <Button onClick={handleFinalizarPartida}>Finalizar Partida</Button>
      </CenterButtonContainer>

      <BottomRightButtonContainer>
          <Button onClick={() => setIsConfirmModalOpen(true)}>Finalizar Rodada</Button>
      </BottomRightButtonContainer>

      <SelecionarTimeModal isOpen={isSelectModalOpen} onClose={() => setIsSelectModalOpen(false)} onSelectTime={handleSelectTime} teams={teams}/>
      <SubstituirJogadorModal isOpen={isSubModalOpen} onClose={() => setIsSubModalOpen(false)} onSelectSub={handleSubstituicao} jogadoresDisponiveis={jogadoresNoBanco} jogadorASubstituir={substituicaoInfo.jogador}/>
      <ConfirmacaoModal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} onConfirm={handleFinalizarRodadaClick} title="Finalizar Rodada" message="Tem a certeza que quer finalizar esta rodada? Esta ação não pode ser desfeita."/>
      <FimRodadaModal isOpen={isFimRodadaModalOpen} onClose={() => navigate(`/liga/${ligaId}`)} resultado={resultadoRodada}/>
      <FimDeJogoModal isOpen={isFimDeJogoModalOpen} onProximaPartida={handleProximaPartida} vencedorInfo={vencedorInfo} placar1={placar1} placar2={placar2}/>
      <GolContraModal isOpen={isGolContraModalOpen} onClose={() => setIsGolContraModalOpen(false)} onSelect={handleSelectGolContra} jogadores={golContraInfo.time?.jogadores || []} nomeTime={`Time ${golContraInfo.timeNumero}`}/>
    </PageContainer>
  );
};

export default PartidasPage;

