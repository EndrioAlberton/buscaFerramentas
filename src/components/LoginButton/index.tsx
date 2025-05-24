import React from 'react';
import { Button, Box, Avatar, Menu, MenuItem } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import GoogleIcon from '@mui/icons-material/Google';

const LoginButton: React.FC = () => {
  const { user, signInWithGoogle, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      handleClose();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (!user) {
    return (
      <Button
        variant="outlined"
        onClick={signInWithGoogle}
        startIcon={<GoogleIcon />}
        sx={{
          borderColor: '#4285f4',
          color: '#4285f4',
          '&:hover': {
            borderColor: '#4285f4',
            backgroundColor: 'rgba(66, 133, 244, 0.04)'
          }
        }}
      >
        Entrar com Google
      </Button>
    );
  }

  return (
    <Box>
      <Avatar
        src={user.photoURL || undefined}
        alt={user.displayName || 'User'}
        onClick={handleClick}
        sx={{ 
          cursor: 'pointer',
          width: 40,
          height: 40,
          border: '2px solid #4285f4'
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem disabled>
          {user.displayName || user.email}
        </MenuItem>
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>
    </Box>
  );
};

export default LoginButton; 