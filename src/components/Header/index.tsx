import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import LoginButton from '../LoginButton';

export const Header: React.FC = () => {
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
        <LoginButton />
      </Toolbar>
    </AppBar>
  );
};