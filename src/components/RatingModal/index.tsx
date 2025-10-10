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
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
} from '@mui/material';
import { Rating, RatingStats, PedagogicalFeedback, PedagogicalFeedbackStats } from '../../types/rating';
import { 
  addRating, 
  getRatingStats, 
  getUserRating,
  addPedagogicalFeedback,
  getPedagogicalFeedbackStats,
  getUserPedagogicalFeedback
} from '../../services/dataAccess/ratingsAccess';
import { useAuth } from '../../contexts/AuthContext';
import GoogleIcon from '@mui/icons-material/Google';
import StarIcon from '@mui/icons-material/Star';
import SchoolIcon from '@mui/icons-material/School';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

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

const NIVEIS_ENSINO = [
  'Educação Infantil',
  '1º ano - Ensino Fundamental',
  '2º ano - Ensino Fundamental',
  '3º ano - Ensino Fundamental',
  '4º ano - Ensino Fundamental',
  '5º ano - Ensino Fundamental',
  '6º ano - Ensino Fundamental',
  '7º ano - Ensino Fundamental',
  '8º ano - Ensino Fundamental',
  '9º ano - Ensino Fundamental',
  '1º ano - Ensino Médio',
  '2º ano - Ensino Médio',
  '3º ano - Ensino Médio',
] as const;

