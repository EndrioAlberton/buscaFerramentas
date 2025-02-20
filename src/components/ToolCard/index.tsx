import React from "react";
import {
  CardContainer, CardHeader, CardBody, CardTitle, CardDescription,
  CardLink, Category, CategoriesContainer, CardFooter
} from "./styles";
import { FiPlus } from "react-icons/fi";

interface ToolCardProps {
  tool: {
    nome: string;
    descricao: string;
    categorias: string[];
    link: string;
    imagem: string;
    vantagens: string[];
    limitacoes: string[];
  };
  openModal: (tool: any) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, openModal }) => {
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
          <CardLink href={tool.link} target="_blank" rel="noopener noreferrer">
            Acessar
          </CardLink>
          <CardLink  onClick={() => openModal(tool)}>
          <FiPlus />
          </CardLink>
        </CardFooter>
      </CardBody>
    </CardContainer>
  );
};

export default ToolCard;
