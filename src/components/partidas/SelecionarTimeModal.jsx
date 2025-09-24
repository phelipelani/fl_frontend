import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../../hooks/useSound';
import { IoClose, IoShirtOutline } from 'react-icons/io5';

import iconeAmarelo from '../../assets/Amarelo.png';
import iconePreto from '../../assets/Preto.png';
import iconeAzul from '../../assets/Azul.png';
import iconeRosa from '../../assets/Rosa.png';

const teamIcons = [iconeAmarelo, iconePreto, iconeAzul, iconeRosa];

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
  z-index: 1000;
  padding: clamp(10px, 2vw, 20px);

  @media (max-width: 480px) {
    padding: 5px;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    padding: 5px;
  }
`;

const ModalContent = styled(motion.div)`
  position: relative;
  background-color: ${(props) => props.theme.colors.background};
  padding: clamp(20px, 5vw, ${(props) => props.theme.spacing.xl});
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  border: 2px solid ${(props) => props.theme.colors.primary};
  box-shadow: 0 0 30px rgba(250, 204, 21, 0.2);
  display: flex;
  flex-direction: column;
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
    padding: clamp(15px, 4vw, 25px);
  }

  @media (orientation: landscape) and (max-height: 500px) {
    max-height: 95vh;
    padding: 15px;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: clamp(5px, 1.5vw, ${(props) => props.theme.spacing.md});
  right: clamp(5px, 1.5vw, ${(props) => props.theme.spacing.md});
  background: transparent;
  border: none;
  color: ${(props) => props.theme.colors.primary};
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  cursor: pointer;
  line-height: 1;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #facc15;
  }

  @media (max-width: 480px) {
    top: 5px;
    right: 5px;
    font-size: 1.2rem;
  }
`;

const ModalTitle = styled(motion.h2)`
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
  margin-bottom: clamp(15px, 4vw, ${(props) => props.theme.spacing.lg});
  font-size: clamp(1.2rem, 4vw, 1.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(8px, 2vw, ${(props) => props.theme.spacing.sm});
  margin-top: clamp(10px, 3vw, 30px);
  flex-wrap: wrap;

  svg {
    font-size: clamp(1rem, 3vw, 1.2rem);
    flex-shrink: 0;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    margin-top: 5px;
    margin-bottom: 10px;
    font-size: clamp(1rem, 3vw, 1.3rem);
  }
`;

const TimesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(10px, 3vw, ${(props) => props.theme.spacing.lg});
  width: 100%;
  padding: 0 5px;
  box-sizing: border-box;

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(8px, 2vw, ${(props) => props.theme.spacing.xl});
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: clamp(8px, 2vw, 15px);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    gap: clamp(5px, 2vw, 10px);
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TimeCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(5px, 1.5vw, ${(props) => props.theme.spacing.sm});
  cursor: pointer;
  padding: clamp(8px, 2vw, ${(props) => props.theme.spacing.sm});
  border-radius: 8px;
  border: 2px solid transparent;
  background-color: rgba(10, 25, 47, 0.33);
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    background-color: rgba(10, 25, 47, 0.5);
  }

  @media (max-width: 480px) {
    padding: 6px;
  }
`;

const TeamTitle = styled(motion.h3)`
  font-size: clamp(0.8rem, 2.5vw, 1rem);
  color: ${(props) => props.theme.colors.text};
  margin: 0;
  text-align: center;
  font-weight: 600;
  line-height: 1.2;

  @media (orientation: landscape) and (max-height: 500px) {
    font-size: 0.75rem;
  }
`;

const TimeIcon = styled(motion.img)`
  width: clamp(50px, 15vw, 80px);
  height: clamp(50px, 15vw, 80px);
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 480px) {
    width: clamp(40px, 12vw, 60px);
    height: clamp(40px, 12vw, 60px);
  }

  @media (orientation: landscape) and (max-height: 500px) {
    width: 50px;
    height: 50px;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(20px, 5vw, 40px);
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  text-align: center;
`;

const SelecionarTimeModal = ({ isOpen, onClose, onSelectTime, teams }) => {
  const { playHover, playClick } = useSound();

  const handleSelect = (team, index) => {
    playClick();
    onSelectTime(team, index);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ModalContent
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <CloseButton 
              onClick={onClose} 
              whileHover={{ scale: 1.2, rotate: 90 }} 
              whileTap={{ scale: 0.9 }}
            >
              <IoClose />
            </CloseButton>
            
            <ModalTitle
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <IoShirtOutline />
              <span>Selecionar Time</span>
            </ModalTitle>
            
            {teams && teams.length > 0 ? (
              <TimesGrid>
                {teams.map((team, index) => (
                  <TimeCard
                    key={team.id || index}
                    onClick={() => handleSelect(team, index)}
                    onMouseEnter={playHover}
                    whileHover={{ 
                      scale: 1.1, 
                      borderColor: '#facc15', 
                      backgroundColor: 'rgba(10, 25, 47, 0.6)',
                      boxShadow: '0 4px 12px rgba(250, 204, 21, 0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (index * 0.05) }}
                  >
                    <TimeIcon
                      src={teamIcons[index % teamIcons.length]}
                      alt={`Time ${index + 1}`}
                      whileHover={{ scale: 1.05 }}
                    />
                    <TeamTitle
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 + (index * 0.05) }}
                    >
                      Time {index + 1}
                    </TeamTitle>
                  </TimeCard>
                ))}
              </TimesGrid>
            ) : (
              <EmptyState>
                <IoShirtOutline size={32} style={{ marginBottom: '10px', opacity: 0.5 }} />
                <span>Nenhum time disponível</span>
              </EmptyState>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default SelecionarTimeModal;