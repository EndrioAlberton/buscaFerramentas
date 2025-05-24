import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
  Rating,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import { getRatingStats } from '../../services/dataAccess/ratingsAccess';
import { RatingStats } from '../../types/rating';
import RatingModal from '../RatingModal';
import { categoryColors } from '../../constants/colors';

interface ToolCardProps {
  tool: {
    id: string;
    nome: string;
    descricao: string;
    categorias: string[];
    link: string;
    imagem: string;
    vantagens: string[];
    limitações: string[];
  };
  openModal: (tool: any) => void;
  setCategory: (category: string) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, openModal, setCategory }) => {
  const [ratingStats, setRatingStats] = useState<RatingStats | null>(null);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  const fetchRatingStats = async () => {
    const stats = await getRatingStats(tool.id);
    setRatingStats(stats);
  };

  useEffect(() => {
    fetchRatingStats();
  }, [tool.id]);

  const handleRatingModalClose = () => {
    setIsRatingModalOpen(false);
    fetchRatingStats(); // Atualiza as estatísticas ao fechar o modal
  };

  return (
    <>
      <Card sx={{ 
        padding: 0,
        height: '400px',
        display: 'flex', 
        flexDirection: 'column',
        border: '1px solid #e0e0e0',
        '&:hover': {
          boxShadow: 3,
          borderColor: 'primary.main',
        },
        m: 1
      }}>
        <CardMedia
          component="img"
          height="140"
          image={tool.imagem}
          alt={tool.nome}
          sx={{ 
            objectFit: 'contain', 
            p: 1,
            backgroundColor: '#f5f5f5'
          }}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Stack spacing={2} sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {tool.categorias.map((categoria, index) => {
                const formattedCategory = categoria.replace(/_/g, ' ').trim().toLowerCase();

                return (
                  <Chip
                    key={index}
                    label={categoria}
                    size="small"
                    onClick={() => setCategory(categoria)}
                    sx={{ 
                      backgroundColor: categoryColors[formattedCategory] || '#1976d2',
                      color: '#ffffff',
                      cursor: 'pointer',
                      '&:hover': {
                        opacity: 0.9,
                      },
                    }}
                  />
                );
              })}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography gutterBottom variant="h6" component="h2" sx={{ 
                color: '#1f4b6e',
                fontWeight: 600,
                fontSize: '1.1rem',
                flex: 1,
                margin: 0
              }}>
                {tool.nome}
              </Typography>
              {ratingStats && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <StarIcon sx={{ color: '#fbc02d', fontSize: '1.2rem' }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {ratingStats.mediaGeral.toFixed(1)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    ({ratingStats.totalAvaliacoes})
                  </Typography>
                </Box>
              )}
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ 
              flex: 1,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {tool.descricao}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              mt: 'auto',
              height: '40px'
            }}>
              <Button
                variant="contained"
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  flex: 1,
                  height: '100%',
                  backgroundColor: '#1f4b6e',
                  color: '#ffffff',
                  cursor: 'pointer', 
                  '&:hover': {
                    backgroundColor: '#2f6b8e',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', 
                  }
                }}
              >
                Acessar
              </Button>
              <Button
                variant="outlined"
                onClick={() => openModal(tool)}
                sx={{ 
                  minWidth: '40px',
                  height: '100%',
                  borderColor: '#1f4b6e',
                  color: '#1f4b6e',
                  '&:hover': {
                    backgroundColor: '#1f4b6e', 
                    borderColor: '#1f4b6e',
                    color: '#ffffff', 
                  }
                }}
              >
                <AddIcon />
              </Button>
              <Button
                variant="outlined"
                onClick={() => setIsRatingModalOpen(true)}
                sx={{ 
                  minWidth: '40px',
                  height: '100%',
                  borderColor: '#fbc02d',
                  color: '#fbc02d',
                  '&:hover': {
                    backgroundColor: 'rgba(251, 192, 45, 0.04)', 
                    borderColor: '#fbc02d',
                  }
                }}
              >
                <StarIcon />
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
      <RatingModal
        isOpen={isRatingModalOpen}
        onClose={handleRatingModalClose}
        toolId={tool.id}
        toolName={tool.nome}
      />
    </>
  );
};

export default ToolCard;