const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose, toolId, toolName }) => {
  const { user, signInWithGoogle } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  
  // Estados para avaliação por critérios
  const [ratings, setRatings] = useState<Rating>({
    usabilidade: 0,
    recursos: 0,
    design: 0,
    documentacao: 0,
    gratuidade: 0,
  });
  const [stats, setStats] = useState<RatingStats | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Estados para feedback pedagógico
  const [pedagogicalFeedback, setPedagogicalFeedback] = useState<PedagogicalFeedback>({
    nivelEnsino: '',
    recomendacao: 0,
    comentario: '',
  });
  const [pedagogicalStats, setPedagogicalStats] = useState<PedagogicalFeedbackStats | null>(null);
  const [isPedagogicalEditing, setIsPedagogicalEditing] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (isOpen) {
        try {
          // Buscar estatísticas gerais de critérios
          const ratingStats = await getRatingStats(toolId);
          setStats(ratingStats);

          // Buscar estatísticas de feedback pedagógico
          const pedStats = await getPedagogicalFeedbackStats(toolId);
          setPedagogicalStats(pedStats);

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

            // Buscar feedback pedagógico do usuário
            const userPedFeedback = await getUserPedagogicalFeedback(toolId, user.uid);
            if (userPedFeedback) {
              setPedagogicalFeedback({
                nivelEnsino: userPedFeedback.nivelEnsino,
                recomendacao: userPedFeedback.recomendacao,
                comentario: userPedFeedback.comentario,
              });
              setIsPedagogicalEditing(true);
            } else {
              setPedagogicalFeedback({
                nivelEnsino: '',
                recomendacao: 0,
                comentario: '',
              });
              setIsPedagogicalEditing(false);
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

  const handlePedagogicalChange = (field: keyof PedagogicalFeedback, value: string | number) => {
    setPedagogicalFeedback(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    // TEMPORARIAMENTE COMENTADO - Verificação de login desabilitada
    // if (!user) {
    //   setError('Você precisa estar logado para avaliar.');
    //   return;
    // }

    try {
      if (tabValue === 0) {
        // Enviar avaliação por critérios
        await addRating(toolId, {
          ...ratings,
          userId: user?.uid || 'user-demo',
          userEmail: user?.email || 'demo@exemplo.com',
          userName: user?.displayName || 'Usuário Demo'
        });
      } else {
        // Enviar feedback pedagógico
        await addPedagogicalFeedback(toolId, {
          ...pedagogicalFeedback,
          userId: user?.uid || 'user-demo',
          userEmail: user?.email || 'demo@exemplo.com',
          userName: user?.displayName || 'Usuário Demo'
        });
      }
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

  const isValidCriteria = Object.values(ratings).every(rating => rating > 0);
  const isValidPedagogical = pedagogicalFeedback.nivelEnsino !== '' && 
                             pedagogicalFeedback.recomendacao > 0 && 
                             pedagogicalFeedback.comentario.trim() !== '';
  const isValid = tabValue === 0 ? isValidCriteria : isValidPedagogical;

  return (
    <Dialog 
      open={isOpen} 
      onClose={handleClose}
      maxWidth="md"
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

        <Tabs 
          value={tabValue} 
          onChange={(_, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        >
          <Tab 
            icon={<StarIcon />} 
            iconPosition="start"
            label="Avaliação por Critérios" 
          />
          <Tab 
            icon={<SchoolIcon />} 
            iconPosition="start"
            label="Feedback Pedagógico" 
          />
        </Tabs>

        {/* Aba de Avaliação por Critérios */}
        {tabValue === 0 && (
          <>
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
            
            {/* TEMPORARIAMENTE COMENTADO - Verificação de login desabilitada */}
            {/* {user ? ( */}
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
            {/* ) : (
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
            )} */}
          </>
        )}

        {/* Aba de Feedback Pedagógico */}
        {tabValue === 1 && (
          <>
            {pedagogicalStats && (
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <ThumbUpIcon sx={{ color: '#1f4b6e' }} />
                  <Typography variant="h6" component="span">
                    {pedagogicalStats.mediaRecomendacao.toFixed(1)}/10
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ({pedagogicalStats.totalFeedbacks} {pedagogicalStats.totalFeedbacks === 1 ? 'feedback' : 'feedbacks'})
                  </Typography>
                </Box>

                {Object.keys(pedagogicalStats.distribuicaoNiveis).length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom fontWeight="bold">
                      Níveis de Ensino:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {Object.entries(pedagogicalStats.distribuicaoNiveis).map(([nivel, count]) => (
                        <Chip 
                          key={nivel}
                          label={`${nivel} (${count})`}
                          size="small"
                          sx={{ backgroundColor: '#e3f2fd' }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                {pedagogicalStats.comentarios.length > 0 && (
                  <Box>
                    <Typography variant="body2" gutterBottom fontWeight="bold">
                      Comentários Recentes:
                    </Typography>
                    <Stack spacing={1} sx={{ maxHeight: 200, overflowY: 'auto' }}>
                      {pedagogicalStats.comentarios.map((comment, index) => (
                        <Box 
                          key={index}
                          sx={{ 
                            p: 1.5, 
                            backgroundColor: '#f5f5f5', 
                            borderRadius: 1,
                            borderLeft: '3px solid #1f4b6e'
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="caption" fontWeight="bold">
                              {comment.userName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Recomendação: {comment.recomendacao}/10
                            </Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                            {comment.nivelEnsino}
                          </Typography>
                          <Typography variant="body2">
                            {comment.comentario}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                )}
              </Box>
            )}

            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                {isPedagogicalEditing ? 'Editar Seu Feedback' : 'Seu Feedback Pedagógico'}
              </Typography>
              
              <Stack spacing={3} sx={{ mt: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Nível de Ensino</InputLabel>
                  <Select
                    value={pedagogicalFeedback.nivelEnsino}
                    label="Nível de Ensino"
                    onChange={(e) => handlePedagogicalChange('nivelEnsino', e.target.value)}
                  >
                    {NIVEIS_ENSINO.map((nivel) => (
                      <MenuItem key={nivel} value={nivel}>
                        {nivel}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box>
                  <Typography component="legend" gutterBottom>
                    Recomendação (0 = Não recomendaria, 10 = Recomendaria fortemente)
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary">0</Typography>
                    <MuiRating
                      name="recomendacao"
                      value={pedagogicalFeedback.recomendacao / 2}
                      max={5}
                      precision={0.5}
                      size="large"
                      onChange={(_, value) => handlePedagogicalChange('recomendacao', (value || 0) * 2)}
                    />
                    <Typography variant="body2" color="text.secondary">10</Typography>
                    <Typography variant="h6" sx={{ ml: 2, color: '#1f4b6e' }}>
                      {pedagogicalFeedback.recomendacao.toFixed(1)}
                    </Typography>
                  </Box>
                </Box>

                <TextField
                  label="Comente sobre os potenciais da ferramenta"
                  multiline
                  rows={4}
                  fullWidth
                  value={pedagogicalFeedback.comentario}
                  onChange={(e) => handlePedagogicalChange('comentario', e.target.value)}
                  placeholder="Compartilhe sua experiência usando esta ferramenta em sala de aula..."
                  helperText={`${pedagogicalFeedback.comentario.length} caracteres`}
                />
              </Stack>
            </>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Fechar
        </Button>
        {/* TEMPORARIAMENTE COMENTADO - Verificação de login desabilitada */}
        {/* {user && ( */}
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
            {(tabValue === 0 && isEditing) || (tabValue === 1 && isPedagogicalEditing) 
              ? 'Atualizar Avaliação' 
              : 'Enviar Avaliação'}
          </Button>
        {/* )} */}
      </DialogActions>
    </Dialog>
  );
};

export default RatingModal; 