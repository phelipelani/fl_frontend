// import React, { useState } from "react";
// import styled, { keyframes } from "styled-components";
// import { createRodada } from "../../services/api";
// import Button from "../common/Button";
// import { useToast } from "../../contexts/ToastContext"; // <-- Importe o hook

// // ... (keyframes e styled-components continuam os mesmos)
// const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
// const fadeOut = keyframes`from { opacity: 1; } to { opacity: 0; }`;
// const slideIn = keyframes`from { transform: translateY(-30px); opacity: 0; } to { transform: translateY(0); opacity: 1; }`;
// const slideOut = keyframes`from { transform: translateY(0); opacity: 1; } to { transform: translateY(-30px); opacity: 0; }`;

// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.7);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
//   animation: ${(props) => (props.isClosing ? fadeOut : fadeIn)} 0.3s forwards;
// `;

// const ModalContent = styled.div`
//   position: relative;
//   background-color: #0a192f;
//   background-image: url("https://www.transparenttextures.com/patterns/dark-denim-3.png");
//   padding: 30px 40px;
//   border-radius: 12px;
//   border: 1px solid #facc15;
//   width: 90%;
//   max-width: 450px;
//   animation: ${(props) => (props.isClosing ? slideOut : slideIn)} 0.3s forwards;
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 15px;
//   right: 15px;
//   background: transparent;
//   border: none;
//   color: #facc15;
//   font-size: 1.5rem;
//   cursor: pointer;
//   line-height: 1;
//   transition: transform 0.2s ease;
//   &:hover {
//     transform: scale(1.2);
//   }
// `;

// const ModalTitle = styled.h2`
//   color: #facc15;
//   text-align: center;
//   margin-bottom: 25px;
//   font-size: 1.5rem;
// `;

// const FormGroup = styled.div`
//   margin-bottom: 20px;
// `;
// const Label = styled.label`
//   display: block;
//   color: #e6f1ff;
//   margin-bottom: 8px;
//   font-weight: bold;
// `;
// const Input = styled.input`
//   width: 100%;
//   padding: 12px;
//   background-color: rgba(255, 255, 255, 0.9);
//   border: none;
//   border-radius: 8px;
//   font-size: 1rem;
//   color: #0a192f;
// `;

// const ConfirmButton = styled(Button)`
//   background-color: #10b981;
//   width: 100%;
//   margin-top: 10px;
//   &:hover {
//     background-color: #34d399;
//   }
// `;

// const CriarRodadaModal = ({ isOpen, onClose, onSuccess, ligaId }) => {
//   const [data, setData] = useState("");
//   const [isClosing, setIsClosing] = useState(false);
//   const { showToast } = useToast(); // <-- Use o hook

//   const handleClose = () => {
//     setIsClosing(true);
//     setTimeout(() => {
//       onClose();
//       setIsClosing(false);
//     }, 300);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const novaRodada = await createRodada(ligaId, { data });
//       showToast("Rodada criada com sucesso!", "success");
//       onSuccess(novaRodada);
//       handleClose();
//     } catch (err) {
//       showToast(err.message, "error");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <ModalOverlay onClick={handleClose} isClosing={isClosing}>
//       <ModalContent onClick={(e) => e.stopPropagation()} isClosing={isClosing}>
//         <CloseButton onClick={handleClose}>&times;</CloseButton>
//         <ModalTitle>Criar Rodada</ModalTitle>
//         <form onSubmit={handleSubmit}>
//           <FormGroup>
//             <Label htmlFor="data-rodada">Data Rodada</Label>
//             <Input
//               id="data-rodada"
//               type="date"
//               value={data}
//               onChange={(e) => setData(e.target.value)}
//               required
//             />
//           </FormGroup>
//           <ConfirmButton type="submit">Confirmar</ConfirmButton>
//         </form>
//       </ModalContent>
//     </ModalOverlay>
//   );
// };

// export default CriarRodadaModal;

import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { createRodada } from "../../services/api";
import Button from "../common/Button";
import { useToast } from "../../contexts/ToastContext";
import { IoClose } from 'react-icons/io5';

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
`;

const ModalContent = styled(motion.div)`
  position: relative;
  background-color: ${(props) => props.theme.colors.surface};
  padding: ${(props) => props.theme.spacing.xl};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.border};
  width: 90%;
  max-width: 400px;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: ${(props) => props.theme.spacing.md};
  right: ${(props) => props.theme.spacing.md};
  background: transparent;
  border: none;
  color: ${(props) => props.theme.colors.textMuted};
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 1.75rem;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  color: ${(props) => props.theme.colors.textMuted};
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

const Input = styled.input`
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 6px;
  padding: ${(props) => props.theme.spacing.md};
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.accentPrimary};
  }
`;

const ConfirmButton = styled(Button)`
  width: 100%;
  background-color: ${(props) => props.theme.colors.accentSecondary};
  color: ${(props) => props.theme.colors.background};
`;

const CriarRodadaModal = ({ isOpen, onClose, onSuccess, ligaId }) => {
  const [data, setData] = useState("");
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const novaRodada = await createRodada(ligaId, { data });
      showToast("Rodada criada com sucesso!", "success");
      onSuccess(novaRodada);
      onClose();
    } catch (err) {
      showToast(err.message, "error");
    }
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
        >
          <ModalContent
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <CloseButton onClick={onClose} whileHover={{ scale: 1.2, rotate: 90 }}><IoClose /></CloseButton>
            <ModalTitle>Criar Rodada</ModalTitle>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="data-rodada">Data da Rodada</Label>
                <Input
                  id="data-rodada"
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  required
                />
              </FormGroup>
              <ConfirmButton type="submit">Criar</ConfirmButton>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default CriarRodadaModal;
