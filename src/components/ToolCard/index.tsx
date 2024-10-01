import React from 'react';
import { CardContainer, CardHeader, CardBody, CardTitle, CardDescription, CardLink, Category, CategoriesContainer, CardFooter } from './styles';

interface ToolCardProps {
  tool: {
    nome: string;
    descricao: string;
    categorias: string[];
    link: string;
    imagem: string;
  };
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <CardContainer>
      <CardHeader>
        <img src={tool.imagem} alt={tool.nome} />
      </CardHeader>
      <CardBody>
        <CategoriesContainer>
          {tool.categorias.map((categoria, index) => (
            <Category key={index}>{categoria}</Category>
          ))}
        </CategoriesContainer>
        <CardTitle>{tool.nome}</CardTitle>
        <CardDescription>{tool.descricao}</CardDescription>
        <CardFooter>
          <CardLink href={tool.link} target="_blank" rel="noopener noreferrer">Acessar</CardLink>
        </CardFooter>
      </CardBody>
    </CardContainer>
  );
};

export default ToolCard;
