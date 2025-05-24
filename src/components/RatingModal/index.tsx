import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Rating as MuiRating,
  Typography,
  Box,
  Stack,
  Alert,
} from '@mui/material';
import { Rating } from '../../types/rating';
import { addRating } from '../../services/dataAccess/ratingsAccess';
import { useAuth } from '../../contexts/AuthContext';
import GoogleIcon from '@mui/icons-material/Google';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolId: string;
  toolName: string;
}

const RATING_CRITERIA = [
  { id: 'usabilidade', label: 'Usabilidade', description: 'Facilidade de uso e intuitividade' },
  { id: 'recursos', label: 'Recursos', description: 'Quantidade e qualidade das funcionalidades' },
  { id: 'design', label: 'Design', description: 'Aparência e experiência do usuário' },
  { id: 'documentacao', label: 'Documentação', description: 'Qualidade dos tutoriais e documentação' },
  { id: 'gratuidade', label: 'Gratuidade', description: 'Disponibilidade de recursos gratuitos' },
] as const;

const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose, toolId, toolName }) => {
  const { user, signInWithGoogle } = useAuth();
  const [ratings, setRatings] = useState<Rating>({
    usabilidade: 0,
    recursos: 0,
    design: 0,
    documentacao: 0,
    gratuidade: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const handleRatingChange = (criteriaId: keyof Rating, value: number | null) => {
    setRatings(prev => ({
      ...prev,
      [criteriaId]: value || 0
    }));
  };

  const handleSubmit = async () => {
    if (!user) {
      setError('Você precisa estar logado para avaliar.');
      return;
    }

    try {
      await addRating(toolId, {
        ...ratings,
        userId: user.uid,
        userEmail: user.email || '',
        userName: user.displayName || ''
      });
      onClose();
      setError(null);
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      setError('Erro ao enviar avaliação. Tente novamente.');
    }
  };

  const handleClose = () => {
    setError(null);
    onClose();
  };

  const isValid = Object.values(ratings).every(rating => rating > 0);

  if (!user) {
    return (
      <Dialog 
        open={isOpen} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Avaliar {toolName}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: 2,
            py: 4 
          }}>
            <Typography variant="body1" gutterBottom>
              Para avaliar esta ferramenta, você precisa fazer login com sua conta Google.
            </Typography>
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog 
      open={isOpen} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        Avaliar {toolName}
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Stack spacing={3} sx={{ mt: 2 }}>
          {RATING_CRITERIA.map(({ id, label, description }) => (
            <Box key={id}>
              <Typography component="legend">{label}</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {description}
              </Typography>
              <MuiRating
                name={id}
                value={ratings[id as keyof Rating]}
                onChange={(_, value) => handleRatingChange(id as keyof Rating, value)}
                size="large"
              />
            </Box>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          disabled={!isValid}
          sx={{ 
            backgroundColor: '#1f4b6e',
            '&:hover': {
              backgroundColor: '#2f6b8e'
            }
          }}
        >
          Enviar Avaliação
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RatingModal; 