import styled from 'styled-components';

export const CategoriesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  width: 200px;
  border-radius: 15px;
  border: 1px solid #282c34;
  appearance: none; /* Remove o estilo padrão */
  background: white;
  outline: none;

  &:focus {
    border-color: #61dafb;
    box-shadow: 0 0 5px rgba(97, 218, 251, 0.5);
  }

  @media (max-width: 600px) {
    width: 90%;
  }
`;
