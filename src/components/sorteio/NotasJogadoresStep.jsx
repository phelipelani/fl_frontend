// import React, { useState } from 'react';
// import styled from 'styled-components';
// import Button from '../common/Button';
// import { updatePlayerNivel, updatePlayerCaracteristica } from '../../services/api';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
// `;

// const SettingsContainer = styled.div`
//   margin-bottom: 25px;
//   color: #e6f1ff;
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   font-size: 1.1rem;
  
//   input {
//     width: 80px;
//     text-align: center;
//     background-color: rgba(255, 255, 255, 0.9);
//     border: none;
//     border-radius: 4px;
//     padding: 8px;
//     color: #0a192f;
//     font-size: 1.1rem;
//     font-weight: bold;
//   }
// `;

// // NOVO: Container principal com scroll e altura limitada
// const JogadorListContainer = styled.div`
//   width: 95%;
//   max-height: 70vh; /* Limita a altura para permitir scroll */
//   overflow-y: auto; /* Adiciona scroll vertical quando necessário */
//   padding: 20px;
//   border: 1px solid rgba(250, 204, 21, 0.2);
//   border-radius: 8px;
//   margin-bottom: 20px;

//   /* Estilização da barra de scroll (opcional, mas melhora a estética) */
//   &::-webkit-scrollbar {
//     width: 8px;
//   }
//   &::-webkit-scrollbar-track {
//     background: #0a192f;
//   }
//   &::-webkit-scrollbar-thumb {
//     background-color: #facc15;
//     border-radius: 10px;
//   }
// `;

// // NOVO: Divisão em colunas
// const JogadorList = styled.div`
//   column-count: 3; /* Divide em 3 colunas por padrão */
//   column-gap: 20px;

//   @media (max-width: 1024px) {
//     column-count: 2; /* 2 colunas para ecrãs menores */
//   }

//   @media (max-width: 768px) {
//     column-count: 1; /* 1 coluna para telemóveis */
//   }
// `;

// // Função para retornar a cor da borda com base na nota
// const getNotaStyles = (nota) => {
//     switch (nota) {
//         case 10:
//             return `border: 2px solid #ffd700; box-shadow: 0 0 8px #ffd700;`; // Dourado
//         case 7:
//             return `border: 2px solid #c0c0c0; box-shadow: 0 0 8px #c0c0c0;`; // Prata
//         case 5:
//             return `border: 2px solid #cd7f32; box-shadow: 0 0 8px #cd7f32;`; // Bronze
//         default:
//             return `border: 2px solid transparent;`;
//     }
// };

// const JogadorRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background-color: #0a192f;
//   padding: 10px 15px;
//   border-radius: 6px;
//   margin-bottom: 15px; /* Espaço entre os itens na coluna */
//   break-inside: avoid-column; /* Evita que um item quebre entre colunas */
//   transition: transform 0.2s ease;

//   &:hover {
//     transform: scale(1.03);
//   }

//   /* ALTERADO: Adiciona borda colorida com base na nota */
//   ${props => getNotaStyles(props.nota)}
// `;

// const JogadorName = styled.span`
//   font-weight: bold;
//   flex-grow: 1;
// `;

// const InputNota = styled.input`
//   width: 60px;
//   text-align: center;
//   background-color: rgba(255, 255, 255, 0.9);
//   border: none;
//   border-radius: 4px;
//   padding: 8px;
//   color: #0a192f;
//   margin: 0 15px;
//   font-weight: bold;
// `;

