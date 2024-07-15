import React from 'react';
import { HeaderContainer } from './styles';

interface Props {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <HeaderContainer id="header">
    	<h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
    </HeaderContainer>
  );
};