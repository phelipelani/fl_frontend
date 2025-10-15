// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import { motion } from 'framer-motion';
// import { IoArrowBack } from 'react-icons/io5'; // Ícone moderno e limpo

// // Botão agora usa 'motion' para animações
// const StyledButton = styled(motion.button)`
//   /* 1. Usando o Theme para consistência */
//   background-color: transparent;
//   color: ${(props) => props.theme.colors.primary};
//   border: 2px solid ${(props) => props.theme.colors.primary};
//   border-radius: ${(props) => props.theme.spacing.sm};
//   padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
//   margin-top: ${(props) => props.theme.spacing.lg};
  
//   font-size: 1rem;
//   font-weight: bold;
//   width: 150px;
//   cursor: pointer;

//   /* 2. Flexbox para alinhar perfeitamente ícone e texto */
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: ${(props) => props.theme.spacing.sm};

//   /* O hover é controlado pelo Framer Motion, mas podemos definir o estado final aqui */
//   &:hover {
//     background-color: ${(props) => props.theme.colors.primary};
//     color: ${(props) => props.theme.colors.background};
//   }

//   &:focus-visible {
//     outline: 2px solid ${(props) => props.theme.colors.primary};
//     outline-offset: 2px;
//   }
// `;

// const BackButton = () => {
//   const navigate = useNavigate();

//   return (
//     <StyledButton 
//       onClick={() => navigate(-1)}
//       // 3. Animações fluidas
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       transition={{ type: 'spring', stiffness: 400, damping: 17 }}
//     >
//       {/* 4. Ícone vetorial no lugar de '&larr;' */}
//       <IoArrowBack size="1.2em" />
//       <span>Voltar</span>
//     </StyledButton>
//   );
// };

// export default BackButton;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { IoArrowBack } from 'react-icons/io5';

const StyledButton = styled(motion.button)`
  /* Estilos atualizados com o novo theme.js */
  background-color: transparent;
  color: ${(props) => props.theme.colors.accentPrimary};
  border: 2px solid ${(props) => props.theme.colors.accentPrimary};
  border-radius: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  margin-top: ${(props) => props.theme.spacing.lg};
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: 1rem;
  font-weight: bold;
  width: 150px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.sm};
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.accentPrimary};
    color: ${(props) => props.theme.colors.background};
  }

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.accentPrimary};
    outline-offset: 2px;
  }
`;

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <StyledButton
      onClick={() => navigate(-1)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <IoArrowBack />
      Voltar
    </StyledButton>
  );
};

export default BackButton;