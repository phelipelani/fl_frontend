import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from 'framer-motion';
import logoLendas from "../../assets/Logo.png";

const PageContainer = styled.div`
  /* Permite altura dinâmica baseada no conteúdo */
  min-height: 100vh; 
  width: 100vw;
  /* Remove overflow hidden para permitir rolagem quando necessário */
  overflow-x: hidden; /* Apenas impede rolagem horizontal */

  display: flex;
  flex-direction: column;
  
  /* Condicional: centraliza apenas na home, nas outras páginas deixa natural */
  ${props => props.isHomePage && `
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
  `}
  
  padding: ${(props) => props.isHomePage ? props.theme.spacing.lg : '0'};

  @media ${(props) => props.theme.breakpoints.tablet} {
    padding: ${(props) => props.isHomePage ? props.theme.spacing.xl : '0'};
  }
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};
  flex-shrink: 0;
  
  /* Adiciona padding para páginas internas */
  padding-top: ${(props) => props.theme.spacing.lg};
  
  @media ${(props) => props.theme.breakpoints.tablet} {
    padding-top: ${(props) => props.theme.spacing.xl};
  }
`;

const LogoLink = styled(Link)`
  display: block;
  line-height: 0;
`;

const LogoImage = styled(motion.img)`
  width: 150px;
  height: auto;
  
  @media ${(props) => props.theme.breakpoints.tablet} {
    width: 200px;
  }
`;

const MainContent = styled(motion.main)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
  /* Condicional: limita largura apenas na home */
  max-width: ${props => props.isHomePage ? '500px' : 'none'};

  /* Condicional: propriedades de flex apenas para home */
  ${props => props.isHomePage && `
    flex-grow: 1;
    min-height: 0;
  `}
  
  /* Para páginas internas, permite crescimento natural */
  ${props => !props.isHomePage && `
    flex: 1;
    min-height: calc(100vh - 200px); /* Compensa a altura do header */
  `}
`;

const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const showLogo = !isHomePage;

  const mainVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <PageContainer isHomePage={isHomePage}>
      {showLogo && (
        <Header>
          <LogoLink to="/">
            <LogoImage 
              src={logoLendas} 
              alt="Logo Lendas"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </LogoLink>
        </Header>
      )}
      <MainContent
        isHomePage={isHomePage}
        key={location.pathname}
        variants={mainVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Outlet />
      </MainContent>
    </PageContainer>
  );
};

export default MainLayout;