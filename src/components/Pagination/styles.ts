import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  magin-bottom: 10px;
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
