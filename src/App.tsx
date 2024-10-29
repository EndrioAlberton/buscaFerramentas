import React, { useEffect, useState } from 'react';
import { AppContainer, GlobalStyles, Main, Search } from './GlobalStyles';
import SearchBar from './components/SearchBar';
import CategorySelect from './components/CategorySelect';
import ToolCard from './components/ToolCard';
import { HeaderContainer } from './components/Header/styles';
import { readTools } from './services/dataAccess/ferramentasAccess';
import ResultContainer from './components/ResultContainer';
import Pagination from './components/Pagination';

interface Tool {
  id: string;
  nome: string;
  descricao: string;
  link: string;
  imagem: string;
  categorias: string[];
}

const App: React.FC = () => {
  const [data, setData] = useState<Tool[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const [filteredData, setFilteredData] = useState<Tool[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Estado da página atual
  const itemsPerPage = 10; // Definimos 10 cards por página
  
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const tools = await readTools();
        setData(tools);
        setFilteredData(tools);
      } catch (error) {
        console.error('Erro ao buscar ferramentas:', error);
      }
    };

    fetchTools();
  }, []);

  useEffect(() => {
    const filterData = () => {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = data.filter(tool => {
        const inCategory = category === 'Todas' || tool.categorias.includes(category);
        const inQuery = tool.nome.toLowerCase().includes(lowerCaseQuery) || tool.descricao.toLowerCase().includes(lowerCaseQuery);
        return inCategory && inQuery;
      });
      setFilteredData(filtered);
      setCurrentPage(1);
    };
    filterData();
  }, [query, category, data]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <AppContainer>
      <HeaderContainer />
      <GlobalStyles />
      <Main>
        <Search>
          <SearchBar query={query} setQuery={setQuery} />
          <CategorySelect category={category} setCategory={setCategory} />
        </Search>
        <ResultContainer cards={currentItems.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))} />
        <Pagination 
          totalItems={filteredData.length} 
          itemsPerPage={itemsPerPage} 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
        />
      </Main>
    </AppContainer>
  );
};

export default App;
