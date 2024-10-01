import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 300px;
  margin: 20px;
  position: relative; /* Necessário para o posicionamento do footer */
`;

export const CardHeader = styled.div`
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

export const CardBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
  position: relative;
  min-height: 250px; 
`;

export const CategoriesContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

export const Category = styled.span`
  background-color: #ccc;
  color: #fff;
  border-radius: 50px;
  font-size: 12px;
  padding: 2px 10px;
  text-transform: uppercase;
`;

export const CardTitle = styled.h4`
  margin: 10px 0;
`;

export const CardDescription = styled.p`
  font-size: 14px;
  margin: 0 0 40px 0;
  font-weight: 500;
  color: rgb(70, 68, 68);
`;

export const CardFooter = styled.div`
  position: absolute;
  bottom: 10px; /* Define uma distância do fundo do card */
  left: 50%;
  transform: translateX(-50%); /* Centraliza horizontalmente */
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const CardLink = styled.a`
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;
