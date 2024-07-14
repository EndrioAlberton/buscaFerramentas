import styled from 'styled-components';

export const CategoriesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  width: 200px;

  @media (max-width: 600px) {
    width: 90%;
  }
`;