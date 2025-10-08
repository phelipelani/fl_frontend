import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useSound } from "../../hooks/useSound";
import { FaFutbol } from "react-icons/fa";
import { IoFootsteps, IoSwapHorizontalOutline } from "react-icons/io5";

const Container = styled(motion.div)`
  background-color: ${(props) => props.bgColor || "rgba(10, 25, 47, 0.8)"};
  padding: 4px;
  border-radius: 8px;
  width: 48% !important;
  min-width: 0 !important;
  transition: background-color 0.3s ease;
  height: 100% !important;
  overflow-y: auto;
  box-sizing: border-box;
  display: flex !important;
  flex-direction: column !important;
  gap: 2px !important;

  &::-webkit-scrollbar {
    width: 3px !important;
  }
  &::-webkit-scrollbar-track {
    background: transparent !important;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.primary} !important;
    border-radius: 2px !important;
  }

  /* NUNCA MUDA O LAYOUT - SEMPRE 48% */
  @media (max-width: 768px) {
    width: 48% !important;
    padding: 4px !important;
    gap: 2px !important;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    width: 48% !important;
    padding: 3px !important;
    gap: 1px !important;
  }
`;

const JogadorRow = styled(motion.div)`
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  flex-wrap: nowrap !important;
  margin-bottom: 0 !important;
  background-color: rgba(0, 0, 0, 0.2) !important;
  padding: 3px 6px !important;
  border-radius: 4px !important;
  cursor: pointer !important;
  position: relative !important;
  overflow: hidden !important;
  gap: 4px !important;
  transition: all 0.2s ease !important;
  min-height: 24px !important;
  font-size: 10px !important;
      height: 16%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3) !important;
  }

  /* SEMPRE HORIZONTAL - NUNCA MUDA */
  @media (max-width: 768px) {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;
    flex-wrap: nowrap !important;
    gap: 2px !important;
    padding: 2px 4px !important;
    min-height: 22px !important;
    font-size: 9px !important;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    padding: 5px 6px !important;
    min-height: 24px !important;
    gap: 4px !important;
    font-size: 16px !important;
  }
`;

const PlayerInfo = styled(motion.div)`
  font-weight: 500 !important;
  flex-grow: 1 !important;
  display: flex !important;
  align-items: center !important;
  gap: 2px !important;
  font-size: inherit !important;
  min-width: 0 !important;
  max-width: 45% !important;

  span {
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    flex: 1 !important;
    font-size: inherit !important;
  }

  @media (max-width: 768px) {
    max-width: 45% !important;
    gap: 1px !important;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    max-width: 40% !important;
    gap: 1px !important;
  }
`;

const ControlsContainer = styled.div`
  display: flex !important;
  align-items: center !important;
  gap: 1px !important;
  flex-shrink: 0 !important;
  min-width: 80px !important;

  @media (max-width: 768px) {
    gap: 1px !important;
    min-width: 70px !important;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    gap: 5px !important;
    min-width: 150px !important;

    font-size: 16px !important;
    justify-content: space-around !important;

  }
`;

const StatsControl = styled(motion.div)`
  display: flex !important;
  align-items: center !important;
  gap: 3px !important;
  opacity: ${(props) => (props.isJogoAtivo ? 1 : 0)} !important;
  transition: opacity 0.2s ease !important;

`;

const StatIcon = styled.div`
  color: ${(props) => props.theme.colors.primary} !important;
  display: flex !important;
  align-items: center !important;
  font-size: 8x !important;
  flex-shrink: 0 !important;
  min-width: 8px !important;
  width: 8px !important;
  height: 8px !important;
  justify-content: center !important;

  @media (max-width: 768px) {
    font-size: 7px !important;
    width: 7px !important;
    height: 7px !important;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    font-size: 16px !important;
    width: 16px !important;
    height: 16px !important;
  }
`;

