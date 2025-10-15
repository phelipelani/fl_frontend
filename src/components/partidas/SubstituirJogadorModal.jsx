// import React from 'react';
// import styled from 'styled-components';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useSound } from '../../hooks/useSound';
// import { IoClose, IoSwapHorizontalOutline } from 'react-icons/io5';
// import { FaUserMinus, FaUserPlus } from 'react-icons/fa';

// const ModalOverlay = styled(motion.div)`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.7);
//   backdrop-filter: blur(5px);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1001;
//   padding: clamp(10px, 2vw, 20px);

//   @media (max-width: 480px) {
//     padding: 5px;
//   }

//   @media (orientation: landscape) and (max-height: 500px) {
//     padding: 5px;
//   }
// `;

// const ModalContent = styled(motion.div)`
//   position: relative;
//   background-color: ${(props) => props.theme.colors.background};
//   padding: clamp(20px, 5vw, ${(props) => props.theme.spacing.xl}) 0;
//   border-radius: 12px;
//   width: 100%;
//   max-width: 400px;
//   max-height: 90vh;
//   overflow-y: auto;
//   border: 2px solid ${(props) => props.theme.colors.primary};
//   box-shadow: 0 0 30px rgba(250, 204, 21, 0.2);
//   display: flex;
//   flex-direction: column;
//   box-sizing: border-box;

//   &::-webkit-scrollbar {
//     width: 4px;
//   }
  
//   &::-webkit-scrollbar-thumb {
//     background-color: ${(props) => props.theme.colors.primary};
//     border-radius: 4px;
//   }

//   @media (max-width: 768px) {
//     max-height: 85vh;
//     padding: clamp(15px, 4vw, 25px);
//   }

//   @media (orientation: landscape) and (max-height: 500px) {
//     max-height: 95vh;
//     padding: 15px;
//   }
// `;

// const CloseButton = styled(motion.button)`
//   position: absolute;
//   top: clamp(5px, 1.5vw, ${(props) => props.theme.spacing.md});
//   right: clamp(5px, 1.5vw, ${(props) => props.theme.spacing.md});
//   background: transparent;
//   border: none;
//   color: ${(props) => props.theme.colors.primary};
//   font-size: clamp(1.2rem, 4vw, 1.8rem);
//   cursor: pointer;
//   line-height: 1;
//   padding: 5px;
//   border-radius: 50%;
//   transition: all 0.2s ease;

//   &:hover {
//     background-color: rgba(255, 255, 255, 0.1);
//     color: #facc15;
//   }

//   @media (max-width: 480px) {
//     top: 5px;
//     right: 5px;
//     font-size: 1.2rem;
//   }
// `;

// const ModalTitle = styled(motion.h2)`
//   color: ${(props) => props.theme.colors.primary};
//   text-align: center;
//   margin-bottom: clamp(15px, 4vw, ${(props) => props.theme.spacing.lg});
//   font-size: clamp(1.2rem, 4vw, 1.5rem);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: clamp(8px, 2vw, ${(props) => props.theme.spacing.sm});
//   margin-top: clamp(10px, 3vw, 30px);
//   flex-wrap: wrap;

//   svg {
//     font-size: clamp(1rem, 3vw, 1.2rem);
//     flex-shrink: 0;
//   }

//   @media (orientation: landscape) and (max-height: 500px) {
//     margin-top: 5px;
//     margin-bottom: 10px;
//     font-size: clamp(1rem, 3vw, 1.3rem);
//   }
// `;

// const PlayerOutCard = styled(motion.div)`
//   background-color: rgba(239, 68, 68, 0.15);
//   border: 1px solid ${(props) => props.theme.colors.danger};
//   color: ${(props) => props.theme.colors.secondary};
//   padding: clamp(12px, 3vw, ${(props) => props.theme.spacing.md}) 0;
//   border-radius: 8px;
//   margin-bottom: clamp(15px, 4vw, ${(props) => props.theme.spacing.lg});
//   text-align: center;
//   box-shadow: 0 2px 8px rgba(239, 68, 68, 0.1);

//   span {
//     font-weight: bold;
//     font-size: clamp(1rem, 3vw, 1.2rem);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: clamp(6px, 1.5vw, ${(props) => props.theme.spacing.sm});
//     flex-wrap: wrap;
//   }

