import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

interface ToolCardProps {
  tool: {
    nome: string;
    descricao: string;
    categorias: string[];
    link: string;
    imagem: string;
    vantagens: string[];
    limitações: string[];
  };
  openModal: (tool: any) => void;
}

const categoryColors: { [key: string]: string } = {
  "apresentações": '#14b290', 
  "colaboração": '#388e3c',   
  "design": '#d81b60',        
  "jogos": '#f57c00',         
  "mapas": '#0288d1',         
  "organização": '#7b1fa2',   
  "programação": '#5c18c2',   
  "vídeos": '#c63939',        
  "interatividade": '#392924', 
  "quiz": '#fbc02d',          
  "nuvens de palavras": '#76d662', 
};

const ToolCard: React.FC<ToolCardProps> = ({ tool, openModal }) => {
  return (
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
              console.log('Categoria:', categoria, 'Cor encontrada:', categoryColors[formattedCategory]);

              return (
                <Chip
                key={index}
                label={categoria}
                size="small"
                variant="outlined"
                sx={{ 
                  backgroundColor: categoryColors[formattedCategory] || '#1976d2',
                  color: '#ffffff', 
                  cursor: 'default', 
                  pointerEvents: 'none', 
                }}
              />
              );
            })}
          </Box>
          <Typography gutterBottom variant="h6" component="h2" sx={{ 
            color: '#1f4b6e',
            fontWeight: 600,
            fontSize: '1.1rem'
          }}>
            {tool.nome}
          </Typography>
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
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