const StatValue = styled(motion.span)`
  font-weight: bold !important;
  font-size: 10px !important;
  width: 12px !important;
  text-align: center !important;
  line-height: 1 !important;
  flex-shrink: 0 !important;
  min-width: 12px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;

  @media (max-width: 768px) {
    font-size: 9px !important;
    width: 11px !important;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    font-size: 8px !important;
    width: 10px !important;
  }
`;

const StatButton = styled(motion.button)`
  background: ${(props) => props.theme.colors.primary} !important;
  color: ${(props) => props.theme.colors.background} !important;
  border: none !important;
  width: 16px !important;
  height: 16px !important;
  border-radius: 50% !important;
  font-weight: bold !important;
  font-size: 8px !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  line-height: 1 !important;
  flex-shrink: 0 !important;
  transition: all 0.1s ease !important;
  padding: 0 !important;
  margin: 0 !important;
  min-width: 0 !important;

  @media (max-width: 768px) {
    width: 14px !important;
    height: 14px !important;
    font-size: 7px !important;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    width: 12px !important;
    height: 12px !important;
    font-size: 6px !important;
  }
`;

const SubIcon = styled(motion.div)`
  position: absolute !important;
  right: 4px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  color: ${(props) => props.theme.colors.secondary} !important;
  font-size: 10px !important;
  opacity: ${(props) => (props.isJogoAtivo ? 0 : 1)} !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  flex-shrink: 0 !important;
  width: 12px !important;
  height: 12px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  pointer-events: ${(props) =>
    props.isJogoAtivo ? "none" : "auto"} !important;

  /* SEMPRE ABSOLUTE - NUNCA MUDA */
  @media (max-width: 768px) {
    position: absolute !important;
    right: 3px !important;
    font-size: 9px !important;
    width: 10px !important;
    height: 10px !important;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    right: 2px !important;
    font-size: 8px !important;
    width: 8px !important;
    height: 8px !important;
  }
`;

const EmptyState = styled.div`
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 10px !important;
  color: ${(props) => props.theme.colors.textSecondary} !important;
  font-size: 10px !important;
  text-align: center !important;
  opacity: 0.6 !important;

  svg {
    font-size: 12px !important;
    margin-bottom: 4px !important;
    opacity: 0.5 !important;
  }

  @media (max-width: 768px) {
    padding: 8px !important;
    font-size: 9px !important;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    padding: 6px !important;
    font-size: 8px !important;
  }
`;

