import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
`;

export const CardContainer = styled.div`

  &:hover {
    transform: scale(1.025); // Efeito de zoom ao passar o mouse
  }
`;
