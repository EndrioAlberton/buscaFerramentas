import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr); 

  @media (max-width: 1780px) {
    grid-template-columns: repeat(4, 1fr); // 4 colunas em telas de 1600px ou menores
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr); // 3 colunas em telas de 1200px ou menores
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr); // 2 colunas em tablets
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr; // 1 coluna em telas pequenas, como smartphones
  }
`;

export const CardContainer = styled.div`
  &:hover {
    transform: scale(1.05); // Efeito de zoom ao passar o mouse
  }
`;