// const CheckboxLabel = styled.label`
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   input {
//     margin-right: 8px;
//   }
// `;

// const NotasJogadoresStep = ({ jogadores, onSortear, jogadoresPorTime, setJogadoresPorTime }) => {
//   const [jogadoresData, setJogadoresData] = useState(jogadores);
//   const [loading, setLoading] = useState(false);

//   const handleNotaChange = (id, nivel) => {
//     const novoNivel = parseInt(nivel, 10);
//     if (isNaN(novoNivel)) return;

//     setJogadoresData(prev =>
//       prev.map(j => (j.id === id ? { ...j, nivel: novoNivel } : j))
//     );
//   };

//   const handleRecuadoChange = (id, joga_recuado) => {
//     setJogadoresData(prev =>
//       prev.map(j => (j.id === id ? { ...j, joga_recuado } : j))
//     );
//   };

//   const handleConfirmarNotasESortear = async () => {
//     setLoading(true);
//     try {
//       await Promise.all(
//         jogadoresData.map(j => Promise.all([
//           updatePlayerNivel(j.id, j.nivel),
//           updatePlayerCaracteristica(j.id, j.joga_recuado)
//         ]))
//       );
//       onSortear(jogadoresData);
//     } catch (error) {
//       alert(`Erro ao salvar notas: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container>
//       <SettingsContainer>
//         <label htmlFor="jogadoresPorLinha">Jogadores por linha:</label>
//         <input
//           type="number"
//           id="jogadoresPorLinha"
//           value={jogadoresPorTime}
//           onChange={(e) => setJogadoresPorTime(parseInt(e.target.value, 10))}
//           min="1"
//         />
//       </SettingsContainer>
//       <JogadorListContainer>
//         <JogadorList>
//             {jogadoresData.map(jogador => (
//             <JogadorRow key={jogador.id} nota={jogador.nivel}>
//                 <JogadorName>{jogador.nome}</JogadorName>
//                 <InputNota
//                 type="number"
//                 value={jogador.nivel}
//                 onChange={(e) => handleNotaChange(jogador.id, e.target.value)}
//                 min="1"
//                 max="10"
//                 />
//                 <CheckboxLabel>
//                 <input
//                     type="checkbox"
//                     checked={jogador.joga_recuado}
//                     onChange={(e) => handleRecuadoChange(jogador.id, e.target.checked)}
//                 />
//                 Recuado
//                 </CheckboxLabel>
//             </JogadorRow>
//             ))}
//         </JogadorList>
//       </JogadorListContainer>
//       <Button onClick={handleConfirmarNotasESortear} disabled={loading} style={{width: '100%', maxWidth: '500px', backgroundColor: '#10b981'}}>
//         {loading ? 'A guardar...' : 'Sortear Times'}
//       </Button>
//     </Container>
//   );
// };

// export default NotasJogadoresStep;    FUNCIONANDOOOOOO


// import React, { useState, useMemo, useEffect } from 'react';
// import styled, { css } from 'styled-components';
// import Button from '../common/Button';
// import { updatePlayerNivel, updatePlayerCaracteristica } from '../../services/api';

// // --- STYLED COMPONENTS (VISUAL NOVO E CORRIGIDO) ---

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   max-width: 1200px;
// `;

// const SettingsContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   align-items: center;
//   gap: ${(props) => props.theme.spacing.lg};
//   margin-bottom: ${(props) => props.theme.spacing.lg};
//   color: ${(props) => props.theme.colors.textSecondary};
//   font-size: 1rem;
//   background: ${(props) => props.theme.colors.surface};
//   padding: ${(props) => props.theme.spacing.md};
//   border-radius: 12px;
//   border: 1px solid ${(props) => props.theme.colors.border};
// `;

// const SettingItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: ${(props) => props.theme.spacing.sm};
  
//   label {
//     font-weight: 500;
//   }

//   input {
//     width: 60px;
//     text-align: center;
//     background-color: ${(props) => props.theme.colors.background};
//     border: 1px solid ${(props) => props.theme.colors.border};
//     border-radius: 6px;
//     padding: ${(props) => props.theme.spacing.sm};
//     color: ${(props) => props.theme.colors.textPrimary};
//     font-size: 1.1rem;
//     font-weight: bold;
//     &:focus {
//       outline: none;
//       border-color: ${(props) => props.theme.colors.accentPrimary};
//     }
//   }
// `;

// const StatsContainer = styled.div`
//   display: flex;
//   gap: ${(props) => props.theme.spacing.md};
// `;

// const StatBox = styled.div`
//   padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
//   border-radius: 6px;
//   border: 1px solid ${(props) => props.borderColor};
//   background-color: ${(props) => props.bgColor};
//   color: ${(props) => props.textColor};
//   font-weight: bold;
//   font-size: 0.9rem;
//   text-align: center;
  
//   span {
//     font-size: 1.2rem;
//     display: block;
//   }
// `;

// const JogadorGridContainer = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   gap: ${(props) => props.theme.spacing.md};
//   margin-bottom: ${(props) => props.theme.spacing.lg};
//   overflow-x: auto;
//   padding-bottom: 10px;
// `;

// const JogadorColumn = styled.ul`
//   list-style: none;
//   display: flex;
//   flex-direction: column;
//   gap: ${(props) => props.theme.spacing.sm};
//   flex-shrink: 0;
//   width: 280px;
// `;

// const JogadorRow = styled.li`
//   display: flex;
//   align-items: center;
//   padding: ${(props) => props.theme.spacing.sm};
//   background: ${(props) => props.theme.colors.surface};
//   border-radius: 8px;
//   border-left: 4px solid transparent;
//   transition: all 0.2s;

//   ${(props) => props.nota === 10 && css`
//     background: linear-gradient(90deg, rgba(250, 204, 21, 0.15) 0%, rgba(250, 204, 21, 0) 100%);
//     border-left-color: #facc15;
//     box-shadow: 0 0 10px rgba(250, 204, 21, 0.2);
//   `}

//   ${(props) => props.nota === 5 && css`
//     background: linear-gradient(90deg, rgba(205, 127, 50, 0.15) 0%, rgba(205, 127, 50, 0) 100%);
//     border-left-color: #cd7f32;
//   `}
// `;

// const JogadorName = styled.span`
//   flex-grow: 1;
//   color: ${(props) => props.theme.colors.textPrimary};
//   font-weight: 500;
//   font-size: 0.9rem;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;

// const InputNota = styled.input`
//   width: 45px;
//   margin: 0 ${(props) => props.theme.spacing.sm};
//   text-align: center;
//   background-color: ${(props) => props.theme.colors.background};
//   border: 1px solid ${(props) => props.theme.colors.border};
//   border-radius: 6px;
//   padding: 6px;
//   color: ${(props) => props.theme.colors.textPrimary};
//   font-weight: bold;
//   font-size: 0.9rem;
//   &:focus {
//     outline: none;
//     border-color: ${(props) => props.theme.colors.accentSecondary};
//   }
// `;

// const CheckboxLabel = styled.label`
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   font-size: 0.8rem;
//   color: ${(props) => props.theme.colors.textMuted};

//   input {
//     margin-right: 4px;
//   }
// `;

// const ConfirmButton = styled(Button)`
//   width: 100%;
//   max-width: 500px;
//   background-color: ${(props) => props.theme.colors.success};
//   color: ${(props) => props.theme.colors.textPrimary};
// `;

// // --- COMPONENTE PRINCIPAL (COM A LÓGICA ANTIGA E CORRIGIDA) ---

// const NotasJogadoresStep = ({ jogadores, onSortear, jogadoresPorTime, setJogadoresPorTime }) => {
//   const [jogadoresData, setJogadoresData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setJogadoresData(jogadores.map(j => ({
//       ...j,
//       nivel: j.nivel || 1,
//       joga_recuado: !!j.joga_recuado,
//     })));
//   }, [jogadores]);

//   const { cabecasDeChave, pesDeRato } = useMemo(() => ({
//     cabecasDeChave: jogadoresData.filter(j => j.nivel === 10).length,
//     pesDeRato: jogadoresData.filter(j => j.nivel === 5).length,
//   }), [jogadoresData]);

//   const times = useMemo(() => {
//     const timesArray = [];
//     if (jogadoresPorTime > 0) {
//       for (let i = 0; i < jogadoresData.length; i += jogadoresPorTime) {
//         timesArray.push(jogadoresData.slice(i, i + jogadoresPorTime));
//       }
//     } else if (jogadoresData.length > 0) {
//       timesArray.push([...jogadoresData]);
//     }
//     return timesArray;
//   }, [jogadoresData, jogadoresPorTime]);

//   const handleNotaChange = (id, nivel) => {
//     const novoNivel = parseInt(nivel, 10);
//     if (isNaN(novoNivel)) return;
//     setJogadoresData(prev =>
//       prev.map(j => (j.id === id ? { ...j, nivel: novoNivel } : j))
//     );
//   };

//   const handleRecuadoChange = (id, joga_recuado) => {
//     setJogadoresData(prev =>
//       prev.map(j => (j.id === id ? { ...j, joga_recuado } : j))
//     );
//   };
  
//   const handleConfirmarNotasESortear = async () => {
//     setLoading(true);
//     try {
//       await Promise.all(
//         jogadoresData.map(j => Promise.all([
//           updatePlayerNivel(j.id, j.nivel),
//           updatePlayerCaracteristica(j.id, { joga_recuado: j.joga_recuado }) // Corrigido para enviar um objeto
//         ]))
//       );
//       onSortear(jogadoresData);
//     } catch (error) {
//       console.error("Erro ao salvar notas:", error);
//       alert(`Erro ao salvar notas: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container>
//       <SettingsContainer>
//         <SettingItem>
//           <label htmlFor="jogadoresPorLinha">Jogadores por time:</label>
//           <input
//             type="number"
//             id="jogadoresPorLinha"
//             value={jogadoresPorTime}
//             onChange={(e) => setJogadoresPorTime(parseInt(e.target.value, 10) || 0)}
//             min="0"
//           />
//         </SettingItem>
//         <StatsContainer>
//           <StatBox borderColor="#facc15" bgColor="rgba(250, 204, 21, 0.1)" textColor="#fef08a">
//             Cabeças de Chave
//             <span>{cabecasDeChave}</span>
//           </StatBox>
//           <StatBox borderColor="#e09d5b" bgColor="rgba(205, 127, 50, 0.1)" textColor="#fcd9b6">
//             Pés de Rato
//             <span>{pesDeRato}</span>
//           </StatBox>
//         </StatsContainer>
//       </SettingsContainer>

//       <JogadorGridContainer>
//         {times.map((time, index) => (
//           <JogadorColumn key={index}>
//             {time.map((jogador) => (
//               <JogadorRow key={jogador.id} nota={jogador.nivel}>
//                 <JogadorName>{jogador.nome}</JogadorName>
//                 <InputNota
//                   type="number"
//                   value={jogador.nivel}
//                   onChange={(e) => handleNotaChange(jogador.id, e.target.value)}
//                   min="1"
//                   max="10"
//                 />
//                 <CheckboxLabel>
//                   <input
//                     type="checkbox"
//                     checked={jogador.joga_recuado}
//                     onChange={(e) => handleRecuadoChange(jogador.id, e.target.checked)}
//                   />
//                   Recuado
//                 </CheckboxLabel>
//               </JogadorRow>
//             ))}
//           </JogadorColumn>
//         ))}
//       </JogadorGridContainer>

//       <ConfirmButton onClick={handleConfirmarNotasESortear} disabled={loading}>
//         {loading ? 'Aguarde...' : 'Confirmar Notas e Sortear'}
//       </ConfirmButton>
//     </Container>
//   );
// };

// export default NotasJogadoresStep;

import React, { useState, useMemo } from 'react';
import styled, { css } from 'styled-components';
import Button from '../common/Button';
import { updatePlayerNivel, updatePlayerCaracteristica } from '../../services/api';

// --- STYLED COMPONENTS (VISUAL MODERNO) ---

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
`;

const SettingsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 1rem;
  background: ${(props) => props.theme.colors.surface};
  padding: ${(props) => props.theme.spacing.md};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.border};
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
  
  label {
    font-weight: 500;
  }

  input {
    width: 80px;
    text-align: center;
    background-color: ${(props) => props.theme.colors.background};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: 6px;
    padding: ${(props) => props.theme.spacing.sm};
    color: ${(props) => props.theme.colors.textPrimary};
    font-size: 1.1rem;
    font-weight: bold;
    &:focus {
      outline: none;
      border-color: ${(props) => props.theme.colors.accentPrimary};
    }
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
`;

const StatBox = styled.div`
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  border-radius: 6px;
  border: 1px solid ${(props) => props.borderColor};
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  font-weight: bold;
  font-size: 0.9rem;
  text-align: center;
  
  span {
    font-size: 1.2rem;
    display: block;
  }
`;

// Container principal com scroll e altura limitada (MANTIDO DO ORIGINAL)
const JogadorListContainer = styled.div`
  width: 95%;
  max-height: 70vh;
  overflow-y: auto;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 12px;
  margin-bottom: 20px;
  background: ${(props) => props.theme.colors.surface};

  /* Estilização da barra de scroll */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.background};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.accentPrimary};
    border-radius: 10px;
  }
`;

// Divisão em colunas usando CSS columns (MANTIDO DO ORIGINAL)
const JogadorList = styled.div`
  column-count: 3;
  column-gap: 20px;

  @media (max-width: 1024px) {
    column-count: 2;
  }

  @media (max-width: 768px) {
    column-count: 1;
  }
`;

const JogadorRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  break-inside: avoid-column;
  transition: all 0.2s ease;
  border-left: 4px solid transparent;

  &:hover {
    transform: scale(1.03);
  }

  /* Estilos especiais para notas 10, 7 e 5 */
  ${(props) => props.nota === 10 && css`
    background: linear-gradient(90deg, rgba(250, 204, 21, 0.15) 0%, rgba(250, 204, 21, 0) 100%);
    border-left-color: #facc15;
    box-shadow: 0 0 10px rgba(250, 204, 21, 0.2);
  `}

  ${(props) => props.nota === 7 && css`
    background: linear-gradient(90deg, rgba(192, 192, 192, 0.15) 0%, rgba(192, 192, 192, 0) 100%);
    border-left-color: #c0c0c0;
    box-shadow: 0 0 8px rgba(192, 192, 192, 0.2);
  `}

  ${(props) => props.nota === 5 && css`
    background: linear-gradient(90deg, rgba(205, 127, 50, 0.15) 0%, rgba(205, 127, 50, 0) 100%);
    border-left-color: #cd7f32;
    box-shadow: 0 0 8px rgba(205, 127, 50, 0.2);
  `}
`;

const JogadorName = styled.span`
  font-weight: 500;
  flex-grow: 1;
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 0.95rem;
`;

const InputNota = styled.input`
  width: 50px;
  text-align: center;
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 6px;
  padding: 8px;
  color: ${(props) => props.theme.colors.textPrimary};
  margin: 0 10px;
  font-weight: bold;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.accentSecondary};
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.textMuted};
  
  input {
    margin-right: 6px;
    cursor: pointer;
  }
