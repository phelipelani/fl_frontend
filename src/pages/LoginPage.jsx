// Arquivo: src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { loginAPI } from '../services/api';
import { useToast } from '../contexts/ToastContext';
import { useSound } from '../hooks/useSound';
import Button from '../components/common/Button';
import logoLendas from '../assets/Logo.png';
import { IoLockClosed, IoLogInOutline } from 'react-icons/io5';
import { FaKey } from 'react-icons/fa';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  padding: ${(props) => props.theme.spacing.lg};
`;

const LoginWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xl};
  background-color: ${(props) => props.theme.colors.darkBlue}99;
  padding: ${(props) => props.theme.spacing.xxl};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.primary};
  width: 100%;
  max-width: 400px;
`;

const LogoImage = styled.img`
  width: 150px;
  height: auto;
`;

const Title = styled.h1`
  font-family: ${(props) => props.theme.fonts.primary};
  color: ${(props) => props.theme.colors.secondary};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
`;

const LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
`;

const FormGroup = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute; top: 50%; left: ${(props) => props.theme.spacing.md};
  transform: translateY(-50%); color: ${(props) => props.theme.colors.grey};
  z-index: 2; pointer-events: none;
`;

const Input = styled.input`
  width: 100%; padding: 14px; padding-left: ${(props) => props.theme.spacing.xxl};
  background-color: rgba(10, 25, 47, 0.8);
  border: 1px solid ${(props) => props.theme.colors.primary}55;
  border-radius: 8px; font-size: 1rem; color: ${(props) => props.theme.colors.secondary};
  font-weight: 500;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none; border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary}55;
  }
`;

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { playSuccess, playError } = useSound();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginAPI(password);
      playSuccess();
      showToast('Login bem-sucedido!', 'success');
      navigate('/ligas'); // Redireciona para a página de ligas após o login
    } catch (error) {
      playError();
      showToast(error.message, 'error');
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <LoginWrapper
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LogoImage src={logoLendas} alt="Logo Lendas" />
        <Title><IoLockClosed /> ACESSO RESTRITO</Title>
        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <InputIcon><FaKey /></InputIcon>
            <Input
              type="password"
              placeholder="Senha de Administrador"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <Button type="submit" disabled={isLoading} icon={<IoLogInOutline />}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </LoginForm>
      </LoginWrapper>
    </PageContainer>
  );
};

export default LoginPage;