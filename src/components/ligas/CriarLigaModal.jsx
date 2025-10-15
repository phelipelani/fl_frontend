// import React, { useState } from "react";
// import styled from "styled-components";
// import { motion, AnimatePresence } from "framer-motion";
// import { createLiga } from "../../services/api";
// import Button from "../common/Button";
// import { useToast } from "../../contexts/ToastContext";
// import { IoClose, IoShieldCheckmarkOutline } from 'react-icons/io5';
// import { FaPen, FaCalendarCheck, FaTrophy } from 'react-icons/fa';

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
//   z-index: 1000;
// `;

// const ModalContent = styled(motion.div)`
//   position: relative;
//   background-color: ${(props) => props.theme.colors.background};
//   background-image: url("https://www.transparenttextures.com/patterns/dark-denim-3.png");
//   padding: ${(props) => props.theme.spacing.xl};
//   border-radius: 12px;
//   border: 1px solid ${(props) => props.theme.colors.primary};
//   width: 90%;
//   max-width: 450px;
// `;

// const CloseButton = styled(motion.button)`
//   position: absolute;
//   top: ${(props) => props.theme.spacing.md};
//   right: ${(props) => props.theme.spacing.md};
//   background: transparent;
//   border: none;
//   color: ${(props) => props.theme.colors.primary};
//   font-size: 1.8rem;
//   cursor: pointer;
//   line-height: 1;
// `;

// const ModalTitle = styled.h2`
//   color: ${(props) => props.theme.colors.primary};
//   text-align: center;
//   margin-bottom: ${(props) => props.theme.spacing.xl};
//   font-size: 1.5rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: ${(props) => props.theme.spacing.sm};
// `;

// const FormGroup = styled.div`
//   margin-bottom: ${(props) => props.theme.spacing.lg};
//   position: relative;
// `;

// const Label = styled.label`
//   display: block;
//   color: ${(props) => props.theme.colors.secondary};
//   margin-bottom: ${(props) => props.theme.spacing.sm};
//   font-weight: bold;
// `;

// // ===== A CORREÇÃO ESTÁ AQUI =====
// const InputIcon = styled.div`
//   position: absolute;
//   top: 70%;
//   left: ${(props) => props.theme.spacing.md};
//   transform: translateY(-50%);
//   color: ${(props) => props.theme.colors.darkBlue};
  
//   /* Adiciona z-index para garantir que o ícone fique SOBRE o input */
//   z-index: 2;

//   /* Impede que o ícone "roube" o clique do input */
//   pointer-events: none; 
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 12px;
//   padding-left: ${(props) => props.theme.spacing.xxl}; /* Espaço para o ícone */
//   background-color: rgba(255, 255, 255, 0.95);
//   border: 2px solid transparent;
//   border-radius: 8px;
//   font-size: 1rem;
//   color: ${(props) => props.theme.colors.background};
//   font-weight: 500;
//   transition: border-color 0.3s ease, box-shadow 0.3s ease;

//   &:focus {
//     outline: none;
//     border-color: ${(props) => props.theme.colors.primary};
//     box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary}55;
//   }
// `;

// const ConfirmButton = styled(Button)`
//   background-color: ${(props) => props.theme.colors.success};
//   width: 100%;
//   margin-top: ${(props) => props.theme.spacing.sm};
//   &:hover {
//     background-color: #059669; // Um pouco mais escuro no hover
//   }
// `;

// const CriarLigaModal = ({ isOpen, onClose, onSuccess }) => {
//   const [nome, setNome] = useState("");
//   const [dataFim, setDataFim] = useState("");
//   const { showToast } = useToast();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data_inicio = new Date().toISOString().split("T")[0];
    
//     if (new Date(dataFim) < new Date(data_inicio)) {
//         showToast("A data de término não pode ser no passado.", "error");
//         return;
//     }

