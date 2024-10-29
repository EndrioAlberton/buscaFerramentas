import styled from 'styled-components';

export const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280px;
`;

export const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  width: 70%;
  max-width: 500px;
  margin-right: 10px;
  border-radius: 15px;
  border: 1px solid #282c34;

  @media (max-width: 600px) {
    width: 90%;
  }
`;