//   svg {
//     color: ${(props) => props.theme.colors.danger};
//     font-size: clamp(1rem, 3vw, 1.2rem);
//     flex-shrink: 0;
//   }

//   @media (orientation: landscape) and (max-height: 500px) {
//     padding: 10px;
//     margin-bottom: 10px;
//   }
// `;

// const JogadorList = styled(motion.div)`
//   max-height: calc(90vh - 220px);
//   overflow-y: auto;
//   display: flex;
//   flex-direction: column;
//   gap: clamp(6px, 1.5vw, ${(props) => props.theme.spacing.sm});
//   padding: clamp(2px, 0.5vw, ${(props) => props.theme.spacing.xs});

//   &::-webkit-scrollbar { 
//     width: clamp(3px, 0.8vw, 8px); 
//   }
//   &::-webkit-scrollbar-track { 
//     background: transparent; 
//   }
//   &::-webkit-scrollbar-thumb {
//     background-color: ${(props) => props.theme.colors.primary};
//     border-radius: clamp(2px, 0.5vw, 10px);
//   }

//   @media (max-width: 480px) {
//     max-height: calc(85vh - 200px);
//     gap: 5px;
//   }

//   @media (orientation: landscape) and (max-height: 500px) {
//     max-height: calc(95vh - 180px);
//     gap: 4px;
//   }
// `;

// const JogadorButton = styled(motion.button)`
//   width: 100%;
//   background-color: ${(props) => props.theme.colors.darkBlue};
//   color: ${(props) => props.theme.colors.secondary};
//   border: 1px solid ${(props) => props.theme.colors.primary};
//   padding: clamp(10px, 2.5vw, ${(props) => props.theme.spacing.md});
//   border-radius: 8px;
//   font-size: clamp(0.85rem, 3vw, 1rem);
//   font-weight: bold;
//   cursor: pointer;
//   transition: all 0.2s ease;
  
//   display: flex;
//   align-items: center;
//   gap: clamp(8px, 2vw, ${(props) => props.theme.spacing.sm});
//   min-height: clamp(40px, 7vw, 50px);
//   justify-content: flex-start;
//   box-sizing: border-box;

//   svg {
//     color: ${(props) => props.theme.colors.success};
//     font-size: clamp(0.9rem, 2.5vw, 1.1rem);
//     flex-shrink: 0;
//     min-width: 16px;
//   }

//   &:hover {
//     background-color: rgba(16, 185, 129, 0.1);
//     border-color: ${(props) => props.theme.colors.success};
//     transform: translateY(-1px);
//     box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
//   }

//   &:active {
//     transform: translateY(0);
//   }

//   @media (orientation: landscape) and (max-height: 500px) {
//     padding: 8px 10px;
//     font-size: 0.8rem;
//     min-height: 35px;
//     gap: 6px;
//   }
// `;

// const EmptyListMessage = styled(motion.p)`
//   text-align: center;
//   color: ${(props) => props.theme.colors.text};
//   padding: clamp(20px, 5vw, ${(props) => props.theme.spacing.xl}) 0;
//   font-size: clamp(0.9rem, 2.5vw, 1rem);
//   opacity: 0.7;

//   @media (orientation: landscape) and (max-height: 500px) {
//     padding: 15px 0;
//     font-size: 0.8rem;
//   }
// `;

// const SubstituirJogadorModal = ({ isOpen, onClose, onSelectSub, jogadoresDisponiveis, jogadorASubstituir }) => {
//   const { playHover, playClick } = useSound();

//   const handleSelect = (jogador) => {
//     playClick();
//     onSelectSub(jogador);
//     onClose();
//   }

//   // Animações para a lista de jogadores
//   const listVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.05 // Anima cada item da lista com um pequeno atraso
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1 }
//   };

//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <ModalOverlay 
//           onClick={onClose} 
//           initial={{ opacity: 0 }} 
//           animate={{ opacity: 1 }} 
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.2 }}
//         >
//           <ModalContent
//             onClick={(e) => e.stopPropagation()}
//             initial={{ y: -50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: -50, opacity: 0 }}
//             transition={{ type: 'spring', stiffness: 300, damping: 25 }}
//           >
//             <CloseButton 
//               onClick={onClose} 
//               whileHover={{ scale: 1.2, rotate: 90 }} 
//               whileTap={{ scale: 0.9 }}
//             >
//               <IoClose />
//             </CloseButton>
            
