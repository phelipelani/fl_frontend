// import { createGlobalStyle } from 'styled-components';

// const GlobalStyle = createGlobalStyle`
//   /* Usando a importação de fonte do Google Fonts */
//   @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Roboto:wght@400;500;700&display=swap');

//   :root {
//     /* Paleta de Cores */
//     --color-background: #0a192f;
//     --color-primary: #facc15;    /* Amarelo Dourado */
//     --color-secondary: #e6f1ff;  /* Quase Branco */
//     --color-text: #cbd5e1;       /* Cinza Claro */
//     --color-success: #10b981;    /* Verde */
//     --color-danger: #ef4444;      /* Vermelho */
//     --color-dark-blue: #172a45;
    
//     /* Tipografia */
//     --font-primary: 'Oswald', sans-serif;
//     --font-secondary: 'Roboto', sans-serif;

//     /* Espaçamento */
//     --spacing-xs: 4px;
//     --spacing-sm: 8px;
//     --spacing-md: 16px;
//     --spacing-lg: 24px;
//     --spacing-xl: 32px;
//   }

//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }

//   body {
//     font-family: var(--font-secondary);
//     background-color: var(--color-background);
//     background-image: url('https://www.transparenttextures.com/patterns/dark-denim-3.png');
//     color: var(--color-text);
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
//   }

//   h1, h2, h3, h4, h5, h6 {
//     font-family: var(--font-primary);
//     color: var(--color-secondary);
//     text-transform: uppercase;
//   }

//   button, a {
//     font-family: var(--font-secondary);
//     font-weight: bold;
//     -webkit-tap-highlight-color: transparent; /* Remove o flash azul no mobile */
//   }

//   /* Estilização da barra de scroll */
//   ::-webkit-scrollbar {
//     width: 8px;
//   }
//   ::-webkit-scrollbar-track {
//     background: var(--color-background);
//   }
//   ::-webkit-scrollbar-thumb {
//     background-color: var(--color-primary);
//     border-radius: 10px;
//     border: 2px solid var(--color-background);
//   }
// `;

// export default GlobalStyle;

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Importação de fontes pode ser adicionada aqui se necessário */
  /* @import url('https://fonts.googleapis.com/css2?family=Sua-Fonte&display=swap'); */

  :root {
    /* Paleta de Cores extraída da ResultadoRodadaPage */
    --color-background-dark: #030611;
    --color-text-primary: #f8fafc;
    --color-text-secondary: #ecf3ff;
    --color-text-muted: rgba(203, 213, 245, 0.8);
    --color-accent-sky: #38bdf8;
    --color-accent-sky-transparent: rgba(56, 189, 248, 0.7);
    --color-accent-orange-transparent: rgba(249, 115, 22, 0.18);
    --color-accent-blue-transparent: rgba(59, 130, 246, 0.22);
    --color-border: rgba(19, 38, 58, 0.7);

    /* Tipografia */
    --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-sans);
    color: var(--color-text-secondary);
    background: var(--color-background-dark);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    /* Gradientes de fundo aplicados globalmente */
    background: radial-gradient(
        circle at 15% 20%,
        var(--color-accent-blue-transparent),
        transparent 55%
      ),
      radial-gradient(
        circle at 85% 10%,
        var(--color-accent-orange-transparent),
        transparent 52%
      ),
      linear-gradient(135deg, #030611 0%, #071626 45%, #032116 100%);
    
    min-height: 100vh;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--color-text-primary);
    font-weight: 600;
  }

  a, button {
    font-family: var(--font-sans);
    -webkit-tap-highlight-color: transparent;
  }

  /* Estilização da barra de scroll para combinar com a identidade visual */
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: var(--color-background-dark);
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(56, 189, 248, 0.3);
    border-radius: 10px;
    border: 2px solid var(--color-background-dark);
    transition: background-color 0.2s;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-accent-sky-transparent);
  }
`;

export default GlobalStyle;