`;

const ConfirmButton = styled(Button)`
  width: 100%;
  max-width: 500px;
  background-color: ${(props) => props.theme.colors.success};
  color: ${(props) => props.theme.colors.textPrimary};
  font-weight: bold;
  padding: 15px;
  font-size: 1.1rem;
`;

// --- COMPONENTE PRINCIPAL (LÓGICA ORIGINAL FUNCIONAL) ---

const NotasJogadoresStep = ({ jogadores, onSortear, jogadoresPorTime, setJogadoresPorTime }) => {
  // Estado simples como no código original
  const [jogadoresData, setJogadoresData] = useState(jogadores);
  const [loading, setLoading] = useState(false);

  // Cálculo de estatísticas (adicionado do código modificado)
  const { cabecasDeChave, pesDeRato } = useMemo(() => ({
    cabecasDeChave: jogadoresData.filter(j => j.nivel === 10).length,
    pesDeRato: jogadoresData.filter(j => j.nivel === 5).length,
  }), [jogadoresData]);

  // Handlers mantidos do código original
  const handleNotaChange = (id, nivel) => {
    const novoNivel = parseInt(nivel, 10);
    if (isNaN(novoNivel)) return;

    setJogadoresData(prev =>
      prev.map(j => (j.id === id ? { ...j, nivel: novoNivel } : j))
    );
  };

  const handleRecuadoChange = (id, joga_recuado) => {
    setJogadoresData(prev =>
      prev.map(j => (j.id === id ? { ...j, joga_recuado } : j))
    );
  };

  // Função de confirmação mantida do código original (passando boolean diretamente)
  const handleConfirmarNotasESortear = async () => {
    setLoading(true);
    try {
      await Promise.all(
        jogadoresData.map(j => Promise.all([
          updatePlayerNivel(j.id, j.nivel),
          updatePlayerCaracteristica(j.id, j.joga_recuado) // Boolean direto, como no original
        ]))
      );
      onSortear(jogadoresData);
    } catch (error) {
      console.error("Erro ao salvar notas:", error);
      alert(`Erro ao salvar notas: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {/* Settings com visual moderno e estatísticas */}
      <SettingsContainer>
        <SettingItem>
          <label htmlFor="jogadoresPorLinha">Jogadores por time:</label>
          <input
            type="number"
            id="jogadoresPorLinha"
            value={jogadoresPorTime}
            onChange={(e) => setJogadoresPorTime(parseInt(e.target.value, 10))}
            min="1"
          />
        </SettingItem>
        <StatsContainer>
          <StatBox borderColor="#facc15" bgColor="rgba(250, 204, 21, 0.1)" textColor="#fef08a">
            Cabeças de Chave
            <span>{cabecasDeChave}</span>
          </StatBox>
          <StatBox borderColor="#cd7f32" bgColor="rgba(205, 127, 50, 0.1)" textColor="#fcd9b6">
            Pés de Rato
            <span>{pesDeRato}</span>
          </StatBox>
        </StatsContainer>
      </SettingsContainer>

      {/* Layout em colunas verticais (ORIGINAL) com visual moderno */}
      <JogadorListContainer>
        <JogadorList>
          {jogadoresData.map(jogador => (
            <JogadorRow key={jogador.id} nota={jogador.nivel}>
              <JogadorName>{jogador.nome}</JogadorName>
              <InputNota
                type="number"
                value={jogador.nivel}
                onChange={(e) => handleNotaChange(jogador.id, e.target.value)}
                min="1"
                max="10"
              />
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={jogador.joga_recuado}
                  onChange={(e) => handleRecuadoChange(jogador.id, e.target.checked)}
                />
                Recuado
              </CheckboxLabel>
            </JogadorRow>
          ))}
        </JogadorList>
      </JogadorListContainer>

      {/* Botão com visual moderno */}
      <ConfirmButton onClick={handleConfirmarNotasESortear} disabled={loading}>
        {loading ? 'A guardar...' : 'Sortear Times'}
      </ConfirmButton>
    </Container>
  );
};

export default NotasJogadoresStep;
