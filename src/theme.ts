import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1f4b6e',
      light: '#2f6b8e',
      dark: '#1a3b5a',
    },
    secondary: {
      main: '#e6b800',
      light: '#ffcc00',
      dark: '#cc9900',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f4b6e',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#1f4b6e',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#1f4b6e',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#1f4b6e',
    },
    body1: {
      fontSize: '1rem',
      color: '#333333',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          padding: '8px 16px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1f4b6e',
          boxShadow: 'none',
          borderBottom: '2px solid #e6b800',
        },
      },
    },
  },
}); 