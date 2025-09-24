import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";
import logoLendas from "../assets/Logo.png"; // CORRIGIDO

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  padding: 20px;

  @media (orientation: landscape) and (max-height: 600px) {
    padding: 15px; /* Reduz padding em celulares deitados */
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;

  @media (orientation: landscape) {
    flex-direction: row;
    gap: 80px;
  }

  @media (orientation: landscape) and (max-height: 600px) {
    gap: 40px; /* Reduz gap em celulares deitados para otimizar espaço */
  }
`;

const LogoImage = styled.img`
  width: 250px;
  height: auto;

  @media (orientation: landscape) {
    width: 300px;
  }

  @media (orientation: landscape) and (max-height: 600px) {
    width: 200px; /* Reduz tamanho da logo em celulares deitados */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (orientation: landscape) and (max-height: 600px) {
    gap: 15px; /* Reduz gap entre botões em celulares deitados */
  }
`;

const HomePage = () => {
  return (
    <PageContainer>
      <ContentWrapper>
        <LogoImage src={logoLendas} alt="Logo Lendas" />
        <ButtonContainer>
          <Link to="/ligas">
            <Button>Ligas</Button>
          </Link>
          <Link to="/estatisticas">
            <Button>Estatísticas</Button>
          </Link>
        </ButtonContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

export default HomePage;
