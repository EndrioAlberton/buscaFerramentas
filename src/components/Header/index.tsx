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
      <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box
            component="img"
            src="/logoif.png"
            alt="Logo IF"
            sx={{ height: 50, width: 'auto' }}
          />
          <Box
            component="img"
            src="/logoMPIE.png"
            alt="Logo MPIE"
            sx={{ height: 50, width: 'auto' }}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {isLocalhost && (
            <Button 
              variant="contained" 
              onClick={handleResetTools}
              sx={{ 
                backgroundColor: '#1f4b6e',
                '&:hover': {
                  backgroundColor: '#2f6b8e'
                }
              }}
            >
              Resetar Ferramentas
            </Button>
          )}
          <LoginButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};