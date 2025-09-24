// import { createGlobalStyle } from 'styled-components';

// const GlobalStyle = createGlobalStyle`
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }

//   body {
//     font-family: 'Arial', sans-serif;
//     background-color: #0a192f;
//     background-image: url('https://www.transparenttextures.com/patterns/dark-denim-3.png');
//     color: #e6f1ff;
//     /* A linha 'overflow: hidden;' foi removida para permitir o scroll */
//   }
// `;

// export default GlobalStyle;

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Usando a importação de fonte do Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Roboto:wght@400;500;700&display=swap');

  :root {
    /* Paleta de Cores */
    --color-background: #0a192f;
    --color-primary: #facc15;    /* Amarelo Dourado */
    --color-secondary: #e6f1ff;  /* Quase Branco */
    --color-text: #cbd5e1;       /* Cinza Claro */
    --color-success: #10b981;    /* Verde */
    --color-danger: #ef4444;      /* Vermelho */
    --color-dark-blue: #172a45;
    
    /* Tipografia */
    --font-primary: 'Oswald', sans-serif;
    --font-secondary: 'Roboto', sans-serif;

    /* Espaçamento */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-secondary);
    background-color: var(--color-background);
    background-image: url('https://www.transparenttextures.com/patterns/dark-denim-3.png');
    color: var(--color-text);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-primary);
    color: var(--color-secondary);
    text-transform: uppercase;
  }

  button, a {
    font-family: var(--font-secondary);
    font-weight: bold;
    -webkit-tap-highlight-color: transparent; /* Remove o flash azul no mobile */
  }

  /* Estilização da barra de scroll */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: var(--color-background);
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--color-primary);
    border-radius: 10px;
    border: 2px solid var(--color-background);
  }
`;

export default GlobalStyle;