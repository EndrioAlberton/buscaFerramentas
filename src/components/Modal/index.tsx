import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  IconButton, 
  Typography, 
  List, 
  ListItem, 
  Box,
  Button,
  Chip,
  Divider,
  ListItemIcon
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { categoryColors } from '../../constants/colors';

interface ModalProps {
  isOpen: boolean;
  tool: {
    nome: string;
    descricao: string;
    categorias: string[];
    link: string;
    vantagens: string[];
    limitações: string[];
  } | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, tool, onClose }) => {
  if (!isOpen || !tool) return null;

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          m: 0, 
          p: 3, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {tool.nome}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {tool.categorias.map((categoria, index) => {
              const formattedCategory = categoria.replace(/_/g, ' ').trim().toLowerCase();
              return (
                <Chip
                  key={index}
                  label={categoria}
                  size="small"
                  sx={{ 
                    backgroundColor: categoryColors[formattedCategory] || '#1976d2',
                    color: '#ffffff'
                  }}
                />
              );
            })}
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '90%' }}>
            {tool.descricao}
          </Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                color: 'success.main'
              }}
            >
              <CheckCircleIcon />
              Aspectos relevantes
            </Typography>
            <List>
              {(tool.vantagens || []).map((vantagem, index) => (
                <ListItem 
                  key={index}
                  sx={{ 
                    py: 0.5,
                    pl: 0
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleIcon fontSize="small" color="success" />
                  </ListItemIcon>
                  <Typography>{vantagem}</Typography>
                </ListItem>
              ))}
            </List>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                color: 'warning.main'
              }}
            >
              <WarningIcon />
              Limitações
            </Typography>
            <List>
              {(tool.limitações || []).map((limite, index) => (
                <ListItem 
                  key={index}
                  sx={{ 
                    py: 0.5,
                    pl: 0
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <WarningIcon fontSize="small" color="warning" />
                  </ListItemIcon>
                  <Typography>{limite}</Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<OpenInNewIcon />}
            sx={{ 
              backgroundColor: '#1f4b6e',
              '&:hover': {
                backgroundColor: '#2f6b8e'
              }
            }}
          >
            Acessar Ferramenta
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
