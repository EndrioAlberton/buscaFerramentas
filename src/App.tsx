import React, { useEffect, useState } from 'react';
import  { AppContainer, GlobalStyles, Main, ResultsContainer, Search } from './GlobalStyles';

import SearchBar from './components/SearchBar';
import SearchButton from './components/SearchButton';
import CategorySelect from './components/CategorySelect';
import ToolCard from './components/ToolCard';
import { HeaderContainer } from './components/Header/styles';

interface Tool {
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

  useEffect(() => {
    fetch('data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar o arquivo JSON');
        }
        return response.json();
      })
      .then((data: Tool[]) => {
        setData(data);
        setFilteredData(data);
      })
      .catch(error => console.error('Erro ao carregar dados:', error));
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
    };
    filterData();
  }, [query, category, data]);

  return (
    <AppContainer>
      <HeaderContainer/>
      <GlobalStyles />
      <Main>
        <Search>
          <SearchBar query={query} setQuery={setQuery} />
          <CategorySelect category={category} setCategory={setCategory} />
          <SearchButton onClick={() => setQuery(query)} />
        </Search>
        <ResultsContainer id="results">
          {filteredData.map(tool => (
            <ToolCard key={tool.nome} tool={tool} />
          ))}
        </ResultsContainer>
      </Main>
    </AppContainer>
  );
};

export default App;

