import React from 'react';
import { Button, Box, Avatar, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import GoogleIcon from '@mui/icons-material/Google';

const LoginButton: React.FC = () => {
  const { user, signInWithGoogle, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
        startIcon={!isSmallScreen ? <GoogleIcon /> : undefined}
        size={isSmallScreen ? 'small' : 'medium'}
        sx={{
          borderColor: '#4285f4',
          color: '#4285f4',
          textTransform: 'none',
          whiteSpace: 'nowrap',
          lineHeight: 1.2,
          px: { xs: 1, sm: 2 },
          py: { xs: 0.5, sm: 1 },
          fontSize: { xs: '0.75rem', sm: '0.875rem' },
          minWidth: { xs: 40, sm: 64 },
          width: { xs: 40, sm: 'auto' },
          height: { xs: 40, sm: 'auto' },
          '&:hover': {
            borderColor: '#4285f4',
            backgroundColor: 'rgba(66, 133, 244, 0.04)'
          }
        }}
      >
        {isSmallScreen ? <GoogleIcon /> : 'Entrar com Google'}
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