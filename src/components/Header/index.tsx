import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';

export const Header: React.FC = () => {
  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar sx={{ justifyContent: 'center', gap: 2 }}>
        <Box
          component="img"
          src="/logoif.png"
          alt="Logo IF"
          sx={{ height: 40, width: 'auto' }}
        />
        <Box
          component="img"
          src="/logoMPIE.png"
          alt="Logo MPIE"
          sx={{ height: 40, width: 'auto' }}
        />
      </Toolbar>
    </AppBar>
  );
};