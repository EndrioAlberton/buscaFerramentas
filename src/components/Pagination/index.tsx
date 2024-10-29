import React from 'react';
import { PaginationContainer, PageButton } from './styles';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <PaginationContainer>
      <PageButton onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>
        Anterior
      </PageButton>
      {[...Array(totalPages)].map((_, index) => (
        <PageButton
          key={index + 1}
          onClick={() => handleClick(index + 1)}
          active={currentPage === index + 1}
        >
          {index + 1}
        </PageButton>
      ))}
      <PageButton onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}>
        Próximo
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
