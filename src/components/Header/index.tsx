import React from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import LoginButton from '../LoginButton';
import { resetTools } from '../../services/dataAccess/ferramentasAccess';

export const Header: React.FC = () => {
  const handleResetTools = async () => {
    try {
      await resetTools();
      // Recarrega a página para atualizar a lista
      window.location.reload();
    } catch (error) {
      console.error('Erro ao resetar ferramentas:', error);
    }
  };

  const isLocalhost = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1';

  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2 } }}>
        <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, alignItems: 'center' }}>
          <Box
            sx={{ 
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
              fontWeight: 600,
              color: 'white',
              height: { xs: 40, sm: 50 },
              display: 'flex',
              alignItems: 'center',
              fontFamily: '"Gentona", "Roboto", "Helvetica", "Arial", sans-serif',
              letterSpacing: '0.5px',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            EduApps
          </Box>
          <Box
            component="img"
            src="/logoif.png"
            alt="Logo IF"
            sx={{ height: { xs: 35, sm: 45, md: 50 }, width: 'auto' }}
          />
          <Box
            component="img"
            src="/logoMPIE.png"
            alt="Logo MPIE"
            sx={{ height: { xs: 35, sm: 45, md: 50 }, width: 'auto' }}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, alignItems: 'center' }}>
          {isLocalhost && (
            <Button 
              variant="contained" 
              onClick={handleResetTools}
              sx={{ 
                backgroundColor: '#1f4b6e',
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                padding: { xs: '4px 8px', sm: '6px 16px' },
                '&:hover': {
                  backgroundColor: '#2f6b8e'
                }
              }}
            >
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                Resetar Ferramentas
              </Box>
              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                Reset
              </Box>
            </Button>
          )}
          <LoginButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};