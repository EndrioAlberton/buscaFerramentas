// components/Pagination/index.tsx
import React from 'react';
import { PaginationContainer, PageButton } from './styles';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Calcula o total de páginas

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // Altera a página atual se dentro do intervalo
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers: JSX.Element[] = [];
    
    // Lógica para determinar quais páginas mostrar
    if (currentPage === 1) {
      // Primeira página, mostre 1, 2 e 3
      pageNumbers.push(<PageButton key={1} onClick={() => handlePageChange(1)} active>1</PageButton>);
      if (totalPages > 1) pageNumbers.push(<PageButton key={2} onClick={() => handlePageChange(2)}>2</PageButton>);
      if (totalPages > 2) pageNumbers.push(<PageButton key={3} onClick={() => handlePageChange(3)}>3</PageButton>);
    } else if (currentPage === totalPages) {
      // Última página, mostre as duas páginas anteriores
      if (totalPages > 2) pageNumbers.push(<PageButton key={totalPages - 2} onClick={() => handlePageChange(totalPages - 2)}>{totalPages - 2}</PageButton>);
      pageNumbers.push(<PageButton key={totalPages - 1} onClick={() => handlePageChange(totalPages - 1)}>{totalPages - 1}</PageButton>);
      pageNumbers.push(<PageButton key={totalPages} onClick={() => handlePageChange(totalPages)} active>{totalPages}</PageButton>);
    } else {
      // Outra página, mostre a anterior, a atual e a próxima
      if (currentPage > 1) 
        pageNumbers.push(<PageButton key={currentPage - 1} onClick={() => handlePageChange(currentPage - 1)}>{currentPage - 1}</PageButton>);
        pageNumbers.push(<PageButton key={currentPage} onClick={() => handlePageChange(currentPage)} active>{currentPage}</PageButton>);
      if (currentPage < totalPages)   
      pageNumbers.push(<PageButton key={currentPage + 1} onClick={() => handlePageChange(currentPage + 1)}>{currentPage + 1}</PageButton>);
    }

    return pageNumbers; 
  };

  return (
    <PaginationContainer>
      <PageButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Anterior
      </PageButton>
      {renderPageNumbers()} {/* Renderiza os números das páginas */}
      <PageButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Próximo
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
