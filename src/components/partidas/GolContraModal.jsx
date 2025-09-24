import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../../hooks/useSound';
import { IoClose, IoWarningOutline } from 'react-icons/io5';

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
  z-index: 1001;
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
  padding: clamp(15px, 4vw, ${(props) => props.theme.spacing.xl});
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  max-height: 90vh;
  overflow-y: auto;
  border: 2px solid ${(props) => props.theme.colors.danger};
  box-shadow: 0 0 30px rgba(239, 68, 68, 0.3);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.danger};
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    max-height: 85vh;
    padding: clamp(12px, 3vw, 20px);
  }

  @media (orientation: landscape) and (max-height: 500px) {
    max-height: 95vh;
    padding: 10px;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: clamp(5px, 1.5vw, ${(props) => props.theme.spacing.md});
  right: clamp(5px, 1.5vw, ${(props) => props.theme.spacing.md});
  background: transparent;
  border: none;
  color: ${(props) => props.theme.colors.secondary};
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  cursor: pointer;
  line-height: 1;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: ${(props) => props.theme.colors.danger};
  }

  @media (max-width: 480px) {
    top: 5px;
    right: 5px;
    font-size: 1.2rem;
  }
`;

const ModalTitle = styled(motion.h2)`
  color: ${(props) => props.theme.colors.secondary};
  text-align: center;
  margin-bottom: clamp(10px, 3vw, ${(props) => props.theme.spacing.lg});
  font-size: clamp(1.1rem, 4vw, 1.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(5px, 1.5vw, ${(props) => props.theme.spacing.sm});
  margin-top: clamp(10px, 3vw, 30px);
  flex-wrap: wrap;

  /* Cor do ícone de alerta */
  svg {
    color: ${(props) => props.theme.colors.danger};
    font-size: clamp(1rem, 3.5vw, 1.2rem);
    flex-shrink: 0;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    margin-top: 5px;
    margin-bottom: 10px;
    font-size: clamp(1rem, 3vw, 1.3rem);
  }
`;

const JogadorList = styled.div`
  max-height: calc(90vh - 200px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: clamp(6px, 1.5vw, ${(props) => props.theme.spacing.sm});
  padding-right: clamp(5px, 1vw, ${(props) => props.theme.spacing.sm});

  /* Estilização da barra de scroll com o tema */
  &::-webkit-scrollbar { 
    width: clamp(3px, 0.8vw, 8px); 
  }
  &::-webkit-scrollbar-track { 
    background: transparent; 
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.danger};
    border-radius: clamp(2px, 0.5vw, 10px);
  }

  @media (max-width: 480px) {
    max-height: calc(85vh - 180px);
    gap: 5px;
  }

  @media (orientation: landscape) and (max-height: 500px) {
    max-height: calc(95vh - 160px);
    gap: 4px;
  }
`;

const JogadorButton = styled(motion.button)`
  width: 100%;
  background-color: ${(props) => props.theme.colors.darkBlue};
  color: ${(props) => props.theme.colors.secondary};
  border: 1px solid ${(props) => props.theme.colors.danger};
  
  /* CORREÇÃO APLICADA AQUI */
  padding: ${(props) => `clamp(8px, 2vw, ${props.theme.spacing.md})`};
  
  border-radius: 8px;
  font-size: clamp(0.85rem, 3vw, 1rem);
  font-weight: bold;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: clamp(35px, 6vw, 45px);

  &:hover {
    background-color: rgba(239, 68, 68, 0.1);
    border-color: ${(props) => props.theme.colors.danger};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (orientation: landscape) and (max-height: 500px) {
    padding: 6px 8px;
    font-size: 0.8rem;
    min-height: 30px;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(15px, 4vw, 20px);
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  text-align: center;
`;

const GolContraModal = ({ isOpen, onClose, onSelect, jogadores, nomeTime }) => {
  const { playError } = useSound();

  useEffect(() => {
    if (isOpen) {
      playError(); // Toca um som de alerta/erro ao abrir
    }
  }, [isOpen, playError]);

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
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
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
              <IoWarningOutline />
              <span>Quem do {nomeTime} marcou contra?</span>
            </ModalTitle>
            
            {jogadores && jogadores.length > 0 ? (
              <JogadorList>
                {jogadores.map((jogador, index) => (
                  <JogadorButton
                    key={jogador.id}
                    onClick={() => {
                      onSelect(jogador);
                      onClose();
                    }}
                    whileHover={{ 
                      scale: 1.03, 
                      backgroundColor: 'rgba(239, 68, 68, 0.2)',
                      borderColor: '#dc2626'
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (index * 0.05) }}
                  >
                    {jogador.nome}
                  </JogadorButton>
                ))}
              </JogadorList>
            ) : (
              <EmptyState>
                <IoWarningOutline 
                  size={Math.min(32, Math.max(24, window.innerWidth * 0.06))} 
                  style={{ marginBottom: '10px', color: '#ef4444' }} 
                />
                <span>Nenhum jogador disponível</span>
              </EmptyState>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default GolContraModal;