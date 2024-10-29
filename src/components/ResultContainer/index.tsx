import React from 'react';
import { CardContainer, GridContainer } from './styles';

const ResultContainer: React.FC<{ cards: React.ReactNode[] }> = ({ cards }) => {
  return (
    <GridContainer>
      {cards.slice(0, 12).map((card, index) => (
        <CardContainer key={index}>{card}</CardContainer>
      ))}
    </GridContainer>
  );
};

export default ResultContainer;
