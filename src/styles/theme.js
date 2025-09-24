// Arquivo: src/styles/theme.js

export const theme = {
  colors: {
    background: '#0a192f',
    primary: '#facc15',
    secondary: '#e6f1ff',
    text: '#cbd5e1',
    success: '#10b981',
    danger: '#ef4444',
    darkBlue: '#172a45',
    grey: '#6b7280',
  },
  fonts: {
    primary: "'Oswald', sans-serif",
    secondary: "'Roboto', sans-serif",
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  // Breakpoints para design responsivo
  breakpoints: {
    mobile: 'screen and (max-width: 767px)',
    tablet: 'screen and (min-width: 768px)',
    desktop: 'screen and (min-width: 1024px)',
  },
};