import React from 'react';
import { HeaderContainer, Logo } from './styles';

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo src="/logoif.png" alt="Logo IF" />
      <Logo src="/logoMPIE.png" alt="Logo IF" />
    </HeaderContainer>
  );
};