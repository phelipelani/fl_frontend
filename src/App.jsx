import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import GlobalStyle from "./styles/GlobalStyle";
import { ToastProvider } from "./contexts/ToastContext";
import { ThemeProvider } from "styled-components"; // 1. Importar ThemeProvider
import { theme } from "./styles/theme"; // 2. Importar nosso tema

function App() {
  return (
    <BrowserRouter>
      {/* 3. Envolver a aplicação com o Provider do Tema */}
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <GlobalStyle />
          <AppRoutes />
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;