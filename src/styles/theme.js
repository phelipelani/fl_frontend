// // Arquivo: src/styles/theme.js

// export const theme = {
//   colors: {
//     background: '#0a192f',
//     primary: '#facc15',
//     secondary: '#e6f1ff',
//     text: '#cbd5e1',
//     success: '#10b981',
//     danger: '#ef4444',
//     darkBlue: '#172a45',
//     grey: '#6b7280',
//   },
//   fonts: {
//     primary: "'Oswald', sans-serif",
//     secondary: "'Roboto', sans-serif",
//   },
//   spacing: {
//     xs: '4px',
//     sm: '8px',
//     md: '16px',
//     lg: '24px',
//     xl: '32px',
//     xxl: '48px',
//   },
//   // Breakpoints para design responsivo
//   breakpoints: {
//     mobile: 'screen and (max-width: 767px)',
//     tablet: 'screen and (min-width: 768px)',
//     desktop: 'screen and (min-width: 1024px)',
//   },
// };

// Arquivo: src/styles/theme.js

export const theme = {
  colors: {
    // Cores de fundo
    background: '#030611', // O fundo principal escuro com gradientes
    surface: 'rgba(8, 20, 33, 0.85)', // Cor de superfície para cards e modais
    border: 'rgba(19, 38, 58, 0.7)', // Cor das bordas

    // Cores de texto
    textPrimary: '#f8fafc',    // Para títulos principais
    textSecondary: '#ecf3ff', // Para texto secundário
    textMuted: 'rgba(203, 213, 245, 0.8)', // Para descrições e textos menos importantes

    // Cores de destaque (accent)
    accentPrimary: '#38bdf8',          // Azul ciano principal
    accentSecondary: '#facc15',       // Amarelo dourado (mantido do tema antigo)
    accentTransparent: 'rgba(56, 189, 248, 0.7)',

    // Cores de feedback
    success: '#10b981',
    danger: '#ef4444',
  },

  fonts: {
    // A fonte padrão do sistema, para consistência
    primary: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },

  // Breakpoints para design responsivo (mantidos)
  breakpoints: {
    mobile: 'screen and (max-width: 767px)',
    tablet: 'screen and (min-width: 768px)',
    desktop: 'screen and (min-width: 1024px)',
  },
};