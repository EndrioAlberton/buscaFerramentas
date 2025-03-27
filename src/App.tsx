import React, { useEffect, useState } from 'react';
import { Box, Container, Stack } from '@mui/material';
import SearchBar from './components/SearchBar';
import CategorySelect from './components/CategorySelect';
import ToolCard from './components/ToolCard';
import { Header } from './components/Header';
import { readTools, resetTools } from './services/dataAccess/ferramentasAccess';
import ResultContainer from './components/ResultContainer';
import Pagination from './components/Pagination';
import Modal from './components/Modal';

interface Tool {
  id: string;
  nome: string;
  descricao: string;
  link: string;
  imagem: string;
  categorias: string[];
  vantagens: string[];
  limitações: string[];
}

const App: React.FC = () => {
  const [data, setData] = useState<Tool[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const [filteredData, setFilteredData] = useState<Tool[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const itemsPerPage = 12;

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
      const normalizedCategory = category.toLowerCase().replace(/ /g, '_');
      const filtered = data.filter(tool => {
        const normalizedToolCategories = tool.categorias.map(cat => cat.toLowerCase().replace(/ /g, '_'));
        const inCategory = category === 'Todas' || normalizedToolCategories.includes(normalizedCategory);
        const inQuery = tool.nome.toLowerCase().includes(lowerCaseQuery) || tool.descricao.toLowerCase().includes(lowerCaseQuery);
        return inCategory && inQuery;
      });
      setFilteredData(filtered);
      setCurrentPage(1);
    };
    filterData();
  }, [query, category, data]);

  const openModal = (tool: Tool) => {
    setSelectedTool(tool);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTool(null);
    setModalOpen(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Stack spacing={3} alignItems="stretch">
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="center" sx={{ mb: 3 }}>
            <SearchBar query={query} setQuery={setQuery} />
            <CategorySelect category={category} setCategory={setCategory} />
          </Stack>
          <ResultContainer cards={currentItems.map(tool => (
            <ToolCard key={tool.id} tool={tool} openModal={openModal} />
          ))} />
          <Pagination 
            totalItems={filteredData.length} 
            itemsPerPage={itemsPerPage} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
          />
        </Stack>
      </Container>
      <Modal isOpen={modalOpen} tool={selectedTool} onClose={closeModal} />
    </Box>
  );
};

export default App;