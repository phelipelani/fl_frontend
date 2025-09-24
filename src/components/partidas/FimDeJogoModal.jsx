import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { useSound } from '../../hooks/useSound.js';
import { FaTrophy, FaHandshake, FaArrowRight } from 'react-icons/fa';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1002;
  padding: 20px;

  @media (max-width: 480px) {
    padding: 10px;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    padding: 5px;
  }
`;

const ModalContent = styled(motion.div)`
  background: ${(props) => props.theme.colors.darkBlue};
  padding: clamp(20px, 5vw, ${(props) => props.theme.spacing.xl});
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  border: 2px solid ${props => props.borderColor || props.theme.colors.primary};
  text-align: center;
  box-shadow: 0 0 40px ${props => props.borderColor || props.theme.colors.primary}77;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(15px, 3vw, ${(props) => props.theme.spacing.lg});
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    max-height: 85vh;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    max-height: 95vh;
    padding: 15px;
    gap: 10px;
  }
`;

const ResultText = styled(motion.h2)`
  color: #e6f1ff;
  font-size: clamp(1.5rem, 6vw, 2.5rem);
  font-family: ${(props) => props.theme.fonts.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(8px, 2vw, ${(props) => props.theme.spacing.md});
  margin: 0;
  flex-wrap: wrap;

  @media (orientation: landscape) and (max-height: 500px) {
    font-size: clamp(1.2rem, 4vw, 2rem);
  }
`;

const ScoreContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  gap: clamp(10px, 5vw, 30px);
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    flex-direction: row;
    gap: 10px;
    flex-wrap: nowrap;
  }
`;

const TeamScore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(5px, 1.5vw, ${(props) => props.theme.spacing.sm});
  opacity: ${props => (props.isWinner ? 1 : 0.6)};
  transform: ${props => (props.isWinner ? 'scale(1.1)' : 'scale(1)')};
  transition: all 0.3s ease;
  min-width: 100px;

  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const TeamName = styled.h3`
  font-size: clamp(0.9rem, 3vw, 1.2rem);
  color: ${(props) => props.theme.colors.text};
  margin: 0;
  font-weight: 600;
`;

const ScoreNumber = styled.span`
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-family: ${(props) => props.theme.fonts.primary};
  color: ${(props) => props.theme.colors.secondary};
  font-weight: bold;
  line-height: 1;

  @media (orientation: landscape) and (max-height: 500px) {
    font-size: clamp(2rem, 6vw, 3rem);
  }
`;

const VsText = styled(motion.h2)`
  font-size: clamp(2rem, 6vw, 3rem);
  color: #fff;
  margin: 0;
  font-weight: bold;
  line-height: 1;
  flex-shrink: 0;

  @media (max-width: 768px) {
    order: -1;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
  }
`;

const TrophyIcon = styled(motion.div)`
  font-size: clamp(1.5rem, 4vw, 2rem);
  color: ${(props) => props.theme.colors.primary};

  @media (orientation: landscape) and (max-height: 500px) {
    font-size: 1.2rem;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 10px;
  box-sizing: border-box;
`;

const FimDeJogoModal = ({ isOpen, onProximaPartida, vencedorInfo, placar1, placar2 }) => {
  const { playSuccess } = useSound();

  useEffect(() => {
    if (isOpen) {
      playSuccess(); // Toca o som de sucesso quando o modal abre
    }
  }, [isOpen, playSuccess]);

  if (!isOpen) return null;

  const isDraw = vencedorInfo?.nome === 'Empate';
  const isTime1Winner = !isDraw && vencedorInfo?.timeVencedor?.teamIndex === 0;
  const isTime2Winner = !isDraw && vencedorInfo?.timeVencedor?.teamIndex === 1;

  const getResultContent = () => {
    if (isDraw) {
      return (
        <>
          <FaHandshake style={{ flexShrink: 0 }} />
          <span>Partida Empatada!</span>
        </>
      );
    }
    return (
      <>
        <FaTrophy style={{ flexShrink: 0 }} />
        <span>{vencedorInfo?.nome} Venceu!</span>
      </>
    );
  };

  const getBorderColor = () => {
    if (isDraw) return '#6b7280'; // Cor cinza para empate
    return vencedorInfo?.cor || '#facc15';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
        >
          <ModalContent
            borderColor={getBorderColor()}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <ResultText
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {getResultContent()}
            </ResultText>
            
            <ScoreContainer>
              <TeamScore isWinner={isTime1Winner}>
                <TeamName>Time 1</TeamName>
                <ScoreNumber>{placar1}</ScoreNumber>
                {isTime1Winner && (
                  <TrophyIcon 
                    animate={{ scale: [1, 1.3, 1], rotate: [-10, 10, 0]}}
                    transition={{ repeat: Infinity, duration: 1, repeatDelay: 1}}
                  >
                    <FaTrophy />
                  </TrophyIcon>
                )}
              </TeamScore>

              <VsText
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                VS
              </VsText>

              <TeamScore isWinner={isTime2Winner}>
                <TeamName>Time 2</TeamName>
                <ScoreNumber>{placar2}</ScoreNumber>
                {isTime2Winner && (
                  <TrophyIcon
                    animate={{ scale: [1, 1.3, 1], rotate: [-10, 10, 0]}}
                    transition={{ repeat: Infinity, duration: 1, repeatDelay: 1}}
                  >
                    <FaTrophy />
                  </TrophyIcon>
                )}
              </TeamScore>
            </ScoreContainer>

            <ButtonContainer>
              <Button 
                onClick={onProximaPartida} 
                icon={<FaArrowRight />} 
                iconPosition="right"
                style={{ 
                  width: '100%',
                  maxWidth: '250px',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
                }}
              >
                Próxima Partida
              </Button>
            </ButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default FimDeJogoModal;