import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 280px;
  margin: 0 25px 25px 25px;
  position: relative;
`;

export const CardHeader = styled.div`
  img {
    width: 90%;
    height: 150px;
    object-fit: contain;
    object-position: center;
    padding: 10px;
`;

export const CardBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
  position: relative;
  height: 160px; 
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
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
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
