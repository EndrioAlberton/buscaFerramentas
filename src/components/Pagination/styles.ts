import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  gap: 8px;
  box-sizing: border-box;
  margin-bottom: 0.5%;

  @media (max-width: 1800px) {
    margin-bottom: 3%;
  }
  @media (min-width: 1780px) {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
`;

export const PageButton = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  font-size: 1em;
  color: ${({ active }) => (active ? '#ffffff' : 'rgb(70, 68, 68)')}; 
  background-color: ${({ active }) => (active ? '#646cff' : '#f0f0f0')};
  border: 1px solid #646cff;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover:not(:disabled) {
    background-color: #535bf2;
    color: #ffffff;
  }
`;