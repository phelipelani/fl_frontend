// import React, { useEffect } from 'react';
// import styled from 'styled-components';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi'; // Ícones para cada tipo de toast

// const ToastWrapper = styled(motion.div)`
//   position: fixed;
//   bottom: 20px;
//   left: 50%;
//   transform: translateX(-50%);
  
//   display: flex;
//   align-items: center;
//   gap: ${(props) => props.theme.spacing.sm};
  
//   padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
//   border-radius: 8px;
//   color: white;
//   font-weight: bold;
//   z-index: 2000;
//   box-shadow: 0 5px 15px rgba(0,0,0,0.3);

//   /* Estilos baseados no tipo, usando o nosso theme */
//   ${({ type, theme }) => {
//     if (type === 'success') return `background-color: ${theme.colors.success};`;
//     if (type === 'error') return `background-color: ${theme.colors.danger};`;
//     return `background-color: ${theme.colors.darkBlue}; border: 1px solid ${theme.colors.primary};`;
//   }}

//   /* Responsividade para telas menores */
//   @media ${(props) => props.theme.breakpoints.mobile} {
//     width: 90%;
//     bottom: 10px;
//   }
// `;

// const IconWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   font-size: 1.5rem;
// `;

// const getIcon = (type) => {
//   switch (type) {
//     case 'success':
//       return <FiCheckCircle />;
//     case 'error':
//       return <FiAlertCircle />;
//     default:
//       return <FiInfo />;
//   }
// };

// const Toast = ({ message, type, onDone }) => {
//   useEffect(() => {
//     const timer = setTimeout(onDone, 3000);
//     return () => clearTimeout(timer);
//   }, [onDone]);

//   // Define as variantes de animação para o Framer Motion
//   const toastVariants = {
//     hidden: { y: 100, opacity: 0 },
//     visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
//     exit: { y: 100, opacity: 0, transition: { duration: 0.2 } },
//   };

//   return (
//     <AnimatePresence>
//       {message && (
//         <ToastWrapper
//           type={type}
//           variants={toastVariants}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//         >
//           <IconWrapper>{getIcon(type)}</IconWrapper>
//           <span>{message}</span>
//         </ToastWrapper>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Toast;

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';

const ToastWrapper = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.textPrimary};
  font-weight: bold;
  z-index: 2000;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  /* Estilos atualizados com o novo theme.js */
  ${({ type, theme }) => {
    if (type === 'success') return `background-color: ${theme.colors.success};`;
    if (type === 'error') return `background-color: ${theme.colors.danger};`;
    return `
      background-color: ${theme.colors.surface}; 
      border: 1px solid ${theme.colors.border};
    `;
  }}

  @media ${(props) => props.theme.breakpoints.mobile} {
    width: 90%;
    bottom: 10px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
`;

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return <FiCheckCircle />;
    case 'error':
      return <FiAlertCircle />;
    default:
      return <FiInfo />;
  }
};

const Toast = ({ message, type, onDone }) => {
  useEffect(() => {
    const timer = setTimeout(onDone, 3000);
    return () => clearTimeout(timer);
  }, [onDone]);

  const toastVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
    exit: { y: 100, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <ToastWrapper
      type={type}
      variants={toastVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <IconWrapper>{getIcon(type)}</IconWrapper>
      <span>{message}</span>
    </ToastWrapper>
  );
};

export default Toast;