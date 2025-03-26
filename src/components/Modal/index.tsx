import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, List, ListItem, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
  isOpen: boolean;
  tool: {
    nome: string;
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
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" component="h2">
          {tool.nome}
        </Typography>
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
      <DialogContent>
        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Aspectos relevantes
            </Typography>
            <List>
              {(tool.vantagens || []).map((vantagem, index) => (
                <ListItem key={index}>
                  <Typography>{vantagem}</Typography>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Limitações
            </Typography>
            <List>
              {(tool.limitações || []).map((limite, index) => (
                <ListItem key={index}>
                  <Typography>{limite}</Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