//             <ModalTitle
//               initial={{ y: -10, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.1 }}
//             >
//               <IoSwapHorizontalOutline />
//               <span>Substituição</span>
//             </ModalTitle>

//             {jogadorASubstituir && (
//               <PlayerOutCard
//                 initial={{ y: -10, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.15 }}
//               >
//                 <span>
//                   <FaUserMinus /> 
//                   {jogadorASubstituir.nome}
//                 </span>
//               </PlayerOutCard>
//             )}

//             <JogadorList 
//               variants={listVariants} 
//               initial="hidden" 
//               animate="visible"
//             >
//               {jogadoresDisponiveis && jogadoresDisponiveis.length > 0 ? (
//                 jogadoresDisponiveis.map((jogador, index) => (
//                   <JogadorButton
//                     key={jogador.id}
//                     onClick={() => handleSelect(jogador)}
//                     onMouseEnter={playHover}
//                     variants={itemVariants}
//                     whileHover={{ 
//                       scale: 1.03, 
//                       borderColor: '#10b981',
//                       boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
//                     }}
//                     whileTap={{ scale: 0.98 }}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.2 + (index * 0.05) }}
//                   >
//                     <FaUserPlus /> 
//                     {jogador.nome} 
//                     <span style={{ 
//                       fontSize: '0.8em', 
//                       opacity: 0.7, 
//                       marginLeft: 'auto',
//                       fontWeight: 'normal'
//                     }}>
//                       (Nível: {jogador.nivel})
//                     </span>
//                   </JogadorButton>
//                 ))
//               ) : (
//                 <EmptyListMessage
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.25 }}
//                 >
//                   Nenhum jogador disponível.
//                 </EmptyListMessage>
//               )}
//             </JogadorList>
//           </ModalContent>
//         </ModalOverlay>
//       )}
//     </AnimatePresence>
//   );
// };

// export default SubstituirJogadorModal;

import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../../hooks/useSound';
import { IoClose, IoSwapHorizontalOutline } from 'react-icons/io5';
import { FaUserMinus, FaUserPlus } from 'react-icons/fa';

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
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  position: relative;
  background-color: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: ${(props) => props.theme.spacing.xl};
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: ${(props) => props.theme.colors.textMuted};
  font-size: 1.8rem;
  cursor: pointer;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const ModalTitle = styled.h2`
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 1.5rem;
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const JogadorSaindoInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.sm};
  font-size: 1rem;
  color: ${(props) => props.theme.colors.textMuted};

  svg {
    color: ${(props) => props.theme.colors.danger};
  }
`;

const JogadorList = styled(motion.div)`
  overflow-y: auto;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
`;

const JogadorButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  width: 100%;
  padding: ${(props) => props.theme.spacing.md};
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
`;

const EmptyListMessage = styled(motion.p)`
  text-align: center;
  color: ${(props) => props.theme.colors.textMuted};
`;

const SubstituirJogadorModal = ({ isOpen, onClose, jogadorSaindo, jogadoresDisponiveis, onSelect }) => {
  const { playHover, playClick } = useSound();

  const handleSelect = (jogador) => {
    playClick();
    onSelect(jogador);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <CloseButton onClick={onClose} whileHover={{ scale: 1.2, rotate: 90 }}><IoClose /></CloseButton>
            <Header>
              <ModalTitle>Substituir Jogador</ModalTitle>
              {jogadorSaindo && (
                <JogadorSaindoInfo>
                  <FaUserMinus /> Saindo: {jogadorSaindo.nome}
                </JogadorSaindoInfo>
              )}
            </Header>

            <JogadorList>
              {jogadoresDisponiveis && jogadoresDisponiveis.length > 0 ? (
                jogadoresDisponiveis.map((jogador, index) => (
                  <JogadorButton key={jogador.id} onClick={() => handleSelect(jogador)} onMouseEnter={playHover}>
                    <FaUserPlus color="#10b981" /> 
                    {jogador.nome} 
                    <span style={{ marginLeft: 'auto', opacity: 0.7 }}>
                      (Nível: {jogador.nivel})
                    </span>
                  </JogadorButton>
                ))
              ) : (
                <EmptyListMessage>Nenhum jogador disponível.</EmptyListMessage>
              )}
            </JogadorList>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default SubstituirJogadorModal;