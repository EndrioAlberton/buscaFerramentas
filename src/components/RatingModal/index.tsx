import React, { useState, useEffect } from 'react';
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
  Divider,
} from '@mui/material';
import { Rating, RatingStats } from '../../types/rating';
import { addRating, getRatingStats, getUserRating } from '../../services/dataAccess/ratingsAccess';
import { useAuth } from '../../contexts/AuthContext';
import GoogleIcon from '@mui/icons-material/Google';
import StarIcon from '@mui/icons-material/Star';

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
  const [stats, setStats] = useState<RatingStats | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (isOpen) {
        try {
          // Buscar estatísticas gerais
          const ratingStats = await getRatingStats(toolId);
          setStats(ratingStats);

          // Buscar avaliação do usuário se estiver logado
          if (user) {
            const userRating = await getUserRating(toolId, user.uid);
            if (userRating) {
              setRatings({
                usabilidade: userRating.usabilidade,
                recursos: userRating.recursos,
                design: userRating.design,
                documentacao: userRating.documentacao,
                gratuidade: userRating.gratuidade,
              });
              setIsEditing(true);
            } else {
              setRatings({
                usabilidade: 0,
                recursos: 0,
                design: 0,
                documentacao: 0,
                gratuidade: 0,
              });
              setIsEditing(false);
            }
          }
        } catch (error) {
          console.error('Erro ao carregar dados:', error);
          setError('Erro ao carregar dados. Tente novamente.');
        }
      }
    };
    fetchData();
  }, [isOpen, toolId, user]);

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

  return (
    <Dialog 
      open={isOpen} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {user ? (isEditing ? `Editar avaliação - ${toolName}` : `Avaliar ${toolName}`) : `Avaliações - ${toolName}`}
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {stats && (
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <StarIcon sx={{ color: '#fbc02d' }} />
              <Typography variant="h6" component="span">
                {stats.mediaGeral.toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ({stats.totalAvaliacoes} {stats.totalAvaliacoes === 1 ? 'avaliação' : 'avaliações'})
              </Typography>
            </Box>
            <Stack spacing={1}>
              {RATING_CRITERIA.map(({ id, label }) => {
                const criteriaId = id as keyof Omit<Rating, 'userId' | 'userEmail' | 'userName' | 'id' | 'createdAt' | 'updatedAt'>;
                return (
                  <Box key={id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2">{label}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MuiRating
                        value={stats.detalhes[criteriaId]}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
                      <Typography variant="body2" color="text.secondary">
                        ({stats.detalhes[criteriaId].toFixed(1)})
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        )}
        
        {user ? (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              {isEditing ? 'Editar Sua Avaliação' : 'Sua Avaliação'}
            </Typography>
            <Stack spacing={3} sx={{ mt: 2 }}>
              {RATING_CRITERIA.map(({ id, label, description }) => (
                <Box key={id}>
                  <Typography component="legend">{label}</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {description}
                  </Typography>
                  <MuiRating
                    name={id}
                    value={ratings[id as keyof Omit<Rating, 'userId' | 'userEmail' | 'userName' | 'id' | 'createdAt' | 'updatedAt'>]}
                    onChange={(_, value) => handleRatingChange(id as keyof Omit<Rating, 'userId' | 'userEmail' | 'userName' | 'id' | 'createdAt' | 'updatedAt'>, value)}
                    size="large"
                  />
                </Box>
              ))}
            </Stack>
          </>
        ) : (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: 2,
            py: 2 
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
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Fechar
        </Button>
        {user && (
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
            {isEditing ? 'Atualizar Avaliação' : 'Enviar Avaliação'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default RatingModal; 