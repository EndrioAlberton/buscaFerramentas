import styled from 'styled-components';

export const ResultItem = styled.div`
  background-color: #fff;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  width: 180px;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    width: 90%;
  }
`;

export const ResultImage = styled.img`
  display: block;
  margin: 0 auto;
  width: 60%;
  height: auto;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
`;

export const ResultContent = styled.div`
  padding-top: 5px;
  flex-grow: 1;
`;

export const ResultTitle = styled.h3`
  margin-top: 0;
`;

export const ResultDescription = styled.p`
  margin-bottom: 0;
`;