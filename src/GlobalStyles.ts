import styled, { createGlobalStyle } from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw; 
  height: 100vh; 
  box-sizing: border-box; 
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;  
  padding: 0;   
  margin: 0;   
  box-sizing: border-box;
`;

export const Search = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  gap: 30px;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const GlobalStyles = createGlobalStyle`
  :root {
    background-color: #2f6b8e; 
    }

  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }
  
  a:hover {
    color: #535bf2;
  }

  body {
    margin: 0; 
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
    font-family: Arial, sans-serif;
    overflow-x: hidden;
  }

  h1 {
    font-size: 3.2em;
    line-height: 1.1;
  }

  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
  }
  
  button:hover {
    border-color: #646cff;
  }
  
  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  @media (prefers-color-scheme: light) {
    :root {
      color: #213547;
      background-color: #2f6b8e; 
    }

    a:hover {
      color: #747bff;
    }

    button {
      background-color: #f9f9f9;
    }
  }
`;