const TimeDisplay = ({ timeData, onStatChange, onOpenSubModal, bgColor, isJogoAtivo, timeSlot = 'time1' }) => {
  const { playHover, playClick } = useSound();

  // Função para abrir modal de substituição - SÓ quando jogo está PAUSADO
  const handleOpenSubModal = (jogador) => {
    if (!isJogoAtivo && onOpenSubModal) {
      console.log(`Abrindo substituição para ${jogador.nome} em ${timeSlot}`); // Debug
      playHover();
      onOpenSubModal(jogador);
    }
  };

  if (!timeData) {
    return (
      <Container 
        style={{ 
          opacity: 0.5, 
          backgroundColor: 'rgba(10, 25, 47, 0.4)',
          display: 'flex !important',
          alignItems: 'center !important',
          justifyContent: 'center !important'
        }}
      >
        <EmptyState>
          <FaFutbol />
          <span>Nenhum time selecionado</span>
        </EmptyState>
      </Container>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.05 } 
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const handleStatClick = (e, jogadorId, stat, delta) => {
    e.stopPropagation();
    if (!isJogoAtivo) return;
    playClick();
    console.log(`Mudando stat: ${stat} do jogador ${jogadorId} em ${timeSlot}`); // Debug
    onStatChange(timeSlot, jogadorId, stat, delta);
  };

  const handleRowClick = (jogador) => {
    // SÓ abre substituição quando jogo está PAUSADO (!isJogoAtivo)
    if (!isJogoAtivo && onOpenSubModal) {
      handleOpenSubModal(jogador);
    }
  };

  const showSubIcon = !isJogoAtivo && onOpenSubModal;

  return (
    <Container 
      bgColor={bgColor} 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
    >
      {timeData.jogadores && timeData.jogadores.length > 0 ? (
        timeData.jogadores.map((j, index) => (
          <JogadorRow 
            key={j.id}
            onClick={() => handleRowClick(j)}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.05 }}
            whileHover={!isJogoAtivo ? {
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              scale: 1.01
            } : undefined}
            whileTap={isJogoAtivo ? { scale: 0.99 } : undefined}
            style={{ cursor: !isJogoAtivo && onOpenSubModal ? 'pointer' : 'default' }}
          >
            <PlayerInfo>
              <span title={j.nome}>{j.nome}</span>
            </PlayerInfo>
            
            <ControlsContainer>
              <StatsControl isJogoAtivo={isJogoAtivo}>
                <StatIcon>
                  <FaFutbol />
                </StatIcon>
                <StatButton 
                  onClick={(e) => handleStatClick(e, j.id, 'gols', -1)} 
                  whileTap={{ scale: 0.9 }}
                  disabled={!isJogoAtivo}
                  style={{ 
                    opacity: isJogoAtivo ? 1 : 0.5,
                    cursor: isJogoAtivo ? 'pointer' : 'not-allowed'
                  }}
                >
                  −
                </StatButton>
                <StatValue 
                  key={`g-${j.id}-${j.gols}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.15 }}
                >
                  {j.gols}
                </StatValue>
                <StatButton 
                  onClick={(e) => handleStatClick(e, j.id, 'gols', 1)} 
                  whileTap={{ scale: 0.9 }}
                  disabled={!isJogoAtivo}
                  style={{ 
                    opacity: isJogoAtivo ? 1 : 0.5,
                    cursor: isJogoAtivo ? 'pointer' : 'not-allowed'
                  }}
                >
                  +
                </StatButton>
              </StatsControl>

              <StatsControl isJogoAtivo={isJogoAtivo}>
                <StatIcon>
                  <IoFootsteps />
                </StatIcon>
                <StatButton 
                  onClick={(e) => handleStatClick(e, j.id, 'assistencias', -1)} 
                  whileTap={{ scale: 0.9 }}
                  disabled={!isJogoAtivo}
                  style={{ 
                    opacity: isJogoAtivo ? 1 : 0.5,
                    cursor: isJogoAtivo ? 'pointer' : 'not-allowed'
                  }}
                >
                  −
                </StatButton>
                <StatValue 
                  key={`a-${j.id}-${j.assistencias}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.15 }}
                >
                  {j.assistencias}
                </StatValue>
                <StatButton 
                  onClick={(e) => handleStatClick(e, j.id, 'assistencias', 1)} 
                  whileTap={{ scale: 0.9 }}
                  disabled={!isJogoAtivo}
                  style={{ 
                    opacity: isJogoAtivo ? 1 : 0.5,
                    cursor: isJogoAtivo ? 'pointer' : 'not-allowed'
                  }}
                >
                  +
                </StatButton>
              </StatsControl>
            </ControlsContainer>

            {/* ÍCONE DE SUBSTITUIÇÃO - SÓ APARECE QUANDO JOGO ESTÁ PAUSADO E onOpenSubModal EXISTE */}
            {showSubIcon && (
              <SubIcon showSub={showSubIcon} onClick={(e) => {
                e.stopPropagation();
                handleOpenSubModal(j);
              }}>
                <IoSwapHorizontalOutline />
              </SubIcon>
            )}
          </JogadorRow>
        ))
      ) : (
        <EmptyState>
          <FaFutbol />
          <span>Nenhum jogador no time</span>
        </EmptyState>
      )}
    </Container>
  );
};

export default TimeDisplay;