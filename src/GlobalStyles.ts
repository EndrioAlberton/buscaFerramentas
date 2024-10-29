import styled, { createGlobalStyle } from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #2f6b8e; 
  width: 100vw; 
  height: 100vh; 
  box-sizing: border-box; 
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;  /* Usa 100% da largura do contêiner pai */
  height: 100%; /* Usa 100% da altura do contêiner pai */
  padding: 0;   /* Remove padding, se houver */
  margin: 0;    /* Remove margem, se houver */
  box-sizing: border-box; /* Inclui padding e bordas nas dimensões */
`;

export const Search = styled.div`
  margin: 10px; /* Você pode manter esta margem, mas tenha cuidado com o total */
  display: flex;
  justify-content: center; 
  align-items: center;
  width: 100%; /* Certifique-se de que não exceda a largura */
`;

export const GlobalStyles = createGlobalStyle`
  :root {
    background-color: #f0f0f0; 
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
    margin: 0; v
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
    font-family: Arial, sans-serif;
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
      background-color: #f0f0f0; 
    }

    a:hover {
      color: #747bff;
    }

    button {
      background-color: #f9f9f9;
    }
  }
`;