//     try {
//       const novaLiga = await createLiga({ nome, data_inicio, data_fim: dataFim });
//       showToast("Liga criada com sucesso!", "success");
//       onSuccess(novaLiga);
//       onClose();
//     } catch (err) {
//       showToast(err.message, "error");
//     }
//   };
  
//   const overlayVariants = {
//     visible: { opacity: 1 },
//     hidden: { opacity: 0 }
//   };
//   const modalVariants = {
//     visible: { opacity: 1, y: 0, scale: 1 },
//     hidden: { opacity: 0, y: "-50px", scale: 0.95 }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <ModalOverlay
//           onClick={onClose}
//           variants={overlayVariants}
//           initial="hidden"
//           animate="visible"
//           exit="hidden"
//           transition={{ duration: 0.3 }}
//         >
//           <ModalContent
//             onClick={(e) => e.stopPropagation()}
//             variants={modalVariants}
//             transition={{ type: "spring", stiffness: 300, damping: 25 }}
//           >
//             <CloseButton onClick={onClose} whileHover={{ scale: 1.2, rotate: 90 }}><IoClose /></CloseButton>
//             <ModalTitle>
//               <IoShieldCheckmarkOutline />
//               <span>Criar Nova Liga</span>
//             </ModalTitle>
//             <form onSubmit={handleSubmit}>
//               <FormGroup>
//                 <Label htmlFor="nome-liga">Nome da Liga</Label>
//                 <InputIcon><FaPen /></InputIcon>
//                 <Input id="nome-liga" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
//               </FormGroup>
//               <FormGroup>
//                 <Label htmlFor="data-termino">Data de Término</Label>
//                 <InputIcon><FaCalendarCheck /></InputIcon>
//                 <Input id="data-termino" type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} required />
//               </FormGroup>
//               <ConfirmButton type="submit" icon={<FaTrophy />}>Criar Liga</ConfirmButton>
//             </form>
//           </ModalContent>
//         </ModalOverlay>
//       )}
//     </AnimatePresence>
//   );
// };

// export default CriarLigaModal;

import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { createLiga } from "../../services/api";
import Button from "../common/Button";
import { useToast } from "../../contexts/ToastContext";
import { IoClose, IoShieldCheckmarkOutline } from 'react-icons/io5';
import { FaPen, FaCalendarCheck, FaTrophy } from 'react-icons/fa';

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
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
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
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 1.75rem;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const FormGroup = styled.div`
  position: relative;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  color: ${(props) => props.theme.colors.textMuted};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 6px;
  padding: ${(props) => props.theme.spacing.md} 40px;
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.accentPrimary};
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 42px;
  color: ${(props) => props.theme.colors.textMuted};
`;

const ConfirmButton = styled(Button)`
  width: 100%;
  margin-top: ${(props) => props.theme.spacing.md};
  background-color: ${(props) => props.theme.colors.accentSecondary};
  color: ${(props) => props.theme.colors.background};
`;

const CriarLigaModal = ({ isOpen, onClose, onSuccess }) => {
  const [nome, setNome] = useState("");
  const [dataFim, setDataFim] = useState("");
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const novaLiga = await createLiga({ nome, data_fim: dataFim });
      showToast("Liga criada com sucesso!", "success");
      onSuccess(novaLiga);
      onClose();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const overlayVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const modalVariants = { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1 } };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          onClick={onClose}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3 }}
        >
          <ModalContent
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <CloseButton onClick={onClose} whileHover={{ scale: 1.2, rotate: 90 }}><IoClose /></CloseButton>
            <ModalTitle>
              <IoShieldCheckmarkOutline />
              <span>Criar Nova Liga</span>
            </ModalTitle>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="nome-liga">Nome da Liga</Label>
                <InputIcon><FaPen /></InputIcon>
                <Input id="nome-liga" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="data-termino">Data de Término</Label>
                <InputIcon><FaCalendarCheck /></InputIcon>
                <Input id="data-termino" type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} required />
              </FormGroup>
              <ConfirmButton type="submit" icon={<FaTrophy />}>Criar Liga</ConfirmButton>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default CriarLigaModal;