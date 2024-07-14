import styled from 'styled-components';

export const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  width: 70%;
  max-width: 500px;
  margin-right: 10px;

  @media (max-width: 600px) {
    width: 90%;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;