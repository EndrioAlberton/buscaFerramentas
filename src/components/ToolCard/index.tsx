import React from 'react';
import { ResultContent, ResultDescription, ResultImage, ResultItem, ResultTitle } from './styles';

interface ToolCardProps {
    tool: {
      nome: string;
      descricao: string;
      link: string;
      imagem: string;
    };
  }
  
  const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
    return (
      <ResultItem className="result-item">
        <ResultImage src={tool.imagem} alt={tool.nome} />
        <ResultContent className="result-item-content">
          <ResultTitle>{tool.nome}</ResultTitle>
          <ResultDescription>{tool.descricao}</ResultDescription>
          <a href={tool.link} target="_blank" rel="noopener noreferrer">Acessar</a>
        </ResultContent>
      </ResultItem>
    );
  };
  
  export default ToolCard;
