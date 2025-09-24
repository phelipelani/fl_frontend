import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi'; // Ícone de alerta
import Button from './Button';

// O overlay agora é um componente 'motion' para animação de fade
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1002;
`;

// O conteúdo também é animado, com um efeito de 'pop'
const ModalContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  background-color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.xl};
  border-radius: 12px;
  width: 90%;
  max-width: 450px;
  border: 1px solid ${(props) => props.theme.colors.danger};

  @media ${(props) => props.theme.breakpoints.mobile} {
    padding: ${(props) => props.theme.spacing.lg};
  }
`;

const IconWrapper = styled.div`
  color: ${(props) => props.theme.colors.primary};
  font-size: 3rem;
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const ModalTitle = styled.h2`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 1.5rem;
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const ModalMessage = styled.p`
  color: ${(props) => props.theme.colors.text};
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.md};
  width: 100%;
`;

// Botões com estilo próprio, estendendo o Button base
// Isso é melhor que usar 'style={...}'
const ConfirmButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.success};
  &:hover { background-color: #059669; }
`;

const CancelButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.grey};
  &:hover { background-color: #4b5563; }
`;


const ConfirmacaoModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  // AnimatePresence permite a animação de saída quando o componente é removido
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
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <IconWrapper>
              <FiAlertTriangle />
            </IconWrapper>
            <ModalTitle>{title}</ModalTitle>
            <ModalMessage>{message}</ModalMessage>
            <ButtonContainer>
              <CancelButton onClick={onClose}>Cancelar</CancelButton>
              <ConfirmButton onClick={onConfirm}>Confirmar</ConfirmButton>
            </ButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default ConfirmacaoModal;