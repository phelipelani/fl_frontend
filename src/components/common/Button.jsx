import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSound } from '../../hooks/useSound'; // 1. Importar nosso hook de som

// ... O StyledButton continua o mesmo ...
const StyledButton = styled(motion.button)`
  /* Estilos usando nosso Theme */
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.background};
  font-size: 1.1rem;
  font-weight: bold;
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.xl};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  width: 100%; 
  max-width: 350px; 
  transition: box-shadow 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary}55;
  }
  &:disabled {
    background-color: ${(props) => props.theme.colors.grey};
    cursor: not-allowed;
  }
`;


const Button = ({ children, onClick, icon, iconPosition = 'left', ...props }) => {
  const { playHover, playClick } = useSound(); // 2. Ativar o hook no componente

  const handleClick = (e) => {
    playClick(); // Toca o som de clique
    if (onClick) {
      onClick(e); // Executa a função original de onClick, se ela existir
    }
  };

  return (
    <StyledButton
      onClick={handleClick}
      onMouseEnter={playHover} // 3. Toca o som de hover
      whileHover={{ scale: 1.05, boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      {...props}
    >
      {icon && iconPosition === 'left' && icon}
      <span>{children}</span>
      {icon && iconPosition === 'right' && icon}
    </StyledButton>
  );
};

export default Button;