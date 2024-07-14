import React from 'react';
import { Button } from './styles';

interface SearchButtonProps {
    onClick: () => void;
  }
  
  const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
    return (
      <Button id="search-button" onClick={onClick}>
        Buscar
      </Button>
    );
  };
  
  export default SearchButton;
