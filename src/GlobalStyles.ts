import styled, { createGlobalStyle } from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0; 
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-weight: 100vw;
`;

export const Search = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center; 
  align-items: center;
`;

export const ResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
