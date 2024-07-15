import styled, { createGlobalStyle } from 'styled-components';

export const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Search = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center; /* Align items horizontally */
  align-items: center; /* Align items vertically 
  `;

export const ResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const GlobalStyles = createGlobalStyle`
  body {
    width: 100vw;
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f0f0f0;
  }
`;

